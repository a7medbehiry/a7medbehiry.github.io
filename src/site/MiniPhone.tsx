import { memo } from 'react';
import type { AppApi, DemoDef, Lang, Route } from '../shell/types';

const noop = () => {};

/** Renders a demo app at a fixed screen, scaled down, for use as a picture. */
export const MiniPhone = memo(function MiniPhone({ demo, route, lang, width }: { demo: DemoDef; route: Route; lang: Lang; width: number }) {
  const W = 376;
  const H = 812;
  const s = width / (W + 20);
  const api: AppApi = {
    nav: { route, canPop: route.name !== demo.initialRoute.name, push: noop, replace: noop, reset: noop, pop: noop },
    lang,
    t: (en, ar) => (lang === 'ar' ? ar : en),
    flags: {},
    setFlag: noop,
    notify: noop,
    toast: noop,
  };
  const App = demo.App;
  return (
    <div className="mini" style={{ width, height: (H + 20) * s }} aria-hidden>
      <div className="mini-frame" style={{ width: W + 20, height: H + 20, transform: `scale(${s})` }}>
        <div className="mini-screen" dir={lang === 'ar' ? 'rtl' : 'ltr'} style={{ fontFamily: demo.fontFamily[lang] }}>
          <App api={api} />
          <div className={`mini-status ${demo.statusDark ? 'dark' : ''}`}>
            <span>9:41</span>
            <i />
            <span className="mini-batt" />
          </div>
        </div>
      </div>
    </div>
  );
});
