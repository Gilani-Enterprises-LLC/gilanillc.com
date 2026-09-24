/**
 * gilanillc.com Worker — runs ONLY for /api/* (see `run_worker_first` in
 * wrangler.jsonc). All pages and assets are static files served directly by
 * Cloudflare Workers Static Assets without invoking this script.
 *
 * POST /api/contact
 *   Accepts the contact form (multipart/form-data or
 *   application/x-www-form-urlencoded), validates it, and emails it to
 *   info@gilanillc.com through the Cloudflare Email Service `send_email`
 *   binding. The submitter's address is set as Reply-To so replies go
 *   straight to them.
 *
 *   - JavaScript clients (fetch with `Accept: application/json`) receive JSON:
 *       200 { ok: true }  |  4xx/5xx { ok: false, error, fields? }
 *   - No-JS form posts receive a 303 redirect to /contact/thank-you/ on
 *     success or /contact/?error=<code> on failure.
 *
 * Spam protection: same-origin check, hidden honeypot field, minimum
 * fill-time check, strict length limits, header-injection-safe values.
 */

interface ContactSubmission {
  name: string;
  company: string;
  email: string;
  phone: string;
  service: string;
  message: string;
}

const SERVICES: Record<string, string> = {
  'ai-consulting': 'AI Consulting',
  'workflow-automation': 'Workflow Automation',
  'ai-agents': 'AI Agents',
  'staff-augmentation': 'Technology Staff Augmentation',
  'offshore-team': 'Offshore Development Team',
  general: 'General Inquiry',
};

const LIMITS = { name: 120, company: 160, email: 254, phone: 40, message: 5000 } as const;
/** Humans take longer than this to fill in the form; most bots don't. */
const MIN_FILL_MS = 3000;
const EMAIL_RE = /^[^\s@<>()[\]\\,;:"]+@[^\s@<>()[\]\\,;:"]+\.[^\s@<>()[\]\\,;:"]{2,}$/;

type FieldErrors = Partial<Record<keyof ContactSubmission, string>>;

class HttpError extends Error {
  constructor(
    readonly status: number,
    readonly code: string,
    message: string,
    readonly fields?: FieldErrors,
  ) {
    super(message);
  }
}

export default {
  async fetch(request, env, ctx): Promise<Response> {
    const url = new URL(request.url);

    if (url.pathname === '/api/contact' || url.pathname === '/api/contact/') {
      if (request.method !== 'POST') {
        return json({ ok: false, error: 'Method not allowed' }, 405, { Allow: 'POST' });
      }
      return handleContact(request, env, ctx);
    }

    return json({ ok: false, error: 'Not found' }, 404);
  },
} satisfies ExportedHandler<Env>;

async function handleContact(request: Request, env: Env, _ctx: ExecutionContext): Promise<Response> {
  const wantsJson = (request.headers.get('Accept') ?? '').includes('application/json');

  try {
    assertSameOrigin(request, env);

    const form = await readForm(request);

    // Honeypot: real users never see or fill the "website" field. Pretend
    // success so bots don't learn they were filtered.
    if (str(form.get('website'))) return success(wantsJson, request);

    // Fill-time check (the page stamps the render time into a hidden field).
    const started = Number(str(form.get('_t')));
    if (Number.isFinite(started) && started > 0 && Date.now() - started < MIN_FILL_MS) {
      return success(wantsJson, request);
    }

    const submission = validate(form);
    await sendEmail(env, submission, request);
    return success(wantsJson, request);
  } catch (err) {
    const e =
      err instanceof HttpError
        ? err
        : new HttpError(502, 'send_failed', 'Your message could not be sent. Please try again or email us directly.');
    if (!(err instanceof HttpError)) {
      const detail = err as { code?: string; message?: string };
      console.error('contact: email send failed', detail?.code, detail?.message);
    }

    if (wantsJson) return json({ ok: false, error: e.message, code: e.code, fields: e.fields }, e.status);
    return Response.redirect(new URL(`/contact/?error=${encodeURIComponent(e.code)}#contact-form`, request.url).href, 303);
  }
}

function assertSameOrigin(request: Request, env: Env): void {
  const origin = request.headers.get('Origin');
  if (!origin) return; // Some privacy tools strip Origin; other checks still apply.
  const self = new URL(request.url).origin;
  const allowed = new Set([self, ...String(env.ALLOWED_ORIGINS ?? '').split(',').map((s) => s.trim()).filter(Boolean)]);
  if (!allowed.has(origin)) throw new HttpError(403, 'forbidden_origin', 'Forbidden.');
}

async function readForm(request: Request): Promise<FormData> {
  const type = request.headers.get('Content-Type') ?? '';
  if (!type.includes('multipart/form-data') && !type.includes('application/x-www-form-urlencoded')) {
    throw new HttpError(415, 'unsupported_type', 'Unsupported content type.');
  }
  const length = Number(request.headers.get('Content-Length') ?? '0');
  if (length > 32_768) throw new HttpError(413, 'too_large', 'Submission is too large.');
  try {
    return await request.formData();
  } catch {
    throw new HttpError(400, 'bad_request', 'Could not read the form submission.');
  }
}

function str(value: unknown): string {
  return typeof value === 'string' ? value.trim() : '';
}

/** Single-line value safe for email headers/subjects. */
function oneLine(value: string): string {
  return value.replace(/[\r\n\t]+/g, ' ').replace(/\s{2,}/g, ' ').trim();
}

function validate(form: FormData): ContactSubmission {
  const s: ContactSubmission = {
    name: oneLine(str(form.get('name'))),
    company: oneLine(str(form.get('company'))),
    email: oneLine(str(form.get('email'))).toLowerCase(),
    phone: oneLine(str(form.get('phone'))),
    service: str(form.get('service')),
    message: str(form.get('message')).replace(/\r\n?/g, '\n'),
  };

  const fields: FieldErrors = {};
  if (!s.name) fields.name = 'Please enter your name.';
  else if (s.name.length > LIMITS.name) fields.name = 'Name is too long.';
  if (s.company.length > LIMITS.company) fields.company = 'Company name is too long.';
  if (!s.email) fields.email = 'Please enter your business email.';
  else if (s.email.length > LIMITS.email || !EMAIL_RE.test(s.email)) fields.email = 'Please enter a valid email address.';
  if (s.phone.length > LIMITS.phone || (s.phone && !/^[0-9+().\-\s x]+$/i.test(s.phone))) fields.phone = 'Please enter a valid phone number.';
  if (!SERVICES[s.service]) fields.service = 'Please select a service area.';
  if (s.message.length > LIMITS.message) fields.message = `Please keep your message under ${LIMITS.message} characters.`;

  if (Object.keys(fields).length > 0) {
    throw new HttpError(422, 'invalid', 'Please correct the highlighted fields.', fields);
  }
  return s;
}

async function sendEmail(env: Env, s: ContactSubmission, request: Request): Promise<void> {
  const service = SERVICES[s.service];
  const subject = oneLine(`Website inquiry: ${service} — ${s.name}${s.company ? ` (${s.company})` : ''}`).slice(0, 200);
  const receivedAt = new Date().toUTCString();
  const country = (request as Request & { cf?: { country?: string } }).cf?.country ?? 'unknown';

  const rows: [string, string][] = [
    ['Name', s.name],
    ['Company', s.company || '—'],
    ['Email', s.email],
    ['Phone', s.phone || '—'],
    ['Interested in', service],
  ];

  const text = [
    'New inquiry from the gilanillc.com contact form.',
    '',
    ...rows.map(([k, v]) => `${k}: ${v}`),
    '',
    'Message:',
    s.message || '(no message)',
    '',
    '—',
    `Received ${receivedAt} · visitor country: ${country}`,
    'Reply to this email to respond directly to the sender.',
  ].join('\n');

  const html = `<!doctype html><html><body style="margin:0;padding:24px;background:#F8F7F4;font-family:Arial,Helvetica,sans-serif;color:#0F0F0E">
<table role="presentation" width="100%" style="max-width:640px;margin:0 auto;background:#fff;border:1px solid #E2DDD8;border-radius:4px">
<tr><td style="padding:24px 28px;border-bottom:3px solid #0C6E58">
<p style="margin:0;font-size:12px;letter-spacing:.12em;text-transform:uppercase;color:#0C6E58;font-weight:bold">gilanillc.com contact form</p>
<h1 style="margin:8px 0 0;font-size:20px;font-weight:bold">${esc(service)} inquiry from ${esc(s.name)}</h1></td></tr>
<tr><td style="padding:20px 28px"><table role="presentation" cellpadding="0" cellspacing="0" style="font-size:14px;line-height:1.6">
${rows
  .map(
    ([k, v]) =>
      `<tr><td style="padding:4px 16px 4px 0;color:#6B6966;white-space:nowrap;vertical-align:top">${esc(k)}</td><td style="padding:4px 0">${
        k === 'Email' ? `<a href="mailto:${esc(v)}" style="color:#0C6E58">${esc(v)}</a>` : esc(v)
      }</td></tr>`,
  )
  .join('\n')}
</table>
<p style="margin:20px 0 6px;font-size:13px;color:#6B6966">Message</p>
<div style="font-size:14px;line-height:1.7;white-space:pre-wrap;padding:14px 16px;background:#F2EFE9;border-radius:3px">${esc(s.message || '(no message)')}</div>
</td></tr>
<tr><td style="padding:14px 28px;border-top:1px solid #E2DDD8;font-size:12px;color:#6B6966">Received ${esc(receivedAt)} · visitor country: ${esc(country)}<br>Reply to this email to respond directly to ${esc(s.name)}.</td></tr>
</table></body></html>`;

  await env.CONTACT_EMAIL.send({
    to: env.CONTACT_TO,
    from: { name: env.CONTACT_FROM_NAME, email: env.CONTACT_FROM },
    replyTo: { name: s.name, email: s.email },
    subject,
    text,
    html,
  });
}

function success(wantsJson: boolean, request: Request): Response {
  if (wantsJson) return json({ ok: true }, 200);
  return Response.redirect(new URL('/contact/thank-you/', request.url).href, 303);
}

function json(body: unknown, status: number, headers: Record<string, string> = {}): Response {
  return new Response(JSON.stringify(body), {
    status,
    headers: {
      'Content-Type': 'application/json; charset=utf-8',
      'Cache-Control': 'no-store',
      'X-Content-Type-Options': 'nosniff',
      ...headers,
    },
  });
}

function esc(value: string): string {
  return value
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;');
}
