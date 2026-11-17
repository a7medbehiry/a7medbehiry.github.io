import { memo } from 'react';
import type { Kind } from './data';

const INK = '#2A2F34';

/**
 * Simple product drawings in the brand's flat style. The real app shows vendor
 * photos; the demo draws its own so it carries no outside images.
 */
export const ProductArt = memo(function ProductArt({ kind, color, angle = 0 }: { kind: Kind; color: string; angle?: number }) {
  const light = color.toUpperCase() === '#FFFFFF';
  const line = light ? '#C9CED6' : 'rgba(0,0,0,.18)';
  const shade = 'rgba(0,0,0,.10)';
  return (
    <svg viewBox="0 0 100 100" className="sx-art" aria-hidden>
      <ellipse cx="50" cy="86" rx="30" ry="4" fill="rgba(0,0,0,.08)" />
      <g transform={angle ? `rotate(${angle} 50 50)` : undefined}>{draw(kind, color, line, shade)}</g>
    </svg>
  );
});

function draw(kind: Kind, c: string, line: string, shade: string) {
  switch (kind) {
    case 'earbuds':
      return (
        <>
          <rect x="24" y="44" width="52" height="36" rx="16" fill={c} stroke={line} strokeWidth="1.2" />
          <path d="M24 58h52" stroke={line} strokeWidth="1.2" />
          <circle cx="50" cy="64" r="1.8" fill="#16A34A" />
          <g>
            <circle cx="38" cy="30" r="9" fill={c} stroke={line} strokeWidth="1.2" />
            <rect x="35" y="30" width="6" height="18" rx="3" fill={c} stroke={line} strokeWidth="1.2" />
            <circle cx="62" cy="30" r="9" fill={c} stroke={line} strokeWidth="1.2" />
            <rect x="59" y="30" width="6" height="18" rx="3" fill={c} stroke={line} strokeWidth="1.2" />
            <circle cx="38" cy="30" r="3.5" fill={INK} opacity=".75" />
            <circle cx="62" cy="30" r="3.5" fill={INK} opacity=".75" />
          </g>
        </>
      );
    case 'headphones':
      return (
        <>
          <path d="M22 58V48a28 28 0 0 1 56 0v10" fill="none" stroke={c} strokeWidth="7" strokeLinecap="round" />
          <rect x="15" y="52" width="18" height="28" rx="8" fill={c} />
          <rect x="67" y="52" width="18" height="28" rx="8" fill={c} />
          <rect x="21" y="56" width="8" height="20" rx="4" fill="#F26522" />
          <rect x="71" y="56" width="8" height="20" rx="4" fill="#F26522" />
        </>
      );
    case 'sneaker':
      return (
        <>
          <path d="M14 66c0-8 4-20 12-24l10 6c6 3 10 2 14-2l6-6c10 6 22 12 30 14 4 1 6 5 6 9v3H14z" fill={c} />
          <path d="M14 70h78v6a4 4 0 0 1-4 4H18a4 4 0 0 1-4-4z" fill="#FFFFFF" stroke={line} strokeWidth="1.2" />
          <path d="M40 50l4 6M46 46l4 6M52 42l4 6" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />
          <path d="M60 60c8 2 16 3 26 3" stroke={shade} strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      );
    case 'watch':
      return (
        <>
          <rect x="38" y="10" width="24" height="26" rx="6" fill={c} />
          <rect x="38" y="64" width="24" height="26" rx="6" fill={c} />
          <rect x="28" y="28" width="44" height="44" rx="13" fill={INK} />
          <rect x="32" y="32" width="36" height="36" rx="10" fill="#14181C" />
          <path d="M50 40v10l7 4" stroke="#F9BE00" strokeWidth="3" strokeLinecap="round" fill="none" />
          <path d="M40 60h20" stroke="#F26522" strokeWidth="2.4" strokeLinecap="round" />
          <rect x="72" y="44" width="4" height="10" rx="2" fill={INK} />
        </>
      );
    case 'tshirt':
      return (
        <>
          <path d="M36 16l-22 10 7 18 9-4v42h40V40l9 4 7-18-22-10c-2 6-8 10-14 10s-12-4-14-10z" fill={c} stroke={line} strokeWidth="1.2" strokeLinejoin="round" />
          <path d="M36 16c2 6 8 10 14 10s12-4 14-10" fill="none" stroke={shade} strokeWidth="3" />
          <path d="M40 54h20" stroke={shade} strokeWidth="2" strokeLinecap="round" />
        </>
      );
    case 'mug':
      return (
        <>
          <path d="M66 40h6a10 10 0 0 1 0 20h-6" fill="none" stroke={c} strokeWidth="6" />
          <path d="M24 30h44v38a12 12 0 0 1-12 12H36a12 12 0 0 1-12-12z" fill={c} />
          <rect x="24" y="30" width="44" height="6" fill={shade} />
          <path d="M38 14c-3 4 3 6 0 10M48 12c-3 4 3 6 0 10M58 14c-3 4 3 6 0 10" stroke="#A8AEB6" strokeWidth="2" strokeLinecap="round" fill="none" />
          <path d="M36 50h20" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" opacity=".7" />
        </>
      );
    case 'backpack':
      return (
        <>
          <path d="M40 22a10 10 0 0 1 20 0" fill="none" stroke={c} strokeWidth="5" />
          <rect x="24" y="22" width="52" height="62" rx="16" fill={c} />
          <rect x="32" y="52" width="36" height="24" rx="8" fill={shade} />
          <path d="M32 60h36" stroke="#F9BE00" strokeWidth="2.4" />
          <rect x="46" y="34" width="8" height="6" rx="2" fill="#F9BE00" />
        </>
      );
    case 'perfume':
      return (
        <>
          <rect x="42" y="12" width="16" height="12" rx="3" fill={INK} />
          <rect x="46" y="22" width="8" height="8" fill="#A8AEB6" />
          <rect x="26" y="30" width="48" height="52" rx="12" fill={c} opacity=".9" />
          <rect x="32" y="36" width="36" height="40" rx="8" fill="#FFFFFF" opacity=".25" />
          <rect x="36" y="50" width="28" height="12" rx="3" fill="#FFFFFF" opacity=".85" />
          <path d="M42 56h16" stroke={INK} strokeWidth="1.6" strokeLinecap="round" />
        </>
      );
    case 'sunglasses':
      return (
        <>
          <path d="M10 42h80" stroke={c} strokeWidth="4" strokeLinecap="round" />
          <path d="M14 42h28v8a12 12 0 0 1-12 12h-4a12 12 0 0 1-12-12z" fill={c} />
          <path d="M58 42h28v8a12 12 0 0 1-12 12h-4a12 12 0 0 1-12-12z" fill={c} />
          <path d="M20 48l8-4M64 48l8-4" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" opacity=".6" />
          <path d="M42 44c3-3 13-3 16 0" stroke={c} strokeWidth="4" fill="none" />
        </>
      );
    case 'lamp':
      return (
        <>
          <circle cx="50" cy="40" r="26" fill="#F9BE00" opacity=".18" />
          <path d="M34 20h32l8 26H26z" fill={c} />
          <path d="M34 20h32l2 6H32z" fill="#FFFFFF" opacity=".35" />
          <rect x="47" y="46" width="6" height="30" fill={INK} />
          <rect x="34" y="76" width="32" height="6" rx="3" fill={INK} />
        </>
      );
  }
}
