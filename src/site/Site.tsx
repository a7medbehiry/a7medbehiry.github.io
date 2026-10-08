import { useEffect, useState } from 'react';
import { ArrowUpRight, Download, Mail, Phone, Copy, Check, Play, Github, Linkedin, MapPin, FileText, Globe } from 'lucide-react';
import type { Lang } from '../shell/types';
import { experience, profile, projects, skills, writing } from '../content';
import photo from '../assets/photo.jpg';
import shopsiiaIcon from '../assets/icons/shopsiia.png';
import letsIcon from '../assets/icons/magchat.png';
import salasaIcon from '../assets/icons/salasa.png';
import './site.css';

const PUSHES = [
  { demo: 'shopsiia', icon: shopsiiaIcon, app: 'Shopsiia', title: { en: 'Order confirmed', ar: 'تم تأكيد الأوردر' }, body: { en: 'The seller accepted order SH-10503.', ar: 'البائع قبل الأوردر SH-10503.' } },
  { demo: 'lets', icon: letsIcon, app: "Let's", title: { en: 'Incoming video call', ar: 'مكالمة فيديو جاية' }, body: { en: 'Nada Mostafa is calling you…', ar: 'ندى مصطفى بتتصل بيك…' } },
  { demo: 'salasa', icon: salasaIcon, app: 'Salasa CRM', title: { en: 'Follow up with Sara Hassan', ar: 'متابعة مع سارة حسن' }, body: { en: 'Demo call in 15 minutes.', ar: 'مكالمة ديمو بعد 15 دقيقة.' } },
];

function StoreBadge({ kind, href, lang }: { kind: 'play' | 'apple' | 'web'; href: string; lang: Lang }) {
  const label = kind === 'play' ? 'Google Play' : kind === 'apple' ? 'App Store' : lang === 'ar' ? 'الموقع' : 'Website';
  return (
    <a className="store" href={href} target="_blank" rel="noopener noreferrer">
      {kind === 'play' && (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden><path fill="currentColor" d="M3.6 1.8c-.3.3-.4.7-.4 1.2v18c0 .5.1.9.4 1.2l10-10.2-10-10.2Zm11.1 11.3-2.5 2.6-7.4 7.5c.3 0 .7 0 1-.2l11.7-6.7-2.8-3.2Zm3.9-4.4L15.4 7 6 1.6c-.3-.2-.7-.2-1-.2l7.2 7.4 2.5 2.6 3.9-1.7.1-.1-.1.1Zm.1 0-3.4 3.8 3.4 3.4 2.8-1.6c.8-.5.8-1.8 0-2.3l-2.8-1.6v-1.7Z" /></svg>
      )}
      {kind === 'apple' && (
        <svg viewBox="0 0 24 24" width="16" height="16" aria-hidden><path fill="currentColor" d="M16.4 12.7c0-2.5 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9s-2-.9-3.3-.9C6.1 7 4.5 8 3.6 9.6c-1.8 3.1-.5 7.8 1.3 10.4.9 1.3 1.9 2.7 3.2 2.6 1.3 0 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.3-1.3 3.1-2.6 1-1.5 1.4-2.9 1.4-3-.1 0-2.8-1.1-2.8-4.3ZM14 5.2c.7-.8 1.2-2 1-3.2-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3.1 1.1.1 2.2-.6 2.9-1.4Z" /></svg>
      )}
      {kind === 'web' && <Globe size={15} aria-hidden />}
      <span>{label}</span>
      <ArrowUpRight size={13} className="flip-rtl" aria-hidden />
    </a>
  );
}

export function Site({ lang, setLang, openDemo }: { lang: Lang; setLang: (l: Lang) => void; openDemo: (id: string) => void }) {
  const t = (en: string, ar: string) => (lang === 'ar' ? ar : en);
  const [push, setPush] = useState(0);
  const [copied, setCopied] = useState(false);
  useEffect(() => {
    const id = window.setInterval(() => setPush((p) => (p + 1) % PUSHES.length), 3600);
    return () => window.clearInterval(id);
  }, []);
  const live = projects.filter((p) => p.play && p.appStore).length;

  const copyEmail = async () => {
    try {
      await navigator.clipboard.writeText(profile.email);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      const el = document.getElementById('contact-email');
      if (el) {
        const range = document.createRange();
        range.selectNodeContents(el);
        const sel = window.getSelection();
        sel?.removeAllRanges();
        sel?.addRange(range);
      }
    }
  };

  const p = PUSHES[push];
  return (
    <div className="site">
      <header className="top">
        <a className="mark" href="#top" aria-label={profile.name[lang]}>
          <span className="mark-badge">AB</span>
          <span className="mark-name">{profile.name[lang]}</span>
        </a>
        <nav className="top-nav" aria-label={t('Sections', 'الأقسام')}>
          <a href="#work">{t('Work', 'الأعمال')}</a>
          <a href="#experience">{t('Experience', 'الخبرة')}</a>
          <a href="#skills">{t('Skills', 'المهارات')}</a>
          <a href="#contact">{t('Contact', 'تواصل')}</a>
        </nav>
        <div className="top-end">
          <button className="lang" onClick={() => setLang(lang === 'en' ? 'ar' : 'en')} aria-label={t('Switch to Arabic', 'Switch to English')}>
            {lang === 'en' ? 'عربي' : 'EN'}
          </button>
          <a className="btn small" href={profile.cv} target="_blank" rel="noopener noreferrer">
            <Download size={15} aria-hidden /> CV
          </a>
        </div>
      </header>

      <main id="top">
        <section className="hero">
          <div className="hero-text">
            <p className="eyebrow">
              <span className="live-dot" aria-hidden /> {t('Available for full-time roles and freelance', 'متاح لوظيفة دوام كامل أو فريلانس')}
            </p>
            <h1>
              {t('Flutter apps you can try', 'تطبيقات Flutter تقدر تجربها')}
              <br />
              <em>{t('before you hire me.', 'قبل ما تشغّلني.')}</em>
            </h1>
            <p className="lede">
              {t(
                "I'm Ahmed Behiry, a Flutter developer with 3 years of building Android and iOS apps for e-commerce, real-time chat and calls, on-demand services and business tools. Several are live on the stores; three of them run right here in your browser.",
                'أنا أحمد بحيري، مطور Flutter بخبرة 3 سنين في بناء تطبيقات Android و iOS للتجارة الإلكترونية والشات والمكالمات اللحظية وخدمات عند الطلب وأدوات البيزنس. أكتر من تطبيق منشور على الستور، وتلاتة منهم تقدر تجربهم هنا في المتصفح.',
              )}
            </p>
            <div className="hero-cta">
              <a className="btn" href="#work">
                <Play size={16} aria-hidden /> {t('Try a live demo', 'جرّب ديمو')}
              </a>
              <a className="btn ghost" href="#contact">{t('Get in touch', 'تواصل معايا')}</a>
            </div>
            <dl className="facts">
              <div><dt>3</dt><dd>{t('years shipping Flutter', 'سنين في Flutter')}</dd></div>
              <div><dt>{live}</dt><dd>{t('apps on Google Play and the App Store', 'تطبيقات على Google Play و App Store')}</dd></div>
              <div><dt>3</dt><dd>{t('interactive demos', 'ديموهات تفاعلية')}</dd></div>
            </dl>
          </div>

          <div className="hero-visual">
            <div className="portrait">
              <img src={photo} alt={profile.name[lang]} />
              <span className="portrait-loc"><MapPin size={14} aria-hidden /> {t('Alexandria, Egypt', 'الإسكندرية، مصر')}</span>
            </div>
            <button key={push} className="push" onClick={() => openDemo(p.demo)} aria-label={t(`Open the ${p.app} demo`, `افتح ديمو ${p.app}`)}>
              <img src={p.icon} alt="" />
              <span className="push-text">
                <span className="push-top"><b>{p.app}</b><span>{t('now', 'الآن')}</span></span>
                <span className="push-title">{p.title[lang]}</span>
                <span className="push-body">{p.body[lang]}</span>
              </span>
            </button>
            <p className="push-hint">{t('Tap the notification to open that app.', 'دوس على الإشعار يفتحلك التطبيق.')}</p>
          </div>
        </section>

        <section className="work" id="work" aria-labelledby="work-h">
          <div className="sec-head">
            <h2 id="work-h">{t('Selected work', 'أعمال مختارة')}</h2>
            <p>{t('Apps on the stores, and demos you can use without installing anything. Demos run on sample data.', 'تطبيقات منشورة على الستور، وديموهات تجربها من غير ما تنزّل حاجة. الديموهات شغالة ببيانات تجريبية.')}</p>
          </div>
          <ol className="projects">
            {projects.map((pr) => (
              <li key={pr.id} className={`project ${pr.demo ? 'has-demo' : ''}`}>
                <div className="project-id">
                  <img className="app-icon" src={pr.icon} alt="" />
                  <div>
                    <h3>{pr.name}</h3>
                    <p className="kind">{pr.kind[lang]}</p>
                  </div>
                  <span className={`state ${pr.status}`}>
                    {pr.status === 'live' ? (pr.play ? t('On the stores', 'على الستور') : t('Live', 'شغال')) : t('Live demo', 'ديمو مباشر')}
                  </span>
                </div>
                <div className="project-body">
                  <p className="summary">{pr.summary[lang]}</p>
                  <ul className="points">
                    {pr.points[lang].map((pt) => <li key={pt}>{pt}</li>)}
                  </ul>
                  <div className="project-foot">
                    <ul className="stack" aria-label={t('Built with', 'معمول بـ')}>
                      {pr.stack.map((s) => <li key={s}>{s}</li>)}
                    </ul>
                    <p className="role">{pr.role[lang]}</p>
                  </div>
                  <div className="links">
                    {pr.demo && (
                      <button className="btn demo" onClick={() => openDemo(pr.demo!)}>
                        <Play size={15} aria-hidden /> {t('Try the demo', 'جرّب الديمو')}
                      </button>
                    )}
                    {pr.play && <StoreBadge kind="play" href={pr.play} lang={lang} />}
                    {pr.appStore && <StoreBadge kind="apple" href={pr.appStore} lang={lang} />}
                    {pr.web && <StoreBadge kind="web" href={pr.web} lang={lang} />}
                  </div>
                </div>
              </li>
            ))}
          </ol>
          <p className="more">
            {t(
              'Plus more production apps across healthcare, logistics, maps and business tools that I can walk you through in an interview.',
              'وتطبيقات منشورة تانية في الصحة واللوجستيات والخرايط وأدوات البيزنس، أقدر أشرحها في الإنترفيو.',
            )}
          </p>
        </section>

        <section className="exp" id="experience" aria-labelledby="exp-h">
          <div className="sec-head">
            <h2 id="exp-h">{t('Experience', 'الخبرة')}</h2>
          </div>
          <ol className="timeline">
            {experience.map((e) => (
              <li key={e.org}>
                <div className="when">{e.when[lang]}</div>
                <div className="what">
                  <h3>{e.role[lang]} <span>· {e.org}</span></h3>
                  <p className="note">{e.note[lang]}</p>
                  <ul>{e.points[lang].map((x) => <li key={x}>{x}</li>)}</ul>
                </div>
              </li>
            ))}
            <li>
              <div className="when">{t('2020 – 2024', '2020 – 2024')}</div>
              <div className="what">
                <h3>{t('B.Sc. Computer and Information Technology', 'بكالوريوس حاسبات وتكنولوجيا معلومات')} <span>· {t('Zagazig University', 'جامعة الزقازيق')}</span></h3>
                <p className="note">{t('Arabic native · English excellent · German intermediate', 'العربي اللغة الأم · إنجليزي ممتاز · ألماني متوسط')}</p>
              </div>
            </li>
          </ol>
        </section>

        <section className="skills" id="skills" aria-labelledby="skills-h">
          <div className="sec-head">
            <h2 id="skills-h">{t('Skills', 'المهارات')}</h2>
          </div>
          <div className="skill-grid">
            {skills.map((g) => (
              <div key={g.group.en} className="skill">
                <h3>{g.group[lang]}</h3>
                <ul>{g.items.map((s) => <li key={s}>{s}</li>)}</ul>
              </div>
            ))}
          </div>
          <div className="writing">
            <h3>{t('Writing and teaching', 'مقالات وشرح')}</h3>
            <ul>
              {writing.map((w) => (
                <li key={w.url}>
                  <a href={w.url} target="_blank" rel="noopener noreferrer">
                    <FileText size={16} aria-hidden />
                    <span>{w.title[lang]}</span>
                    <small>{w.where}</small>
                    <ArrowUpRight size={14} className="flip-rtl" aria-hidden />
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>

        <section className="contact" id="contact" aria-labelledby="contact-h">
          <div className="contact-card">
            <h2 id="contact-h">{t("Let's build your next app.", 'يلا نبني تطبيقك الجاي.')}</h2>
            <p>{t('Open to full-time roles, remote work, relocation and freelance projects.', 'متاح لوظيفة دوام كامل، أو شغل عن بُعد، أو انتقال، أو مشاريع فريلانس.')}</p>
            <div className="contact-rows">
              <div className="contact-row">
                <Mail size={18} aria-hidden />
                <span id="contact-email" dir="ltr">{profile.email}</span>
                <button className="copy" onClick={copyEmail}>
                  {copied ? <Check size={15} aria-hidden /> : <Copy size={15} aria-hidden />} {copied ? t('Copied', 'اتنسخ') : t('Copy', 'نسخ')}
                </button>
              </div>
              <div className="contact-row">
                <Phone size={18} aria-hidden />
                <span dir="ltr">{profile.phone}</span>
                <a className="copy" href={profile.whatsapp} target="_blank" rel="noopener noreferrer">WhatsApp <ArrowUpRight size={13} className="flip-rtl" aria-hidden /></a>
              </div>
            </div>
            <div className="contact-links">
              <a className="btn" href={profile.linkedin} target="_blank" rel="noopener noreferrer"><Linkedin size={16} aria-hidden /> LinkedIn</a>
              <a className="btn ghost" href={profile.github} target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden /> GitHub</a>
              <a className="btn ghost" href={profile.cv} target="_blank" rel="noopener noreferrer"><Download size={16} aria-hidden /> {t('Download CV', 'تحميل الـ CV')}</a>
            </div>
          </div>
        </section>
      </main>

      <footer className="foot">
        <span>© {new Date().getFullYear()} {profile.name[lang]}</span>
        <span>{t('Demos are web recreations of the Flutter apps, with sample data.', 'الديموهات نسخ ويب من تطبيقات Flutter ببيانات تجريبية.')}</span>
      </footer>
    </div>
  );
}
