import { useCallback, useLayoutEffect, useRef, useState, type ReactNode, type UIEvent, type WheelEvent, type TouchEvent } from 'react';
import { House, Headset, Gift, ShoppingCart, CircleUserRound } from 'lucide-react';
import type { Lang } from '../../shell/types';

export type Tab = 'home' | 'support' | 'offers' | 'cart' | 'account';

/**
 * Left to right on screen, in every language: Home sits on the right in
 * Arabic and English alike (the client's call), so the order never flips.
 */
export const TAB_ORDER: Tab[] = ['account', 'cart', 'offers', 'support', 'home'];

const LABEL: Record<Tab, { en: string; ar: string }> = {
  home: { en: 'Home', ar: 'الرئيسية' },
  support: { en: 'Support', ar: 'المساعدة' },
  offers: { en: 'Offers', ar: 'العروض' },
  cart: { en: 'Cart', ar: 'السلة' },
  account: { en: 'Account', ar: 'حسابي' },
};

const ICON = { home: House, support: Headset, offers: Gift, cart: ShoppingCart, account: CircleUserRound };

/**
 * When the bar folds into its bubble and when it opens again, as the app's
 * NavCollapse does it: 24 px of going down folds it; going back up does not
 * open it; it opens at the top of the page (within 4 px), on a second pull at
 * the end of the page, or on a tap on the bubble.
 */
export function useNavCollapse() {
  const [collapsed, setCollapsed] = useState(false);
  const s = useRef({ last: 0, run: 0, wheelAt: 0, wheelFromEnd: false, touchFromEnd: false, touchY: 0 });

  const expand = useCallback(() => {
    s.current.run = 0;
    setCollapsed(false);
  }, []);

  const reset = useCallback(() => {
    s.current.last = 0;
    s.current.run = 0;
    setCollapsed(false);
  }, []);

  const atEnd = (el: HTMLElement) => {
    const max = el.scrollHeight - el.clientHeight;
    return max > 0 && el.scrollTop >= max - 2;
  };

  const bind = {
    onScroll: (e: UIEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const y = el.scrollTop;
      const st = s.current;
      const d = y - st.last;
      st.last = y;
      if (y <= 4) {
        st.run = 0;
        setCollapsed(false);
        return;
      }
      if (d > 0) {
        st.run += d;
        if (st.run >= 24) setCollapsed(true);
      } else if (d < 0) {
        st.run = 0;
      }
    },
    onWheel: (e: WheelEvent<HTMLElement>) => {
      const el = e.currentTarget;
      const st = s.current;
      const now = performance.now();
      if (now - st.wheelAt > 220) st.wheelFromEnd = atEnd(el);
      st.wheelAt = now;
      if (e.deltaY > 0 && st.wheelFromEnd && atEnd(el)) expand();
    },
    onTouchStart: (e: TouchEvent<HTMLElement>) => {
      s.current.touchFromEnd = atEnd(e.currentTarget);
      s.current.touchY = e.touches[0]?.clientY ?? 0;
    },
    onTouchMove: (e: TouchEvent<HTMLElement>) => {
      const st = s.current;
      if (st.touchFromEnd && st.touchY - (e.touches[0]?.clientY ?? 0) > 24) {
        st.touchFromEnd = false;
        expand();
      }
    },
  };

  return { collapsed, expand, reset, bind };
}

export interface CheckoutAccessory {
  saved: string | null;
  label: string;
  onCheckout: () => void;
}

function Glyph({ tab, selected, size = 22 }: { tab: Tab; selected: boolean; size?: number }) {
  const I = ICON[tab];
  const featured = tab === 'offers';
  return (
    <I
      size={featured ? size * 1.1 : size}
      strokeWidth={selected ? 2.2 : 1.8}
      fill={selected ? 'currentColor' : 'none'}
      fillOpacity={selected ? 0.28 : 0}
      aria-hidden
    />
  );
}

function Badge({ n, lang }: { n: number; lang: Lang }) {
  if (n <= 0) return null;
  return (
    <span key={n} className={`sx-badge ${lang === 'ar' ? 'start' : 'end'}`}>
      {n > 9 ? '9+' : n}
    </span>
  );
}

export function GlassNav({
  tab,
  lang,
  collapsed,
  badges,
  accessory,
  onTab,
  onExpand,
}: {
  tab: Tab;
  lang: Lang;
  collapsed: boolean;
  badges: Partial<Record<Tab, number>>;
  accessory: CheckoutAccessory | null;
  onTab: (t: Tab) => void;
  onExpand: () => void;
}) {
  const index = TAB_ORDER.indexOf(tab);
  const capsule = useRef<HTMLSpanElement>(null);
  const from = useRef(index);

  // The capsule slides to the new tab and stretches a little on the way, as
  // the app's sin(pi * t) stretch does. Only transform is animated.
  useLayoutEffect(() => {
    const el = capsule.current;
    const a = from.current;
    from.current = index;
    if (!el) return;
    el.style.transform = `translateX(${index * 100}%)`;
    if (a === index || !el.animate || window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
    const mid = (a + index) / 2;
    el.animate(
      [
        { transform: `translateX(${a * 100}%) scaleX(1)` },
        { transform: `translateX(${mid * 100}%) scaleX(1.16)`, offset: 0.45 },
        { transform: `translateX(${index * 100}%) scaleX(1)` },
      ],
      { duration: 380, easing: 'cubic-bezier(.22,.9,.32,1)' },
    );
  }, [index]);

  const label = (t: Tab) => LABEL[t][lang];
  const cls = ['sx-nav', collapsed ? 'is-collapsed' : '', accessory ? 'has-acc' : ''].join(' ');

  const bubbleGlyph: ReactNode = (
    <span className={`sx-bubble-glyph ${tab === 'offers' ? 'offers' : ''}`}>
      <Glyph tab={tab} selected size={24} />
      <Badge n={badges[tab] ?? 0} lang={lang} />
    </span>
  );

  return (
    <nav className={cls} dir="ltr" aria-label={lang === 'ar' ? 'التنقل' : 'Navigation'}>
      <div className="sx-pane" aria-hidden />

      {accessory && (
        <>
          <p className="sx-saved" dir={lang === 'ar' ? 'rtl' : 'ltr'}>{accessory.saved}</p>
          <button className="sx-checkout" dir={lang === 'ar' ? 'rtl' : 'ltr'} onClick={accessory.onCheckout}>
            {accessory.label}
          </button>
        </>
      )}

      <div className="sx-tabs" role="tablist">
        <span className="sx-capsule" ref={capsule} aria-hidden>
          <i />
        </span>
        {TAB_ORDER.map((t) => {
          const on = t === tab;
          return (
            <button
              key={t}
              role="tab"
              aria-selected={on}
              className={`sx-tab ${on ? 'on' : ''} ${t === 'offers' ? 'offers' : ''}`}
              onClick={() => onTab(t)}
              tabIndex={collapsed ? -1 : 0}
            >
              <span className="sx-tab-glyph">
                <Glyph tab={t} selected={on} />
                <Badge n={badges[t] ?? 0} lang={lang} />
              </span>
              <span className="sx-tab-label">{label(t)}</span>
            </button>
          );
        })}
      </div>

      <button className="sx-bubble" onClick={onExpand} tabIndex={collapsed ? 0 : -1} aria-label={lang === 'ar' ? 'افتح القائمة' : 'Open the tab bar'}>
        {bubbleGlyph}
      </button>
    </nav>
  );
}
