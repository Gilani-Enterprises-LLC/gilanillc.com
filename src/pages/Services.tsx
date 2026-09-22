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

function CapabilityItem({ text }: { text: string }) {
  return (
    <div style={{ display: 'flex', alignItems: 'flex-start', gap: '12px', padding: '14px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--primary)', marginTop: '6px', flexShrink: 0 }} />
      <span style={{ fontFamily: 'Inter', fontSize: '14px', color: 'var(--foreground)', lineHeight: 1.6 }}>{text}</span>
    </div>
  );
}

function EngagementCard({ title, desc }: { title: string; desc: string }) {
  return (
    <div style={{ padding: '32px', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--card)' }}>
      <h4 style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, margin: '0 0 12px', color: 'var(--foreground)' }}>{title}</h4>
      <p style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '1.7', color: 'var(--muted-foreground)', margin: 0 }}>{desc}</p>
    </div>
  );
}

function ProcessRow({ num, label, desc }: { num: number; label: string; desc: string }) {
  return (
    <div style={{ display: 'grid', gridTemplateColumns: '48px 1fr', gap: '24px', alignItems: 'start', padding: '28px 0', borderBottom: '1px solid var(--border)' }}>
      <div style={{ width: '40px', height: '40px', borderRadius: '50%', border: '2px solid var(--primary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, color: 'var(--primary)' }}>
        {num}
      </div>
      <div>
        <p style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, margin: '0 0 6px', color: 'var(--foreground)' }}>{label}</p>
        <p style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '1.7', color: 'var(--muted-foreground)', margin: 0 }}>{desc}</p>
      </div>
    </div>
  );
}

export default function Services() {
  return (
    <div>
      {/* Hero */}
      <section style={{ ...sectionPad, paddingTop: '160px', background: 'var(--foreground)' }}>
        <div style={container}>
          <SectionLabel text="Our Services" />
          <h1 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(32px, 5vw, 60px)', fontWeight: 400, color: '#FFFFFF', margin: '0 0 24px', lineHeight: 1.15, maxWidth: '700px' }}>
            AI Consulting &amp; Technology Staff Augmentation
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: '17px', color: 'rgba(255,255,255,0.6)', maxWidth: '560px', lineHeight: 1.75, margin: 0 }}>
            Two focused service areas for U.S. businesses looking to apply AI practically and extend their technology capabilities through experienced global talent.
          </p>
        </div>
      </section>

      {/* AI Service */}
      <section style={{ ...sectionPad, background: 'var(--background)' }}>
        <div style={container}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'start' }}>
            <div>
              <SectionLabel text="Service 01" />
              <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, margin: '0 0 20px', lineHeight: 1.2 }}>
                AI-Assisted Workflow Redesign
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.75', color: 'var(--muted-foreground)', margin: '0 0 40px' }}>
                Effective AI adoption starts with understanding how your business actually works. We analyze existing processes, identify where AI can genuinely help, and redesign workflows around practical automation — not technology for its own sake.
              </p>
              <div>
                {[
                  { num: 1, label: 'Understand the Existing Workflow', desc: 'Map current processes in detail, identifying all steps, handoffs, decisions and bottlenecks.' },
                  { num: 2, label: 'Identify Repetitive and Manual Activities', desc: 'Locate the specific tasks that consume time without requiring creative judgment.' },
                  { num: 3, label: 'Identify AI Opportunities', desc: 'Determine where AI assistance or automation can meaningfully improve quality, speed or cost.' },
                  { num: 4, label: 'Redesign the Workflow', desc: 'Restructure processes around AI-assisted steps, with appropriate human oversight built in.' },
                  { num: 5, label: 'Introduce Automation and AI Agents', desc: 'Deploy practical AI agents and automation targeted at the highest-value tasks.' },
                  { num: 6, label: 'Evaluate and Continuously Improve', desc: 'Measure outcomes against business objectives and refine the system over time.' },
                ].map(step => <ProcessRow key={step.num} {...step} />)}
              </div>
            </div>

            {/* AI Agents */}
            <div>
              <div style={{ padding: '40px', background: 'var(--muted)', borderRadius: '4px', marginBottom: '32px' }}>
                <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--primary)', margin: '0 0 16px' }}>
                  Human-in-the-Loop AI
                </p>
                <p style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '1.75', color: 'var(--muted-foreground)', margin: 0 }}>
                  We design AI systems that keep human judgment in the process where it matters most — automating the mechanical while preserving the decisions that require experience and context.
                </p>
              </div>

              <h3 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '26px', fontWeight: 400, margin: '0 0 20px' }}>
                AI Agents &amp; Automation
              </h3>
              <p style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '1.75', color: 'var(--muted-foreground)', margin: '0 0 24px' }}>
                Practical AI applications designed around real business tasks:
              </p>
              {[
                'Information gathering and research',
                'Document processing and extraction',
                'Internal knowledge assistance',
                'Repetitive administrative tasks',
                'Workflow orchestration between systems',
                'Data processing and transformation',
                'Employee assistance and support',
                'Customer-service workflow support',
              ].map(c => <CapabilityItem key={c} text={c} />)}

              <div style={{ marginTop: '40px' }}>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: 'var(--primary)', color: 'var(--primary-foreground)',
                  fontFamily: 'Inter', fontSize: '14px', fontWeight: 600,
                  padding: '14px 28px', borderRadius: '3px', textDecoration: 'none',
                }}>
                  Discuss AI Consulting
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Divider */}
      <div style={{ height: '1px', background: 'var(--border)', maxWidth: '1200px', margin: '0 auto 0' }} />

      {/* Staff Aug */}
      <section style={{ ...sectionPad, background: 'var(--background)' }}>
        <div style={container}>
          <SectionLabel text="Service 02" />
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '80px', alignItems: 'start' }}>
            <div>
              <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, margin: '0 0 20px', lineHeight: 1.2 }}>
                Technology Staff Augmentation
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.75', color: 'var(--muted-foreground)', margin: '0 0 32px' }}>
                Extend your technology team with skilled professionals based in Pakistan, working directly with your U.S. stakeholders. Gilani Enterprises provides access to technology talent and flexible team structures — without the friction of traditional offshore engagements.
              </p>
              <p style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '1.75', color: 'var(--muted-foreground)', margin: '0 0 32px' }}>
                Pakistan has developed a strong technology talent base, with professionals who communicate clearly, understand U.S. business expectations and can function as genuine extensions of existing teams.
              </p>

              <h3 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '24px', fontWeight: 400, margin: '0 0 16px' }}>
                Roles We Place
              </h3>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                {[
                  'Software Developers', 'QA Engineers',
                  'DevOps Engineers', 'AI Engineers',
                  'Data Engineers', 'Business Analysts',
                  'Project Managers', 'Technical Leads',
                ].map(role => (
                  <div key={role} style={{ padding: '12px 16px', background: 'var(--muted)', borderRadius: '3px', fontFamily: 'Inter', fontSize: '13px', color: 'var(--foreground)' }}>
                    {role}
                  </div>
                ))}
              </div>
            </div>

            <div>
              <h3 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '26px', fontWeight: 400, margin: '0 0 24px' }}>
                Engagement Models
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '40px' }}>
                <EngagementCard
                  title="Individual Specialists"
                  desc="Add specific skills to an existing team on a project or ongoing basis. Ideal when you need one or two specialists to fill a gap without building a dedicated team."
                />
                <EngagementCard
                  title="Dedicated Team"
                  desc="Build a longer-term extension of your technology organization. The team functions as an integrated part of your existing operation with direct communication and shared goals."
                />
                <EngagementCard
                  title="Project Team"
                  desc="Assemble resources around a defined technology initiative with a clear scope, timeline and deliverables. Scales down once the project concludes."
                />
              </div>

              <div style={{ padding: '32px', background: 'var(--foreground)', borderRadius: '4px', marginBottom: '32px' }}>
                <p style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.4)', margin: '0 0 12px' }}>Our focus</p>
                <p style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '20px', color: '#FFFFFF', lineHeight: 1.5, margin: 0, fontStyle: 'italic' }}>
                  "Access to talent, flexibility, scalability, collaboration and direct communication — extending your team without the complexity."
                </p>
              </div>

              <Link to="/contact" style={{
                display: 'inline-flex', alignItems: 'center',
                background: 'var(--primary)', color: 'var(--primary-foreground)',
                fontFamily: 'Inter', fontSize: '14px', fontWeight: 600,
                padding: '14px 28px', borderRadius: '3px', textDecoration: 'none',
              }}>
                Discuss Your Technology Needs
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--primary)', padding: '80px 24px' }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(24px, 3vw, 40px)', fontWeight: 400, color: '#FFFFFF', margin: '0 0 16px' }}>
            Ready to explore either service?
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'rgba(255,255,255,0.7)', margin: '0 0 36px' }}>
            Start with a conversation. No sales pressure — just a direct discussion about your needs.
          </p>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', background: '#FFFFFF', color: 'var(--primary)', fontFamily: 'Inter', fontSize: '14px', fontWeight: 700, padding: '14px 32px', borderRadius: '3px', textDecoration: 'none' }}>
            Start the Conversation
          </Link>
        </div>
      </section>
    </div>
  );
}
