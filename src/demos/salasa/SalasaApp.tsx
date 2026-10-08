import { useEffect, useMemo, useRef, useState } from 'react';
import {
  LayoutDashboard, Users, CalendarClock, UserCircle, Search, Plus, Phone, MessageCircle, Mail, CloudOff, Cloud, RefreshCw,
  CheckCircle2, Clock, AlertTriangle, Trophy, ChevronLeft, ChevronRight, Check, Bell, Moon, Globe, Shield, LogOut, Trash2,
} from 'lucide-react';
import type { AppApi } from '../../shell/types';
import logo from '../../assets/icons/salasa.png';
import './salasa.css';

type Status = 'lead' | 'contacted' | 'won' | 'lost';
type Sync = 'synced' | 'pending';
interface Client {
  id: string;
  en: string;
  ar: string;
  company: { en: string; ar: string };
  phone: string;
  email: string;
  status: Status;
  sync: Sync;
}
interface FollowUp {
  id: string;
  clientId: string;
  note: { en: string; ar: string };
  at: Date;
  done: boolean;
  sync: Sync;
}

const H = 36e5;
const today = (h: number, m = 0) => { const d = new Date(); d.setHours(h, m, 0, 0); return d; };

const seedClients: Client[] = [
  { id: 'c1', en: 'Mona Adel', ar: 'منى عادل', company: { en: 'Nile Interiors', ar: 'نايل إنتيريورز' }, phone: '+20 100 214 7781', email: 'mona@nileinteriors.co', status: 'won', sync: 'synced' },
  { id: 'c2', en: 'Karim Fathy', ar: 'كريم فتحي', company: { en: 'Fathy Logistics', ar: 'فتحي للنقل' }, phone: '+20 122 908 1144', email: 'karim@fathylog.com', status: 'contacted', sync: 'synced' },
  { id: 'c3', en: 'Sara Hassan', ar: 'سارة حسن', company: { en: 'Bloom Dental', ar: 'بلوم لطب الأسنان' }, phone: '+20 111 337 6620', email: 'sara@bloomdental.eg', status: 'lead', sync: 'synced' },
  { id: 'c4', en: 'Omar Naguib', ar: 'عمر نجيب', company: { en: 'Delta Motors', ar: 'دلتا موتورز' }, phone: '+20 109 445 2093', email: 'omar@deltamotors.eg', status: 'won', sync: 'synced' },
  { id: 'c5', en: 'Yasmin Ali', ar: 'ياسمين علي', company: { en: 'Coastline Hotels', ar: 'فنادق كوستلاين' }, phone: '+20 127 660 1188', email: 'yasmin@coastline.com', status: 'contacted', sync: 'synced' },
  { id: 'c6', en: 'Hany Samir', ar: 'هاني سمير', company: { en: 'Samir & Co', ar: 'سمير وشركاه' }, phone: '+20 155 019 3307', email: 'hany@samirco.com', status: 'lost', sync: 'synced' },
  { id: 'c7', en: 'Nour El-Din', ar: 'نور الدين', company: { en: 'Green Farms', ar: 'جرين فارمز' }, phone: '+20 106 772 5410', email: 'nour@greenfarms.eg', status: 'lead', sync: 'synced' },
];

const seedFollowUps = (): FollowUp[] => [
  { id: 'f1', clientId: 'c2', note: { en: 'Send revised quote for 3 trucks', ar: 'ابعت عرض السعر المعدل لـ 3 عربيات' }, at: today(11, 30), done: false, sync: 'synced' },
  { id: 'f2', clientId: 'c3', note: { en: 'Demo call: clinic booking module', ar: 'مكالمة ديمو: موديول حجز العيادة' }, at: today(15, 0), done: false, sync: 'synced' },
  { id: 'f3', clientId: 'c5', note: { en: 'Follow up on contract signature', ar: 'متابعة توقيع العقد' }, at: new Date(today(10).getTime() + 24 * H), done: false, sync: 'synced' },
  { id: 'f4', clientId: 'c7', note: { en: 'Intro meeting at their office', ar: 'اجتماع تعارف في مكتبهم' }, at: new Date(today(13).getTime() + 48 * H), done: false, sync: 'synced' },
  { id: 'f5', clientId: 'c6', note: { en: 'Ask why they chose another vendor', ar: 'اسأل ليه اختاروا مورد تاني' }, at: new Date(today(16).getTime() - 24 * H), done: false, sync: 'synced' },
  { id: 'f6', clientId: 'c1', note: { en: 'Onboarding call', ar: 'مكالمة بداية الشغل' }, at: new Date(today(12).getTime() - 48 * H), done: true, sync: 'synced' },
];

const TABS = ['dashboard', 'clients', 'followups', 'profile'];

export function SalasaApp({ api }: { api: AppApi }) {
  const { nav, t, flags } = api;
  const offline = !!flags.offline;
  const [clients, setClients] = useState<Client[]>(seedClients);
  const [fus, setFus] = useState<FollowUp[]>(seedFollowUps);
  const [syncing, setSyncing] = useState(false);
  const wasOffline = useRef(offline);
  const pending = clients.filter((c) => c.sync === 'pending').length + fus.filter((f) => f.sync === 'pending').length;

  // Coming back online pushes everything that was saved locally.
  useEffect(() => {
    if (wasOffline.current && !offline) {
      const n = pending;
      if (n > 0) {
        setSyncing(true);
        window.setTimeout(() => {
          setClients((cs) => cs.map((c) => ({ ...c, sync: 'synced' })));
          setFus((fs) => fs.map((f) => ({ ...f, sync: 'synced' })));
          setSyncing(false);
          api.toast(n === 1 ? t('1 change synced', 'تم رفع تعديل واحد') : t(`${n} changes synced`, `تم رفع ${n} تعديلات`));
        }, 1800);
      }
    }
    wasOffline.current = offline;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [offline]);

  const mark: Sync = offline ? 'pending' : 'synced';
  const ctx: Ctx = {
    api, clients, fus, offline, syncing, pending,
    addClient: (c) => { setClients((cs) => [{ ...c, sync: mark }, ...cs]); api.toast(offline ? t('Saved on this phone. It will sync when you are back online.', 'اتحفظ على الموبايل. هيترفع أول ما النت يرجع.') : t('Client added', 'تم إضافة العميل')); },
    addFollowUp: (f) => {
      setFus((fs) => [...fs, { ...f, sync: mark }]);
      const c = clients.find((x) => x.id === f.clientId);
      api.toast(t('Reminder scheduled', 'تم ضبط التذكير'));
      api.notify({
        id: 'rem-' + f.id,
        title: { en: `Follow up with ${c?.en ?? ''}`, ar: `متابعة مع ${c?.ar ?? ''}` },
        body: { en: f.note.en, ar: f.note.ar },
        target: { name: 'followup', params: { id: f.id } },
      }, 6000);
    },
    markDone: (id) => { setFus((fs) => fs.map((f) => (f.id === id ? { ...f, done: true, sync: mark } : f))); api.toast(t('Marked as done', 'اتعلّم إنها خلصت')); },
    remove: (id) => { setFus((fs) => fs.filter((f) => f.id !== id)); },
    setStatus: (id, s) => setClients((cs) => cs.map((c) => (c.id === id ? { ...c, status: s, sync: mark } : c))),
  };

  const r = nav.route;
  let screen: JSX.Element;
  switch (r.name) {
    case 'clients': screen = <ClientsTab ctx={ctx} />; break;
    case 'client': screen = <ClientDetails ctx={ctx} id={String(r.params?.id)} />; break;
    case 'followups': screen = <FollowUpsTab ctx={ctx} initial={String(r.params?.tab ?? 'upcoming')} />; break;
    case 'followup': screen = <FollowUpDetails ctx={ctx} id={String(r.params?.id)} />; break;
    case 'newFollowup': screen = <NewFollowUp ctx={ctx} clientId={r.params?.client as string | undefined} />; break;
    case 'newClient': screen = <NewClient ctx={ctx} />; break;
    case 'profile': screen = <Profile ctx={ctx} />; break;
    default: screen = <Dashboard ctx={ctx} />;
  }
  const isTab = TABS.includes(r.name);
  return (
    <div className="sl">
      <div className={`sl-body ${isTab ? 'with-nav' : ''}`}>{screen}</div>
      {isTab && (
        <nav className="sl-nav">
          {([
            ['dashboard', LayoutDashboard, t('Dashboard', 'الرئيسية')],
            ['clients', Users, t('Clients', 'العملاء')],
            ['followups', CalendarClock, t('Follow ups', 'المتابعات')],
            ['profile', UserCircle, t('Profile', 'حسابي')],
          ] as const).map(([name, I, label]) => (
            <button key={name} className={r.name === name ? 'on' : ''} onClick={() => nav.reset(name)}>
              <I size={21} />
              <span>{label}</span>
            </button>
          ))}
        </nav>
      )}
    </div>
  );
}

interface Ctx {
  api: AppApi;
  clients: Client[];
  fus: FollowUp[];
  offline: boolean;
  syncing: boolean;
  pending: number;
  addClient: (c: Client) => void;
  addFollowUp: (f: FollowUp) => void;
  markDone: (id: string) => void;
  remove: (id: string) => void;
  setStatus: (id: string, s: Status) => void;
}

const statusLabel = (s: Status, t: AppApi['t']) =>
  ({ lead: t('Lead', 'محتمل'), contacted: t('Contacted', 'تم التواصل'), won: t('Won', 'تم البيع'), lost: t('Lost', 'خسرناه') })[s];

const initials = (n: string) => n.split(' ').map((w) => w[0]).slice(0, 2).join('');

function fmtWhen(d: Date, lang: 'en' | 'ar') {
  const day = new Date(d); day.setHours(0, 0, 0, 0);
  const t0 = new Date(); t0.setHours(0, 0, 0, 0);
  const diff = Math.round((day.getTime() - t0.getTime()) / 864e5);
  const time = d.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', { hour: 'numeric', minute: '2-digit' });
  const dayLabel = diff === 0 ? (lang === 'ar' ? 'النهارده' : 'Today') : diff === 1 ? (lang === 'ar' ? 'بكرة' : 'Tomorrow') : diff === -1 ? (lang === 'ar' ? 'امبارح' : 'Yesterday') : d.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-GB', { weekday: 'short', day: 'numeric', month: 'short' });
  return `${dayLabel} · ${time}`;
}

function SyncPill({ ctx }: { ctx: Ctx }) {
  const { t } = ctx.api;
  if (ctx.syncing) return <span className="sl-pill sync"><RefreshCw size={13} className="spin" /> {t('Syncing…', 'جاري الرفع…')}</span>;
  if (ctx.offline) return <span className="sl-pill off"><CloudOff size={13} /> {t(`Offline · ${ctx.pending} waiting`, `أوفلاين · ${ctx.pending} مستني`)}</span>;
  return <span className="sl-pill on"><Cloud size={13} /> {t('All synced', 'كله متزامن')}</span>;
}

function PendingDot({ s, t }: { s: Sync; t: AppApi['t'] }) {
  return s === 'pending' ? <span className="sl-pend" title={t('Waiting to sync', 'مستني يترفع')}><CloudOff size={12} /> {t('Not synced', 'لسه مترفعش')}</span> : null;
}

function Dashboard({ ctx }: { ctx: Ctx }) {
  const { api, clients, fus } = ctx;
  const { t, lang, nav } = api;
  const won = clients.filter((c) => c.status === 'won').length;
  const decided = clients.filter((c) => c.status === 'won' || c.status === 'lost').length;
  const rate = decided ? Math.round((won / decided) * 100) : 0;
  const open = fus.filter((f) => !f.done);
  const upcoming = open.filter((f) => f.at.getTime() >= Date.now() - H).sort((a, b) => a.at.getTime() - b.at.getTime()).slice(0, 3);
  const overdue = open.filter((f) => f.at.getTime() < Date.now() - H).length;
  const hour = new Date().getHours();
  const greet = hour < 12 ? t('Good morning', 'صباح الخير') : hour < 18 ? t('Good afternoon', 'مساء الخير') : t('Good evening', 'مساء الخير');
  return (
    <div className="sl-scroll">
      <div className="sl-head">
        <div className="sl-head-row">
          <img src={logo} alt="" className="sl-logo" />
          <div className="sl-head-txt">
            <small>{greet},</small>
            <b>{t('Ahmed', 'أحمد')}</b>
          </div>
          <SyncPill ctx={ctx} />
        </div>
        <div className="sl-stats">
          <button onClick={() => nav.reset('clients')}><Users size={18} /><b>{clients.length}</b><small>{t('Clients', 'العملاء')}</small></button>
          <button onClick={() => nav.reset('followups')}><CalendarClock size={18} /><b>{open.length}</b><small>{t('Open follow ups', 'متابعات مفتوحة')}</small></button>
          <button onClick={() => nav.reset('clients')}><Trophy size={18} /><b>{won}</b><small>{t('Won deals', 'صفقات مكسوبة')}</small></button>
          <div className="sl-rate">
            <svg viewBox="0 0 36 36" width="44" height="44" aria-hidden><circle cx="18" cy="18" r="15" fill="none" stroke="rgba(255,255,255,.18)" strokeWidth="4" /><circle cx="18" cy="18" r="15" fill="none" stroke="#2DD4BF" strokeWidth="4" strokeDasharray={`${(rate / 100) * 94.2} 94.2`} strokeLinecap="round" transform="rotate(-90 18 18)" /></svg>
            <span><b>{rate}%</b><small>{t('Success rate', 'نسبة النجاح')}</small></span>
          </div>
        </div>
      </div>

      {ctx.offline && (
        <div className="sl-offline">
          <CloudOff size={18} />
          <span>{t('You are offline. Keep working: changes are saved on this phone and sync automatically later.', 'إنت أوفلاين. كمّل شغلك عادي: التعديلات بتتحفظ على الموبايل وهتترفع لوحدها بعدين.')}</span>
        </div>
      )}

      {overdue > 0 && (
        <button className="sl-alert" onClick={() => nav.push('followups', { tab: 'overdue' })}>
          <AlertTriangle size={18} /> <span>{overdue === 1 ? t('1 overdue follow up', 'متابعة واحدة متأخرة') : t(`${overdue} overdue follow ups`, `${overdue} متابعات متأخرة`)}</span> <ChevronRight size={16} className="flip-rtl" />
        </button>
      )}

      <div className="sl-sec">
        <h2>{t('Upcoming agenda', 'الأجندة الجاية')}</h2>
        <button onClick={() => nav.reset('followups')}>{t('See all', 'الكل')}</button>
      </div>
      <div className="sl-pad">
        {upcoming.length === 0 && <p className="sl-muted">{t('All caught up!', 'مفيش حاجة متأخرة!')}</p>}
        {upcoming.map((f) => <FuRow key={f.id} ctx={ctx} f={f} />)}
      </div>

      <div className="sl-sec"><h2>{t('Pipeline', 'مراحل البيع')}</h2></div>
      <div className="sl-pad">
        <div className="sl-pipe">
          {(['lead', 'contacted', 'won', 'lost'] as Status[]).map((s) => {
            const n = clients.filter((c) => c.status === s).length;
            return (
              <div key={s} className={`sl-pipe-col ${s}`}>
                <i style={{ height: `${12 + n * 14}px` }} />
                <b>{n}</b>
                <small>{statusLabel(s, t)}</small>
              </div>
            );
          })}
        </div>
      </div>
      <button className="sl-fab" onClick={() => nav.push('newFollowup')} aria-label={t('New follow up', 'متابعة جديدة')}><Plus size={24} /></button>
      <div style={{ height: 20 }} />
      <span hidden>{lang}</span>
    </div>
  );
}

function FuRow({ ctx, f }: { ctx: Ctx; f: FollowUp }) {
  const { api } = ctx;
  const { t, lang } = api;
  const c = ctx.clients.find((x) => x.id === f.clientId);
  const late = !f.done && f.at.getTime() < Date.now() - H;
  return (
    <button className={`sl-fu ${f.done ? 'done' : late ? 'late' : ''}`} onClick={() => api.nav.push('followup', { id: f.id })}>
      <span className="sl-fu-ic">{f.done ? <CheckCircle2 size={18} /> : late ? <AlertTriangle size={18} /> : <Clock size={18} />}</span>
      <span className="sl-fu-txt">
        <b>{c ? (lang === 'ar' ? c.ar : c.en) : ''}</b>
        <span>{f.note[lang]}</span>
        <small>{fmtWhen(f.at, lang)} <PendingDot s={f.sync} t={t} /></small>
      </span>
    </button>
  );
}

function Bar({ ctx, title, action }: { ctx: Ctx; title: string; action?: React.ReactNode }) {
  const { api } = ctx;
  const Chev = api.lang === 'ar' ? ChevronRight : ChevronLeft;
  return (
    <header className="sl-bar">
      {api.nav.canPop && <button className="sl-ib" onClick={api.nav.pop} aria-label={api.t('Back', 'رجوع')}><Chev size={22} /></button>}
      <h1 className={api.nav.canPop ? '' : 'solo'}>{title}</h1>
      {action}
    </header>
  );
}

function ClientsTab({ ctx }: { ctx: Ctx }) {
  const { api, clients } = ctx;
  const { t, lang, nav } = api;
  const [q, setQ] = useState('');
  const [f, setF] = useState<Status | 'all'>('all');
  const list = clients.filter((c) => (f === 'all' || c.status === f) && (c.en + c.ar + c.company.en + c.company.ar).toLowerCase().includes(q.toLowerCase()));
  return (
    <>
      <Bar ctx={ctx} title={t('Clients', 'العملاء')} action={<SyncPill ctx={ctx} />} />
      <div className="sl-tools">
        <label className="sl-search"><Search size={16} /><input id="sl-client-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search name or company', 'دوّر باسم أو شركة')} /></label>
        <div className="sl-filters">
          {(['all', 'lead', 'contacted', 'won', 'lost'] as const).map((s) => (
            <button key={s} className={f === s ? 'on' : ''} onClick={() => setF(s)}>{s === 'all' ? t('All', 'الكل') : statusLabel(s, t)}</button>
          ))}
        </div>
      </div>
      <div className="sl-scroll sl-pad top">
        {list.length === 0 && <p className="sl-muted">{t('No clients match.', 'مفيش عملاء مطابقين.')}</p>}
        {list.map((c) => (
          <button key={c.id} className="sl-client" onClick={() => nav.push('client', { id: c.id })}>
            <span className="sl-av">{initials(lang === 'ar' ? c.ar : c.en)}</span>
            <span className="sl-client-txt">
              <b>{lang === 'ar' ? c.ar : c.en}</b>
              <small>{c.company[lang]}</small>
              <PendingDot s={c.sync} t={t} />
            </span>
            <span className={`sl-st ${c.status}`}>{statusLabel(c.status, t)}</span>
          </button>
        ))}
      </div>
      <button className="sl-fab" onClick={() => nav.push('newClient')} aria-label={t('Add client', 'إضافة عميل')}><Plus size={24} /></button>
    </>
  );
}

function ClientDetails({ ctx, id }: { ctx: Ctx; id: string }) {
  const { api } = ctx;
  const { t, lang, nav } = api;
  const c = ctx.clients.find((x) => x.id === id) ?? ctx.clients[0];
  const list = ctx.fus.filter((f) => f.clientId === c.id).sort((a, b) => b.at.getTime() - a.at.getTime());
  return (
    <>
      <Bar ctx={ctx} title={t('Client', 'العميل')} />
      <div className="sl-scroll sl-pad top">
        <div className="sl-card sl-profile">
          <span className="sl-av lg">{initials(lang === 'ar' ? c.ar : c.en)}</span>
          <b>{lang === 'ar' ? c.ar : c.en}</b>
          <small>{c.company[lang]}</small>
          <PendingDot s={c.sync} t={t} />
          <div className="sl-actions">
            <button onClick={() => api.toast(t('Calling is turned off in the demo', 'الاتصال مقفول في الديمو'))}><Phone size={18} /><span>{t('Call', 'اتصال')}</span></button>
            <button onClick={() => api.toast(t('Opens WhatsApp in the real app', 'بيفتح واتساب في التطبيق الحقيقي'))}><MessageCircle size={18} /><span>WhatsApp</span></button>
            <button onClick={() => api.toast(t('Opens the mail app in the real app', 'بيفتح الإيميل في التطبيق الحقيقي'))}><Mail size={18} /><span>{t('Email', 'إيميل')}</span></button>
          </div>
        </div>
        <div className="sl-card sl-kv">
          <div><span>{t('Phone', 'الموبايل')}</span><b dir="ltr">{c.phone}</b></div>
          <div><span>{t('Email', 'الإيميل')}</span><b dir="ltr">{c.email}</b></div>
          <div className="col"><span>{t('Stage', 'المرحلة')}</span>
            <div className="sl-filters">{(['lead', 'contacted', 'won', 'lost'] as Status[]).map((s) => <button key={s} className={c.status === s ? 'on' : ''} onClick={() => ctx.setStatus(c.id, s)}>{statusLabel(s, t)}</button>)}</div>
          </div>
        </div>
        <div className="sl-sec in"><h2>{t('Follow ups', 'المتابعات')}</h2><button onClick={() => nav.push('newFollowup', { client: c.id })}>{t('+ Add', '+ إضافة')}</button></div>
        {list.length === 0 && <p className="sl-muted">{t('No follow ups yet.', 'لسه مفيش متابعات.')}</p>}
        {list.map((f) => <FuRow key={f.id} ctx={ctx} f={f} />)}
      </div>
    </>
  );
}

function FollowUpsTab({ ctx, initial }: { ctx: Ctx; initial: string }) {
  const { api, fus } = ctx;
  const { t, nav } = api;
  const [tab, setTab] = useState(initial);
  const now = Date.now() - H;
  const groups = {
    upcoming: fus.filter((f) => !f.done && f.at.getTime() >= now).sort((a, b) => a.at.getTime() - b.at.getTime()),
    overdue: fus.filter((f) => !f.done && f.at.getTime() < now),
    done: fus.filter((f) => f.done),
  } as Record<string, FollowUp[]>;
  return (
    <>
      <Bar ctx={ctx} title={t('Follow ups', 'المتابعات')} action={<SyncPill ctx={ctx} />} />
      <div className="sl-tools">
        <div className="sl-seg">
          {(['upcoming', 'overdue', 'done'] as const).map((k) => (
            <button key={k} className={tab === k ? 'on' : ''} onClick={() => setTab(k)}>
              {k === 'upcoming' ? t('Upcoming', 'الجاية') : k === 'overdue' ? t('Overdue', 'متأخرة') : t('Done', 'خلصت')}
              <em>{groups[k].length}</em>
            </button>
          ))}
        </div>
      </div>
      <div className="sl-scroll sl-pad top">
        {groups[tab].length === 0 && <p className="sl-muted">{t('Nothing here.', 'مفيش حاجة هنا.')}</p>}
        {groups[tab].map((f) => <FuRow key={f.id} ctx={ctx} f={f} />)}
      </div>
      <button className="sl-fab" onClick={() => nav.push('newFollowup')} aria-label={t('New follow up', 'متابعة جديدة')}><Plus size={24} /></button>
    </>
  );
}

function FollowUpDetails({ ctx, id }: { ctx: Ctx; id: string }) {
  const { api } = ctx;
  const { t, lang, nav } = api;
  const f = ctx.fus.find((x) => x.id === id);
  const [ask, setAsk] = useState(false);
  if (!f) {
    return (<><Bar ctx={ctx} title={t('Follow up', 'متابعة')} /><div className="sl-pad top"><p className="sl-muted">{t('This follow up was deleted.', 'المتابعة دي اتمسحت.')}</p></div></>);
  }
  const c = ctx.clients.find((x) => x.id === f.clientId)!;
  return (
    <>
      <Bar ctx={ctx} title={t('Follow up', 'متابعة')} />
      <div className="sl-scroll sl-pad top">
        <div className="sl-card sl-fud">
          <span className={`sl-st ${f.done ? 'won' : 'contacted'}`}>{f.done ? t('Done', 'خلصت') : t('Scheduled', 'متجدولة')}</span>
          <h2>{f.note[lang]}</h2>
          <p><Clock size={15} /> {fmtWhen(f.at, lang)}</p>
          <button className="sl-link" onClick={() => nav.push('client', { id: c.id })}><span className="sl-av sm">{initials(lang === 'ar' ? c.ar : c.en)}</span>{lang === 'ar' ? c.ar : c.en} · {c.company[lang]}</button>
          <PendingDot s={f.sync} t={t} />
        </div>
        {!f.done && (
          <button className="sl-btn" onClick={() => ctx.markDone(f.id)}><Check size={18} /> {t('Mark as done', 'علّم إنها خلصت')}</button>
        )}
        {ask ? (
          <div className="sl-card sl-confirm">
            <b>{t('Delete this follow up?', 'تمسح المتابعة دي؟')}</b>
            <div>
              <button className="sl-btn ghost" onClick={() => setAsk(false)}>{t('Keep', 'سيبها')}</button>
              <button className="sl-btn danger" onClick={() => { ctx.remove(f.id); nav.pop(); api.toast(t('Follow up deleted', 'المتابعة اتمسحت')); }}>{t('Delete', 'امسح')}</button>
            </div>
          </div>
        ) : (
          <button className="sl-btn ghost" onClick={() => setAsk(true)}><Trash2 size={17} /> {t('Delete', 'مسح')}</button>
        )}
      </div>
    </>
  );
}

function NewFollowUp({ ctx, clientId }: { ctx: Ctx; clientId?: string }) {
  const { api } = ctx;
  const { t, lang, nav } = api;
  const [cid, setCid] = useState(clientId ?? ctx.clients[1].id);
  const [note, setNote] = useState('');
  const [slot, setSlot] = useState(0);
  const slots = useMemo(() => [
    { en: 'In 1 hour', ar: 'بعد ساعة', at: new Date(Date.now() + H) },
    { en: 'Tomorrow 10 AM', ar: 'بكرة 10 ص', at: new Date(today(10).getTime() + 24 * H) },
    { en: 'Next week', ar: 'الأسبوع الجاي', at: new Date(today(11).getTime() + 7 * 24 * H) },
  ], []);
  const save = () => {
    const text = note.trim() || t('Check in about the proposal', 'متابعة بخصوص العرض');
    const f: FollowUp = { id: 'n' + Date.now(), clientId: cid, note: { en: text, ar: text }, at: slots[slot].at, done: false, sync: 'synced' };
    ctx.addFollowUp(f);
    nav.pop();
  };
  return (
    <>
      <Bar ctx={ctx} title={t('New follow up', 'متابعة جديدة')} />
      <div className="sl-scroll sl-pad top sl-form">
        <label>{t('Client', 'العميل')}</label>
        <div className="sl-pick">
          {ctx.clients.slice(0, 6).map((c) => (
            <button key={c.id} className={cid === c.id ? 'on' : ''} onClick={() => setCid(c.id)}><span className="sl-av sm">{initials(lang === 'ar' ? c.ar : c.en)}</span>{lang === 'ar' ? c.ar : c.en}</button>
          ))}
        </div>
        <label htmlFor="sl-note">{t('What to do', 'هتعمل إيه')}</label>
        <textarea id="sl-note" rows={3} value={note} onChange={(e) => setNote(e.target.value)} placeholder={t('e.g. Send the updated price list', 'مثلًا: ابعت قايمة الأسعار الجديدة')} />
        <label>{t('Remind me', 'فكّرني')}</label>
        <div className="sl-filters">
          {slots.map((s, i) => <button key={s.en} className={slot === i ? 'on' : ''} onClick={() => setSlot(i)}>{s[lang]}</button>)}
        </div>
        <p className="sl-hint"><Bell size={14} /> {t('For the demo, the reminder arrives about 6 seconds after you save.', 'في الديمو، التذكير هيوصلك بعد حوالي 6 ثواني من الحفظ.')}</p>
        <button className="sl-btn" onClick={save}>{t('Save follow up', 'حفظ المتابعة')}</button>
      </div>
    </>
  );
}

function NewClient({ ctx }: { ctx: Ctx }) {
  const { api } = ctx;
  const { t, nav } = api;
  const [name, setName] = useState('');
  const [company, setCompany] = useState('');
  const [phone, setPhone] = useState('');
  const [err, setErr] = useState('');
  const save = () => {
    if (!name.trim()) { setErr(t('Enter the client name', 'اكتب اسم العميل')); return; }
    ctx.addClient({ id: 'nc' + Date.now(), en: name.trim(), ar: name.trim(), company: { en: company.trim() || '—', ar: company.trim() || '—' }, phone: phone || '+20', email: '', status: 'lead', sync: 'synced' });
    nav.pop();
  };
  return (
    <>
      <Bar ctx={ctx} title={t('Add client', 'إضافة عميل')} />
      <div className="sl-scroll sl-pad top sl-form">
        <label htmlFor="sl-name">{t('Name', 'الاسم')}</label>
        <input id="sl-name" value={name} onChange={(e) => { setName(e.target.value); setErr(''); }} placeholder={t('Client name', 'اسم العميل')} />
        {err && <p className="sl-err">{err}</p>}
        <label htmlFor="sl-company">{t('Company', 'الشركة')}</label>
        <input id="sl-company" value={company} onChange={(e) => setCompany(e.target.value)} placeholder={t('Optional', 'اختياري')} />
        <label htmlFor="sl-phone">{t('Phone', 'الموبايل')}</label>
        <input id="sl-phone" dir="ltr" value={phone} onChange={(e) => setPhone(e.target.value)} placeholder="+20 1xx xxx xxxx" />
        {ctx.offline && <p className="sl-hint"><CloudOff size={14} /> {t('You are offline. The client is saved on the phone and syncs later.', 'إنت أوفلاين. العميل هيتحفظ على الموبايل ويترفع بعدين.')}</p>}
        <button className="sl-btn" onClick={save}>{t('Save client', 'حفظ العميل')}</button>
      </div>
    </>
  );
}

function Profile({ ctx }: { ctx: Ctx }) {
  const { api } = ctx;
  const { t } = api;
  return (
    <>
      <Bar ctx={ctx} title={t('Profile', 'حسابي')} />
      <div className="sl-scroll sl-pad top">
        <div className="sl-card sl-profile">
          <span className="sl-av lg">AB</span>
          <b>{t('Ahmed Behiry', 'أحمد بحيري')}</b>
          <small>{t('Admin · Salasa Demo Workspace', 'أدمن · مساحة عمل تجريبية')}</small>
        </div>
        <div className="sl-card sl-list">
          <div><RefreshCw size={18} /><span>{t('Offline sync', 'المزامنة')}</span><SyncPill ctx={ctx} /></div>
          <div><Users size={18} /><span>{t('Team members', 'أعضاء الفريق')}</span><b>4</b></div>
          <div><Shield size={18} /><span>{t('Role', 'الصلاحية')}</span><b>{t('Admin', 'أدمن')}</b></div>
          <div><Globe size={18} /><span>{t('Language', 'اللغة')}</span><b>{api.lang === 'ar' ? 'العربية' : 'English'}</b></div>
          <div><Moon size={18} /><span>{t('Dark mode', 'الوضع الغامق')}</span><b>{t('System', 'حسب الجهاز')}</b></div>
          <div className="danger"><LogOut size={18} /><span>{t('Sign out', 'تسجيل خروج')}</span></div>
        </div>
      </div>
    </>
  );
}

