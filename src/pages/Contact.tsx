import { useState, FormEvent } from 'react';

const container = { maxWidth: '1200px', margin: '0 auto' };

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--primary)', margin: '0 0 20px' }}>
      {text}
    </p>
  );
}

function Field({ label, children, required }: { label: string; children: React.ReactNode; required?: boolean }) {
  return (
    <div>
      <label style={{ display: 'block', fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, color: 'var(--foreground)', marginBottom: '8px' }}>
        {label} {required && <span style={{ color: 'var(--primary)' }}>*</span>}
      </label>
      {children}
    </div>
  );
}

const inputStyle: React.CSSProperties = {
  width: '100%',
  padding: '12px 16px',
  fontFamily: 'Inter, system-ui, sans-serif',
  fontSize: '14px',
  color: 'var(--foreground)',
  background: 'var(--card)',
  border: '1px solid var(--border)',
  borderRadius: '3px',
  outline: 'none',
  transition: 'border-color 0.15s',
  appearance: 'none',
};

export default function Contact() {
  const [submitted, setSubmitted] = useState(false);
  const [form, setForm] = useState({
    name: '', company: '', email: '', phone: '',
    service: '', message: '',
  });

  function handleChange(e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }));
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitted(true);
  }

  function handleFocus(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    e.target.style.borderColor = 'var(--primary)';
  }
  function handleBlur(e: React.FocusEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) {
    e.target.style.borderColor = 'var(--border)';
  }

  return (
    <div>
      {/* Hero */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', padding: '160px 24px 80px', background: 'var(--foreground)' }}>
        <div style={container}>
          <SectionLabel text="Contact" />
          <h1 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(32px, 5vw, 56px)', fontWeight: 400, color: '#FFFFFF', margin: '0 0 20px', lineHeight: 1.15, maxWidth: '600px' }}>
            Let's Talk About What's Next
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: '16px', color: 'rgba(255,255,255,0.6)', maxWidth: '520px', lineHeight: 1.75, margin: 0 }}>
            Whether you're exploring AI automation, redesigning a business workflow or looking to expand your technology team, start with a conversation.
          </p>
        </div>
      </section>

      {/* Form + Info */}
      <section style={{ padding: '80px 24px 100px', background: 'var(--background)' }}>
        <div style={container}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'start' }}>

            {/* Contact form */}
            <div>
              {submitted ? (
                <div style={{ padding: '48px', background: 'var(--card)', border: '1px solid var(--border)', borderRadius: '4px', textAlign: 'center' }}>
                  <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'rgba(12,110,88,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#0C6E58" strokeWidth="2" strokeLinecap="round"><path d="M20 6L9 17l-5-5" /></svg>
                  </div>
                  <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '28px', fontWeight: 400, margin: '0 0 12px' }}>Message received.</h2>
                  <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'var(--muted-foreground)', lineHeight: 1.7, margin: '0 0 24px' }}>
                    Thank you for reaching out. We'll be in touch shortly to discuss your needs.
                  </p>
                  <button
                    onClick={() => setSubmitted(false)}
                    style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--primary)', background: 'none', border: 'none', cursor: 'pointer', textDecoration: 'underline' }}
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Field label="Name" required>
                      <input
                        type="text" name="name" value={form.name} onChange={handleChange}
                        onFocus={handleFocus} onBlur={handleBlur}
                        style={inputStyle} required placeholder="Your name"
                      />
                    </Field>
                    <Field label="Company">
                      <input
                        type="text" name="company" value={form.company} onChange={handleChange}
                        onFocus={handleFocus} onBlur={handleBlur}
                        style={inputStyle} placeholder="Company name"
                      />
                    </Field>
                  </div>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <Field label="Business Email" required>
                      <input
                        type="email" name="email" value={form.email} onChange={handleChange}
                        onFocus={handleFocus} onBlur={handleBlur}
                        style={inputStyle} required placeholder="you@company.com"
                      />
                    </Field>
                    <Field label="Phone (optional)">
                      <input
                        type="tel" name="phone" value={form.phone} onChange={handleChange}
                        onFocus={handleFocus} onBlur={handleBlur}
                        style={inputStyle} placeholder="+1 (555) 000-0000"
                      />
                    </Field>
                  </div>
                  <Field label="What can we help with?" required>
                    <select
                      name="service" value={form.service} onChange={handleChange}
                      onFocus={handleFocus} onBlur={handleBlur}
                      style={{ ...inputStyle, backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='8' viewBox='0 0 12 8'%3E%3Cpath d='M1 1l5 5 5-5' stroke='%236B6966' strokeWidth='1.5' fill='none' strokeLinecap='round'/%3E%3C/svg%3E")`, backgroundRepeat: 'no-repeat', backgroundPosition: 'right 14px center', paddingRight: '36px', cursor: 'pointer' }}
                      required
                    >
                      <option value="" disabled>Select a service area</option>
                      <option value="ai-consulting">AI Consulting</option>
                      <option value="workflow-automation">Workflow Automation</option>
                      <option value="ai-agents">AI Agents</option>
                      <option value="staff-augmentation">Technology Staff Augmentation</option>
                      <option value="offshore-team">Offshore Development Team</option>
                      <option value="general">General Inquiry</option>
                    </select>
                  </Field>
                  <Field label="Tell us about your situation">
                    <textarea
                      name="message" value={form.message} onChange={handleChange}
                      onFocus={handleFocus} onBlur={handleBlur}
                      style={{ ...inputStyle, minHeight: '140px', resize: 'vertical' }}
                      placeholder="Briefly describe your business challenge or what you're trying to accomplish..."
                    />
                  </Field>
                  <button
                    type="submit"
                    style={{
                      display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
                      background: 'var(--primary)', color: 'var(--primary-foreground)',
                      fontFamily: 'Inter, system-ui, sans-serif', fontSize: '14px', fontWeight: 700,
                      padding: '16px 32px', borderRadius: '3px', border: 'none',
                      cursor: 'pointer', transition: 'opacity 0.15s',
                      alignSelf: 'flex-start',
                    }}
                    onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                    onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                  >
                    Start the Conversation
                  </button>
                </form>
              )}
            </div>

            {/* Contact info */}
            <div>
              <SectionLabel text="Our Locations" />
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px', marginBottom: '48px' }}>
                {[
                  {
                    city: 'Oklahoma City, USA',
                    flag: '🇺🇸',
                    role: 'U.S. Operations & Client Consulting',
                    note: 'Primary point of contact for U.S. clients and business relationships.',
                  },
                  {
                    city: 'Gujrat, Pakistan',
                    flag: '🇵🇰',
                    role: 'Technology Delivery',
                    note: 'Technology talent, development teams and business operations.',
                  },
                ].map(loc => (
                  <div key={loc.city} style={{ display: 'flex', gap: '20px', padding: '24px', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--card)' }}>
                    <span style={{ fontSize: '24px', flexShrink: 0 }}>{loc.flag}</span>
                    <div>
                      <p style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, margin: '0 0 4px' }}>{loc.city}</p>
                      <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)', margin: '0 0 8px' }}>{loc.role}</p>
                      <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.6 }}>{loc.note}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* What to expect */}
              <div style={{ padding: '32px', background: 'var(--muted)', borderRadius: '4px' }}>
                <p style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, margin: '0 0 16px', color: 'var(--foreground)', textTransform: 'uppercase', letterSpacing: '0.08em' }}>
                  What to expect
                </p>
                {[
                  'A response within one business day',
                  'A direct conversation — no sales scripts',
                  'Honest guidance on whether we\'re the right fit',
                  'No pressure to move forward',
                ].map((item, i) => (
                  <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', padding: '8px 0' }}>
                    <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', marginTop: '6px', flexShrink: 0 }} />
                    <span style={{ fontFamily: 'Inter', fontSize: '14px', color: 'var(--muted-foreground)', lineHeight: 1.6 }}>{item}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
