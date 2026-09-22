interface LogoProps {
  variant?: 'dark' | 'light';
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ variant = 'dark', size = 'md' }: LogoProps) {
  const markColor = variant === 'light' ? '#FFFFFF' : '#0C6E58';
  const textColor = variant === 'light' ? '#FFFFFF' : '#0F0F0E';
  const subColor = variant === 'light' ? 'rgba(255,255,255,0.65)' : '#6B6966';

  const sizes = {
    sm: { mark: 28, g1: '14px', g2: '9px' },
    md: { mark: 36, g1: '17px', g2: '11px' },
    lg: { mark: 48, g1: '22px', g2: '14px' },
  };
  const s = sizes[size];

  return (
    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
      {/* Geometric G mark */}
      <svg
        width={s.mark}
        height={s.mark}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        aria-hidden="true"
      >
        {/* Outer arc — most of a circle, gap at lower-right */}
        <path
          d="M 34 20 A 14 14 0 1 1 29.9 29.9"
          stroke={markColor}
          strokeWidth="2.8"
          strokeLinecap="round"
          fill="none"
        />
        {/* Horizontal crossbar from gap toward center */}
        <path
          d="M 20 20 L 34 20"
          stroke={markColor}
          strokeWidth="2.8"
          strokeLinecap="round"
        />
        {/* Small inner node at center */}
        <circle cx="20" cy="20" r="2" fill={markColor} />
      </svg>

      {/* Wordmark */}
      <div style={{ lineHeight: 1.1 }}>
        <div
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 600,
            fontSize: s.g1,
            letterSpacing: '-0.01em',
            color: textColor,
          }}
        >
          Gilani
        </div>
        <div
          style={{
            fontFamily: 'Inter, system-ui, sans-serif',
            fontWeight: 400,
            fontSize: s.g2,
            letterSpacing: '0.12em',
            textTransform: 'uppercase',
            color: subColor,
          }}
        >
          Enterprises
        </div>
      </div>
    </div>
  );
}
