import { useEffect, useRef, useState } from 'react';
import {
  MessageCircle, Users, Globe2, QrCode, Settings, Search, ChevronLeft, ChevronRight, Phone, Video, Send, Paperclip, Mic,
  MicOff, VideoOff, PhoneOff, Volume2, CheckCheck, Plus, MapPin, Camera,
} from 'lucide-react';
import type { AppApi } from '../../shell/types';
import logo from '../../assets/icons/magchat.png';
import './lets.css';

interface Msg {
  id: number;
  me: boolean;
  text: string;
  at: Date;
  kind?: 'location' | 'voice';
}
interface Chat {
  id: string;
  en: string;
  ar: string;
  group?: boolean;
  pub?: boolean;
  members?: number;
  hue: number;
  online?: boolean;
  unread: number;
  msgs: Msg[];
}

const ago = (m: number) => new Date(Date.now() - m * 60000);
let mid = 100;

const seed = (ar: boolean): Chat[] => [
  { id: 'nada', en: 'Nada Mostafa', ar: 'ندى مصطفى', hue: 330, online: true, unread: 2, msgs: [
    { id: 1, me: false, text: ar ? 'خلصت التصميمات؟' : 'Did you finish the designs?', at: ago(42) },
    { id: 2, me: true, text: ar ? 'تقريبًا، فاضل شاشة البروفايل' : 'Almost, only the profile screen is left', at: ago(40) },
    { id: 3, me: false, text: ar ? 'تمام 👌 ابعتهالي لما تخلص' : 'Great 👌 send it when you are done', at: ago(6) },
    { id: 4, me: false, text: ar ? 'هنتكلم فيديو الساعة 8؟' : 'Video call at 8?', at: ago(5) },
  ] },
  { id: 'team', en: 'Mobile Team', ar: 'فريق الموبايل', group: true, members: 8, hue: 270, unread: 5, msgs: [
    { id: 1, me: false, text: ar ? 'يوسف: البيلد الجديد على TestFlight' : 'Youssef: New build is on TestFlight', at: ago(20) },
    { id: 2, me: true, text: ar ? 'بنزله دلوقتي' : 'Downloading it now', at: ago(18) },
    { id: 3, me: false, text: ar ? 'مريم: الإشعارات شغالة على iOS 🎉' : 'Mariam: Push works on iOS 🎉', at: ago(12) },
  ] },
  { id: 'omar', en: 'Omar Khaled', ar: 'عمر خالد', hue: 200, online: false, unread: 0, msgs: [
    { id: 1, me: false, text: ar ? 'أنا وصلت' : "I'm here", at: ago(180), kind: 'location' },
    { id: 2, me: true, text: ar ? 'نازلك حالًا' : 'Coming down now', at: ago(178) },
  ] },
  { id: 'youssef', en: 'Youssef Adel', ar: 'يوسف عادل', hue: 45, online: true, unread: 1, msgs: [
    { id: 1, me: false, text: ar ? 'شوفت الـ PR؟' : 'Did you see the PR?', at: ago(25) },
  ] },
  { id: 'mariam', en: 'Mariam Tarek', ar: 'مريم طارق', hue: 290, online: false, unread: 0, msgs: [
    { id: 1, me: true, text: ar ? 'شكرًا على المساعدة النهارده' : 'Thanks for the help today', at: ago(95) },
    { id: 2, me: false, text: ar ? 'ولا يهمك 😊' : 'Anytime 😊', at: ago(90) },
  ] },
  { id: 'alex', en: 'Alexandria Devs', ar: 'مطورين إسكندرية', pub: true, members: 1240, hue: 20, unread: 0, msgs: [
    { id: 1, me: false, text: ar ? 'حد جرّب Flutter 3.35؟' : 'Anyone tried Flutter 3.35 yet?', at: ago(300) },
  ] },
  { id: 'mom', en: 'Mom', ar: 'ماما', hue: 150, online: true, unread: 0, msgs: [
    { id: 1, me: false, text: ar ? 'هتيجي على الغدا؟' : 'Coming for lunch?', at: ago(1440) },
    { id: 2, me: true, text: ar ? 'أكيد ❤️' : 'Of course ❤️', at: ago(1430) },
  ] },
];

const REPLIES_EN = ['Haha, sounds good', 'On it!', 'Can you send it again?', 'Perfect 👍', 'Talk later?'];
const REPLIES_AR = ['تمام كده', 'ماشي!', 'ممكن تبعتها تاني؟', 'حلو جدًا 👍', 'نتكلم بعدين؟'];

export function LetsApp({ api }: { api: AppApi }) {
  const { nav, lang } = api;
  const [chats, setChats] = useState<Chat[]>(() => seed(lang === 'ar'));
  useEffect(() => {
    setChats(seed(lang === 'ar'));
  }, [lang]);
  const r = nav.route;

  const send = (id: string, text: string, kind?: Msg['kind']) => {
    setChats((cs) => cs.map((c) => (c.id === id ? { ...c, msgs: [...c.msgs, { id: mid++, me: true, text, at: new Date(), kind }] } : c)));
  };
  const receive = (id: string, text: string) => {
    setChats((cs) => cs.map((c) => (c.id === id ? { ...c, msgs: [...c.msgs, { id: mid++, me: false, text, at: new Date() }] } : c)));
  };
  const read = (id: string) => setChats((cs) => cs.map((c) => (c.id === id ? { ...c, unread: 0 } : c)));

  let screen: JSX.Element;
  switch (r.name) {
    case 'chat':
      screen = <Conversation api={api} chat={chats.find((c) => c.id === r.params?.id) ?? chats[0]} send={send} receive={receive} read={read} />;
      break;
    case 'incoming':
      screen = <Incoming api={api} chat={chats.find((c) => c.id === (r.params?.id ?? 'nada'))!} video={r.params?.video !== 0} />;
      break;
    case 'call':
      screen = <InCall api={api} chat={chats.find((c) => c.id === (r.params?.id ?? 'nada'))!} video={r.params?.video !== 0} />;
      break;
    case 'qr':
      screen = <MyQr api={api} />;
      break;
    default:
      screen = <ChatList api={api} chats={chats} tab={String(r.params?.tab ?? 'private')} />;
  }
  const fullscreen = r.name === 'incoming' || r.name === 'call';
  return <div className={`lt ${fullscreen ? 'full' : ''}`}>{screen}</div>;
}

function Avatar({ c, size = 48, ring }: { c: Pick<Chat, 'en' | 'ar' | 'hue' | 'group' | 'pub'>; size?: number; ring?: boolean }) {
  const name = c.en;
  const init = name.split(' ').map((w) => w[0]).slice(0, 2).join('');
  return (
    <span className={`lt-av ${ring ? 'ring' : ''}`} style={{ width: size, height: size, background: `linear-gradient(140deg, hsl(${c.hue} 70% 62%), hsl(${(c.hue + 40) % 360} 60% 42%))`, fontSize: size * 0.36 }}>
      {c.group ? <Users size={size * 0.42} /> : c.pub ? <Globe2 size={size * 0.42} /> : init}
    </span>
  );
}

const time = (d: Date, lang: 'en' | 'ar') => d.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', { hour: 'numeric', minute: '2-digit' });

function ChatList({ api, chats, tab }: { api: AppApi; chats: Chat[]; tab: string }) {
  const { t, lang, nav } = api;
  const [cur, setCur] = useState(tab);
  const [q, setQ] = useState('');
  const list = chats.filter((c) => (cur === 'groups' ? c.group : cur === 'public' ? c.pub : !c.group && !c.pub)).filter((c) => (c.en + c.ar).toLowerCase().includes(q.toLowerCase()));
  const stories = chats.filter((c) => !c.group && !c.pub);
  return (
    <div className="lt-home">
      <header className="lt-top">
        <img src={logo} alt="" />
        <h1>Let's</h1>
        <button className="lt-ib" onClick={() => nav.push('qr')} aria-label="QR"><QrCode size={20} /></button>
        <button className="lt-ib" onClick={() => api.toast(t('Settings are not part of the demo', 'الإعدادات مش في الديمو'))} aria-label={t('Settings', 'الإعدادات')}><Settings size={20} /></button>
      </header>
      <div className="lt-stories">
        <button className="lt-story me" onClick={() => api.toast(t('Opens the camera in the real app', 'بيفتح الكاميرا في التطبيق الحقيقي'))}>
          <span className="lt-av add"><Camera size={20} /><Plus size={12} className="lt-plus" /></span>
          <small>{t('Your story', 'الستوري')}</small>
        </button>
        {stories.map((c) => (
          <button key={c.id} className="lt-story" onClick={() => nav.push('chat', { id: c.id })}>
            <Avatar c={c} size={54} ring />
            <small>{(lang === 'ar' ? c.ar : c.en).split(' ')[0]}</small>
          </button>
        ))}
      </div>
      <div className="lt-seg">
        {[['private', t('Private', 'خاص')], ['groups', t('Groups', 'جروبات')], ['public', t('Public', 'عام')]].map(([k, l]) => (
          <button key={k} className={cur === k ? 'on' : ''} onClick={() => setCur(k)}>{l}</button>
        ))}
      </div>
      <label className="lt-search"><Search size={16} /><input id="lt-search" value={q} onChange={(e) => setQ(e.target.value)} placeholder={t('Search chats', 'دوّر في الشاتات')} /></label>
      <div className="lt-list">
        {list.map((c) => {
          const last = c.msgs[c.msgs.length - 1];
          return (
            <button key={c.id} className="lt-row" onClick={() => nav.push('chat', { id: c.id })}>
              <span className="lt-row-av"><Avatar c={c} />{c.online && <i className="lt-on" />}</span>
              <span className="lt-row-txt">
                <span className="lt-row-top"><b>{lang === 'ar' ? c.ar : c.en}</b><small className={c.unread ? 'hot' : ''}>{time(last.at, lang)}</small></span>
                <span className="lt-row-bot">
                  <span className="lt-last">{last.me && <CheckCheck size={14} className="seen" />}{last.kind === 'location' ? t('📍 Live location', '📍 موقع مباشر') : last.text}</span>
                  {c.unread > 0 && <em>{c.unread}</em>}
                </span>
                {(c.group || c.pub) && <small className="lt-members">{t(`${c.members} members`, `${c.members} عضو`)}</small>}
              </span>
            </button>
          );
        })}
      </div>
      <nav className="lt-nav">
        {[[MessageCircle, t('Chats', 'الشاتات'), true], [Users, t('Groups', 'الجروبات'), false], [QrCode, t('Scan', 'امسح'), false], [Settings, t('Settings', 'الإعدادات'), false]].map(([I, l, on], i) => {
          const Icon = I as typeof Users;
          return (
            <button key={i} className={on ? 'on' : ''} onClick={() => (i === 1 ? setCur('groups') : i === 2 ? nav.push('qr') : i === 0 ? setCur('private') : api.toast(t('Settings are not part of the demo', 'الإعدادات مش في الديمو')))}>
              <Icon size={21} /><span>{l as string}</span>
            </button>
          );
        })}
      </nav>
    </div>
  );
}

function Conversation({ api, chat, send, receive, read }: { api: AppApi; chat: Chat; send: (id: string, t: string, k?: Msg['kind']) => void; receive: (id: string, t: string) => void; read: (id: string) => void }) {
  const { t, lang, nav } = api;
  const [text, setText] = useState('');
  const [typing, setTyping] = useState(false);
  const end = useRef<HTMLDivElement>(null);
  const Chev = lang === 'ar' ? ChevronRight : ChevronLeft;
  useEffect(() => {
    read(chat.id);
  }, [chat.id]); // eslint-disable-line react-hooks/exhaustive-deps
  // Newer Chrome returns a Promise from scrollIntoView; never hand it back to React as a cleanup.
  useEffect(() => {
    end.current?.scrollIntoView({ block: 'end' });
  }, [chat.msgs.length, typing]);

  const reply = () => {
    window.setTimeout(() => setTyping(true), 700);
    window.setTimeout(() => {
      setTyping(false);
      const pool = lang === 'ar' ? REPLIES_AR : REPLIES_EN;
      receive(chat.id, pool[Math.floor(Math.random() * pool.length)]);
    }, 2400);
  };
  const submit = () => {
    if (!text.trim()) return;
    send(chat.id, text.trim());
    setText('');
    reply();
  };
  return (
    <div className="lt-conv">
      <header className="lt-chatbar">
        <button className="lt-ib" onClick={nav.pop} aria-label={t('Back', 'رجوع')}><Chev size={22} /></button>
        <Avatar c={chat} size={38} />
        <span className="lt-chatbar-txt">
          <b>{lang === 'ar' ? chat.ar : chat.en}</b>
          <small>{typing ? t('typing…', 'بيكتب…') : chat.group || chat.pub ? t(`${chat.members} members`, `${chat.members} عضو`) : chat.online ? t('online', 'أونلاين') : t('last seen recently', 'آخر ظهور من شوية')}</small>
        </span>
        <button className="lt-ib" onClick={() => nav.push('call', { id: chat.id, video: 0 })} aria-label={t('Voice call', 'مكالمة صوتية')}><Phone size={20} /></button>
        <button className="lt-ib" onClick={() => nav.push('call', { id: chat.id, video: 1 })} aria-label={t('Video call', 'مكالمة فيديو')}><Video size={21} /></button>
      </header>
      <div className="lt-msgs">
        <div className="lt-day">{t('Today', 'النهارده')}</div>
        {chat.msgs.map((m) => (
          <div key={m.id} className={`lt-msg ${m.me ? 'me' : ''}`}>
            {m.kind === 'location' ? (
              <div className="lt-loc">
                <div className="lt-map"><MapPin size={26} /></div>
                <b>{t('Live location', 'موقع مباشر')}</b>
                <small>{t('Sharing for 15 min', 'مشاركة لمدة 15 دقيقة')}</small>
              </div>
            ) : (
              <span>{m.text}</span>
            )}
            <small>{time(m.at, lang)}{m.me && <CheckCheck size={13} />}</small>
          </div>
        ))}
        {typing && <div className="lt-msg typing"><i /><i /><i /></div>}
        <div ref={end} />
      </div>
      <div className="lt-compose">
        <button className="lt-ib" onClick={() => { send(chat.id, '', 'location'); reply(); }} aria-label={t('Share location', 'شارك الموقع')}><Paperclip size={20} /></button>
        <input id="lt-compose" value={text} onChange={(e) => setText(e.target.value)} onKeyDown={(e) => e.key === 'Enter' && submit()} placeholder={t('Message', 'اكتب رسالة')} />
        <button className="lt-send" onClick={submit} aria-label={t('Send', 'إرسال')}>{text.trim() ? <Send size={18} className="flip-rtl" /> : <Mic size={18} />}</button>
      </div>
    </div>
  );
}

function Incoming({ api, chat, video }: { api: AppApi; chat: Chat; video: boolean }) {
  const { t, lang, nav } = api;
  return (
    <div className="lt-call" style={{ ['--h' as string]: chat.hue }}>
      <div className="lt-call-head">
        <small>{video ? t("Let's video…", 'مكالمة فيديو من Let’s…') : t("Let's audio…", 'مكالمة صوتية من Let’s…')}</small>
        <h2>{lang === 'ar' ? chat.ar : chat.en}</h2>
      </div>
      <div className="lt-pulse"><Avatar c={chat} size={132} /></div>
      <div className="lt-call-actions two">
        <span><button className="decline" onClick={() => { nav.reset('list'); api.toast(t('Call declined', 'المكالمة اترفضت')); }} aria-label={t('Decline', 'رفض')}><PhoneOff size={28} /></button><small>{t('Decline', 'رفض')}</small></span>
        <span><button className="accept" onClick={() => nav.replace('call', { id: chat.id, video: video ? 1 : 0 })} aria-label={t('Accept', 'رد')}>{video ? <Video size={28} /> : <Phone size={28} />}</button><small>{t('Accept', 'رد')}</small></span>
      </div>
    </div>
  );
}

function InCall({ api, chat, video }: { api: AppApi; chat: Chat; video: boolean }) {
  const { t, lang, nav } = api;
  const [sec, setSec] = useState(0);
  const [connected, setConnected] = useState(false);
  const [mute, setMute] = useState(false);
  const [cam, setCam] = useState(video);
  const [spk, setSpk] = useState(video);
  useEffect(() => {
    const c = window.setTimeout(() => setConnected(true), 1500);
    const id = window.setInterval(() => setSec((s) => s + 1), 1000);
    return () => { window.clearTimeout(c); window.clearInterval(id); };
  }, []);
  const mm = String(Math.floor(Math.max(0, sec - 1) / 60)).padStart(2, '0');
  const ss = String(Math.max(0, sec - 1) % 60).padStart(2, '0');
  return (
    <div className={`lt-call ${cam && connected ? 'cam' : ''}`} style={{ ['--h' as string]: chat.hue }}>
      {cam && connected && <div className="lt-self"><span>{t('You', 'إنت')}</span></div>}
      <div className="lt-call-head">
        <small>{connected ? <span dir="ltr">{mm}:{ss}</span> : t('Connecting…', 'جاري الاتصال…')}</small>
        <h2>{lang === 'ar' ? chat.ar : chat.en}</h2>
        {connected && <small className="lt-enc">{t('End-to-end call over Agora', 'مكالمة عن طريق Agora')}</small>}
      </div>
      {!(cam && connected) && <div className={connected ? '' : 'lt-pulse'}><Avatar c={chat} size={132} /></div>}
      <div className="lt-call-actions">
        <span><button className={mute ? 'on' : ''} onClick={() => setMute((m) => !m)} aria-label={t('Mute', 'كتم')}>{mute ? <MicOff size={24} /> : <Mic size={24} />}</button><small>{t('Mute', 'كتم')}</small></span>
        <span><button className={cam ? 'on' : ''} onClick={() => setCam((c) => !c)} aria-label={t('Camera', 'الكاميرا')}>{cam ? <Video size={24} /> : <VideoOff size={24} />}</button><small>{t('Camera', 'الكاميرا')}</small></span>
        <span><button className={spk ? 'on' : ''} onClick={() => setSpk((s) => !s)} aria-label={t('Speaker', 'السماعة')}><Volume2 size={24} /></button><small>{t('Speaker', 'السماعة')}</small></span>
        <span><button className="decline" onClick={() => { if (nav.canPop) nav.pop(); else nav.reset('list'); api.toast(t(`Call ended · ${mm}:${ss}`, `المكالمة خلصت · ${mm}:${ss}`)); }} aria-label={t('End', 'إنهاء')}><PhoneOff size={24} /></button><small>{t('End', 'إنهاء')}</small></span>
      </div>
    </div>
  );
}

function MyQr({ api }: { api: AppApi }) {
  const { t, lang, nav } = api;
  const Chev = lang === 'ar' ? ChevronRight : ChevronLeft;
  // Deterministic pseudo-QR pattern, drawn as a 25×25 grid.
  const cells: boolean[] = [];
  let seedN = 7;
  for (let i = 0; i < 625; i++) { seedN = (seedN * 9301 + 49297) % 233280; cells.push(seedN / 233280 > 0.52); }
  const finder = (x: number, y: number) => [[0, 0], [18, 0], [0, 18]].some(([fx, fy]) => x >= fx && x < fx + 7 && y >= fy && y < fy + 7);
  const finderOn = (x: number, y: number) => [[0, 0], [18, 0], [0, 18]].some(([fx, fy]) => { const dx = x - fx, dy = y - fy; if (dx < 0 || dy < 0 || dx > 6 || dy > 6) return false; return dx === 0 || dy === 0 || dx === 6 || dy === 6 || (dx >= 2 && dx <= 4 && dy >= 2 && dy <= 4); });
  return (
    <div className="lt-qr">
      <header className="lt-chatbar plain">
        <button className="lt-ib" onClick={nav.pop} aria-label={t('Back', 'رجوع')}><Chev size={22} /></button>
        <span className="lt-chatbar-txt"><b>{t('My QR code', 'الـ QR بتاعي')}</b></span>
      </header>
      <div className="lt-qr-card">
        <Avatar c={{ en: 'Ahmed Behiry', ar: 'أحمد بحيري', hue: 300 }} size={64} />
        <b>{t('Ahmed Behiry', 'أحمد بحيري')}</b>
        <small dir="ltr">@a7medbehiry</small>
        <svg viewBox="0 0 25 25" className="lt-qr-code" shapeRendering="crispEdges" aria-label="QR">
          <rect width="25" height="25" fill="#fff" />
          {cells.map((on, i) => {
            const x = i % 25, y = Math.floor(i / 25);
            const v = finder(x, y) ? finderOn(x, y) : on;
            return v ? <rect key={i} x={x} y={y} width="1" height="1" fill="#1a0b14" /> : null;
          })}
        </svg>
        <p>{t('Friends scan this to open a chat with you directly.', 'صحابك يمسحوا الكود ده يفتحلهم شات معاك على طول.')}</p>
      </div>
    </div>
  );
}
