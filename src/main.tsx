import { Component, StrictMode, useEffect, useState, type ReactNode } from 'react';
import { createRoot } from 'react-dom/client';
import type { DemoDef, Lang } from './shell/types';
import { DemoShell } from './shell/DemoShell';
import { Site } from './site/Site';
// import { shopsiiaDemo } from './demos/shopsiia'; // HIDDEN: Shopsiia
import { salasaDemo } from './demos/salasa';
import { letsDemo } from './demos/lets';
import './tokens.css';

const demos: Record<string, DemoDef> = { /* shopsiia: shopsiiaDemo, */ salasa: salasaDemo, lets: letsDemo }; // HIDDEN: Shopsiia

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

/** If anything throws, show a way back instead of an empty page. */
class Recover extends Component<{ children: ReactNode }, { failed: boolean }> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch(error: unknown) {
    console.error(error);
  }
  render() {
    if (!this.state.failed) return this.props.children;
    const ar = document.documentElement.lang === 'ar';
    return (
      <div style={{ minHeight: '100vh', display: 'grid', placeItems: 'center', padding: 24, textAlign: 'center', fontFamily: 'var(--f-body)' }}>
        <div>
          <p style={{ fontSize: 18, margin: '0 0 16px' }}>{ar ? 'حصلت مشكلة في عرض الصفحة.' : 'Something went wrong while showing this page.'}</p>
          <button
            className="pill-dark"
            onClick={() => {
              try {
                window.history.replaceState(null, '', window.location.pathname);
              } catch {
                /* ignore */
              }
              window.location.reload();
            }}
          >
            {ar ? 'ارجع للبورتفوليو' : 'Back to the portfolio'}
          </button>
        </div>
      </div>
    );
  }
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Recover>
      <App />
    </Recover>
  </StrictMode>,
);
