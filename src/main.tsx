import { StrictMode, useEffect, useState } from 'react';
import { createRoot } from 'react-dom/client';
import type { DemoDef, Lang } from './shell/types';
import { DemoShell } from './shell/DemoShell';
import { Site } from './site/Site';
import { shopsiiaDemo } from './demos/shopsiia';
import { salasaDemo } from './demos/salasa';
import { letsDemo } from './demos/lets';
import './tokens.css';

const demos: Record<string, DemoDef> = { shopsiia: shopsiiaDemo, salasa: salasaDemo, lets: letsDemo };

const readHash = () => window.location.hash.replace('#', '');
const demoFromHash = () => {
  const h = readHash();
  return h.startsWith('demo-') && demos[h.slice(5)] ? h.slice(5) : null;
};

function initialLang(): Lang {
  try {
    const saved = window.localStorage.getItem('lang');
    if (saved === 'ar' || saved === 'en') return saved;
  } catch {
    /* storage can be blocked; fall through */
  }
  return navigator.language?.startsWith('ar') ? 'ar' : 'en';
}

function App() {
  const [lang, setLangState] = useState<Lang>(initialLang);
  const [demo, setDemo] = useState<string | null>(demoFromHash);

  useEffect(() => {
    const onHash = () => setDemo(demoFromHash());
    window.addEventListener('hashchange', onHash);
    window.addEventListener('popstate', onHash);
    return () => {
      window.removeEventListener('hashchange', onHash);
      window.removeEventListener('popstate', onHash);
    };
  }, []);

  useEffect(() => {
    document.documentElement.lang = lang;
    document.documentElement.dir = lang === 'ar' ? 'rtl' : 'ltr';
  }, [lang]);

  const setLang = (l: Lang) => {
    setLangState(l);
    try {
      window.localStorage.setItem('lang', l);
    } catch {
      /* ignore */
    }
  };

  // Update the address bar without relying on it: some embeds block hash navigation.
  const setUrl = (hash: string) => {
    try {
      window.history.pushState(null, '', hash ? `#${hash}` : window.location.pathname + window.location.search);
    } catch {
      /* the view still switches */
    }
  };
  const openDemo = (id: string) => {
    setDemo(id);
    setUrl(`demo-${id}`);
    window.scrollTo(0, 0);
  };
  const exit = () => {
    setDemo(null);
    setUrl('');
    window.setTimeout(() => document.getElementById('work')?.scrollIntoView(), 0);
  };

  if (demo) return <DemoShell key={demo} demo={demos[demo]} siteLang={lang} onExit={exit} />;
  return <Site lang={lang} setLang={setLang} openDemo={openDemo} />;
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
