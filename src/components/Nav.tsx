import { useState, useEffect } from 'react';
import { createPortal } from 'react-dom';
import { NavLink, Link } from 'react-router';
import Logo from './Logo';

const links = [
  { label: 'Services', to: '/services' },
  { label: 'About', to: '/about' },
  { label: 'Insights', to: '/insights' },
  { label: 'Contact', to: '/contact' },
];

export default function Nav() {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    if (menuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  return (
    <>
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'background 0.2s, box-shadow 0.2s, border-color 0.2s',
        background: 'rgba(248, 247, 244, 0.96)',
        backdropFilter: 'blur(12px)',
        borderBottom: '1px solid var(--border)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', height: '68px', gap: '40px' }}>
          {/* Logo */}
          <Link to="/" onClick={() => setMenuOpen(false)} style={{ textDecoration: 'none', flexShrink: 0 }}>
            <Logo size="sm" />
          </Link>

          {/* Desktop nav */}
          <nav style={{ alignItems: 'center', gap: '32px', marginLeft: 'auto' }} className="hidden md:flex">
            {links.map(l => (
              <NavLink
                key={l.to}
                to={l.to}
                style={({ isActive }) => ({
                  fontFamily: 'Inter, system-ui, sans-serif',
                  fontSize: '14px',
                  fontWeight: 500,
                  letterSpacing: '0.01em',
                  color: isActive ? 'var(--primary)' : 'var(--foreground)',
                  textDecoration: 'none',
                  transition: 'color 0.15s',
                  opacity: isActive ? 1 : 0.82,
                })}
              >
                {l.label}
              </NavLink>
            ))}
          </nav>

          {/* Mobile hamburger */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            aria-label={menuOpen ? 'Close menu' : 'Open menu'}
            style={{
              marginLeft: 'auto',
              flexDirection: 'column',
              gap: '5px',
              padding: '8px',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
            }}
            className="flex md:hidden"
          >
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: 'var(--foreground)',
              transition: 'transform 0.2s, opacity 0.2s',
              transform: menuOpen ? 'translateY(7px) rotate(45deg)' : 'none',
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: 'var(--foreground)',
              transition: 'opacity 0.2s',
              opacity: menuOpen ? 0 : 1,
            }} />
            <span style={{
              display: 'block', width: '22px', height: '2px',
              background: 'var(--foreground)',
              transition: 'transform 0.2s, opacity 0.2s',
              transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : 'none',
            }} />
          </button>
        </div>
      </div>

    </header>

    {/* Mobile menu — portalled to body to escape header's stacking context */}
    {menuOpen && createPortal(
      <div style={{
        position: 'fixed',
        top: '68px',
        left: 0,
        right: 0,
        bottom: 0,
        zIndex: 999,
        background: 'var(--background)',
        padding: '32px 24px',
        display: 'flex',
        flexDirection: 'column',
        gap: '8px',
        overflowY: 'auto',
      }}>
        {links.map(l => (
          <NavLink
            key={l.to}
            to={l.to}
            onClick={() => setMenuOpen(false)}
            style={({ isActive }) => ({
              display: 'block',
              fontFamily: 'Inter, system-ui, sans-serif',
              fontSize: '22px',
              fontWeight: 500,
              color: isActive ? 'var(--primary)' : 'var(--foreground)',
              textDecoration: 'none',
              padding: '12px 0',
              borderBottom: '1px solid var(--border)',
            })}
          >
            {l.label}
          </NavLink>
        ))}
        <Link
          to="/contact"
          onClick={() => setMenuOpen(false)}
          style={{
            marginTop: '24px',
            display: 'inline-flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'var(--primary)',
            color: 'var(--primary-foreground)',
            fontFamily: 'Inter, system-ui, sans-serif',
            fontSize: '16px',
            fontWeight: 600,
            padding: '14px 32px',
            borderRadius: '3px',
            textDecoration: 'none',
          }}
        >
          Contact Us
        </Link>
      </div>,
      document.body
    )}
    </>
  );
}
