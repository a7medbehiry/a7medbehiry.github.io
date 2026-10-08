import { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { Bell, Lock, Unlock, Languages, ArrowLeft, RotateCcw, Smartphone, Info } from 'lucide-react';
import type { AppApi, DemoDef, DemoNotification, Lang, Nav, Route } from './types';
import './shell.css';

const FRAME_W = 402;
const FRAME_H = 860;

interface Delivered {
  key: number;
  n: DemoNotification;
  at: Date;
}

function clock(d: Date, lang: Lang) {
  return d.toLocaleTimeString(lang === 'ar' ? 'ar-EG' : 'en-US', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(/\s?[AP]M$/i, '');
}

function useScale() {
  const [scale, setScale] = useState(1);
  useEffect(() => {
    const fit = () => {
      const w = window.innerWidth;
      const h = window.innerHeight;
      const narrow = w < 900;
      const byH = (h - (narrow ? 110 : 96)) / FRAME_H;
      const byW = (narrow ? w - 32 : Math.min(w * 0.55, 520)) / FRAME_W;
      setScale(Math.max(0.5, Math.min(1, byH, byW)));
    };
    fit();
    window.addEventListener('resize', fit);
    return () => window.removeEventListener('resize', fit);
  }, []);
  return scale;
}

export function DemoShell({ demo, siteLang, onExit }: { demo: DemoDef; siteLang: Lang; onExit: () => void }) {
  const [lang, setLang] = useState<Lang>(siteLang);
  const [stack, setStack] = useState<Route[]>([demo.initialRoute]);
  const [flags, setFlags] = useState<Record<string, boolean>>(() =>
    Object.fromEntries((demo.toggles ?? []).map((t) => [t.key, t.initial])),
  );
  const [locked, setLocked] = useState(false);
  const [banner, setBanner] = useState<Delivered | null>(null);
  const [inbox, setInbox] = useState<Delivered[]>([]);
  const [toastText, setToastText] = useState<string | null>(null);
  const [now, setNow] = useState(new Date());
  const [appKey, setAppKey] = useState(0);
  const keyRef = useRef(1);
  const bannerTimer = useRef<number>();
  const toastTimer = useRef<number>();
  const scale = useScale();
  const pt = (en: string, ar: string) => (siteLang === 'ar' ? ar : en);

  useEffect(() => {
    const id = window.setInterval(() => setNow(new Date()), 15000);
    return () => window.clearInterval(id);
  }, []);

  const nav: Nav = useMemo(
    () => ({
      route: stack[stack.length - 1],
      canPop: stack.length > 1,
      push: (name, params) => setStack((s) => [...s, { name, params }]),
      replace: (name, params) => setStack((s) => [...s.slice(0, -1), { name, params }]),
      reset: (name, params) => setStack([{ name, params }]),
      pop: () => setStack((s) => (s.length > 1 ? s.slice(0, -1) : s)),
    }),
    [stack],
  );

  const deliver = useCallback((n: DemoNotification) => {
    const d: Delivered = { key: keyRef.current++, n, at: new Date() };
    setInbox((list) => [d, ...list].slice(0, 6));
    setBanner(d);
    window.clearTimeout(bannerTimer.current);
    bannerTimer.current = window.setTimeout(() => setBanner(null), 5200);
  }, []);

  const notify = useCallback(
    (n: DemoNotification, delayMs = 0) => {
      if (delayMs > 0) window.setTimeout(() => deliver(n), delayMs);
      else deliver(n);
    },
    [deliver],
  );

  const toast = useCallback((text: string) => {
    setToastText(text);
    window.clearTimeout(toastTimer.current);
    toastTimer.current = window.setTimeout(() => setToastText(null), 2400);
  }, []);

  const api: AppApi = {
    nav,
    lang,
    t: (en, ar) => (lang === 'ar' ? ar : en),
    flags,
    setFlag: (k, v) => setFlags((f) => ({ ...f, [k]: v })),
    notify,
    toast,
  };

  const open = (d: Delivered) => {
    setBanner(null);
    setLocked(false);
    setInbox((list) => list.filter((x) => x.key !== d.key));
    setStack([demo.initialRoute, d.n.target].filter((r, i, arr) => i === 0 || r.name !== arr[0].name));
  };

  const restart = () => {
    setStack([demo.initialRoute]);
    setInbox([]);
    setBanner(null);
    setLocked(false);
    setFlags(Object.fromEntries((demo.toggles ?? []).map((t) => [t.key, t.initial])));
    setAppKey((k) => k + 1);
  };

  const App = demo.App;
  const dir = lang === 'ar' ? 'rtl' : 'ltr';

  return (
    <div className="shell" dir={siteLang === 'ar' ? 'rtl' : 'ltr'}>
      <header className="shell-top">
        <button className="shell-back" onClick={onExit}>
          <ArrowLeft size={18} className="flip-rtl" aria-hidden />
          <span>{pt('Back to portfolio', 'رجوع للبورتفوليو')}</span>
        </button>
        <span className="shell-badge">{pt('Interactive demo · sample data', 'ديمو تفاعلي · بيانات تجريبية')}</span>
      </header>

      <div className="shell-body">
        <div className="phone-slot" style={{ width: FRAME_W * scale, height: FRAME_H * scale }}>
          <div className="phone" style={{ transform: `scale(${scale})` }}>
            <div className="phone-btn phone-btn-l1" />
            <div className="phone-btn phone-btn-l2" />
            <div className="phone-btn phone-btn-r" />
            <div className="phone-screen" dir={dir} style={{ fontFamily: demo.fontFamily[lang] }}>
              <div className="app-viewport">
                <App key={appKey} api={api} />
              </div>

              <div className={`status ${locked ? 'status-light' : demo.statusDark ? 'status-dark' : 'status-light'}`} dir="ltr">
                <span className="status-time">{clock(now, 'en')}</span>
                <span className="island" />
                <span className="status-icons" aria-hidden>
                  <svg width="18" height="11" viewBox="0 0 18 11"><rect x="0" y="7" width="3" height="4" rx="1" /><rect x="5" y="5" width="3" height="6" rx="1" /><rect x="10" y="2.5" width="3" height="8.5" rx="1" /><rect x="15" y="0" width="3" height="11" rx="1" /></svg>
                  <svg width="16" height="11" viewBox="0 0 16 11"><path d="M8 2.2c2.3 0 4.4.9 6 2.4l1.2-1.3A10.2 10.2 0 0 0 8 .4C5.2.4 2.7 1.5.8 3.3L2 4.6a8.4 8.4 0 0 1 6-2.4Zm0 3.5c1.3 0 2.5.5 3.5 1.4l1.2-1.3A6.8 6.8 0 0 0 8 3.9 6.8 6.8 0 0 0 3.3 5.8l1.2 1.3c1-.9 2.2-1.4 3.5-1.4Zm0 3.4c.5 0 1 .2 1.3.5L8 11 6.7 9.6c.3-.3.8-.5 1.3-.5Z" /></svg>
                  <span className="battery"><span /></span>
                </span>
              </div>

              {locked && (
                <div className="lock" dir={dir}>
                  <div className="lock-head">
                    <Lock size={16} aria-hidden />
                    <div className="lock-date">
                      {now.toLocaleDateString(lang === 'ar' ? 'ar-EG' : 'en-US', { weekday: 'long', day: 'numeric', month: 'long' })}
                    </div>
                    <div className="lock-clock" dir="ltr">{clock(now, 'en')}</div>
                  </div>
                  <div className="lock-list">
                    {inbox.length === 0 && (
                      <p className="lock-empty">
                        {lang === 'ar' ? 'مفيش إشعارات. ابعت واحد من اللوحة.' : 'No notifications. Send one from the panel.'}
                      </p>
                    )}
                    {inbox.map((d) => (
                      <NotificationCard key={d.key} d={d} demo={demo} lang={lang} onOpen={() => open(d)} />
                    ))}
                  </div>
                  <button className="lock-unlock" onClick={() => setLocked(false)}>
                    {lang === 'ar' ? 'اسحب للفتح' : 'Tap to unlock'}
                  </button>
                </div>
              )}

              {banner && !locked && (
                <div className="banner-wrap" dir={dir}>
                  <NotificationCard d={banner} demo={demo} lang={lang} onOpen={() => open(banner)} floating />
                </div>
              )}

              {toastText && <div className="toast" role="status">{toastText}</div>}
              <div className={`home-ind ${demo.statusDark || locked ? '' : 'home-ind-light'}`} />
            </div>
          </div>
        </div>

        <aside className="panel">
          <div className="panel-app">
            <div className="panel-icon">{demo.icon}</div>
            <div>
              <h1>{demo.name}</h1>
              <p>{demo.tagline[siteLang]}</p>
            </div>
          </div>

          <section className="panel-sec">
            <h2><Bell size={15} aria-hidden /> {pt('Send a push notification', 'ابعت إشعار')}</h2>
            <div className="panel-stack">
              {demo.notifications.map((n) => (
                <button key={n.id} className="panel-notif" style={{ ['--acc' as string]: demo.accent }} onClick={() => deliver(n)}>
                  <strong>{n.title[siteLang]}</strong>
                  <span>{n.body[siteLang]}</span>
                </button>
              ))}
            </div>
            <p className="panel-hint">{pt('Tap the banner on the phone to open the right screen.', 'دوس على الإشعار في الموبايل هيفتحلك الشاشة بتاعته.')}</p>
          </section>

          <section className="panel-sec">
            <h2><Smartphone size={15} aria-hidden /> {pt('Jump to a screen', 'روح لشاشة')}</h2>
            <div className="chips">
              {demo.jumps.map((j) => (
                <button key={j.label.en} className="chip" onClick={() => { setLocked(false); setStack([demo.initialRoute, j.route].filter((r, i, arr) => i === 0 || r.name !== arr[0].name)); }}>
                  {j.label[siteLang]}
                </button>
              ))}
            </div>
          </section>

          {demo.toggles && demo.toggles.length > 0 && (
            <section className="panel-sec">
              {demo.toggles.map((tg) => (
                <label key={tg.key} className="switch-row">
                  <span>
                    <strong>{tg.label[siteLang]}</strong>
                    <small>{tg.hint[siteLang]}</small>
                  </span>
                  <input
                    id={`toggle-${demo.id}-${tg.key}`}
                    type="checkbox"
                    role="switch"
                    checked={!!flags[tg.key]}
                    onChange={(e) => setFlags((f) => ({ ...f, [tg.key]: e.target.checked }))}
                  />
                </label>
              ))}
            </section>
          )}

          <section className="panel-sec panel-row">
            <button className="tool" onClick={() => setLocked((l) => !l)}>
              {locked ? <Unlock size={16} aria-hidden /> : <Lock size={16} aria-hidden />}
              {locked ? pt('Unlock', 'افتح القفل') : pt('Lock screen', 'شاشة القفل')}
            </button>
            <button className="tool" onClick={() => setLang((l) => (l === 'en' ? 'ar' : 'en'))}>
              <Languages size={16} aria-hidden />
              {lang === 'en' ? 'العربية' : 'English'}
            </button>
            <button className="tool" onClick={restart}>
              <RotateCcw size={16} aria-hidden />
              {pt('Restart', 'من الأول')}
            </button>
          </section>

          <section className="panel-sec panel-guide">
            <h2><Info size={15} aria-hidden /> {pt('Things to try', 'جرّب كده')}</h2>
            <ul>
              {demo.guide[siteLang].map((g) => (
                <li key={g}>{g}</li>
              ))}
            </ul>
          </section>
        </aside>
      </div>
    </div>
  );
}

function NotificationCard({ d, demo, lang, onOpen, floating }: { d: Delivered; demo: DemoDef; lang: Lang; onOpen: () => void; floating?: boolean }) {
  const ago = Math.max(0, Math.round((Date.now() - d.at.getTime()) / 60000));
  return (
    <button className={`notif ${floating ? 'notif-float' : ''}`} onClick={onOpen}>
      <span className="notif-icon">{demo.icon}</span>
      <span className="notif-text">
        <span className="notif-top">
          <strong>{demo.name}</strong>
          <span>{ago === 0 ? (lang === 'ar' ? 'الآن' : 'now') : lang === 'ar' ? `منذ ${ago} د` : `${ago}m ago`}</span>
        </span>
        <span className="notif-title">{d.n.title[lang]}</span>
        <span className="notif-body">{d.n.body[lang]}</span>
      </span>
    </button>
  );
}
