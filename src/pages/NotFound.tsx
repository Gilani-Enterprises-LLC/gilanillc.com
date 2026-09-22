import { Link } from 'react-router';

export default function NotFound() {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '120px 24px' }}>
      <div style={{ textAlign: 'center', maxWidth: '480px' }}>
        <p style={{ fontFamily: 'Inter', fontSize: '11px', fontWeight: 600, letterSpacing: '0.14em', textTransform: 'uppercase', color: 'var(--primary)', margin: '0 0 24px' }}>
          404 — Page Not Found
        </p>
        <h1 style={{ fontFamily: 'Instrument Serif, Georgia, serif', fontSize: '48px', fontWeight: 400, margin: '0 0 20px', color: 'var(--foreground)' }}>
          This page doesn't exist.
        </h1>
        <p style={{ fontFamily: 'Inter', fontSize: '15px', color: 'var(--muted-foreground)', lineHeight: 1.7, margin: '0 0 40px' }}>
          The page you're looking for may have moved or the URL may be incorrect.
        </p>
        <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', background: 'var(--primary)', color: '#FFFFFF', fontFamily: 'Inter', fontSize: '14px', fontWeight: 600, padding: '14px 28px', borderRadius: '3px', textDecoration: 'none' }}>
          Back to Home
        </Link>
      </div>
    </div>
  );
}
