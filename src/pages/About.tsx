import { Link } from 'react-router';

const sectionPad = { padding: '100px 24px' };
const container = { maxWidth: '1200px', margin: '0 auto' };

function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase' as const, color: 'var(--primary)', margin: '0 0 20px' }}>
      {text}
    </p>
  );
}

function TimelineItem({ headline, body }: { era?: string; headline: string; body: string }) {
  return (
    <div style={{ padding: '28px 0', borderBottom: '1px solid var(--border)' }}>
      <p style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 600, margin: '0 0 8px', color: 'var(--foreground)' }}>{headline}</p>
      <p style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '1.7', color: 'var(--muted-foreground)', margin: 0 }}>{body}</p>
    </div>
  );
}

export default function About() {
  return (
    <div>
      {/* Hero */}
      <section style={{ ...sectionPad, paddingTop: '160px', background: 'var(--foreground)' }}>
        <div style={container}>
          <SectionLabel text="About Gilani Enterprises" />
          <h1 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 400, color: '#FFFFFF', margin: '0 0 24px', lineHeight: 1.15, maxWidth: '700px' }}>
            Technology Experience. Business Perspective. A Global Outlook.
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: '17px', color: 'rgba(255,255,255,0.6)', maxWidth: '560px', lineHeight: 1.75, margin: 0 }}>
            Gilani Enterprises is a technology consulting company serving small businesses in the United States. The company specializes in AI-assisted workflow redesign, AI agents and technology staff augmentation through teams in the United States and Pakistan.
          </p>
        </div>
      </section>

      {/* Company story */}
      <section style={{ ...sectionPad, background: 'var(--background)' }}>
        <div style={container}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'start' }}>
            <div>
              <SectionLabel text="Our Story" />
              <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(24px, 3vw, 38px)', fontWeight: 400, margin: '0 0 28px', lineHeight: 1.2 }}>
                Built on decades of technology experience. Focused on the AI-powered future.
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.8', color: 'var(--muted-foreground)', margin: '0 0 20px' }}>
                Gilani Enterprises has accumulated more than three decades of technology and business experience. That history spans software development, technology consulting, custom application development, technical staff augmentation and enterprise and web technologies.
              </p>
              <p style={{ fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.8', color: 'var(--muted-foreground)', margin: '0 0 20px' }}>
                The company's current focus reflects the evolution of technology: helping businesses apply AI practically and access the technical talent needed to execute. This is not a pivot away from experience — it is experience applied to what matters most today.
              </p>
              <p style={{ fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.8', color: 'var(--muted-foreground)', margin: 0 }}>
                With operations in Oklahoma City, USA and Gujrat, Pakistan, Gilani Enterprises occupies a distinctive position — U.S.-based business relationships and client understanding combined with direct access to technology professionals in Pakistan.
              </p>
            </div>

            <div>
              <div style={{ borderTop: '1px solid var(--border)' }}>
                <TimelineItem era="1990s–2000s" headline="Software Development & Consulting" body="Custom application development, enterprise technology consulting and early web development across a range of business clients." />
                <TimelineItem era="2000s–2010s" headline="Technical Staff Augmentation" body="Expanded technology staffing capabilities, connecting U.S. businesses with technology professionals and development resources." />
                <TimelineItem era="2010s–Present" headline="Technology Platform Evolution" body="Continued consulting, custom development and staff augmentation as technology platforms evolved — Java, .NET, PHP, Node.js and beyond." />
                <TimelineItem era="Today" headline="AI Consulting & Global Talent" body="Focused on helping U.S. businesses redesign workflows with AI and extend their technology teams through skilled professionals in Pakistan." />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Positioning statement */}
      <section style={{ padding: '80px 24px', background: 'var(--muted)' }}>
        <div style={{ ...container, display: 'flex', justifyContent: 'center' }}>
          <blockquote style={{
            fontFamily: 'Instrument Serif, Georgia, serif',
            fontSize: 'clamp(22px, 3vw, 36px)',
            fontStyle: 'italic',
            color: 'var(--foreground)',
            lineHeight: 1.5,
            maxWidth: '760px',
            textAlign: 'center',
            margin: 0,
            borderLeft: 'none',
            padding: 0,
          }}>
            "Gilani Enterprises understands technology, understands business, and helps small U.S. companies take practical advantage of AI and global technology talent."
          </blockquote>
        </div>
      </section>

      {/* Beyond Technology */}
      <section style={{ ...sectionPad, background: 'var(--background)' }}>
        <div style={container}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'start' }}>
            <div>
              <SectionLabel text="Beyond Technology" />
              <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, margin: '0 0 20px', lineHeight: 1.2 }}>
                Broader business and operating experience.
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.8', color: 'var(--muted-foreground)', margin: '0 0 20px' }}>
                Gilani Enterprises has investments and operating experience beyond technology consulting. In Pakistan, this includes involvement in education — primary, vocational, technology education and nonprofit educational initiatives.
              </p>
              <p style={{ fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.8', color: 'var(--muted-foreground)', margin: '0 0 20px' }}>
                The company also has retail business interests in the United States.
              </p>
              <p style={{ fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.8', color: 'var(--muted-foreground)', margin: 0 }}>
                This operating experience across sectors gives Gilani Enterprises a perspective on business that pure technology consultancies rarely develop — understanding how organizations actually function from the inside.
              </p>
            </div>

            {/* Presence */}
            <div>
              <SectionLabel text="Our Presence" />
              <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, margin: '0 0 32px', lineHeight: 1.2 }}>
                Two locations. One integrated team.
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {[
                  {
                    city: 'Oklahoma City, USA',
                    flag: '🇺🇸',
                    desc: 'U.S. business relationships, AI consulting engagements and client management. The primary point of contact for American clients.',
                    role: 'Client Operations & Consulting',
                  },
                  {
                    city: 'Gujrat, Pakistan',
                    flag: '🇵🇰',
                    desc: 'Technology talent delivery, development teams and business operations. Home to the technology professionals who extend client teams.',
                    role: 'Technology Delivery & Operations',
                  },
                ].map(loc => (
                  <div key={loc.city} style={{ padding: '32px', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--card)' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '12px' }}>
                      <h3 style={{ fontFamily: 'Inter', fontSize: '16px', fontWeight: 700, margin: 0 }}>{loc.city}</h3>
                      <span style={{ fontSize: '20px' }}>{loc.flag}</span>
                    </div>
                    <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)', margin: '0 0 10px' }}>{loc.role}</p>
                    <p style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '1.7', color: 'var(--muted-foreground)', margin: 0 }}>{loc.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--primary)', padding: '80px 24px' }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 400, color: '#FFFFFF', margin: '0 0 16px' }}>
            Interested in working with us?
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'rgba(255,255,255,0.7)', margin: '0 0 36px' }}>
            Start with a direct conversation about your technology challenges.
          </p>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', background: '#FFFFFF', color: 'var(--primary)', fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, padding: '14px 32px', borderRadius: '3px', textDecoration: 'none' }}>
            Let's Talk
          </Link>
        </div>
      </section>
    </div>
  );
}
