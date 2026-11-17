import { useEffect, useMemo, useRef, useState, type ReactNode, type UIEvent } from 'react';
import {
  Bell, LayoutGrid, Search, MapPin, ChevronDown, ChevronRight, ChevronLeft, Plus, Minus, Star, Share2, ShoppingCart, Trash2, Check,
  Truck, RotateCcw, ShieldCheck, Banknote, MessageCircle, Phone, Mail, Package, Store, Moon, Sun, Languages, BellRing, Copy, Link2,
  Send, CircleCheck, X, Ticket, Clock,
} from 'lucide-react';
import type { AppApi } from '../../shell/types';
import { categories, discount, faqs, money, productById, products, sections, seedCart, type Product } from './data';
import { ProductArt } from './Art';
import { GlassNav, useNavCollapse, type Tab } from './Nav';
import logoLight from '../../assets/brand/brand_name_light.svg';
import logoDark from '../../assets/brand/brand_name_dark.svg';
import './shopsiia.css';

type L = { en: string; ar: string };
interface Line { key: string; pid: string; qty: number; variant?: L; on: boolean }
interface Msg { id: number; from: 'me' | 'agent'; text: string }
interface Order { id: string; step: number; total: number; units: number }

const TABS: Tab[] = ['home', 'support', 'offers', 'cart', 'account'];

const seedLines = (): Line[] => seedCart.map((l, i) => ({ key: `seed${i}`, pid: l.pid, qty: l.qty, variant: l.variant, on: true }));

export function ShopsiiaApp({ api }: { api: AppApi }) {
  const { nav, t, lang } = api;
  const dark = !!api.flags.dark;
  const mini = !!api.flags.mini;
  const r = nav.route;
  const isTab = TABS.includes(r.name as Tab);
  const tab: Tab = isTab ? (r.name as Tab) : 'home';

  const [lines, setLines] = useState<Line[]>(seedLines);
  const [unread, setUnread] = useState(1);
  const [orders, setOrders] = useState<Order[]>([{ id: 'SH-24817', step: 2, total: 1590, units: 1 }]);
  const [msgs, setMsgs] = useState<Msg[]>(() => [
    { id: 1, from: 'me', text: lang === 'ar' ? 'أهلًا، طلبي SH-24817 هيوصل إمتى؟' : 'Hi, when will order SH-24817 arrive?' },
    { id: 2, from: 'agent', text: lang === 'ar' ? 'أهلًا بيك! طلبك اتشحن وهيوصلك بكرة قبل 6 م. تقدر تتابعه من صفحة الطلب.' : 'Hi there! Your order has shipped and arrives tomorrow before 6 PM. You can follow it from the order page.' },
  ]);
  const collapse = useNavCollapse();

  // Every new screen starts with the bar open.
  const routeKey = `${r.name}:${JSON.stringify(r.params ?? {})}`;
  useEffect(() => {
    collapse.reset();
  }, [routeKey]);

  // Pushes from the control panel move the order along.
  useEffect(() => {
    if (r.name === 'tracking' && r.params?.advance) {
      const step = Number(r.params.advance);
      setOrders((o) => o.map((x) => (x.id === r.params!.id ? { ...x, step: Math.max(x.step, step) } : x)));
    }
    if (r.name === 'chat') setUnread(0);
  }, [routeKey]);

  const units = lines.reduce((s, l) => s + l.qty, 0);
  const sel = lines.filter((l) => l.on);
  const selUnits = sel.reduce((s, l) => s + l.qty, 0);
  const subtotal = sel.reduce((s, l) => s + productById(l.pid).price * l.qty, 0);
  const saved = sel.reduce((s, l) => {
    const p = productById(l.pid);
    return s + ((p.compare ?? p.price) - p.price) * l.qty;
  }, 0);

  const add = (pid: string, qty = 1, variant?: L) => {
    const key = `${pid}|${variant?.en ?? ''}`;
    setLines((c) => {
      const hit = c.find((l) => l.key === key || (l.pid === pid && !variant));
      return hit ? c.map((l) => (l === hit ? { ...l, qty: l.qty + qty, on: true } : l)) : [...c, { key, pid, qty, variant, on: true }];
    });
    api.toast(t('Added to your cart', 'تمت الإضافة إلى سلتك'));
  };

  const placeOrder = () => {
    const id = `SH-${24830 + orders.length * 13}`;
    setOrders((o) => [{ id, step: 0, total: subtotal, units: selUnits }, ...o]);
    setLines((c) => c.filter((l) => !l.on));
    nav.reset('placed', { id });
    api.notify(
      {
        id: 'confirmed',
        title: { en: 'Order confirmed', ar: 'تم تأكيد الطلب' },
        body: { en: `${id} is confirmed and split between its vendors. We'll tell you when it ships.`, ar: `تم تأكيد ${id} وتقسيمه بين البائعين. هنبلغك أول ما يتشحن.` },
        target: { name: 'tracking', params: { id } },
      },
      3500,
    );
    window.setTimeout(() => setOrders((o) => o.map((x) => (x.id === id ? { ...x, step: Math.max(x.step, 1) } : x))), 3500);
  };

  const sendChat = (text: string) => {
    if (!text.trim()) return;
    const id = Date.now();
    setMsgs((m) => [...m, { id, from: 'me', text }]);
    const lower = text.toLowerCase();
    const reply = /return|رجّع|ارجاع|مرتجع|ترجيع/.test(lower)
      ? t('Sure. Open the order, tap "Return an item" and pick a time. A courier collects it, no charge.', 'أكيد. افتح الطلب، ودوس "إرجاع منتج" واختار معاد. المندوب هييجي ياخده ببلاش.')
      : /order|طلب|اوردر|أوردر|فين/.test(lower)
        ? t('Your latest order is on its way. I just sent you the tracking link in a notification.', 'آخر طلب ليك في الطريق. بعتلك لينك التتبع في إشعار دلوقتي.')
        : t('Thanks! A member of the team will get back to you in a minute.', 'شكرًا! حد من الفريق هيرد عليك خلال دقيقة.');
    window.setTimeout(() => setMsgs((m) => [...m, { id: id + 1, from: 'agent', text: '…typing' }]), 400);
    window.setTimeout(() => setMsgs((m) => [...m.filter((x) => x.id !== id + 1), { id: id + 2, from: 'agent', text: reply }]), 1700);
  };

  const ctx: Ctx = { api, t, lang, dark, mini, add, lines, setLines, units, collapse };

  let screen: ReactNode;
  switch (r.name) {
    case 'product':
      screen = <ProductScreen ctx={ctx} p={productById(String(r.params?.id ?? 'p1'))} />;
      break;
    case 'search':
      screen = <SearchScreen ctx={ctx} />;
      break;
    case 'checkout':
      screen = <CheckoutScreen ctx={ctx} subtotal={subtotal} saved={saved} onPlace={placeOrder} />;
      break;
    case 'placed':
      screen = <PlacedScreen ctx={ctx} id={String(r.params?.id ?? '')} />;
      break;
    case 'tracking':
      screen = <TrackingScreen ctx={ctx} order={orders.find((o) => o.id === r.params?.id) ?? orders[0]} />;
      break;
    case 'faqs':
      screen = <FaqsScreen ctx={ctx} />;
      break;
    case 'chat':
      screen = <ChatScreen ctx={ctx} msgs={msgs} onSend={sendChat} />;
      break;
    case 'support':
      screen = <SupportScreen ctx={ctx} unread={unread} />;
      break;
    case 'offers':
      screen = <OffersScreen ctx={ctx} />;
      break;
    case 'cart':
      screen = <CartScreen ctx={ctx} />;
      break;
    case 'account':
      screen = <AccountScreen ctx={ctx} orders={orders} />;
      break;
    default:
      screen = <HomeScreen ctx={ctx} />;
  }

  const accessory =
    isTab && tab === 'cart' && lines.length > 0
      ? {
          saved: saved > 0 ? t(`You saved ${money(saved, 'en')}`, `وفّرت ${money(saved, 'ar')}`) : null,
          label: t(`Checkout (${selUnits}) · ${money(subtotal, 'en')}`, `إتمام الشراء (${selUnits}) · ${money(subtotal, 'ar')}`),
          onCheckout: () => (selUnits > 0 ? nav.push('checkout') : api.toast(t('Select at least one item', 'اختار منتج واحد على الأقل'))),
        }
      : null;

  return (
    <div className={`sx ${dark ? 'dark' : ''} ${mini ? 'sx-mini' : ''}`}>
      <div key={routeKey} className={`sx-screen ${isTab ? 'tab-in' : 'push-in'}`}>
        {screen}
      </div>
      {isTab && tab !== 'home' && <div className="sx-sb" aria-hidden />}
      {isTab && (
        <GlassNav
          tab={tab}
          lang={lang}
          collapsed={collapse.collapsed}
          badges={{ cart: units, support: unread }}
          accessory={accessory}
          onTab={(x) => (x === tab ? collapse.expand() : nav.reset(x))}
          onExpand={collapse.expand}
        />
      )}
    </div>
  );
}

interface Ctx {
  api: AppApi;
  t: (en: string, ar: string) => string;
  lang: 'en' | 'ar';
  dark: boolean;
  mini: boolean;
  add: (pid: string, qty?: number, variant?: L) => void;
  lines: Line[];
  setLines: React.Dispatch<React.SetStateAction<Line[]>>;
  units: number;
  collapse: ReturnType<typeof useNavCollapse>;
}

/* ---------------------------------------------------------------- shared */

const Chev = ({ size = 16 }: { size?: number }) => <ChevronRight size={size} className="flip-rtl" aria-hidden />;

function Price({ p, large, lang }: { p: Product; large?: boolean; lang: 'en' | 'ar' }) {
  const d = discount(p);
  return (
    <span className={`sx-price ${large ? 'lg' : ''}`}>
      <b dir="ltr">{money(p.price, lang)}</b>
      {d > 0 && <s dir="ltr">{money(p.compare!, lang)}</s>}
      {large && d > 0 && <span className="sx-off lg" dir="ltr">-{d}%</span>}
    </span>
  );
}

function Tile({ p, angle, className = '' }: { p: Product; angle?: number; className?: string }) {
  return (
    <span className={`sx-tile ${className}`} style={{ ['--tile' as string]: p.tint }}>
      <ProductArt kind={p.kind} color={p.color} angle={angle} />
    </span>
  );
}

function ProductCard({ ctx, p, wide }: { ctx: Ctx; p: Product; wide?: boolean }) {
  const { t, lang, api } = ctx;
  const d = discount(p);
  return (
    <div className={`sx-card ${wide ? 'wide' : ''}`} role="button" tabIndex={0} onClick={() => api.nav.push('product', { id: p.id })}>
      <span className="sx-card-img">
        <Tile p={p} />
        {p.stock <= 3 && <span className="sx-flag">{t(`Only ${p.stock} left`, `باقي ${p.stock} بس`)}</span>}
        {d > 0 && <span className="sx-off" dir="ltr">-{d}%</span>}
      </span>
      <span className="sx-card-body">
        <span className="sx-card-meta">
          <span className="sx-card-vendor">{p.vendor[lang]}</span>
          <span className="sx-stars"><Star size={10} fill="#F9BE00" stroke="none" aria-hidden /> {p.rating.toFixed(1)}</span>
        </span>
        <span className="sx-card-title">{p.title[lang]}</span>
        <Price p={p} lang={lang} />
        <span className="sx-card-foot">
          <span className="sx-ok">{p.freeShipping ? t('Free shipping', 'شحن مجاني') : t('In stock', 'متوفر')}</span>
          <button
            className="sx-add"
            aria-label={t('Add to cart', 'أضف إلى السلة')}
            onClick={(e) => {
              e.stopPropagation();
              ctx.add(p.id, 1, p.colors?.[0]?.name);
            }}
          >
            <Plus size={16} strokeWidth={2.6} aria-hidden />
          </button>
        </span>
      </span>
    </div>
  );
}

function SectionHead({ title, sub, onAll, t }: { title: string; sub?: string; onAll?: () => void; t: Ctx['t'] }) {
  return (
    <div className="sx-sec">
      <div>
        <h3>{title}</h3>
        {sub && <p>{sub}</p>}
      </div>
      {onAll && (
        <button className="sx-all" onClick={onAll}>
          {t('View all', 'عرض الكل')} <Chev size={15} />
        </button>
      )}
    </div>
  );
}

function TopBar({ ctx, title, right, transparent }: { ctx: Ctx; title?: string; right?: ReactNode; transparent?: boolean }) {
  return (
    <header className={`sx-top ${transparent ? 'clear' : ''}`}>
      <button className="sx-round" onClick={ctx.api.nav.pop} aria-label={ctx.t('Back', 'رجوع')}>
        <ChevronLeft size={22} className="flip-rtl" aria-hidden />
      </button>
      {title && <h2>{title}</h2>}
      <span className="sx-top-right">{right}</span>
    </header>
  );
}

function Logo({ dark }: { dark: boolean }) {
  return <img className="sx-logo" src={dark ? logoDark : logoLight} alt="Shopsiia" />;
}

/* ------------------------------------------------------------------ home */

function HomeScreen({ ctx }: { ctx: Ctx }) {
  const { t, lang, api, dark, collapse } = ctx;
  const head = useRef<HTMLDivElement>(null);
  const frame = useRef(0);

  // The address row and search fold away as the page scrolls, as the app's
  // HomeHeaderSliver does. Drawn with a CSS variable: no re-render per frame.
  const onScroll = (e: UIEvent<HTMLDivElement>) => {
    collapse.bind.onScroll(e);
    const y = e.currentTarget.scrollTop;
    cancelAnimationFrame(frame.current);
    frame.current = requestAnimationFrame(() => head.current?.style.setProperty('--p', String(Math.min(1, Math.max(0, y / 56)))));
  };

  const picked = useMemo(() => [...products].sort((a, b) => b.reviews - a.reviews), []);

  return (
    <div className="sx-home">
      <div className="sx-hd" ref={head}>
        <div className="sx-hd-top">
          <Logo dark={dark} />
          <span className="sx-hd-icons">
            <button className="sx-icon fold-in" onClick={() => api.nav.push('search')} aria-label={t('Search', 'البحث')}><Search size={20} aria-hidden /></button>
            <button className="sx-icon" onClick={() => api.toast(t('No new notifications', 'مفيش إشعارات جديدة'))} aria-label={t('Notifications', 'الإشعارات')}>
              <Bell size={20} aria-hidden />
              <i className="sx-dot" />
            </button>
            <button className="sx-icon" onClick={() => api.nav.push('offers')} aria-label={t('Categories', 'الفئات')}><LayoutGrid size={20} aria-hidden /></button>
          </span>
        </div>
        <div className="sx-hd-fold">
          <button className="sx-deliver" onClick={() => api.toast(t('Pick a pin on the map to change it', 'حدد مكانك على الخريطة عشان تغيّره'))}>
            <MapPin size={20} fill="currentColor" stroke="var(--bg)" aria-hidden />
            <span>
              <small>{t('Deliver to', 'التوصيل إلى')}</small>
              <b>{t('Smouha, Alex', 'سموحة، إسكندرية')} <ChevronDown size={14} aria-hidden /></b>
            </span>
          </button>
          <button className="sx-search" onClick={() => api.nav.push('search')}>
            <Search size={20} aria-hidden />
            <span>{t('Search products', 'ابحث عن منتجات')}</span>
          </button>
        </div>
      </div>

      <div className="sx-scroll home" {...collapse.bind} onScroll={onScroll}>
        <div className="sx-perk"><Truck size={16} aria-hidden /> {t('Free shipping on all orders', 'شحن مجاني على كل الطلبات')}</div>
        <Banners ctx={ctx} />
        <SectionHead title={t('Shop by category', 'تسوّق حسب الفئة')} onAll={() => api.nav.reset('offers')} t={t} />
        <div className="sx-rail cats">
          {categories.map((c) => (
            <button key={c.id} className="sx-cat" onClick={() => api.nav.push('search', { q: c.id })}>
              <span className="sx-cat-img" style={{ ['--tile' as string]: c.tint }}>
                <ProductArt kind={c.art} color={c.art === 'lamp' ? '#F9BE00' : c.art === 'tshirt' ? '#F9BE00' : c.art === 'sneaker' ? '#F26522' : c.art === 'perfume' ? '#C98A3B' : c.art === 'backpack' ? '#2F6B55' : c.art === 'mug' ? '#F26522' : '#2A2F34'} />
              </span>
              <span>{c[lang]}</span>
            </button>
          ))}
        </div>
        {sections.map((s) => (
          <section key={s.id}>
            <SectionHead title={s.title[lang]} sub={s.sub[lang]} onAll={() => api.nav.reset('offers')} t={t} />
            <div className="sx-rail">
              {s.ids.map((id) => <ProductCard key={id} ctx={ctx} p={productById(id)} />)}
            </div>
          </section>
        ))}
        <SectionHead title={t('Picked for you', 'مختارات ليك')} t={t} />
        <div className="sx-grid">
          {picked.map((p) => <ProductCard key={p.id} ctx={ctx} p={p} wide />)}
        </div>
        <div className="sx-end" />
      </div>
    </div>
  );
}

const BANNERS = [
  { id: 'b1', cls: 'b-sale', kind: 'headphones' as const, color: '#2A2F34', title: { en: 'Mega sale', ar: 'أوكازيون' }, sub: { en: 'Up to 50% off electronics', ar: 'خصم لحد 50% على الإلكترونيات' }, to: 'p6' },
  { id: 'b2', cls: 'b-ink', kind: 'backpack' as const, color: '#F9BE00', title: { en: 'Free shipping', ar: 'شحن مجاني' }, sub: { en: 'On every order this week', ar: 'على كل الطلبات الأسبوع ده' }, to: 'p7' },
  { id: 'b3', cls: 'b-orange', kind: 'sneaker' as const, color: '#FFFFFF', title: { en: 'New season', ar: 'موسم جديد' }, sub: { en: 'Fresh styles from 120+ vendors', ar: 'ستايلات جديدة من 120+ بائع' }, to: 'p5' },
];

function Banners({ ctx }: { ctx: Ctx }) {
  const { lang, api, mini } = ctx;
  const [i, setI] = useState(0);
  const strip = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (mini) return;
    const id = window.setInterval(() => {
      const el = strip.current;
      if (!el) return;
      const next = (Math.round(Math.abs(el.scrollLeft) / el.clientWidth) + 1) % BANNERS.length;
      el.scrollTo({ left: (lang === 'ar' ? -1 : 1) * next * el.clientWidth, behavior: 'smooth' });
    }, 5000);
    return () => window.clearInterval(id);
  }, [mini, lang]);

  return (
    <div className="sx-banners">
      <div
        className="sx-banner-strip"
        ref={strip}
        onScroll={(e) => {
          const el = e.currentTarget;
          setI(Math.round(Math.abs(el.scrollLeft) / el.clientWidth));
        }}
      >
        {BANNERS.map((b) => (
          <button key={b.id} className={`sx-banner ${b.cls}`} onClick={() => api.nav.push('product', { id: b.to })}>
            <span className="sx-banner-text">
              <b>{b.title[lang]}</b>
              <span>{b.sub[lang]}</span>
            </span>
            <span className="sx-banner-art"><ProductArt kind={b.kind} color={b.color} angle={-8} /></span>
          </button>
        ))}
      </div>
      <div className="sx-dots" aria-hidden>{BANNERS.map((b, k) => <i key={b.id} className={k === i ? 'on' : ''} />)}</div>
    </div>
  );
}

/* --------------------------------------------------------------- product */

function ProductScreen({ ctx, p }: { ctx: Ctx; p: Product }) {
  const { t, lang, api } = ctx;
  const [slide, setSlide] = useState(0);
  const [color, setColor] = useState(0);
  const [size, setSize] = useState(p.sizes ? 1 : -1);
  const [qty, setQty] = useState(1);
  const [open, setOpen] = useState<string | null>('desc');
  const [share, setShare] = useState(false);
  const variant: L | undefined = p.colors || p.sizes
    ? {
        en: [p.colors?.[color]?.name.en, p.sizes?.[size]].filter(Boolean).join(' · '),
        ar: [p.colors?.[color]?.name.ar, p.sizes?.[size]].filter(Boolean).join(' · '),
      }
    : undefined;
  const shown = { ...p, color: p.colors?.[color]?.hex ?? p.color };
  const related = products.filter((x) => x.id !== p.id).slice(0, 5);
  const slug = p.title.en.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');

  return (
    <div className="sx-pd">
      <div className="sx-pd-bar">
        <button className="sx-round glass" onClick={api.nav.pop} aria-label={t('Back', 'رجوع')}><ChevronLeft size={22} className="flip-rtl" aria-hidden /></button>
        <span className="sx-pd-bar-r">
          <button className="sx-round glass" onClick={() => setShare(true)} aria-label={t('Share', 'مشاركة')}><Share2 size={19} aria-hidden /></button>
          <button className="sx-round glass" onClick={() => api.nav.reset('cart')} aria-label={t('Cart', 'السلة')}>
            <ShoppingCart size={19} aria-hidden />
            {ctx.units > 0 && <span key={ctx.units} className="sx-badge end">{ctx.units}</span>}
          </button>
        </span>
      </div>

      <div className="sx-scroll pd">
        <div className="sx-gallery">
          <div className="sx-gallery-strip" onScroll={(e) => setSlide(Math.round(Math.abs(e.currentTarget.scrollLeft) / e.currentTarget.clientWidth))}>
            {[0, -10, 12].map((a, k) => (
              <div key={k} className="sx-gallery-slide">
                <Tile p={shown} angle={a} className={`g${k}`} />
              </div>
            ))}
          </div>
          <span className="sx-count" dir="ltr">{slide + 1} / 3</span>
        </div>

        <div className="sx-pd-body">
          <div className="sx-pd-meta">
            <button className="sx-vendor" onClick={() => api.toast(t(`${p.vendor.en} has 42 products`, `${p.vendor.ar} عنده 42 منتج`))}>
              <Store size={14} aria-hidden /> {p.vendor[lang]} <Chev size={13} />
            </button>
            <span className="sx-stars lg"><Star size={13} fill="#F9BE00" stroke="none" aria-hidden /> {p.rating.toFixed(1)} <small>({p.reviews})</small></span>
          </div>
          <h1 className="sx-pd-title">{p.title[lang]}</h1>
          <Price p={p} large lang={lang} />
          <div className="sx-pd-stock">
            {p.stock <= 3 ? <span className="sx-bad">{t(`Only ${p.stock} left`, `باقي ${p.stock} بس`)}</span> : <span className="sx-ok"><Check size={13} aria-hidden /> {t('In stock', 'متوفر')}</span>}
            {p.freeShipping && <span className="sx-pill"><Truck size={13} aria-hidden /> {t('Free shipping', 'شحن مجاني')}</span>}
          </div>

          {p.colors && (
            <div className="sx-opt">
              <p>{t('Colour', 'اللون')}: <b>{p.colors[color].name[lang]}</b></p>
              <div className="sx-swatches">
                {p.colors.map((c, k) => (
                  <button key={c.hex} className={k === color ? 'on' : ''} style={{ background: c.hex }} onClick={() => setColor(k)} aria-label={c.name[lang]} />
                ))}
              </div>
            </div>
          )}
          {p.sizes && (
            <div className="sx-opt">
              <p>{t('Size', 'المقاس')}: <b>{p.sizes[size]}</b></p>
              <div className="sx-sizes">
                {p.sizes.map((s, k) => (
                  <button key={s} className={k === size ? 'on' : ''} onClick={() => setSize(k)}>{s}</button>
                ))}
              </div>
            </div>
          )}
          <div className="sx-opt row">
            <p>{t('Quantity', 'الكمية')}</p>
            <Stepper value={qty} onChange={setQty} max={Math.min(p.stock, 9)} />
          </div>

          <div className="sx-acc">
            {[
              { id: 'desc', title: t('Description', 'الوصف'), body: p.about[lang] },
              { id: 'del', title: t('Delivery', 'التوصيل'), body: t('2 to 4 working days to Alexandria. Cash on delivery.', 'من 2 لـ 4 أيام عمل لإسكندرية. الدفع عند الاستلام.') },
              { id: 'ret', title: t('Returns', 'الإرجاع'), body: t('Free returns within 14 days. A courier picks it up from your door.', 'إرجاع مجاني خلال 14 يوم. المندوب بياخده من عند بابك.') },
            ].map((s) => (
              <div key={s.id} className={`sx-acc-item ${open === s.id ? 'open' : ''}`}>
                <button onClick={() => setOpen(open === s.id ? null : s.id)}>
                  {s.title}
                  <ChevronDown size={18} aria-hidden />
                </button>
                <div className="sx-acc-body"><p>{s.body}</p></div>
              </div>
            ))}
          </div>

          <div className="sx-trust">
            <h4>{t('Shop with Confidence', 'تسوّق بثقة واطمئنان')}</h4>
            <ul>
              <li><Banknote size={18} aria-hidden /> {t('Cash on delivery', 'الدفع عند الاستلام')}</li>
              <li><RotateCcw size={18} aria-hidden /> {t('14-day returns', 'إرجاع خلال 14 يوم')}</li>
              <li><ShieldCheck size={18} aria-hidden /> {t('Verified vendors', 'بائعين موثّقين')}</li>
            </ul>
          </div>

          <SectionHead title={t('You may also like', 'ممكن يعجبك كمان')} t={t} />
        </div>
        <div className="sx-rail">
          {related.map((x) => <ProductCard key={x.id} ctx={ctx} p={x} />)}
        </div>
        <div className="sx-end pd" />
      </div>

      <div className="sx-buy">
        <div className="sx-buy-total">
          <small>{t('Total', 'الإجمالي')}</small>
          <b dir="ltr">{money(p.price * qty, lang)}</b>
        </div>
        <div className="sx-buy-row">
          <button className="sx-btn outline" onClick={() => { ctx.add(p.id, qty, variant); api.nav.push('checkout'); }}>{t('Buy now', 'اشترِ الآن')}</button>
          <button className="sx-btn primary" onClick={() => ctx.add(p.id, qty, variant)}><ShoppingCart size={18} aria-hidden /> {t('Add to cart', 'أضف إلى السلة')}</button>
        </div>
      </div>

      {share && (
        <div className="sx-sheet-wrap" onClick={() => setShare(false)}>
          <div className="sx-sheet" onClick={(e) => e.stopPropagation()}>
            <i className="sx-grab" />
            <div className="sx-share-card">
              <Tile p={shown} />
              <span>
                <b>{p.title[lang]}</b>
                <span dir="ltr">{money(p.price, lang)}</span>
                <small dir="ltr"><Link2 size={12} aria-hidden /> shopsiia.com/product/{slug}</small>
              </span>
            </div>
            <p className="sx-share-note">{t('The link opens this product straight in the app, or on the web if the app is not installed.', 'اللينك بيفتح المنتج ده في التطبيق على طول، أو على الويب لو التطبيق مش متسطّب.')}</p>
            <div className="sx-share-actions">
              <button onClick={() => { setShare(false); api.toast(t('Link copied', 'تم نسخ اللينك')); }}><span><Copy size={20} aria-hidden /></span>{t('Copy link', 'نسخ اللينك')}</button>
              <button onClick={() => { setShare(false); api.toast(t('Shared', 'تمت المشاركة')); }}><span><MessageCircle size={20} aria-hidden /></span>{t('Message', 'رسالة')}</button>
              <button onClick={() => { setShare(false); api.toast(t('Shared', 'تمت المشاركة')); }}><span><Share2 size={20} aria-hidden /></span>{t('More', 'المزيد')}</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

function Stepper({ value, onChange, max = 9, min = 1 }: { value: number; onChange: (n: number) => void; max?: number; min?: number }) {
  return (
    <span className="sx-stepper" dir="ltr">
      <button onClick={() => onChange(Math.max(min, value - 1))} disabled={value <= min} aria-label="-"><Minus size={15} aria-hidden /></button>
      <b>{value}</b>
      <button onClick={() => onChange(Math.min(max, value + 1))} disabled={value >= max} aria-label="+"><Plus size={15} aria-hidden /></button>
    </span>
  );
}

/* ------------------------------------------------------------------ cart */

function CartScreen({ ctx }: { ctx: Ctx }) {
  const { t, lang, api, lines, setLines, collapse } = ctx;
  const all = lines.length > 0 && lines.every((l) => l.on);
  const onCount = lines.filter((l) => l.on).length;
  const suggestions = products.filter((p) => !lines.some((l) => l.pid === p.id)).slice(0, 5);

  if (lines.length === 0) {
    return (
      <div className="sx-page">
        <h1 className="sx-title">{t('Cart', 'السلة')}</h1>
        <div className="sx-empty">
          <span><ShoppingCart size={34} aria-hidden /></span>
          <b>{t('Your cart is empty', 'سلتك فارغة')}</b>
          <p>{t('Add something you like and it will wait for you here.', 'ضيف أي حاجة عجبتك وهتلاقيها مستنياك هنا.')}</p>
          <button className="sx-btn primary" onClick={() => api.nav.reset('home')}>{t('Start shopping', 'ابدأ التسوق')}</button>
        </div>
      </div>
    );
  }

  return (
    <div className="sx-page">
      <div className="sx-scroll cart" {...collapse.bind}>
        <h1 className="sx-title">{t(`Cart (${ctx.units})`, `السلة (${ctx.units})`)}</h1>
        <div className="sx-cart-head">
          <button className={`sx-check ${all ? 'on' : ''}`} onClick={() => setLines((c) => c.map((l) => ({ ...l, on: !all })))}>
            <i>{all && <Check size={13} strokeWidth={3} aria-hidden />}</i> {t('Select all', 'تحديد الكل')}
          </button>
          <span>{t(`${onCount} of ${lines.length} selected`, `تم تحديد ${onCount} من ${lines.length}`)}</span>
        </div>
        <div className="sx-lines">
          {lines.map((l) => {
            const p = productById(l.pid);
            return (
              <div key={l.key} className={`sx-line ${l.on ? '' : 'off'}`}>
                <button className={`sx-check ${l.on ? 'on' : ''}`} onClick={() => setLines((c) => c.map((x) => (x.key === l.key ? { ...x, on: !x.on } : x)))} aria-label={t('Select', 'تحديد')}>
                  <i>{l.on && <Check size={13} strokeWidth={3} aria-hidden />}</i>
                </button>
                <button className="sx-line-img" onClick={() => api.nav.push('product', { id: p.id })}><Tile p={p} /></button>
                <div className="sx-line-body">
                  <small>{t(`Sold by ${p.vendor.en}`, `يباع بواسطة ${p.vendor.ar}`)}</small>
                  <b>{p.title[lang]}</b>
                  {l.variant && <span className="sx-variant">{l.variant[lang]}</span>}
                  <Price p={p} lang={lang} />
                  <div className="sx-line-foot">
                    <Stepper value={l.qty} max={Math.min(p.stock, 9)} onChange={(n) => setLines((c) => c.map((x) => (x.key === l.key ? { ...x, qty: n } : x)))} />
                    <button className="sx-remove" onClick={() => { setLines((c) => c.filter((x) => x.key !== l.key)); api.toast(t('Removed from your cart', 'اتشال من السلة')); }} aria-label={t('Remove', 'إزالة')}>
                      <Trash2 size={17} aria-hidden />
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
        <p className="sx-note"><Package size={15} aria-hidden /> {t('Vendor and official stock ship separately, so one order can arrive in more than one delivery.', 'يُشحن مخزون البائعين والمخزون الرسمي بشكل منفصل، لذا قد يصل الطلب في أكثر من شحنة.')}</p>
        <SectionHead title={t('You might like', 'ممكن يعجبك')} t={t} />
        <div className="sx-rail">
          {suggestions.map((p) => <ProductCard key={p.id} ctx={ctx} p={p} />)}
        </div>
        <div className="sx-end cart" />
      </div>
    </div>
  );
}

/* -------------------------------------------------------------- checkout */

function CheckoutScreen({ ctx, subtotal, saved, onPlace }: { ctx: Ctx; subtotal: number; saved: number; onPlace: () => void }) {
  const { t, lang, lines } = ctx;
  const [busy, setBusy] = useState(false);
  const sel = lines.filter((l) => l.on);
  const units = sel.reduce((s, l) => s + l.qty, 0);
  return (
    <div className="sx-page">
      <TopBar ctx={ctx} title={t('Checkout', 'إتمام الطلب')} />
      <div className="sx-scroll co">
        <ol className="sx-steps">
          <li className="done"><i><Check size={12} strokeWidth={3} aria-hidden /></i>{t('Address', 'العنوان')}</li>
          <li className="on"><i>2</i>{t('Review', 'المراجعة')}</li>
          <li><i>3</i>{t('Done', 'تم')}</li>
        </ol>
        <div className="sx-box">
          <div className="sx-box-head"><b>{t('Deliver to', 'التوصيل إلى')}</b><button onClick={() => ctx.api.toast(t('Pick a pin on the map', 'حدد مكانك على الخريطة'))}>{t('Change', 'تغيير')}</button></div>
          <div className="sx-addr">
            <span className="sx-map" aria-hidden><MapPin size={22} fill="#F26522" stroke="#fff" /></span>
            <span>
              <b>{t('Home', 'المنزل')}</b>
              <span>{t('14 Abu Qir St, Smouha, Alexandria', '14 شارع أبو قير، سموحة، الإسكندرية')}</span>
              <small>{t('Matched to shipping city: Alexandria', 'مدينة الشحن: الإسكندرية')}</small>
            </span>
          </div>
        </div>
        <div className="sx-box">
          <div className="sx-box-head"><b>{t('Payment method', 'طريقة الدفع')}</b></div>
          <div className="sx-pay">
            <span className="sx-pay-ic"><Banknote size={20} aria-hidden /></span>
            <span><b>{t('Cash on delivery', 'الدفع عند الاستلام')}</b><small>{t('Pay the courier when the order arrives.', 'ادفع لمندوب التوصيل عند وصول الطلب.')}</small></span>
            <i className="sx-radio on" />
          </div>
        </div>
        <div className="sx-box">
          <div className="sx-box-head"><b>{t(`Items (${units})`, `المنتجات (${units})`)}</b></div>
          <div className="sx-co-items">
            {sel.map((l) => {
              const p = productById(l.pid);
              return (
                <div key={l.key} className="sx-co-item">
                  <Tile p={p} />
                  <span><b>{p.title[lang]}</b><small>{l.variant ? `${l.variant[lang]} · ` : ''}×{l.qty}</small></span>
                  <b dir="ltr">{money(p.price * l.qty, lang)}</b>
                </div>
              );
            })}
          </div>
        </div>
        <button className="sx-coupon" onClick={() => ctx.api.toast(t('Try SHOPSIIA10', 'جرّب SHOPSIIA10'))}><Ticket size={18} aria-hidden /> {t('Have a code?', 'هل لديك كود خصم؟')} <Chev /></button>
        <div className="sx-box sx-totals">
          <p><span>{t('Items', 'المنتجات')}</span><span dir="ltr">{money(subtotal + saved, lang)}</span></p>
          {saved > 0 && <p className="green"><span>{t('You save', 'توفّر')}</span><span dir="ltr">-{money(saved, lang)}</span></p>}
          <p><span>{t('Shipping', 'الشحن')}</span><span className="green">{t('Free', 'مجاني')}</span></p>
          <p className="big"><span>{t('Total', 'الإجمالي')}</span><b dir="ltr">{money(subtotal, lang)}</b></p>
        </div>
        <div className="sx-end co" />
      </div>
      <div className="sx-buy single">
        <button className="sx-btn primary" disabled={busy || units === 0} onClick={() => { setBusy(true); window.setTimeout(onPlace, 900); }}>
          {busy ? <span className="sx-spin" aria-hidden /> : null}
          {busy ? t('Placing your order…', 'جارٍ تأكيد طلبك…') : t(`Place order · ${money(subtotal, 'en')}`, `تأكيد الطلب · ${money(subtotal, 'ar')}`)}
        </button>
      </div>
    </div>
  );
}

function PlacedScreen({ ctx, id }: { ctx: Ctx; id: string }) {
  const { t, api } = ctx;
  return (
    <div className="sx-page sx-placed">
      <span className="sx-placed-ic"><CircleCheck size={56} aria-hidden /></span>
      <h1>{t('Order placed', 'تم تأكيد الطلب')}</h1>
      <p>{t('Your order is confirmed and split between its vendors.', 'تم تأكيد طلبك وتقسيمه بين البائعين.')}</p>
      <span className="sx-chip" dir="ltr">{id}</span>
      <div className="sx-placed-btns">
        <button className="sx-btn primary" onClick={() => api.nav.replace('tracking', { id })}>{t('Track order', 'تتبع الطلب')}</button>
        <button className="sx-btn outline" onClick={() => api.nav.reset('home')}>{t('Continue shopping', 'متابعة التسوق')}</button>
      </div>
    </div>
  );
}

function TrackingScreen({ ctx, order }: { ctx: Ctx; order: Order }) {
  const { t } = ctx;
  const steps = [
    t('Order confirmed', 'تم تأكيد الطلب'),
    t('Packed by the vendor', 'البائع جهّز الطلب'),
    t('Shipped', 'اتشحن'),
    t('Out for delivery', 'خرج للتوصيل'),
    t('Delivered', 'تم التسليم'),
  ];
  return (
    <div className="sx-page">
      <TopBar ctx={ctx} title={t('Track order', 'تتبع الطلب')} />
      <div className="sx-scroll co">
        <div className="sx-box sx-track-head">
          <span><small>{t('Order', 'طلب')}</small><b dir="ltr">{order.id}</b></span>
          <span><small>{t('Arriving', 'يصل')}</small><b>{order.step >= 4 ? t('Delivered', 'تم التسليم') : order.step >= 3 ? t('Today by 6 PM', 'النهارده قبل 6 م') : t('Tomorrow', 'بكرة')}</b></span>
        </div>
        <div className="sx-box">
          <ol className="sx-timeline">
            {steps.map((s, k) => (
              <li key={s} className={k < order.step ? 'done' : k === order.step ? 'now' : ''}>
                <i>{k <= order.step && <Check size={12} strokeWidth={3} aria-hidden />}</i>
                <span><b>{s}</b>{k <= order.step && <small><Clock size={11} aria-hidden /> {k === order.step ? t('Just now', 'الآن') : t(`${(order.step - k) * 5}h ago`, `من ${(order.step - k) * 5} ساعات`)}</small>}</span>
              </li>
            ))}
          </ol>
        </div>
        <div className="sx-box sx-courier">
          <span className="sx-avatar">MA</span>
          <span><b>{t('Mahmoud, your courier', 'محمود، المندوب')}</b><small>{t(`Collect ${money(order.total, 'en')} on delivery`, `هتدفع ${money(order.total, 'ar')} عند الاستلام`)}</small></span>
          <button className="sx-round soft" onClick={() => ctx.api.toast(t('Calling…', 'بيتصل…'))} aria-label={t('Call', 'اتصال')}><Phone size={18} aria-hidden /></button>
        </div>
        <p className="sx-note"><RotateCcw size={15} aria-hidden /> {t('After delivery you can return any item from this page within 14 days.', 'بعد الاستلام تقدر ترجّع أي منتج من الصفحة دي خلال 14 يوم.')}</p>
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- support */

function FaqTile({ q, a, open, onToggle }: { q: string; a: string; open: boolean; onToggle: () => void }) {
  return (
    <div className={`sx-faq ${open ? 'open' : ''}`}>
      <button onClick={onToggle} aria-expanded={open}>
        <span>{q}</span>
        <ChevronDown size={18} aria-hidden />
      </button>
      <div className="sx-acc-body"><p>{a}</p></div>
    </div>
  );
}

function SupportScreen({ ctx, unread }: { ctx: Ctx; unread: number }) {
  const { t, lang, api, collapse } = ctx;
  const [open, setOpen] = useState<number | null>(null);
  return (
    <div className="sx-page">
      <div className="sx-scroll tab" {...collapse.bind}>
        <h1 className="sx-title">{t('Help & support', 'المساعدة والدعم')}</h1>
        <div className="sx-help">
          <h3>{t('How can we help?', 'كيف يمكننا مساعدتك؟')}</h3>
          <button className="sx-chat-cta" onClick={() => api.nav.push('chat')}>
            <span className="sx-chat-ic"><MessageCircle size={22} aria-hidden /></span>
            <span><b>{t('Chat with us', 'تحدّث معنا')}</b><small>{unread > 0 ? t('1 new reply from the team', 'رد جديد من الفريق') : t('Fastest way to reach the team', 'أسرع وسيلة للتواصل مع الفريق')}</small></span>
            {unread > 0 && <i className="sx-unread">{unread}</i>}
            <Chev />
          </button>
        </div>
        <SectionHead title={t('Common questions', 'أسئلة شائعة')} onAll={() => api.nav.push('faqs')} t={t} />
        <div className="sx-faqs">
          {faqs.slice(0, 5).map((f, k) => (
            <FaqTile key={k} q={f.q[lang]} a={f.a[lang]} open={open === k} onToggle={() => setOpen(open === k ? null : k)} />
          ))}
        </div>
        <SectionHead title={t('Other ways to reach us', 'طرق أخرى للتواصل')} t={t} />
        <div className="sx-list">
          <button onClick={() => api.toast(t('Calling support…', 'بيتصل بالدعم…'))}><Phone size={19} aria-hidden /> {t('Call support', 'اتصل بالدعم')} <Chev /></button>
          <button onClick={() => api.toast(t('Opening your email app…', 'بيفتح تطبيق الإيميل…'))}><Mail size={19} aria-hidden /> {t('Email support', 'راسل الدعم')} <Chev /></button>
        </div>
        <div className="sx-end" />
      </div>
    </div>
  );
}

function FaqsScreen({ ctx }: { ctx: Ctx }) {
  const { t, lang } = ctx;
  const [q, setQ] = useState('');
  const [open, setOpen] = useState<number | null>(null);
  const list = faqs.map((f, k) => ({ ...f, k })).filter((f) => !q || (f.q[lang] + f.a[lang]).toLowerCase().includes(q.toLowerCase()));
  return (
    <div className="sx-page">
      <TopBar ctx={ctx} title={t('Common questions', 'أسئلة شائعة')} />
      <div className="sx-scroll co">
        <label className="sx-field">
          <Search size={18} aria-hidden />
          <input value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search the questions', 'ابحث في الأسئلة')} />
        </label>
        <div className="sx-faqs">
          {list.map((f) => <FaqTile key={f.k} q={f.q[lang]} a={f.a[lang]} open={open === f.k} onToggle={() => setOpen(open === f.k ? null : f.k)} />)}
          {list.length === 0 && <p className="sx-muted">{t('No matching questions', 'لا توجد أسئلة مطابقة')}</p>}
        </div>
      </div>
    </div>
  );
}

function ChatScreen({ ctx, msgs, onSend }: { ctx: Ctx; msgs: Msg[]; onSend: (s: string) => void }) {
  const { t } = ctx;
  const [text, setText] = useState('');
  const end = useRef<HTMLDivElement>(null);
  useEffect(() => {
    end.current?.scrollIntoView({ block: 'end', behavior: 'smooth' });
  }, [msgs.length]);
  const send = (s: string) => {
    onSend(s);
    setText('');
  };
  return (
    <div className="sx-page sx-chat">
      <header className="sx-top">
        <button className="sx-round" onClick={ctx.api.nav.pop} aria-label={t('Back', 'رجوع')}><ChevronLeft size={22} className="flip-rtl" aria-hidden /></button>
        <span className="sx-chat-who">
          <span className="sx-avatar y">S</span>
          <span><b>{t('Shopsiia Support', 'دعم شوبسيا')}</b><small><i /> {t('Online · replies in minutes', 'متصل · بيرد خلال دقايق')}</small></span>
        </span>
      </header>
      <div className="sx-msgs">
        <p className="sx-day">{t('Today', 'النهارده')}</p>
        {msgs.map((m) => (
          <div key={m.id} className={`sx-msg ${m.from}`}>
            {m.text === '…typing' ? <span className="sx-typing"><i /><i /><i /></span> : m.text}
          </div>
        ))}
        <div ref={end} />
      </div>
      <div className="sx-quick">
        {[t('Where is my order?', 'طلبي فين؟'), t('Return an item', 'عايز أرجّع منتج')].map((q) => (
          <button key={q} onClick={() => send(q)}>{q}</button>
        ))}
      </div>
      <form className="sx-composer" onSubmit={(e) => { e.preventDefault(); send(text); }}>
        <input value={text} onChange={(e) => setText(e.target.value)} placeholder={t('Type a message', 'اكتب رسالة')} />
        <button type="submit" aria-label={t('Send', 'إرسال')}><Send size={18} className="flip-rtl" aria-hidden /></button>
      </form>
    </div>
  );
}

/* ---------------------------------------------------------------- offers */

function OffersScreen({ ctx }: { ctx: Ctx }) {
  const { t, lang, collapse } = ctx;
  const [cat, setCat] = useState('all');
  const deals = products.filter((p) => discount(p) > 0).sort((a, b) => discount(b) - discount(a));
  const chips = [{ id: 'all', en: 'All', ar: 'الكل' }, ...categories.slice(0, 5)];
  return (
    <div className="sx-page">
      <div className="sx-scroll tab" {...collapse.bind}>
        <h1 className="sx-title">{t('Offers', 'العروض')}</h1>
        <p className="sx-subtitle">{t('Live deals from every vendor, refreshed daily', 'عروض من كل البائعين، تُحدَّث يوميًا')}</p>
        <div className="sx-chips">
          {chips.map((c) => <button key={c.id} className={cat === c.id ? 'on' : ''} onClick={() => setCat(c.id)}>{c[lang]}</button>)}
        </div>
        <div className="sx-deal">
          <span>
            <small>{t('Ends in', 'ينتهي خلال')}</small>
            <b dir="ltr">05 : 42 : 18</b>
          </span>
          <span className="sx-deal-art"><ProductArt kind="watch" color="#F26522" angle={-10} /></span>
        </div>
        <SectionHead title={t('Biggest discounts', 'أكبر الخصومات')} t={t} />
        <div className="sx-grid">
          {deals.map((p) => <ProductCard key={p.id} ctx={ctx} p={p} wide />)}
        </div>
        <div className="sx-end" />
      </div>
    </div>
  );
}

/* --------------------------------------------------------------- account */

function AccountScreen({ ctx, orders }: { ctx: Ctx; orders: Order[] }) {
  const { t, api, dark, collapse, lang } = ctx;
  const [push, setPush] = useState(true);
  return (
    <div className="sx-page">
      <div className="sx-scroll tab" {...collapse.bind}>
        <h1 className="sx-title">{t('Account', 'حسابي')}</h1>
        <div className="sx-guest">
          <span className="sx-avatar big"><CircleUserGlyph /></span>
          <span><b>{t('Guest', 'زائر')}</b><small>{t('Sign in to track orders and save addresses', 'سجّل الدخول لتتبّع طلباتك وحفظ عناوينك')}</small></span>
          <button className="sx-btn primary sm" onClick={() => api.toast(t('Your cart comes with you when you sign in', 'سلتك هتتنقل معاك لما تسجل دخول'))}>{t('Sign in', 'دخول')}</button>
        </div>
        <div className="sx-free"><Truck size={18} aria-hidden /> {t('You have free shipping on your next order', 'لديك شحن مجاني على طلبك القادم')}</div>

        <p className="sx-group">{t('Essentials', 'الأساسيات')}</p>
        <div className="sx-list">
          <button onClick={() => api.nav.push('tracking', { id: orders[0].id })}><Package size={19} aria-hidden /> {t('My orders', 'طلباتي')} <em>{t(`Arriving: ${orders[0].id}`, `يصل: ${orders[0].id}`)}</em> <Chev /></button>
          <button onClick={() => api.toast(t('Addresses are saved on the map', 'العناوين بتتحفظ على الخريطة'))}><MapPin size={19} aria-hidden /> {t('Addresses', 'العناوين')} <Chev /></button>
          <button onClick={() => api.nav.push('support')}><MessageCircle size={19} aria-hidden /> {t('Help & support', 'المساعدة والدعم')} <Chev /></button>
        </div>

        <p className="sx-group">{t('Preferences', 'التفضيلات')}</p>
        <div className="sx-list">
          <div className="sx-row">
            {dark ? <Moon size={19} aria-hidden /> : <Sun size={19} aria-hidden />} {t('Appearance', 'المظهر')}
            <span className="sx-seg" role="radiogroup">
              <button role="radio" aria-checked={!dark} className={!dark ? 'on' : ''} onClick={() => api.setFlag('dark', false)}>{t('Light', 'فاتح')}</button>
              <button role="radio" aria-checked={dark} className={dark ? 'on' : ''} onClick={() => api.setFlag('dark', true)}>{t('Dark', 'داكن')}</button>
            </span>
          </div>
          <button onClick={() => api.toast(t('Switch language from the panel beside the phone', 'غيّر اللغة من اللوحة اللي جنب الموبايل'))}>
            <Languages size={19} aria-hidden /> {t('Language', 'اللغة')} <em>{lang === 'ar' ? 'العربية' : 'English'}</em> <Chev />
          </button>
          <div className="sx-row">
            <BellRing size={19} aria-hidden /> {t('Notifications', 'الإشعارات')}
            <button className={`sx-switch ${push ? 'on' : ''}`} role="switch" aria-checked={push} onClick={() => setPush(!push)} aria-label={t('Notifications', 'الإشعارات')}><i /></button>
          </div>
        </div>

        <button className="sx-sell" onClick={() => api.toast(t('Applications open', 'التقديم متاح'))}>
          <Store size={22} aria-hidden />
          <span><b>{t('Sell with Shopsiia', 'بِع مع شوبسيا')}</b><small>{t('Apply to sell your products to shoppers across Egypt', 'قدّم طلبًا وابدأ بيع منتجاتك لعملاء في كل مصر')}</small></span>
          <Chev />
        </button>
        <p className="sx-copy">{t('© 2026 Shopsiia. All rights reserved.', '© 2026 شوبسيا. جميع الحقوق محفوظة.')}</p>
        <div className="sx-end" />
      </div>
    </div>
  );
}

const CircleUserGlyph = () => (
  <svg viewBox="0 0 24 24" width="26" height="26" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
    <circle cx="12" cy="9" r="4" />
    <path d="M4.5 20c1.5-3.5 4.2-5 7.5-5s6 1.5 7.5 5" strokeLinecap="round" />
  </svg>
);

/* ---------------------------------------------------------------- search */

function SearchScreen({ ctx }: { ctx: Ctx }) {
  const { t, lang, api, mini } = ctx;
  const cat = String(api.nav.route.params?.q ?? '');
  const [q, setQ] = useState('');
  const catDef = categories.find((c) => c.id === cat);
  const results = products.filter((p) => {
    if (catDef && p.kind !== catDef.art && !(catDef.id === 'electronics' && ['earbuds', 'watch', 'headphones'].includes(p.kind))) return false;
    if (!q) return true;
    return (p.title.en + ' ' + p.title.ar + ' ' + p.vendor.en).toLowerCase().includes(q.toLowerCase());
  });
  return (
    <div className="sx-page">
      <header className="sx-top">
        <button className="sx-round" onClick={api.nav.pop} aria-label={t('Back', 'رجوع')}><ChevronLeft size={22} className="flip-rtl" aria-hidden /></button>
        <label className="sx-field grow">
          <Search size={18} aria-hidden />
          <input autoFocus={!mini} value={q} onChange={(e) => setQ(e.target.value)} placeholder={catDef ? catDef[lang] : t('Search products', 'ابحث عن منتجات')} />
          {q && <button type="button" onClick={() => setQ('')} aria-label={t('Clear', 'مسح')}><X size={16} aria-hidden /></button>}
        </label>
      </header>
      <div className="sx-scroll co">
        {!q && !catDef && (
          <>
            <p className="sx-group">{t('Popular right now', 'الأكثر بحثًا دلوقتي')}</p>
            <div className="sx-chips wrap">
              {[t('Earbuds', 'سماعات'), t('Sneakers', 'كوتشي'), t('Watch', 'ساعة'), t('Oud', 'عود'), t('Backpack', 'شنطة')].map((s) => (
                <button key={s} onClick={() => setQ(s)}>{s}</button>
              ))}
            </div>
          </>
        )}
        <p className="sx-group">{t(`${results.length} results`, `${results.length} نتيجة`)}</p>
        <div className="sx-grid">
          {results.map((p) => <ProductCard key={p.id} ctx={ctx} p={p} wide />)}
        </div>
        {results.length === 0 && <p className="sx-muted">{t('No products match. Try other words.', 'مفيش منتجات مطابقة. جرّب كلمات تانية.')}</p>}
      </div>
    </div>
  );
}
