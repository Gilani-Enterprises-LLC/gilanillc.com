import { Link } from 'react-router';

/* ─── Vibrant hero workflow visualization ─── */
function WorkflowViz() {
  // Nodes: cx, cy, r, color, pulseDelay
  const nodes = [
    { cx: 80,  cy: 70,  r: 7,  color: '#10B981', delay: '0s' },
    { cx: 230, cy: 45,  r: 5,  color: '#F59E0B', delay: '0.6s' },
    { cx: 360, cy: 110, r: 9,  color: '#10B981', delay: '1.2s' },
    { cx: 155, cy: 165, r: 6,  color: '#60A5FA', delay: '0.3s' },
    { cx: 295, cy: 210, r: 5,  color: '#F59E0B', delay: '0.9s' },
    { cx: 75,  cy: 235, r: 6,  color: '#60A5FA', delay: '1.5s' },
    { cx: 390, cy: 295, r: 7,  color: '#10B981', delay: '0.4s' },
    { cx: 205, cy: 310, r: 5,  color: '#F59E0B', delay: '1.1s' },
    { cx: 95,  cy: 355, r: 4,  color: '#60A5FA', delay: '0.7s' },
    { cx: 320, cy: 370, r: 6,  color: '#10B981', delay: '1.8s' },
    { cx: 440, cy: 170, r: 4,  color: '#60A5FA', delay: '0.2s' },
    { cx: 260, cy: 130, r: 4,  color: '#A78BFA', delay: '1.4s' },
  ];
  const edges = [
    [0,1],[1,2],[0,3],[3,4],[2,4],[0,5],[3,5],
    [4,6],[3,7],[7,8],[4,9],[7,9],[2,10],[4,10],[1,11],[3,11],
  ];

  return (
    <svg viewBox="0 0 480 430" style={{ width: '100%', height: '100%' }} aria-hidden="true">
      <defs>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="blur" />
          <feMerge><feMergeNode in="blur"/><feMergeNode in="SourceGraphic"/></feMerge>
        </filter>
      </defs>

      {/* Edges */}
      {edges.map(([a, b], i) => (
        <line
          key={i}
          x1={nodes[a].cx} y1={nodes[a].cy}
          x2={nodes[b].cx} y2={nodes[b].cy}
          stroke="rgba(255,255,255,0.12)"
          strokeWidth="1"
        />
      ))}

      {/* Animated travelling dots on select edges */}
      {[[0,3],[1,2],[4,6],[7,9]].map(([a,b],i) => (
        <circle key={`t${i}`} r="2.5" fill="white" opacity="0.7">
          <animateMotion
            dur={`${2.2 + i * 0.5}s`}
            repeatCount="indefinite"
            path={`M${nodes[a].cx},${nodes[a].cy} L${nodes[b].cx},${nodes[b].cy}`}
          />
        </circle>
      ))}

      {/* Nodes */}
      {nodes.map((n, i) => (
        <g key={i} filter="url(#glow)">
          <circle cx={n.cx} cy={n.cy} r={n.r + 8} fill={n.color} opacity="0.12">
            <animate attributeName="r" values={`${n.r+6};${n.r+12};${n.r+6}`} dur="3s" begin={n.delay} repeatCount="indefinite"/>
            <animate attributeName="opacity" values="0.12;0.06;0.12" dur="3s" begin={n.delay} repeatCount="indefinite"/>
          </circle>
          <circle cx={n.cx} cy={n.cy} r={n.r} fill={n.color} opacity="0.9"/>
          <circle cx={n.cx} cy={n.cy} r={n.r * 0.45} fill="white" opacity="0.6"/>
        </g>
      ))}
    </svg>
  );
}

/* ─── Location arc SVG ─── */
function LocationArc() {
  return (
    <svg viewBox="0 0 600 200" style={{ width: '100%', maxWidth: '600px' }} aria-hidden="true">
      {/* Arc connecting two points */}
      <path
        d="M 80 160 Q 300 20 520 160"
        fill="none"
        stroke="#0C6E58"
        strokeWidth="1.5"
        strokeDasharray="6 4"
        opacity="0.6"
      />
      {/* OKC dot */}
      <circle cx={80} cy={160} r={6} fill="#0C6E58" />
      <circle cx={80} cy={160} r={12} fill="#0C6E58" opacity="0.15" />
      {/* Gujrat dot */}
      <circle cx={520} cy={160} r={6} fill="#0C6E58" />
      <circle cx={520} cy={160} r={12} fill="#0C6E58" opacity="0.15" />
      {/* Moving dot along arc */}
      <circle r={4} fill="#0C6E58" opacity="0.8">
        <animateMotion dur="3s" repeatCount="indefinite">
          <mpath href="#arc-path" />
        </animateMotion>
      </circle>
      <path id="arc-path" d="M 80 160 Q 300 20 520 160" fill="none" />
    </svg>
  );
}

/* ─── Process step ─── */
function ProcessStep({ num, label, desc }: { num: number; label: string; desc: string }) {
  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', flex: 1, minWidth: '140px' }}>
      <div style={{
        width: '40px', height: '40px',
        borderRadius: '50%',
        border: '2px solid var(--primary)',
        display: 'flex', alignItems: 'center', justifyContent: 'center',
        fontFamily: 'Inter', fontSize: '13px', fontWeight: 700,
        color: 'var(--primary)',
        marginBottom: '14px',
        flexShrink: 0,
      }}>
        {num}
      </div>
      <p style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 700, letterSpacing: '0.04em', textTransform: 'uppercase', color: 'var(--foreground)', margin: '0 0 6px' }}>
        {label}
      </p>
      <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--muted-foreground)', margin: 0, lineHeight: '1.6' }}>
        {desc}
      </p>
    </div>
  );
}

/* ─── Why card ─── */
function WhyCard({ icon, title, body }: { icon: string; title: string; body: string }) {
  return (
    <div style={{
      padding: '32px',
      background: 'var(--card)',
      border: '1px solid var(--border)',
      borderRadius: '4px',
      transition: 'box-shadow 0.2s, border-color 0.2s',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.08)';
        el.style.borderColor = 'rgba(12,110,88,0.3)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = 'none';
        el.style.borderColor = 'var(--border)';
      }}
    >
      <div style={{ fontSize: '24px', marginBottom: '16px' }}>{icon}</div>
      <h3 style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 700, margin: '0 0 10px', color: 'var(--foreground)' }}>
        {title}
      </h3>
      <p style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '1.7', color: 'var(--muted-foreground)', margin: 0 }}>
        {body}
      </p>
    </div>
  );
}

/* ─── Challenge tag ─── */
function ChallengeTag({ text }: { text: string }) {
  return (
    <div style={{
      padding: '10px 18px',
      border: '1px solid var(--border)',
      borderRadius: '100px',
      fontFamily: 'Inter', fontSize: '13px', color: 'var(--muted-foreground)',
      background: 'var(--card)',
      transition: 'border-color 0.15s, color 0.15s',
      cursor: 'default',
    }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--primary)';
        el.style.color = 'var(--primary)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.borderColor = 'var(--border)';
        el.style.color = 'var(--muted-foreground)';
      }}
    >
      {text}
    </div>
  );
}

/* ─── Section label ─── */
function SectionLabel({ text }: { text: string }) {
  return (
    <p style={{
      fontFamily: 'Inter', fontSize: '11px', fontWeight: 600,
      letterSpacing: '0.14em', textTransform: 'uppercase',
      color: 'var(--primary)', margin: '0 0 20px',
    }}>
      {text}
    </p>
  );
}

const sectionPad = { padding: '100px 24px' };
const container = { maxWidth: '1200px', margin: '0 auto' };

export default function Home() {
  return (
    <div>
      {/* ── HERO ── */}
      <section style={{
        minHeight: '100vh',
        position: 'relative',
        overflow: 'hidden',
        background: '#0A0F0D',
        display: 'flex',
        alignItems: 'center',
      }}>
        {/* Background gradient blobs */}
        <div style={{ position: 'absolute', inset: 0, pointerEvents: 'none' }}>
          <div style={{
            position: 'absolute', top: '-10%', left: '-5%',
            width: '55%', height: '70%',
            background: 'radial-gradient(ellipse, rgba(12,110,88,0.35) 0%, transparent 70%)',
            filter: 'blur(60px)',
          }} />
          <div style={{
            position: 'absolute', top: '20%', right: '-10%',
            width: '50%', height: '60%',
            background: 'radial-gradient(ellipse, rgba(96,165,250,0.18) 0%, transparent 70%)',
            filter: 'blur(80px)',
          }} />
          <div style={{
            position: 'absolute', bottom: '-5%', left: '30%',
            width: '40%', height: '50%',
            background: 'radial-gradient(ellipse, rgba(245,158,11,0.12) 0%, transparent 70%)',
            filter: 'blur(70px)',
          }} />
          {/* Subtle grid overlay */}
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.03) 1px, transparent 1px)',
            backgroundSize: '48px 48px',
          }} />
        </div>

        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '140px 24px 80px', width: '100%', position: 'relative', zIndex: 1 }}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '60px', alignItems: 'center' }}>
            <div>
              {/* Label */}
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', marginBottom: '28px' }}>
                <div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10B981' }} />
                <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: '#10B981' }}>
                  AI Consulting &amp; Global Technology Talent
                </span>
              </div>

              <h1 style={{
                fontFamily: 'Instrument Serif, Georgia, serif',
                fontSize: 'clamp(36px, 5vw, 64px)',
                fontWeight: 400,
                lineHeight: 1.1,
                letterSpacing: '-0.02em',
                color: '#FFFFFF',
                margin: '0 0 28px',
              }}>
                AI-Powered Workflows.<br />
                <em style={{ fontStyle: 'italic', color: '#10B981' }}>Global Technology Talent.</em>
              </h1>

              <p style={{
                fontFamily: 'Inter', fontSize: '17px', lineHeight: '1.75',
                color: 'rgba(255,255,255,0.62)', margin: '0 0 44px', maxWidth: '480px',
              }}>
                Gilani Enterprises helps U.S. businesses put AI to practical use and build stronger technology teams through intelligent workflow redesign, automation and global talent.
              </p>

              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                <Link to="/services" style={{
                  display: 'inline-flex', alignItems: 'center',
                  background: '#10B981', color: '#FFFFFF',
                  fontFamily: 'Inter', fontSize: '14px', fontWeight: 600,
                  padding: '14px 28px', borderRadius: '4px', textDecoration: 'none',
                  transition: 'opacity 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.opacity = '0.88')}
                  onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                >
                  Explore Our Services
                </Link>
                <Link to="/contact" style={{
                  display: 'inline-flex', alignItems: 'center',
                  border: '1.5px solid rgba(255,255,255,0.2)', color: 'rgba(255,255,255,0.85)',
                  fontFamily: 'Inter', fontSize: '14px', fontWeight: 500,
                  padding: '14px 28px', borderRadius: '4px', textDecoration: 'none',
                  background: 'transparent', transition: 'border-color 0.15s',
                }}
                  onMouseEnter={e => (e.currentTarget.style.borderColor = '#10B981')}
                  onMouseLeave={e => (e.currentTarget.style.borderColor = 'rgba(255,255,255,0.2)')}
                >
                  Let's Talk
                </Link>
              </div>

              {/* Trust badges */}
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', marginTop: '52px', paddingTop: '36px', borderTop: '1px solid rgba(255,255,255,0.08)' }}>
                {[
                  { value: '30+', label: 'Years Experience' },
                  { value: 'USA', label: 'Oklahoma City' },
                  { value: 'PAK', label: 'Gujrat' },
                ].map(b => (
                  <div key={b.value} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                    <span style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '20px', color: '#10B981', fontWeight: 400 }}>{b.value}</span>
                    <span style={{ fontFamily: 'Inter', fontSize: '12px', color: 'rgba(255,255,255,0.4)', letterSpacing: '0.04em' }}>{b.label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Visualization */}
            <div style={{ height: '430px', position: 'relative' }} className="hidden md:block">
              <WorkflowViz />
            </div>
          </div>
        </div>
      </section>

      {/* ── CREDIBILITY STRIP ── */}
      <section style={{ background: 'var(--foreground)', padding: '0 24px' }}>
        <div style={{ ...container, display: 'flex', flexWrap: 'wrap', alignItems: 'center', gap: '48px', padding: '48px 0', justifyContent: 'space-between' }}>
          <div>
            <p style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '42px', fontWeight: 400, color: '#FFFFFF', margin: '0 0 4px', lineHeight: 1 }}>
              30<span style={{ color: 'var(--primary)', fontSize: '28px' }}>+</span>
            </p>
            <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.5)', margin: 0, letterSpacing: '0.06em', textTransform: 'uppercase' }}>
              Years of Technology Experience
            </p>
          </div>
          <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.12)' }} className="hidden md:block" />
          <p style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(17px, 2vw, 22px)', color: 'rgba(255,255,255,0.75)', fontStyle: 'italic', maxWidth: '560px', lineHeight: '1.55', margin: 0 }}>
            "Decades of technology experience, focused on what's next."
          </p>
          <div style={{ width: '1px', height: '40px', background: 'rgba(255,255,255,0.12)' }} className="hidden md:block" />
          <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
              <span style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>Oklahoma City, USA</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)' }} />
              <span style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.65)' }}>Gujrat, Pakistan</span>
            </div>
          </div>
        </div>
      </section>

      {/* ── CORE SERVICES ── */}
      <section style={{ ...sectionPad, background: 'var(--background)' }}>
        <div style={container}>
          <SectionLabel text="What We Do" />
          <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(28px, 3.5vw, 44px)', fontWeight: 400, margin: '0 0 56px', lineHeight: 1.2 }}>
            Two focused service areas.<br />One trusted partner.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '24px' }}>
            {/* Service 1 */}
            <div style={{
              padding: '48px', background: 'var(--card)', border: '1px solid var(--border)',
              borderRadius: '4px', display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '4px',
                background: 'rgba(12,110,88,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '28px',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="#0C6E58" strokeWidth="1.8" strokeLinecap="round">
                  <path d="M12 2L2 7l10 5 10-5-10-5z" />
                  <path d="M2 17l10 5 10-5M2 12l10 5 10-5" />
                </svg>
              </div>
              <h3 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '26px', fontWeight: 400, margin: '0 0 16px', lineHeight: 1.3 }}>
                AI Workflow Redesign &amp; Automation
              </h3>
              <p style={{ fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.75', color: 'var(--muted-foreground)', margin: '0 0 32px', flex: 1 }}>
                Help businesses understand where AI can make a meaningful difference. Analyze existing workflows, identify opportunities for intelligent automation and design practical AI-assisted processes and agents.
              </p>
              <Link to="/services" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: 'Inter', fontSize: '13px', fontWeight: 600,
                color: 'var(--primary)', textDecoration: 'none',
                letterSpacing: '0.02em',
              }}>
                Explore AI Consulting →
              </Link>
            </div>

            {/* Service 2 */}
            <div style={{
              padding: '48px', background: 'var(--foreground)', border: '1px solid transparent',
              borderRadius: '4px', display: 'flex', flexDirection: 'column',
            }}>
              <div style={{
                width: '48px', height: '48px', borderRadius: '4px',
                background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                marginBottom: '28px',
              }}>
                <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="rgba(255,255,255,0.8)" strokeWidth="1.8" strokeLinecap="round">
                  <circle cx="12" cy="8" r="4" />
                  <path d="M6 20v-2a6 6 0 0112 0v2" />
                  <circle cx="20" cy="8" r="3" />
                  <path d="M23 20v-1a5 5 0 00-3-4.6" />
                  <circle cx="4" cy="8" r="3" />
                  <path d="M1 20v-1a5 5 0 013-4.6" />
                </svg>
              </div>
              <h3 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '26px', fontWeight: 400, margin: '0 0 16px', color: '#FFFFFF', lineHeight: 1.3 }}>
                Technology Staff Augmentation
              </h3>
              <p style={{ fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.75', color: 'rgba(255,255,255,0.6)', margin: '0 0 32px', flex: 1 }}>
                Extend technology teams with skilled professionals and offshore development resources based in Pakistan while maintaining close collaboration with U.S. business stakeholders.
              </p>
              <Link to="/services" style={{
                display: 'inline-flex', alignItems: 'center', gap: '6px',
                fontFamily: 'Inter', fontSize: '13px', fontWeight: 600,
                color: 'rgba(255,255,255,0.85)', textDecoration: 'none',
              }}>
                Explore Staff Augmentation →
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* ── AI PROCESS FLOW ── */}
      <section style={{ ...sectionPad, background: 'var(--muted)' }}>
        <div style={container}>
          <SectionLabel text="Our Approach to AI" />
          <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, margin: '0 0 16px', lineHeight: 1.2 }}>
            AI: From Manual Work to Intelligent Workflows
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'var(--muted-foreground)', margin: '0 0 56px', maxWidth: '560px', lineHeight: 1.7 }}>
            Meaningful AI adoption begins with understanding the business process — not purchasing AI tools. We follow a structured path from analysis to continuous improvement.
          </p>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0', position: 'relative' }}>
            {/* Connector line */}
            <div style={{
              position: 'absolute', top: '20px', left: '20px', right: '20px', height: '1px',
              background: 'linear-gradient(to right, var(--primary), transparent)',
              opacity: 0.25,
            }} className="hidden md:block" />
            {[
              { num: 1, label: 'Understand', desc: 'Map existing business processes and identify pain points.' },
              { num: 2, label: 'Identify', desc: 'Locate repetitive, manual steps where AI can assist.' },
              { num: 3, label: 'Redesign', desc: 'Restructure workflows around intelligent automation.' },
              { num: 4, label: 'Automate', desc: 'Deploy AI agents and automation for targeted tasks.' },
              { num: 5, label: 'Improve', desc: 'Monitor outcomes and refine continuously.' },
            ].map((step, i) => (
              <div key={i} style={{ flex: '1 1 140px', padding: '0 24px 0 0' }}>
                <ProcessStep {...step} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── GLOBAL PRESENCE ── */}
      <section style={{ ...sectionPad, background: 'var(--background)' }}>
        <div style={container}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'center' }}>
            <div>
              <SectionLabel text="Two Locations. One Team." />
              <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, margin: '0 0 20px', lineHeight: 1.2 }}>
                Local Understanding.<br />
                <em style={{ fontStyle: 'italic', color: 'var(--primary)' }}>Global Technology Talent.</em>
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.75', color: 'var(--muted-foreground)', margin: '0 0 36px' }}>
                Gilani Enterprises combines U.S.-based business understanding and client relationships with access to skilled technology professionals in Pakistan — enabling close collaboration across time zones.
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px' }}>
                {[
                  { city: 'Oklahoma City', country: 'USA', role: 'Business relationships, AI consulting and U.S. operations.' },
                  { city: 'Gujrat', country: 'Pakistan', role: 'Technology talent delivery and business operations.' },
                ].map(loc => (
                  <div key={loc.city} style={{ padding: '24px', border: '1px solid var(--border)', borderRadius: '4px', background: 'var(--card)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '10px' }}>
                      <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: 'var(--primary)', flexShrink: 0 }} />
                      <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)' }}>
                        {loc.country}
                      </span>
                    </div>
                    <p style={{ fontFamily: 'Inter', fontSize: '15px', fontWeight: 600, margin: '0 0 6px' }}>{loc.city}</p>
                    <p style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--muted-foreground)', margin: 0, lineHeight: 1.6 }}>{loc.role}</p>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: 'flex', justifyContent: 'center' }}>
              <div style={{ width: '100%', maxWidth: '480px' }}>
                <LocationArc />
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '0 12px', marginTop: '8px' }}>
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>Oklahoma City</span>
                  <span style={{ fontFamily: 'Inter', fontSize: '12px', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--muted-foreground)' }}>Gujrat</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── WHY GILANI ── */}
      <section style={{ ...sectionPad, background: 'var(--muted)' }}>
        <div style={container}>
          <SectionLabel text="Why Gilani Enterprises" />
          <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, margin: '0 0 48px', lineHeight: 1.2 }}>
            Four principles that guide everything we do.
          </h2>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '20px' }}>
            <WhyCard icon="◎" title="Business First" body="Technology decisions should begin with the business problem, not the technology solution. We understand business before we recommend AI." />
            <WhyCard icon="◈" title="Practical AI" body="We focus on useful AI applications and workflow automation rather than hype — solutions designed around business outcomes." />
            <WhyCard icon="◇" title="Experienced Perspective" body="More than three decades of software and technology experience inform every modern AI recommendation and team decision." />
            <WhyCard icon="◉" title="Flexible Global Talent" body="Allow businesses to extend technology capabilities without being constrained by local hiring markets or timelines." />
          </div>
        </div>
      </section>

      {/* ── WHO WE WORK WITH ── */}
      <section style={{ ...sectionPad, background: 'var(--background)' }}>
        <div style={container}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '60px', alignItems: 'start' }}>
            <div>
              <SectionLabel text="Who We Serve" />
              <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(26px, 3vw, 40px)', fontWeight: 400, margin: '0 0 20px', lineHeight: 1.2 }}>
                Small businesses across the United States.
              </h2>
              <p style={{ fontFamily: 'Inter', fontSize: '15px', lineHeight: '1.75', color: 'var(--muted-foreground)', margin: 0 }}>
                Smaller organizations can benefit significantly from AI and technology expertise, but often don't need — or can't justify — large internal technology departments. We bring that expertise on a practical, flexible basis.
              </p>
            </div>
            <div>
              <p style={{ fontFamily: 'Inter', fontSize: '13px', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--muted-foreground)', margin: '0 0 24px' }}>
                Common challenges we address
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '10px' }}>
                {[
                  'Repetitive administrative processes',
                  'Disconnected systems',
                  'Manual data entry',
                  'Growing software backlogs',
                  'Difficulty hiring technology specialists',
                  'Processes that could benefit from AI',
                  'Workflow inefficiencies',
                  'Scaling technology capacity',
                ].map(c => <ChallengeTag key={c} text={c} />)}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── CTA STRIP ── */}
      <section style={{ background: 'var(--primary)', padding: '100px 24px' }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(26px, 3.5vw, 48px)', fontWeight: 400, color: '#FFFFFF', margin: '0 0 20px', lineHeight: 1.2 }}>
            Where could AI or the right technology team take your business?
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '16px', color: 'rgba(255,255,255,0.7)', margin: '0 0 40px', lineHeight: 1.7 }}>
            Start with a conversation about your workflows, technology challenges or staffing needs.
          </p>
          <Link to="/contact" style={{
            display: 'inline-flex', alignItems: 'center',
            background: '#FFFFFF', color: 'var(--primary)',
            fontFamily: 'Inter', fontSize: '14px', fontWeight: 700,
            padding: '16px 36px', borderRadius: '3px', textDecoration: 'none',
            transition: 'opacity 0.15s',
          }}
            onMouseEnter={e => (e.currentTarget.style.opacity = '0.92')}
            onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
          >
            Talk With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
