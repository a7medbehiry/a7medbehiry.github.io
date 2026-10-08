import { useEffect, useRef, useState } from 'react';
import {
  ArrowUpRight, Download, Linkedin, Github, ChevronLeft, ChevronRight, Play, Mail, Copy, Check, Plus, Smartphone, Zap, Server,
  Layers, Rocket, ShieldCheck, MessageCircle, Globe,
} from 'lucide-react';
import type { Lang } from '../shell/types';
import { handled, alsoShipped, certGroups, featuredCerts, experienceCertUrl, experience, faq, processSteps, profile, projects, services, skills, writing } from '../content';
import { shopsiiaDemo } from '../demos/shopsiia';
import { salasaDemo } from '../demos/salasa';
import { letsDemo } from '../demos/lets';
import { MiniPhone } from './MiniPhone';
import { tech, PlayMark, AppleMark } from './TechIcons';
import photo from '../assets/photo.jpg';
import cs50Img from '../assets/certs/cs50.jpg';
import perfImg from '../assets/certs/performance.jpg';
import bestImg from '../assets/certs/best-employee.jpg';

const certImg = { cs50: cs50Img, performance: perfImg, 'best-employee': bestImg };
const issuerTint: Record<string, string> = { Udemy: '#a435f0', Harvard: '#a51c30', ITI: '#c8102e', Udacity: '#02b3e4', Cisco: '#049fd9', Anthropic: '#d97757', SoloLearn: '#1d8a5b', TeraCourses: '#10b04a', 'Cognitive Class': '#3b6fd8', 'Misr Public Library': '#7a5c2e' };
import './site.css';

const T = (lang: Lang) => (en: string, ar: string) => (lang === 'ar' ? ar : en);

const carousel = [
  { demo: shopsiiaDemo, route: { name: 'home' } },
  { demo: salasaDemo, route: { name: 'dashboard' } },
  { demo: letsDemo, route: { name: 'list' } },
  { demo: shopsiiaDemo, route: { name: 'product', params: { id: 'p1' } } },
  { demo: letsDemo, route: { name: 'chat', params: { id: 'nada' } } },
  { demo: salasaDemo, route: { name: 'followups' } },
];

const panel: Record<string, string> = {
  shopsiia: 'linear-gradient(150deg,#FFE27A,#F9BE00 55%,#F26522)',
  lets: 'linear-gradient(150deg,#3a1d3f,#170f1a)',
  homecar: 'linear-gradient(150deg,#d9f2c8,#7fbf5a)',
  salasa: 'linear-gradient(150deg,#3b5bb5,#172554)',
  taqy: 'linear-gradient(150deg,#ffe1dc,#f26b5b)',
  perfume: 'linear-gradient(150deg,#ffd9bf,#f2732a)',
};
const demoFor: Record<string, typeof shopsiiaDemo> = { shopsiia: shopsiiaDemo, salasa: salasaDemo, lets: letsDemo };
const demoRoute: Record<string, { name: string; params?: Record<string, string> }> = {
  shopsiia: { name: 'home' },
  salasa: { name: 'dashboard' },
  lets: { name: 'list' },
};
const serviceIcons = [Smartphone, Zap, Server, Layers, Rocket];

function StoreBtn({ kind, href }: { kind: 'apple' | 'play'; href: string }) {
  return (
    <a className="store-btn" href={href} target="_blank" rel="noopener noreferrer" dir="ltr">
      <span className="store-ic">{kind === 'apple' ? <AppleMark /> : <PlayMark />}</span>
      <span className="store-txt">
        <small>{kind === 'apple' ? 'Download on the' : 'GET IT ON'}</small>
        <b>{kind === 'apple' ? 'App Store' : 'Google Play'}</b>
      </span>
    </a>
  );
}

export function Site({ lang, setLang, openDemo }: { lang: Lang; setLang: (l: Lang) => void; openDemo: (id: string) => void }) {
  const t = T(lang);

  return (
    <div className="site">
      <header className="nav-wrap">
        <nav className="nav" aria-label={t('Main', 'الرئيسية')}>
          <a href="#top" className="nav-logo">{t('Portfolio', 'بورتفوليو')}</a>
          <div className="nav-links">
            <a href="#services">{t('What I Build', 'بعمل إيه')}</a>
            <a href="#work">{t('Selected Work', 'أعمال مختارة')}</a>
            <a href="#experience">{t('My Journey', 'رحلتي')}</a>
            <a href="#credentials">{t('Credentials', 'الشهادات')}</a>
          </div>
          <div className="nav-end">
            <div className="seg" role="group" aria-label={t('Language', 'اللغة')}>
              <button className={lang === 'en' ? 'on' : ''} onClick={() => setLang('en')}>EN</button>
              <button className={lang === 'ar' ? 'on' : ''} onClick={() => setLang('ar')}>عربي</button>
            </div>
            <a className="pill-dark" href="#contact">{t("Let's Build Together", 'يلا نبدأ')} <ArrowUpRight size={14} className="flip-rtl" aria-hidden /></a>
          </div>
        </nav>
      </header>

      <main id="top">
        <Hero lang={lang} />
        <Services lang={lang} />
        <Latest lang={lang} openDemo={openDemo} />
        <Work lang={lang} openDemo={openDemo} />
        <Journey lang={lang} />
        <Process lang={lang} />
        <Credentials lang={lang} />
        <Faq lang={lang} />
        <Contact lang={lang} />
      </main>

      <footer className="foot">
        <span>{profile.name[lang]} · © {new Date().getFullYear()} {t('All rights reserved.', 'كل الحقوق محفوظة.')}</span>
        <span>{t('Demos are web recreations of the Flutter apps with sample data.', 'الديموهات نسخ ويب من تطبيقات Flutter ببيانات تجريبية.')}</span>
        <a href="#top">{t('Back to top ↑', 'لأعلى ↑')}</a>
      </footer>
    </div>
  );
}

function Hero({ lang }: { lang: Lang }) {
  const t = T(lang);
  const [active, setActive] = useState(0);
  useEffect(() => {
    const id = window.setInterval(() => setActive((a) => (a + 1) % tech.length), 2200);
    return () => window.clearInterval(id);
  }, []);
  return (
    <section className="hero">
      <div className="hero-copy">
        <div className="hero-stores" aria-hidden>
          <span><AppleMark /></span>
          <span><PlayMark /></span>
        </div>
        <h1>
          Flutter <em>{t('Developer', 'Developer')}</em>
        </h1>
        <p className="hero-name">{profile.name[lang]} · {profile.location[lang]}</p>
        <p className="hero-lede">
          {t(
            'I build Android and iOS apps that ship to the stores and hold up in production: e-commerce, real-time chat and calls, on-demand services and business tools. Three of them run right here, so you can try them before we talk.',
            'ببني تطبيقات Android و iOS بتتنشر على الستور وبتشتغل كويس في الإنتاج: تجارة إلكترونية، وشات ومكالمات لحظية، وخدمات عند الطلب، وأدوات بيزنس. وتلاتة منهم شغالين هنا، تقدر تجربهم قبل ما نتكلم.',
          )}
        </p>
        <div className="hero-actions">
          <a className="pill-card" href={profile.cv} target="_blank" rel="noopener noreferrer">
            <Download size={18} aria-hidden />
            <span><b>{t('Download CV', 'تحميل الـ CV')}</b><small>{t('Resume / CV (PDF)', 'السيرة الذاتية (PDF)')}</small></span>
          </a>
          <a className="pill-card" href={profile.linkedin} target="_blank" rel="noopener noreferrer">
            <span className="li-badge"><Linkedin size={13} aria-hidden /></span>
            <span><b>LinkedIn</b><small>{t('Connect Profile', 'تواصل معايا')}</small></span>
          </a>
        </div>
      </div>

      <div className="orbit-wrap">
        <div className="orbit">
          <div className="orbit-ring" />
          <div className="orbit-photo"><img src={photo} alt={profile.name[lang]} /></div>
          {tech.map((x, i) => {
            const a = (i / tech.length) * Math.PI * 2 - Math.PI / 2;
            return (
              <button
                key={x.name}
                className={`orbit-ic ${i === active ? 'on' : ''}`}
                style={{ left: `${50 + Math.cos(a) * 46}%`, top: `${50 + Math.sin(a) * 46}%` }}
                onClick={() => setActive(i)}
                aria-label={x.name}
              >
                {x.svg}
              </button>
            );
          })}
        </div>
        <div className="orbit-caption">
          <i aria-hidden />
          <b>{tech[active].name}</b>
          <span>·</span>
          <span>{tech[active].label[lang]}</span>
        </div>
      </div>
    </section>
  );
}

function SecHead({ kicker, title, sub }: { kicker?: string; title: string; sub?: string }) {
  return (
    <div className="sec-head">
      {kicker && <p className="kicker">{kicker}</p>}
      <h2>{title}</h2>
      {sub && <p className="sec-sub">{sub}</p>}
    </div>
  );
}

function Services({ lang }: { lang: Lang }) {
  const t = T(lang);
  const [active, setActive] = useState(2);
  useEffect(() => {
    const id = window.setInterval(() => setActive((a) => (a + 1) % services.length), 3200);
    return () => window.clearInterval(id);
  }, []);
  return (
    <section className="services" id="services">
      <p className="kicker center">{t('What I build', 'بعمل إيه')}</p>
      <SecHead
        title={t('Services & Architecture', 'الخدمات والمعمارية')}
        sub={t('End-to-end mobile engineering: architecture, accurate UI, integrations and store release.', 'هندسة موبايل كاملة: المعمارية، وواجهات مطابقة للتصميم، والربط مع الأنظمة، والرفع على الستور.')}
      />
      <div className="svc-row">
        {services.map((s, i) => {
          const I = serviceIcons[i];
          return (
            <button key={s.title.en} className={`svc ${i === active ? 'on' : ''}`} onClick={() => setActive(i)}>
              <b>{s.title[lang]}</b>
              <span>{s.body[lang]}</span>
              <i className="svc-ic"><I size={16} aria-hidden /></i>
            </button>
          );
        })}
      </div>
      <div className="svc-track" aria-hidden>
        {services.map((s, i) => (
          <span key={s.title.en} className={i === active ? 'on' : ''}>{String(i + 1).padStart(2, '0')}</span>
        ))}
      </div>
    </section>
  );
}

function Latest({ lang, openDemo }: { lang: Lang; openDemo: (id: string) => void }) {
  const t = T(lang);
  const [i, setI] = useState(2);
  const touchX = useRef(0);
  const n = carousel.length;
  const [w, setW] = useState(() => (typeof window !== 'undefined' ? window.innerWidth : 1200));
  useEffect(() => {
    const on = () => setW(window.innerWidth);
    window.addEventListener('resize', on);
    return () => window.removeEventListener('resize', on);
  }, []);
  const small = w < 700;
  const base = small ? 170 : 210;
  return (
    <section className="latest" id="projects">
      <SecHead
        title={t('Try It Live', 'جرّبها بنفسك')}
        sub={t('Interactive versions of three of my Flutter apps, running in your browser with sample data. Tap the phone in the middle to start.', 'نسخ تفاعلية من تلات تطبيقات Flutter عملتهم، شغالة في المتصفح ببيانات تجريبية. دوس على الموبايل اللي في النص وابدأ.')}
      />
      <div className="car" dir="ltr">
        <button className="car-arrow l" onClick={() => setI((i - 1 + n) % n)} aria-label={t('Previous', 'السابق')}><ChevronLeft size={18} /></button>
        <div
          className="car-stage"
          style={{ height: base * 2.25 }}
          onTouchStart={(e) => (touchX.current = e.touches[0].clientX)}
          onTouchEnd={(e) => {
            const dx = e.changedTouches[0].clientX - touchX.current;
            if (Math.abs(dx) > 40) setI((cur) => (dx < 0 ? (cur + 1) % n : (cur - 1 + n) % n));
          }}
        >
          {carousel.map((c, k) => {
            let d = k - i;
            if (d > n / 2) d -= n;
            if (d < -n / 2) d += n;
            const ad = Math.abs(d);
            if (ad > (small ? 1 : 2)) return null;
            const scale = d === 0 ? 1.18 : ad === 1 ? 0.92 : 0.8;
            const x = d * (small ? base * 0.78 : base * 0.95);
            return (
              <button
                key={k}
                className={`car-item ${d === 0 ? 'on' : ''}`}
                style={{ transform: `translateX(calc(-50% + ${x}px)) scale(${scale}) rotateY(${d * -8}deg)`, zIndex: 10 - ad, opacity: ad === 2 ? 0.7 : 1 }}
                onClick={() => (d === 0 ? openDemo(c.demo.id) : setI(k))}
                aria-label={d === 0 ? t(`Open the ${c.demo.name} demo`, `افتح ديمو ${c.demo.name}`) : c.demo.name}
              >
                <MiniPhone demo={c.demo} route={c.route} lang={lang} width={base} />
                {d === 0 && <span className="car-cta"><Play size={13} aria-hidden /> {t('Try it live', 'جرّبه دلوقتي')}</span>}
              </button>
            );
          })}
        </div>
        <button className="car-arrow r" onClick={() => setI((i + 1) % n)} aria-label={t('Next', 'التالي')}><ChevronRight size={18} /></button>
      </div>
      <div className="car-dots" aria-hidden>{carousel.map((_, k) => <i key={k} className={k === i ? 'on' : ''} />)}</div>
      <p className="mono-hint">{t('Swipe or tap a phone to explore', 'اسحب أو دوس على أي موبايل')}</p>

      <dl className="stats" id="stats">
        <div><dt>3<sup>+</sup></dt><dd>{t('Years in Flutter', 'سنين في Flutter')}</dd></div>
        <div><dt>15<sup>+</sup></dt><dd>{t('Apps live on the stores', 'تطبيق منشور على الستور')}</dd></div>
        <div><dt>25<sup>+</sup></dt><dd>{t('Flutter apps worked on', 'تطبيق Flutter اشتغلت عليه')}</dd></div>
        <div><dt>3</dt><dd>{t('Live demos', 'ديموهات مباشرة')}</dd></div>
      </dl>
    </section>
  );
}

function Work({ lang, openDemo }: { lang: Lang; openDemo: (id: string) => void }) {
  const t = T(lang);
  const [active, setActive] = useState(projects[0].id);
  const refs = useRef<Record<string, HTMLElement | null>>({});
  useEffect(() => {
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => e.isIntersecting && setActive(e.target.id.replace('p-', ''))),
      { rootMargin: '-45% 0px -50% 0px' },
    );
    Object.values(refs.current).forEach((el) => el && io.observe(el));
    return () => io.disconnect();
  }, []);
  return (
    <section className="work" id="work">
      <SecHead
        title={t('Selected Work', 'أعمال مختارة')}
        sub={t('A selection of the production apps I have built, most of them as the only developer. Client names are left out.', 'مختارات من التطبيقات المنشورة اللي بنيتها، وأغلبها كنت المطور الوحيد فيها. من غير أسماء العملاء.')}
      />
      <div className="work-grid">
        <ol className="work-index">
          {projects.map((p, k) => (
            <li key={p.id}>
              <a href={`#p-${p.id}`} className={active === p.id ? 'on' : ''}>
                <span>{String(k + 1).padStart(2, '0')}.</span> {p.name}
              </a>
            </li>
          ))}
        </ol>
        <div className="work-cards">
          {projects.map((p) => (
            <article key={p.id} id={`p-${p.id}`} ref={(el) => (refs.current[p.id] = el)} className="pcard">
              <div className="pcard-body">
                <p className="pcard-kind"><i aria-hidden /> {p.kind[lang]}</p>
                <h3>{p.name}</h3>
                <p className="pcard-sum">{p.summary[lang]}</p>
                <ul className="pcard-points">{p.points[lang].map((x) => <li key={x}>{x}</li>)}</ul>
                <ul className="pcard-stack">{p.stack.map((s) => <li key={s}>{s}</li>)}</ul>
                <div className="pcard-links">
                  {p.demo && (
                    <button className="demo-btn" onClick={() => openDemo(p.demo!)}>
                      <Play size={15} aria-hidden /> {t('Try live demo', 'جرّب الديمو')}
                    </button>
                  )}
                  {p.appStore && <StoreBtn kind="apple" href={p.appStore} />}
                  {p.play && <StoreBtn kind="play" href={p.play} />}
                  {p.web && (
                    <a className="web-btn" href={p.web} target="_blank" rel="noopener noreferrer"><Globe size={16} aria-hidden /> {t('Visit website', 'زور الموقع')} <ArrowUpRight size={14} className="flip-rtl" aria-hidden /></a>
                  )}
                </div>
              </div>
              <div className="pcard-visual" style={{ background: panel[p.id] }}>
                <span className="tag tl">{p.role[lang]}</span>
                {p.demo ? (
                  <button className="pcard-phone" onClick={() => openDemo(p.demo!)} aria-label={t(`Open the ${p.name} demo`, `افتح ديمو ${p.name}`)}>
                    <MiniPhone demo={demoFor[p.demo]} route={demoRoute[p.demo]} lang={lang} width={190} />
                  </button>
                ) : (
                  <img className="pcard-icon" src={p.icon} alt="" />
                )}
                <span className="tag br">{p.status === 'live' ? (p.play || p.onStores ? t('On the stores', 'على الستور') : t('Live', 'شغال')) : t('Live demo', 'ديمو مباشر')}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
      <div className="also">
        <p className="kicker">{t('More apps on the stores', 'تطبيقات تانية على الستور')}</p>
        <ul>
          {alsoShipped.map((a) => (
            <li key={a.name}>
              <img src={a.icon} alt="" />
              <span><b>{a.name}</b><small>{a.kind[lang]}</small></span>
            </li>
          ))}
        </ul>
        <p className="more-note">{t('Plus maintenance and new features on more production apps in healthcare, logistics, investment, maps and business management.', 'وكمان صيانة و features جديدة في تطبيقات منشورة تانية في الصحة واللوجستيات والاستثمار والخرايط وإدارة البيزنس.')}</p>
      </div>
    </section>
  );
}

function Journey({ lang }: { lang: Lang }) {
  const t = T(lang);
  const chapters = [
    { year: '2020', label: t('Academic foundation', 'البداية الأكاديمية'), role: t('B.Sc. Computer and Information Technology', 'بكالوريوس حاسبات وتكنولوجيا معلومات'), org: t('Zagazig University', 'جامعة الزقازيق'), when: t('2020 – 2024', '2020 – 2024'), note: t('Arabic native · English excellent · German intermediate', 'العربي اللغة الأم · إنجليزي ممتاز · ألماني متوسط'), points: [t('Studied software engineering and IT, and started building Flutter apps alongside university.', 'درست هندسة البرمجيات وتكنولوجيا المعلومات، وبدأت أبني تطبيقات Flutter جنب الجامعة.')] },
    ...[...experience].sort((a, b) => Date.parse(a.when.en.split(' – ')[0].split(' - ')[0]) - Date.parse(b.when.en.split(' – ')[0].split(' - ')[0])).map((e) => ({ year: e.when.en.split(/ [–-] /)[0], label: e.org, role: e.role[lang], org: e.org, when: e.when[lang], note: e.note[lang], points: e.points[lang] })),
  ];
  const [i, setI] = useState(chapters.length - 1);
  const c = chapters[i];
  return (
    <section className="journey" id="experience">
      <SecHead title={t('My Journey', 'رحلتي')} sub={t('From university to freelance work and production apps used by real customers.', 'من الجامعة للفريلانس وتطبيقات منشورة بيستخدمها عملاء حقيقيين.')} />
      <div className="years" role="tablist">
        {chapters.map((ch, k) => (
          <button key={ch.label + k} role="tab" aria-selected={k === i} className={k === i ? 'on' : ''} onClick={() => setI(k)}>
            <b>{ch.year}</b>
            <span>{ch.label}</span>
          </button>
        ))}
      </div>
      <div className="chapter" key={i}>
        <p className="kicker">{c.when}</p>
        <h3>{c.role} <span>· {c.org}</span></h3>
        <p className="chapter-note">{c.note}</p>
        <ul>{c.points.map((x) => <li key={x}>{x}</li>)}</ul>
      </div>
    </section>
  );
}

function Process({ lang }: { lang: Lang }) {
  const t = T(lang);
  const [active, setActive] = useState(0);
  const s = processSteps[active];
  return (
    <section className="process" id="process">
      <SecHead title={t('How I Work', 'طريقة شغلي')} sub={t('How I take an app from a design file to the stores, and what you get at each step.', 'إزاي باخد التطبيق من ملف التصميم لحد الستور، وإيه اللي بتستلمه في كل خطوة.')} />
      <ol className="ptrack" role="tablist" aria-label={t('Phases', 'المراحل')}>
        {processSteps.map((x, k) => (
          <li key={x.title.en}>
            <button role="tab" aria-selected={k === active} className={k === active ? 'on' : k < active ? 'done' : ''} onClick={() => setActive(k)}>
              <span className="pnum">{String(k + 1).padStart(2, '0')}</span>
              <span className="pname">{x.title[lang]}</span>
            </button>
          </li>
        ))}
      </ol>
      <div className="pcardx" key={active}>
        <div className="pcardx-main">
          <p className="kicker">{t('Phase', 'مرحلة')} {String(active + 1).padStart(2, '0')} / {String(processSteps.length).padStart(2, '0')}</p>
          <h3>{s.title[lang]}</h3>
          <p>{s.body[lang]}</p>
          <ul>{s.tags.map((x) => <li key={x}>{x}</li>)}</ul>
        </div>
        <div className="pcardx-out">
          <p className="kicker">{t('You get', 'بتستلم')}</p>
          <p className="pout"><Check size={18} aria-hidden /> {s.out[lang]}</p>
          <div className="pnav">
            <button onClick={() => setActive(Math.max(0, active - 1))} disabled={active === 0} aria-label={t('Previous phase', 'المرحلة اللي فاتت')}><ChevronLeft size={18} className="flip-rtl" /></button>
            <button onClick={() => setActive(Math.min(processSteps.length - 1, active + 1))} disabled={active === processSteps.length - 1} aria-label={t('Next phase', 'المرحلة الجاية')}><ChevronRight size={18} className="flip-rtl" /></button>
          </div>
        </div>
      </div>

      <div className="handled">
        <p className="kicker center">{t('Handled in every app', 'متهندل في كل تطبيق')}</p>
        <ul>
          {handled.map((h) => (
            <li key={h.title.en}>
              <span className="hcheck"><Check size={15} aria-hidden /></span>
              <span><b>{h.title[lang]}</b><small>{h.body[lang]}</small></span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Credentials({ lang }: { lang: Lang }) {
  const t = T(lang);
  const [g, setG] = useState(certGroups[0].id);
  const group = certGroups.find((x) => x.id === g)!;
  const total = certGroups.reduce((n, x) => n + x.items.length, 0);
  return (
    <section className="creds" id="credentials">
      <SecHead
        title={t('Credentials', 'الشهادات')}
        sub={t(`Recognition at work, plus ${total} courses and certificates that back up the hands-on experience.`, `تكريمات في الشغل، و${total} كورس وشهادة بيدعموا الخبرة العملية.`)}
      />

      <div className="cert-feature">
        {featuredCerts.map((c) => (
          <a key={c.image} className="cert-fcard" href={c.url} target="_blank" rel="noopener noreferrer">
            <span className={`cert-thumb ${c.image === 'cs50' ? 'wide' : ''}`}>
              <img src={certImg[c.image]} alt={c.title[lang]} />
            </span>
            <span className="cert-fbody">
              <span className="kicker"><i className="dot" aria-hidden /> {c.issuer}</span>
              <b>{c.title[lang]}</b>
              <small>{c.note[lang]}</small>
              <span className="cert-verify"><ShieldCheck size={14} aria-hidden /> {t('View certificate', 'شوف الشهادة')} <ArrowUpRight size={13} className="flip-rtl" aria-hidden /></span>
            </span>
          </a>
        ))}
      </div>
      <p className="cert-exp">
        <a href={experienceCertUrl} target="_blank" rel="noopener noreferrer">{t('Experience certificate from Tqnia IT', 'شهادة الخبرة من تقنية')} <ArrowUpRight size={13} className="flip-rtl" aria-hidden /></a>
      </p>

      <div className="cred-tabs" role="tablist" aria-label={t('Certificate groups', 'مجموعات الشهادات')}>
        {certGroups.map((x) => (
          <button key={x.id} role="tab" aria-selected={x.id === g} className={x.id === g ? 'on' : ''} onClick={() => setG(x.id)}>
            {x.name[lang]} <em>{x.items.length}</em>
          </button>
        ))}
      </div>
      <ul className="cert-list" key={g}>
        {group.items.map((c) => (
          <li key={c.title}>
            <a href={c.url} target="_blank" rel="noopener noreferrer">
              <span className="cert-badge" style={{ background: issuerTint[c.issuer] ?? '#0f766e' }} aria-hidden>
                {(c.issuer || c.title).replace(/[^A-Za-z]/g, '').slice(0, 2).toUpperCase()}
              </span>
              <span className="cert-txt">
                <b>{c.title}</b>
                <small>{c.issuer || t('Certificate', 'شهادة')}</small>
              </span>
              <span className="cert-go">{t('Verify', 'تحقق')} <ArrowUpRight size={13} className="flip-rtl" aria-hidden /></span>
            </a>
          </li>
        ))}
      </ul>

      <div className="skills-strip">
        {skills.map((sk) => (
          <div key={sk.group.en}>
            <p className="kicker">{sk.group[lang]}</p>
            <p>{sk.items.join(' · ')}</p>
          </div>
        ))}
      </div>

      <div className="writing">
        <p className="kicker">{t('Writing & teaching', 'مقالات وشرح')}</p>
        <ul>
          {writing.map((w) => (
            <li key={w.url}>
              <a href={w.url} target="_blank" rel="noopener noreferrer">
                <span>{w.title[lang]}</span>
                <small>{w.where}</small>
                <ArrowUpRight size={15} className="flip-rtl" aria-hidden />
              </a>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

function Faq({ lang }: { lang: Lang }) {
  const t = T(lang);
  const [open, setOpen] = useState(0);
  return (
    <section className="faq" id="faq">
      <SecHead title={t('Before We Start', 'قبل ما نبدأ')} sub={t('Short answers to the questions that usually come first.', 'إجابات قصيرة على الأسئلة اللي بتيجي في الأول.')} />
      <div className="faq-list">
        {faq.map((f, k) => (
          <div key={f.q.en} className={`faq-item ${open === k ? 'on' : ''}`}>
            <button id={`faq-${k}`} aria-expanded={open === k} onClick={() => setOpen(open === k ? -1 : k)}>
              <span>{f.q[lang]}</span>
              <Plus size={18} aria-hidden />
            </button>
            {open === k && <p>{f.a[lang]}</p>}
          </div>
        ))}
      </div>
    </section>
  );
}

function Contact({ lang }: { lang: Lang }) {
  const t = T(lang);
  const [copied, setCopied] = useState(false);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const el = document.getElementById('contact-email');
      if (el) {
        const r = document.createRange();
        r.selectNodeContents(el);
        const s = window.getSelection();
        s?.removeAllRanges();
        s?.addRange(r);
      }
    }
  };
  return (
    <section className="contact" id="contact">
      <div className="contact-card">
        <img className="contact-photo" src={photo} alt="" />
        <div className="contact-body">
          <h2>{t("I'm Ahmed Behiry", 'أنا أحمد بحيري')}</h2>
          <p className="kicker">{t('Flutter Developer', 'مطور Flutter')}</p>
          <p className="contact-text">
            {t(
              'A Flutter developer who cares about clean architecture and apps that feel fast, from the first screen to the store release. Open to full-time roles, remote work, relocation and freelance projects.',
              'مطور Flutter بيهتم بالمعمارية النضيفة وبتطبيقات سريعة، من أول شاشة لحد الرفع على الستور. متاح لوظيفة دوام كامل أو شغل عن بُعد أو انتقال أو فريلانس.',
            )}
          </p>
          <div className="contact-actions">
            <span className="mail-pill">
              <Mail size={16} aria-hidden />
              <span id="contact-email" dir="ltr">{profile.email}</span>
              <button onClick={copy} aria-label={t('Copy email', 'انسخ الإيميل')}>{copied ? <Check size={15} /> : <Copy size={15} />}</button>
            </span>
            <a className="pill-dark wa" href={profile.whatsapp} target="_blank" rel="noopener noreferrer"><MessageCircle size={16} aria-hidden /> {t('Chat on WhatsApp', 'كلمني واتساب')}</a>
          </div>
          <div className="contact-social">
            <a href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} aria-hidden /> LinkedIn</a>
            <a href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden /> GitHub</a>
            <a href={profile.cv} target="_blank" rel="noopener noreferrer"><Download size={16} aria-hidden /> CV</a>
            <span dir="ltr">{profile.phone}</span>
          </div>
        </div>
      </div>
    </section>
  );
}
