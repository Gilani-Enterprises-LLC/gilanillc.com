import { useState } from 'react';
import { Link } from 'react-router';

const container = { maxWidth: '1200px', margin: '0 auto' };

const categories = [
  'All',
  'AI for Small Business',
  'AI Workflow Automation',
  'AI Agents',
  'Technology Leadership',
  'Staff Augmentation',
  'Offshore Development',
  'Working With Pakistan Teams',
];

const placeholderPosts = [
  {
    title: 'Where Should Small Businesses Start With AI?',
    desc: 'Before purchasing any AI tools, U.S. small businesses should begin by mapping their existing workflows — identifying where manual, repetitive work is consuming the most time.',
    category: 'AI for Small Business',
    date: '2026-08-12',
    readTime: '6 min read',
  },
  {
    title: 'Understanding AI Workflow Automation: A Practical Introduction',
    desc: 'AI workflow automation is not about replacing employees — it is about systematically removing friction from processes that do not require human judgment at every step.',
    category: 'AI Workflow Automation',
    date: '2026-07-28',
    readTime: '8 min read',
  },
  {
    title: 'What Are AI Agents, and When Are They Actually Useful?',
    desc: 'AI agents are software systems that can complete multi-step tasks autonomously. Understanding their practical limits is as important as understanding their potential.',
    category: 'AI Agents',
    date: '2026-07-14',
    readTime: '7 min read',
  },
  {
    title: 'Building a Technology Team in Pakistan: What U.S. Businesses Should Know',
    desc: 'Successful offshore development relationships depend on clear communication structures, realistic expectations and cultural alignment — not just cost calculations.',
    category: 'Working With Pakistan Teams',
    date: '2026-06-30',
    readTime: '9 min read',
  },
  {
    title: 'Staff Augmentation vs. Outsourcing: Key Differences for Technology Leaders',
    desc: 'Staff augmentation and traditional outsourcing address different problems. Understanding the distinction helps technology leaders make better decisions about expanding their teams.',
    category: 'Staff Augmentation',
    date: '2026-06-18',
    readTime: '5 min read',
  },
  {
    title: 'The Human-in-the-Loop Principle: Designing AI Systems That Earn Trust',
    desc: 'Successful AI deployments keep human oversight where it matters most, automating the mechanical while preserving judgment for decisions that require experience and context.',
    category: 'AI Workflow Automation',
    date: '2026-06-04',
    readTime: '6 min read',
  },
  {
    title: 'Technology Leadership for Small Business: When Do You Need Outside Help?',
    desc: 'Most small U.S. businesses cannot justify a full-time CTO. Understanding the options — fractional leadership, consulting and staff augmentation — helps close that gap.',
    category: 'Technology Leadership',
    date: '2026-05-20',
    readTime: '7 min read',
  },
  {
    title: 'Offshore Development in Pakistan: Beyond the Cost Conversation',
    desc: 'Pakistan\'s technology sector has matured significantly. The most compelling argument for engaging Pakistani development teams is no longer cost — it is talent access and flexibility.',
    category: 'Offshore Development',
    date: '2026-05-06',
    readTime: '8 min read',
  },
];

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
}

function PostCard({ post }: { post: typeof placeholderPosts[0] }) {
  return (
    <article
      style={{
        display: 'flex',
        flexDirection: 'column',
        padding: '36px',
        background: 'var(--card)',
        border: '1px solid var(--border)',
        borderRadius: '4px',
        transition: 'box-shadow 0.2s, border-color 0.2s',
        cursor: 'pointer',
      }}
      onMouseEnter={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = '0 4px 20px rgba(0,0,0,0.07)';
        el.style.borderColor = 'rgba(12,110,88,0.25)';
      }}
      onMouseLeave={e => {
        const el = e.currentTarget as HTMLElement;
        el.style.boxShadow = 'none';
        el.style.borderColor = 'var(--border)';
      }}
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px' }}>
        <span style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--primary)', background: 'rgba(12,110,88,0.08)', padding: '4px 10px', borderRadius: '2px' }}>
          {post.category}
        </span>
      </div>
      <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '22px', fontWeight: 400, margin: '0 0 14px', lineHeight: 1.3, color: 'var(--foreground)', flex: 1 }}>
        {post.title}
      </h2>
      <p style={{ fontFamily: 'Inter', fontSize: '14px', lineHeight: '1.75', color: 'var(--muted-foreground)', margin: '0 0 28px', flex: 1 }}>
        {post.desc}
      </p>
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '20px', borderTop: '1px solid var(--border)' }}>
        <span style={{ fontFamily: 'Inter', fontSize: '12px', color: 'var(--muted-foreground)' }}>{formatDate(post.date)}</span>
        <span style={{ fontFamily: 'Inter', fontSize: '12px', color: 'var(--muted-foreground)' }}>{post.readTime}</span>
      </div>
    </article>
  );
}

export default function Insights() {
  const [activeCategory, setActiveCategory] = useState('All');

  const filtered = activeCategory === 'All'
    ? placeholderPosts
    : placeholderPosts.filter(p => p.category === activeCategory);

  return (
    <div>
      {/* Hero */}
      <section style={{ paddingTop: '160px', paddingBottom: '80px', padding: '160px 24px 80px', background: 'var(--foreground)' }}>
        <div style={container}>
          <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--primary)', margin: '0 0 20px' }}>
            Insights
          </p>
          <h1 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(32px, 5vw, 58px)', fontWeight: 400, color: '#FFFFFF', margin: '0 0 20px', lineHeight: 1.15, maxWidth: '600px' }}>
            Practical thinking on AI and technology.
          </h1>
          <p style={{ fontFamily: 'Inter', fontSize: '16px', color: 'rgba(255,255,255,0.55)', maxWidth: '480px', lineHeight: 1.7, margin: 0 }}>
            Articles on AI workflow automation, staff augmentation and technology leadership for U.S. small businesses.
          </p>
        </div>
      </section>

      {/* Category filter */}
      <section style={{ padding: '40px 24px 0', background: 'var(--background)', borderBottom: '1px solid var(--border)' }}>
        <div style={{ ...container, overflowX: 'auto' }}>
          <div style={{ display: 'flex', gap: '4px', paddingBottom: '0', minWidth: 'max-content' }}>
            {categories.map(cat => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                style={{
                  fontFamily: 'Inter',
                  fontSize: '13px',
                  fontWeight: 500,
                  padding: '10px 18px',
                  border: 'none',
                  background: 'transparent',
                  cursor: 'pointer',
                  color: activeCategory === cat ? 'var(--primary)' : 'var(--muted-foreground)',
                  borderBottom: activeCategory === cat ? '2px solid var(--primary)' : '2px solid transparent',
                  marginBottom: '-1px',
                  transition: 'color 0.15s',
                  whiteSpace: 'nowrap',
                }}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Posts grid */}
      <section style={{ padding: '64px 24px 100px', background: 'var(--background)' }}>
        <div style={container}>
          {/* Placeholder notice */}
          <div style={{ padding: '12px 20px', background: 'rgba(12,110,88,0.06)', border: '1px solid rgba(12,110,88,0.15)', borderRadius: '3px', marginBottom: '40px', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <span style={{ fontFamily: 'Inter', fontSize: '13px', color: 'var(--primary)' }}>
              📝 <strong>Placeholder content</strong> — Article titles and descriptions shown are representative examples. Actual articles will be published here.
            </span>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '24px' }}>
            {filtered.map((post, i) => <PostCard key={i} post={post} />)}
          </div>

          {filtered.length === 0 && (
            <div style={{ textAlign: 'center', padding: '80px 0', color: 'var(--muted-foreground)', fontFamily: 'Inter' }}>
              No articles in this category yet.
            </div>
          )}
        </div>
      </section>

      {/* CTA */}
      <section style={{ background: 'var(--muted)', padding: '80px 24px', borderTop: '1px solid var(--border)' }}>
        <div style={{ ...container, textAlign: 'center' }}>
          <h2 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: 'clamp(24px, 3vw, 36px)', fontWeight: 400, margin: '0 0 16px' }}>
            Ready to apply these ideas to your business?
          </h2>
          <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'var(--muted-foreground)', margin: '0 0 32px' }}>
            Let's have a direct conversation about your workflows and technology needs.
          </p>
          <Link to="/contact" style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--primary)', color: '#FFFFFF', fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, padding: '14px 28px', borderRadius: '3px', textDecoration: 'none' }}>
            Talk With Us
          </Link>
        </div>
      </section>
    </div>
  );
}
