import { useEffect, useMemo, useState } from 'react';
import {
  Bell, Search, MapPin, ChevronRight, ChevronLeft, Home, LayoutGrid, ShoppingCart, Package, User, Star, Truck, Minus, Plus,
  Trash2, Banknote, Check, ShieldCheck, RotateCcw, Heart, X, Store, Globe, Moon, HelpCircle, LogIn, CircleDot,
} from 'lucide-react';
import type { AppApi } from '../../shell/types';
import { banners, categories, egp, productById, products, type Product } from './data';
import wordmark from '../../assets/brand/brand_name_light.svg';
import shopArt from '../../assets/brand/onboarding_deliver_light.svg';
import './shopsiia.css';

interface Line {
  key: string;
  pid: string;
  color?: string;
  size?: string;
  qty: number;
}
type Step = 0 | 1 | 2 | 3 | 4 | 5;
interface Order {
  id: string;
  date: Date;
  lines: Line[];
  total: number;
  step: Step;
  cancelled?: boolean;
}

const TABS = ['home', 'categories', 'cart', 'orders', 'account'];

const seedOrders = (): Order[] => [
  { id: 'SH-10482', date: new Date(Date.now() - 2 * 864e5), lines: [{ key: 'a', pid: 'p2', qty: 1 }], total: 3850, step: 3 },
  { id: 'SH-10311', date: new Date(Date.now() - 12 * 864e5), lines: [{ key: 'b', pid: 'p4', qty: 2 }, { key: 'c', pid: 'p7', qty: 1 }], total: 1347, step: 5 },
];

export function ShopsiiaApp({ api }: { api: AppApi }) {
  const { nav, t, lang } = api;
  const [cart, setCart] = useState<Line[]>([{ key: 'p5--', pid: 'p5', qty: 1 }]);
  const [orders, setOrders] = useState<Order[]>(seedOrders);
  const [wish, setWish] = useState<Set<string>>(new Set(['p6']));
  const r = nav.route;
  const isTab = TABS.includes(r.name);
  const count = cart.reduce((s, l) => s + l.qty, 0);

  const add = (pid: string, qty = 1, color?: string, size?: string) => {
    const key = `${pid}-${color ?? ''}-${size ?? ''}`;
    setCart((c) => {
      const hit = c.find((l) => l.key === key);
      return hit ? c.map((l) => (l.key === key ? { ...l, qty: l.qty + qty } : l)) : [...c, { key, pid, qty, color, size }];
    });
    api.toast(t('Added to cart', 'اتضاف للسلة'));
  };

  const placeOrder = () => {
    const id = `SH-${10500 + orders.length * 7}`;
    const total = cart.reduce((s, l) => s + productById(l.pid).price * l.qty, 0) + (subtotal(cart) >= 1000 ? 0 : 45);
    setOrders((o) => [{ id, date: new Date(), lines: cart, total, step: 0 }, ...o]);
    setCart([]);
    nav.reset('placed', { id });
    api.notify(
      {
        id: 'confirmed',
        title: { en: 'Order confirmed', ar: 'تم تأكيد الأوردر' },
        body: { en: `The seller accepted order ${id}. We'll tell you when it ships.`, ar: `البائع قبل الأوردر ${id}. هنبلغك أول ما يتشحن.` },
        target: { name: 'tracking', params: { id } },
      },
      4500,
    );
    window.setTimeout(() => setOrders((o) => o.map((x) => (x.id === id ? { ...x, step: 1 } : x))), 4500);
  };

  // Advance orders when a matching push arrives from the control panel.
  useEffect(() => {
    if (r.name === 'tracking' && r.params?.advance) {
      const step = Number(r.params.advance) as Step;
      setOrders((o) => o.map((x) => (x.id === r.params!.id ? { ...x, step: Math.max(x.step, step) as Step } : x)));
    }
  }, [r]);

  let screen: JSX.Element;
  switch (r.name) {
    case 'categories':
      screen = <Categories api={api} />;
      break;
    case 'category':
      screen = <CategoryProducts api={api} id={String(r.params?.id)} wish={wish} />;
      break;
    case 'cart':
      screen = <Cart api={api} cart={cart} setCart={setCart} />;
      break;
    case 'checkout':
      screen = <Checkout api={api} cart={cart} onPlace={placeOrder} />;
      break;
    case 'placed':
      screen = <Placed api={api} id={String(r.params?.id)} />;
      break;
    case 'orders':
      screen = <Orders api={api} orders={orders} />;
      break;
    case 'tracking':
      screen = <Tracking api={api} order={orders.find((o) => o.id === r.params?.id) ?? orders[0]} onCancel={(id) => setOrders((o) => o.map((x) => (x.id === id ? { ...x, cancelled: true } : x)))} />;
      break;
    case 'product':
      screen = <ProductScreen api={api} p={productById(String(r.params?.id))} onAdd={add} wished={wish.has(String(r.params?.id))} toggleWish={(id) => setWish((w) => { const n = new Set(w); n.has(id) ? n.delete(id) : n.add(id); return n; })} cartCount={count} />;
      break;
    case 'search':
      screen = <SearchScreen api={api} />;
      break;
    case 'account':
      screen = <Account api={api} />;
      break;
    case 'notifications':
      screen = <Inbox api={api} />;
      break;
    default:
      screen = <HomeScreen api={api} wish={wish} />;
  }

  return (
    <div className="sp">
      <div className={`sp-body ${isTab ? 'with-nav' : ''}`}>{screen}</div>
      {isTab && (
        <nav className="sp-nav">
          {[
            ['home', Home, t('Home', 'الرئيسية')],
            ['categories', LayoutGrid, t('Categories', 'الأقسام')],
            ['cart', ShoppingCart, t('Cart', 'السلة')],
            ['orders', Package, t('Orders', 'طلباتي')],
            ['account', User, t('Account', 'حسابي')],
          ].map(([name, Icon, label]) => {
            const I = Icon as typeof Home;
            const active = r.name === name;
            return (
              <button key={name as string} className={active ? 'on' : ''} onClick={() => nav.reset(name as string)}>
                <span className="sp-nav-ic">
                  <I size={22} strokeWidth={active ? 2.4 : 1.8} />
                  {name === 'cart' && count > 0 && <em>{count}</em>}
                </span>
                <span>{label as string}</span>
              </button>
            );
          })}
        </nav>
      )}
    </div>
  );
}

const subtotal = (lines: Line[]) => lines.reduce((s, l) => s + productById(l.pid).price * l.qty, 0);

function Back({ api, title, children }: { api: AppApi; title: string; children?: React.ReactNode }) {
  const Chevron = api.lang === 'ar' ? ChevronRight : ChevronLeft;
  return (
    <header className="sp-bar">
      <button className="sp-icon-btn" onClick={() => (api.nav.canPop ? api.nav.pop() : api.nav.reset('home'))} aria-label={api.t('Back', 'رجوع')}>
        <Chevron size={22} />
      </button>
      <h1>{title}</h1>
      <div className="sp-bar-end">{children}</div>
    </header>
  );
}

function badgeLabel(b: Product['badge'], t: AppApi['t']) {
  switch (b) {
    case 'deal': return t('Deal', 'عرض');
    case 'best': return t('Best seller', 'الأكثر مبيعًا');
    case 'new': return t('New', 'جديد');
    case 'official': return t('Official store', 'متجر رسمي');
    case 'low': return t('Only 2 left', 'باقي 2 بس');
    default: return null;
  }
}

function Thumb({ p, size = 56 }: { p: Product; size?: number }) {
  const I = p.icon;
  return (
    <div className="sp-thumb" style={{ background: p.tint }}>
      <I size={size} strokeWidth={1.4} color="#2A2F34" />
    </div>
  );
}

function ProductCard({ api, p, wished }: { api: AppApi; p: Product; wished?: boolean }) {
  const { t, lang } = api;
  const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  return (
    <button className="sp-card" onClick={() => api.nav.push('product', { id: p.id })}>
      <div className="sp-card-img">
        <Thumb p={p} />
        {p.badge && <span className={`sp-badge ${p.badge === 'low' ? 'hot' : ''}`}>{badgeLabel(p.badge, t)}</span>}
        {wished && <Heart className="sp-wish" size={16} fill="#F26522" color="#F26522" />}
      </div>
      <div className="sp-card-body">
        <span className="sp-vendor">{lang === 'ar' ? p.vendorAr : p.vendorEn}</span>
        <span className="sp-title">{lang === 'ar' ? p.ar : p.en}</span>
        <span className="sp-rating"><Star size={11} fill="#F9BE00" color="#F9BE00" /> {p.rating} <i>({p.reviews})</i></span>
        <span className="sp-price">
          {egp(p.price, lang)}
          {off > 0 && <s>{egp(p.old!, lang)}</s>}
        </span>
        {off > 0 && <span className="sp-off">-{off}%</span>}
      </div>
    </button>
  );
}

function HomeScreen({ api, wish }: { api: AppApi; wish: Set<string> }) {
  const { t, lang, nav } = api;
  const [slide, setSlide] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setSlide((s) => (s + 1) % banners.length), 3500);
    return () => window.clearInterval(id);
  }, []);
  const deals = products.filter((p) => p.old);
  const best = products.filter((p) => !p.old || p.badge === 'best');
  return (
    <div className="sp-scroll">
      <div className="sp-hero">
        <div className="sp-hero-row">
          <img src={wordmark} alt="Shopsiia" className="sp-wordmark" />
          <div className="sp-hero-actions">
            <button className="sp-circle" onClick={() => nav.push('notifications')} aria-label={t('Notifications', 'الإشعارات')}>
              <Bell size={19} />
              <i className="sp-dot" />
            </button>
          </div>
        </div>
        <button className="sp-search" onClick={() => nav.push('search')}>
          <Search size={18} />
          <span>{t('Search products, brands and stores', 'دوّر على منتجات وبراندات ومتاجر')}</span>
        </button>
        <div className="sp-deliver">
          <MapPin size={15} />
          <span>{t('Deliver to', 'التوصيل إلى')} <b>{t('Smouha, Alexandria', 'سموحة، الإسكندرية')}</b></span>
        </div>
      </div>

      <div className="sp-chips">
        {categories.map((c) => (
          <button key={c.id} onClick={() => nav.push('category', { id: c.id })}>{lang === 'ar' ? c.ar : c.en}</button>
        ))}
      </div>

      <div className="sp-banner-track">
        <div className="sp-banners" style={{ transform: `translateX(${(lang === 'ar' ? 1 : -1) * slide * 100}%)` }}>
          {banners.map((b) => (
            <button key={b.id} className="sp-bannerx" style={{ background: b.bg, color: b.fg }} onClick={() => nav.push('category', { id: b.cat })}>
              <span className="sp-banner-kicker">{lang === 'ar' ? b.ar[0] : b.en[0]}</span>
              <span className="sp-banner-text">{lang === 'ar' ? b.ar[1] : b.en[1]}</span>
              <span className="sp-banner-cta">{t('Shop now', 'تسوق دلوقتي')}</span>
            </button>
          ))}
        </div>
        <div className="sp-dots">{banners.map((b, i) => <i key={b.id} className={i === slide ? 'on' : ''} />)}</div>
      </div>

      <div className="sp-perk"><Truck size={16} /> {t('Free shipping on orders over EGP 1,000', 'شحن مجاني للطلبات فوق 1,000 ج.م')}</div>

      <Section title={t('Shop by category', 'تسوق حسب القسم')} onAll={() => nav.reset('categories')} api={api} />
      <div className="sp-rail sp-cats">
        {categories.map((c) => {
          const I = c.icon;
          return (
            <button key={c.id} onClick={() => nav.push('category', { id: c.id })}>
              <span style={{ background: c.tint }}><I size={26} strokeWidth={1.6} /></span>
              {lang === 'ar' ? c.ar : c.en}
            </button>
          );
        })}
      </div>

      <Section title={t('Deals of the day', 'عروض النهارده')} api={api} onAll={() => nav.push('category', { id: 'electronics' })} />
      <div className="sp-rail">{deals.map((p) => <ProductCard key={p.id} api={api} p={p} wished={wish.has(p.id)} />)}</div>

      <Section title={t('Best sellers', 'الأكثر مبيعًا')} api={api} onAll={() => nav.push('category', { id: 'fashion' })} />
      <div className="sp-rail">{best.map((p) => <ProductCard key={p.id} api={api} p={p} wished={wish.has(p.id)} />)}</div>
      <div style={{ height: 16 }} />
    </div>
  );
}

function Section({ title, onAll, api }: { title: string; onAll?: () => void; api: AppApi }) {
  return (
    <div className="sp-section">
      <h2>{title}</h2>
      {onAll && <button onClick={onAll}>{api.t('See all', 'الكل')}</button>}
    </div>
  );
}

function Categories({ api }: { api: AppApi }) {
  const { t, lang, nav } = api;
  return (
    <>
      <header className="sp-bar"><h1 className="solo">{t('Categories', 'الأقسام')}</h1></header>
      <div className="sp-scroll pad">
        <div className="sp-catgrid">
          {categories.map((c) => {
            const I = c.icon;
            const n = products.filter((p) => p.category === c.id).length;
            return (
              <button key={c.id} onClick={() => nav.push('category', { id: c.id })} style={{ background: c.tint }}>
                <I size={34} strokeWidth={1.5} />
                <b>{lang === 'ar' ? c.ar : c.en}</b>
                <small>{n ? t(`${n} products`, `${n} منتجات`) : t('Coming soon', 'قريبًا')}</small>
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}

function CategoryProducts({ api, id, wish }: { api: AppApi; id: string; wish: Set<string> }) {
  const c = categories.find((x) => x.id === id) ?? categories[0];
  const list = products.filter((p) => p.category === c.id);
  const shown = list.length ? list : products.slice(0, 4);
  const [sort, setSort] = useState<'featured' | 'low' | 'high'>('featured');
  const sorted = useMemo(() => [...shown].sort((a, b) => (sort === 'low' ? a.price - b.price : sort === 'high' ? b.price - a.price : 0)), [shown, sort]);
  return (
    <>
      <Back api={api} title={api.lang === 'ar' ? c.ar : c.en} />
      <div className="sp-sortbar">
        {(['featured', 'low', 'high'] as const).map((s) => (
          <button key={s} className={sort === s ? 'on' : ''} onClick={() => setSort(s)}>
            {s === 'featured' ? api.t('Featured', 'المميز') : s === 'low' ? api.t('Price: low to high', 'السعر: من الأقل') : api.t('Price: high to low', 'السعر: من الأعلى')}
          </button>
        ))}
      </div>
      <div className="sp-scroll pad">
        <div className="sp-grid">{sorted.map((p) => <ProductCard key={p.id} api={api} p={p} wished={wish.has(p.id)} />)}</div>
      </div>
    </>
  );
}

function ProductScreen({ api, p, onAdd, wished, toggleWish, cartCount }: { api: AppApi; p: Product; onAdd: (pid: string, qty: number, c?: string, s?: string) => void; wished: boolean; toggleWish: (id: string) => void; cartCount: number }) {
  const { t, lang, nav } = api;
  const [color, setColor] = useState(p.colors?.[0]);
  const [size, setSize] = useState<string | undefined>();
  const [qty, setQty] = useState(1);
  const [img, setImg] = useState(0);
  const off = p.old ? Math.round((1 - p.price / p.old) * 100) : 0;
  const needSize = !!p.sizes && !size;
  const I = p.icon;
  return (
    <div className="sp-pd">
      <div className="sp-scroll">
        <div className="sp-gallery" style={{ background: p.tint }}>
          <div className="sp-gallery-top">
            <button className="sp-circle light" onClick={() => nav.pop()} aria-label={t('Back', 'رجوع')}>{lang === 'ar' ? <ChevronRight size={20} /> : <ChevronLeft size={20} />}</button>
            <div className="sp-gallery-actions">
              <button className="sp-circle light" onClick={() => toggleWish(p.id)} aria-label={t('Save', 'حفظ')}><Heart size={19} fill={wished ? '#F26522' : 'none'} color={wished ? '#F26522' : 'currentColor'} /></button>
              <button className="sp-circle light" onClick={() => nav.reset('cart')} aria-label={t('Cart', 'السلة')}><ShoppingCart size={19} />{cartCount > 0 && <em className="sp-cnt">{cartCount}</em>}</button>
            </div>
          </div>
          <I size={150} strokeWidth={1.1} color={color?.hex && color.hex !== '#F4F4F4' ? color.hex : '#2A2F34'} style={{ transform: `rotate(${img * -8}deg) scale(${1 - img * 0.06})`, transition: 'transform .3s' }} />
          <div className="sp-dots dark">{[0, 1, 2].map((i) => <button key={i} className={i === img ? 'on' : ''} onClick={() => setImg(i)} aria-label={`${i + 1}`} />)}</div>
        </div>
        <div className="sp-pd-info">
          <button className="sp-store"><Store size={14} /> {lang === 'ar' ? p.vendorAr : p.vendorEn} <ChevronRight size={14} className="flip-rtl" /></button>
          <h1>{lang === 'ar' ? p.ar : p.en}</h1>
          <div className="sp-rating big"><Star size={14} fill="#F9BE00" color="#F9BE00" /> {p.rating} <i>· {t(`${p.reviews} ratings`, `${p.reviews} تقييم`)}</i></div>
          <div className="sp-pd-price">
            <b>{egp(p.price, lang)}</b>
            {off > 0 && <><s>{egp(p.old!, lang)}</s><span className="sp-off">-{off}%</span></>}
          </div>
          {p.stock <= 5 && <p className="sp-low">{t(`Only ${p.stock} left in stock`, `باقي ${p.stock} بس في المخزون`)}</p>}

          {p.colors && (
            <div className="sp-opt">
              <span>{t('Colour', 'اللون')}: <b>{lang === 'ar' ? color?.ar : color?.en}</b></span>
              <div className="sp-swatches">
                {p.colors.map((c) => (
                  <button key={c.hex} className={c.hex === color?.hex ? 'on' : ''} onClick={() => setColor(c)} aria-label={c.en}><i style={{ background: c.hex }} /></button>
                ))}
              </div>
            </div>
          )}
          {p.sizes && (
            <div className="sp-opt">
              <span>{t('Size', 'المقاس')}</span>
              <div className="sp-sizes">
                {p.sizes.map((s) => <button key={s} className={s === size ? 'on' : ''} onClick={() => setSize(s)}>{s}</button>)}
              </div>
            </div>
          )}

          <div className="sp-promise">
            <div><Truck size={18} /> <span>{p.delivery === 'tomorrow' ? t('Get it tomorrow', 'يوصلك بكرة') : t('Delivered in 2 days', 'يوصلك خلال يومين')}<small>{t('Free over EGP 1,000', 'مجاني فوق 1,000 ج.م')}</small></span></div>
            <div><Banknote size={18} /> <span>{t('Pay on delivery', 'الدفع عند الاستلام')}<small>{t('Cash or card to the courier', 'كاش أو كارت للمندوب')}</small></span></div>
            <div><RotateCcw size={18} /> <span>{t('Free 14-day returns', 'إرجاع مجاني خلال 14 يوم')}<small>{t('On most items', 'على أغلب المنتجات')}</small></span></div>
          </div>
        </div>
      </div>
      <div className="sp-buybar">
        <div className="sp-qty">
          <button onClick={() => setQty((q) => Math.max(1, q - 1))} aria-label="-"><Minus size={16} /></button>
          <span>{qty}</span>
          <button onClick={() => setQty((q) => Math.min(p.stock, q + 1))} aria-label="+"><Plus size={16} /></button>
        </div>
        <button
          className="sp-cta"
          onClick={() => {
            if (needSize) {
              api.toast(t('Choose a size first', 'اختار المقاس الأول'));
              return;
            }
            onAdd(p.id, qty, color?.en, size);
          }}
        >
          <ShoppingCart size={18} /> {t('Add to cart', 'أضف للسلة')}
        </button>
      </div>
    </div>
  );
}

function Cart({ api, cart, setCart }: { api: AppApi; cart: Line[]; setCart: React.Dispatch<React.SetStateAction<Line[]>> }) {
  const { t, lang, nav } = api;
  const sub = subtotal(cart);
  const ship = sub >= 1000 || sub === 0 ? 0 : 45;
  const left = Math.max(0, 1000 - sub);
  return (
    <>
      <header className="sp-bar"><h1 className="solo">{t('Cart', 'السلة')}</h1></header>
      {cart.length === 0 ? (
        <div className="sp-empty">
          <img src={shopArt} alt="" />
          <h2>{t('Your cart is empty', 'السلة فاضية')}</h2>
          <p>{t('Browse deals and add something you like.', 'شوف العروض وضيف حاجة عجبتك.')}</p>
          <button className="sp-cta" onClick={() => nav.reset('home')}>{t('Start shopping', 'ابدأ التسوق')}</button>
        </div>
      ) : (
        <>
          <div className="sp-scroll pad">
            <div className={`sp-ship ${left === 0 ? 'done' : ''}`}>
              <span>{left === 0 ? t('You unlocked free shipping', 'الشحن بقى مجاني') : t(`Add ${egp(left, 'en')} more for free shipping`, `ضيف ${egp(left, 'ar')} كمان والشحن يبقى مجاني`)}</span>
              <i><b style={{ width: `${Math.min(100, (sub / 1000) * 100)}%` }} /></i>
            </div>
            {cart.map((l) => {
              const p = productById(l.pid);
              return (
                <div key={l.key} className="sp-line">
                  <button onClick={() => nav.push('product', { id: p.id })} className="sp-line-img"><Thumb p={p} size={36} /></button>
                  <div className="sp-line-body">
                    <span className="sp-vendor">{lang === 'ar' ? p.vendorAr : p.vendorEn}</span>
                    <span className="sp-title one">{lang === 'ar' ? p.ar : p.en}</span>
                    {(l.color || l.size) && <small>{[l.color, l.size].filter(Boolean).join(' · ')}</small>}
                    <div className="sp-line-foot">
                      <b>{egp(p.price * l.qty, lang)}</b>
                      <div className="sp-qty sm">
                        <button onClick={() => setCart((c) => c.flatMap((x) => (x.key === l.key ? (x.qty > 1 ? [{ ...x, qty: x.qty - 1 }] : []) : [x])))} aria-label="-">{l.qty > 1 ? <Minus size={14} /> : <Trash2 size={14} />}</button>
                        <span>{l.qty}</span>
                        <button onClick={() => setCart((c) => c.map((x) => (x.key === l.key ? { ...x, qty: x.qty + 1 } : x)))} aria-label="+"><Plus size={14} /></button>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
            <Summary api={api} sub={sub} ship={ship} />
          </div>
          <div className="sp-buybar">
            <div className="sp-total"><small>{t('Total', 'الإجمالي')}</small><b>{egp(sub + ship, lang)}</b></div>
            <button className="sp-cta" onClick={() => nav.push('checkout')}>{t('Checkout', 'إتمام الطلب')}</button>
          </div>
        </>
      )}
    </>
  );
}

function Summary({ api, sub, ship }: { api: AppApi; sub: number; ship: number }) {
  const { t, lang } = api;
  return (
    <div className="sp-summary">
      <div><span>{t('Subtotal', 'المجموع')}</span><span>{egp(sub, lang)}</span></div>
      <div><span>{t('Shipping', 'الشحن')}</span><span className={ship === 0 ? 'free' : ''}>{ship === 0 ? t('Free', 'مجاني') : egp(ship, lang)}</span></div>
      <div className="tot"><span>{t('Total', 'الإجمالي')}</span><span>{egp(sub + ship, lang)}</span></div>
    </div>
  );
}

function Checkout({ api, cart, onPlace }: { api: AppApi; cart: Line[]; onPlace: () => void }) {
  const { t, lang } = api;
  const [pay, setPay] = useState<'cod' | 'card'>('cod');
  const [busy, setBusy] = useState(false);
  const sub = subtotal(cart);
  const ship = sub >= 1000 ? 0 : 45;
  return (
    <>
      <Back api={api} title={t('Checkout', 'إتمام الطلب')} />
      <div className="sp-scroll pad">
        <h3 className="sp-h3">{t('Delivery address', 'عنوان التوصيل')}</h3>
        <div className="sp-box sp-addr">
          <MapPin size={20} />
          <div>
            <b>{t('Home', 'البيت')}</b>
            <p>{t('14 Victor Emmanuel St, Smouha, Alexandria', '14 شارع فيكتور عمانوئيل، سموحة، الإسكندرية')}</p>
            <small dir="ltr">+20 10 1234 5678</small>
          </div>
          <span className="sp-chg">{t('Change', 'تغيير')}</span>
        </div>
        <h3 className="sp-h3">{t('Payment method', 'طريقة الدفع')}</h3>
        <div className="sp-box">
          <button className={`sp-radio ${pay === 'cod' ? 'on' : ''}`} onClick={() => setPay('cod')}>
            <CircleDot size={18} /> <span><b>{t('Pay on delivery', 'الدفع عند الاستلام')}</b><small>{t('Cash or card when it arrives', 'كاش أو كارت لما يوصلك')}</small></span>
          </button>
          <button className={`sp-radio ${pay === 'card' ? 'on' : ''}`} onClick={() => setPay('card')}>
            <CircleDot size={18} /> <span><b>{t('Credit / debit card', 'كارت ائتمان')}</b><small>Visa · Mastercard · Meeza</small></span>
          </button>
        </div>
        <h3 className="sp-h3">{t(`Items (${cart.reduce((s, l) => s + l.qty, 0)})`, `المنتجات (${cart.reduce((s, l) => s + l.qty, 0)})`)}</h3>
        <div className="sp-box sp-mini">
          {cart.map((l) => {
            const p = productById(l.pid);
            return <div key={l.key}><Thumb p={p} size={22} /><span>{l.qty} × {lang === 'ar' ? p.ar : p.en}</span></div>;
          })}
        </div>
        <Summary api={api} sub={sub} ship={ship} />
        <p className="sp-secure"><ShieldCheck size={15} /> {t('Your order is protected by Shopsiia Guarantee', 'طلبك محمي بضمان شوبسيا')}</p>
      </div>
      <div className="sp-buybar">
        <div className="sp-total"><small>{t('Total', 'الإجمالي')}</small><b>{egp(sub + ship, lang)}</b></div>
        <button
          className="sp-cta"
          disabled={busy || cart.length === 0}
          onClick={() => {
            setBusy(true);
            window.setTimeout(onPlace, 900);
          }}
        >
          {busy ? t('Placing order…', 'جاري الطلب…') : t('Place order', 'تأكيد الطلب')}
        </button>
      </div>
    </>
  );
}

function Placed({ api, id }: { api: AppApi; id: string }) {
  const { t, nav } = api;
  return (
    <div className="sp-placed">
      <div className="sp-check"><Check size={44} strokeWidth={3} /></div>
      <h1>{t('Order placed', 'تم الطلب')}</h1>
      <p>{t(`Order ${id} is with the seller now. You'll get a notification when they confirm it.`, `الأوردر ${id} وصل للبائع. هيوصلك إشعار أول ما يأكده.`)}</p>
      <button className="sp-cta" onClick={() => { nav.reset('orders'); nav.push('tracking', { id }); }}>{t('Track order', 'تتبع الأوردر')}</button>
      <button className="sp-ghost" onClick={() => nav.reset('home')}>{t('Continue shopping', 'كمّل تسوق')}</button>
    </div>
  );
}

const STEPS: [string, string, string, string][] = [
  ['Order placed', 'تم الطلب', 'We received the order and notified the seller.', 'استلمنا الطلب وبلغنا البائع.'],
  ['Confirmed', 'تم التأكيد', 'The seller accepted the order.', 'البائع قبل الطلب.'],
  ['Packed', 'تم التغليف', 'The parcel is packed and labelled.', 'الطرد اتغلف واتلصق عليه البيانات.'],
  ['Shipped', 'تم الشحن', 'The parcel left the seller warehouse.', 'الطرد خرج من مخزن البائع.'],
  ['Out for delivery', 'خرج للتوصيل', 'The courier is on the way to your address.', 'المندوب في الطريق لعنوانك.'],
  ['Delivered', 'تم التوصيل', 'The parcel was handed over.', 'الطرد اتسلم.'],
];

function statusChip(o: Order, t: AppApi['t']) {
  if (o.cancelled) return <span className="sp-st bad">{t('Cancelled', 'ملغي')}</span>;
  if (o.step >= 5) return <span className="sp-st ok">{t('Delivered', 'تم التوصيل')}</span>;
  if (o.step >= 3) return <span className="sp-st go">{t('On the way', 'في الطريق')}</span>;
  return <span className="sp-st">{t('In progress', 'جاري التجهيز')}</span>;
}

function Orders({ api, orders }: { api: AppApi; orders: Order[] }) {
  const { t, lang, nav } = api;
  return (
    <>
      <header className="sp-bar"><h1 className="solo">{t('My orders', 'طلباتي')}</h1></header>
      <div className="sp-scroll pad">
        {orders.map((o) => (
          <button key={o.id} className="sp-order" onClick={() => nav.push('tracking', { id: o.id })}>
            <div className="sp-order-top">
              <b dir="ltr">{o.id}</b>
              {statusChip(o, t)}
            </div>
            <div className="sp-order-thumbs">{o.lines.map((l) => <Thumb key={l.key} p={productById(l.pid)} size={22} />)}</div>
            <div className="sp-order-foot">
              <span>{o.date.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB', { day: 'numeric', month: 'short' })} · {egp(o.total, lang)}</span>
              {!o.cancelled && o.step < 5 && <span className="sp-progress"><i style={{ width: `${(o.step / 5) * 100}%` }} /></span>}
            </div>
          </button>
        ))}
      </div>
    </>
  );
}

function Tracking({ api, order, onCancel }: { api: AppApi; order: Order; onCancel: (id: string) => void }) {
  const { t, lang } = api;
  const [ask, setAsk] = useState(false);
  return (
    <>
      <Back api={api} title={t('Order tracking', 'تتبع الأوردر')} />
      <div className="sp-scroll pad">
        <div className="sp-box sp-track-head">
          <div>
            <small>{t('Order', 'أوردر')}</small>
            <b dir="ltr">{order.id}</b>
          </div>
          {statusChip(order, t)}
        </div>
        {!order.cancelled && order.step < 5 && (
          <div className="sp-eta">
            <Truck size={20} />
            <span>{t('Estimated delivery', 'ميعاد التوصيل المتوقع')}<b>{order.step >= 4 ? t('Today, by 6 PM', 'النهارده قبل 6 م') : t('Arrives in 1–2 days', 'يوصل خلال 1–2 يوم')}</b></span>
          </div>
        )}
        <ol className="sp-timeline">
          {STEPS.map((s, i) => {
            const state = order.cancelled ? (i === 0 ? 'done' : 'todo') : i < order.step ? 'done' : i === order.step ? 'now' : 'todo';
            return (
              <li key={s[0]} className={state}>
                <i>{state === 'done' && <Check size={12} strokeWidth={3} />}</i>
                <div>
                  <b>{lang === 'ar' ? s[1] : s[0]}</b>
                  {state !== 'todo' && <small>{lang === 'ar' ? s[3] : s[2]}</small>}
                </div>
              </li>
            );
          })}
        </ol>
        <div className="sp-box sp-mini">
          {order.lines.map((l) => {
            const p = productById(l.pid);
            return <div key={l.key}><Thumb p={p} size={22} /><span>{l.qty} × {lang === 'ar' ? p.ar : p.en}</span></div>;
          })}
          <div className="sp-mini-total"><span>{t('Order total', 'إجمالي الأوردر')}</span><b>{egp(order.total, lang)}</b></div>
        </div>
        {!order.cancelled && order.step < 3 && (
          ask ? (
            <div className="sp-box sp-confirm">
              <b>{t('Cancel this order?', 'تلغي الأوردر ده؟')}</b>
              <p>{t('Nothing has shipped yet, so the whole order will be cancelled.', 'لسه محدش شحن حاجة، فالأوردر كله هيتلغي.')}</p>
              <div>
                <button className="sp-ghost" onClick={() => setAsk(false)}>{t('Keep order', 'سيب الأوردر')}</button>
                <button className="sp-cta danger" onClick={() => { onCancel(order.id); setAsk(false); api.toast(t('Your order has been cancelled.', 'الأوردر اتلغى.')); }}>{t('Yes, cancel it', 'أيوه ألغيه')}</button>
              </div>
            </div>
          ) : (
            <button className="sp-ghost wide" onClick={() => setAsk(true)}>{t('Cancel order', 'إلغاء الأوردر')}</button>
          )
        )}
      </div>
    </>
  );
}

function SearchScreen({ api }: { api: AppApi }) {
  const { t, lang, nav } = api;
  const [q, setQ] = useState('');
  const recent = lang === 'ar' ? ['سماعة', 'ساعة ذكية', 'حذاء'] : ['headphones', 'smart watch', 'shoes'];
  const res = q.trim() ? products.filter((p) => (p.en + ' ' + p.ar + ' ' + p.vendorEn).toLowerCase().includes(q.trim().toLowerCase())) : [];
  const Chevron = lang === 'ar' ? ChevronRight : ChevronLeft;
  return (
    <>
      <header className="sp-bar sp-searchbar">
        <button className="sp-icon-btn" onClick={() => nav.pop()} aria-label={t('Back', 'رجوع')}><Chevron size={22} /></button>
        <label className="sp-search in">
          <Search size={17} />
          <input id="sp-search-input" autoFocus value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search products', 'دوّر على منتج')} />
          {q && <button onClick={() => setQ('')} aria-label="clear"><X size={16} /></button>}
        </label>
      </header>
      <div className="sp-scroll pad">
        {!q && (
          <>
            <h3 className="sp-h3">{t('Recent searches', 'آخر عمليات بحث')}</h3>
            <div className="sp-recent">{recent.map((r) => <button key={r} onClick={() => setQ(r)}>{r}</button>)}</div>
          </>
        )}
        {q && res.length === 0 && <p className="sp-noresult">{t(`No results for "${q}"`, `مفيش نتايج لـ "${q}"`)}</p>}
        {res.length > 0 && <p className="sp-count">{t(`${res.length} results`, `${res.length} نتيجة`)}</p>}
        <div className="sp-grid">{res.map((p) => <ProductCard key={p.id} api={api} p={p} />)}</div>
      </div>
    </>
  );
}

function Account({ api }: { api: AppApi }) {
  const { t } = api;
  const rows: [typeof Globe, string][] = [
    [Package, t('My orders', 'طلباتي')],
    [MapPin, t('Addresses', 'العناوين')],
    [Heart, t('Saved items', 'المحفوظات')],
    [Globe, t('Language', 'اللغة')],
    [Moon, t('Appearance', 'المظهر')],
    [Store, t('Sell on Shopsiia', 'بيع على شوبسيا')],
    [HelpCircle, t('Help & support', 'المساعدة والدعم')],
  ];
  return (
    <>
      <header className="sp-bar"><h1 className="solo">{t('Account', 'حسابي')}</h1></header>
      <div className="sp-scroll pad">
        <div className="sp-guest">
          <div className="sp-avatar"><User size={26} /></div>
          <div>
            <b>{t('Browsing as a guest', 'بتتصفح كضيف')}</b>
            <p>{t('Your cart is kept and moves to your account when you sign in.', 'السلة محفوظة وهتتنقل لحسابك لما تسجل دخول.')}</p>
          </div>
        </div>
        <button className="sp-cta wide" onClick={() => api.toast(t('Sign-in is turned off in the demo', 'تسجيل الدخول مقفول في الديمو'))}><LogIn size={18} /> {t('Sign in or create account', 'سجل دخول أو اعمل حساب')}</button>
        <div className="sp-list">
          {rows.map(([I, label]) => (
            <button key={label} onClick={() => (label === t('My orders', 'طلباتي') ? api.nav.reset('orders') : api.toast(t('Not part of the demo', 'مش متاحة في الديمو')))}>
              <I size={19} /> <span>{label}</span> <ChevronRight size={16} className="flip-rtl" />
            </button>
          ))}
        </div>
      </div>
    </>
  );
}

function Inbox({ api }: { api: AppApi }) {
  const { t } = api;
  const items = [
    [Truck, t('Your order SH-10482 has shipped', 'الأوردر SH-10482 اتشحن'), t('2h ago', 'من ساعتين'), 'tracking'],
    [Banknote, t('Flash deal: 24% off the espresso machine', 'عرض سريع: خصم 24% على ماكينة الإسبريسو'), t('Yesterday', 'امبارح'), 'product'],
    [Check, t('Order SH-10311 was delivered', 'الأوردر SH-10311 اتسلم'), t('12 days ago', 'من 12 يوم'), 'tracking2'],
  ] as const;
  return (
    <>
      <Back api={api} title={t('Notifications', 'الإشعارات')} />
      <div className="sp-scroll pad">
        {items.map(([I, title, when, to]) => (
          <button key={title} className="sp-inbox" onClick={() => (to === 'product' ? api.nav.push('product', { id: 'p6' }) : api.nav.push('tracking', { id: to === 'tracking' ? 'SH-10482' : 'SH-10311' }))}>
            <span className="sp-inbox-ic"><I size={18} /></span>
            <span><b>{title}</b><small>{when}</small></span>
          </button>
        ))}
      </div>
    </>
  );
}
