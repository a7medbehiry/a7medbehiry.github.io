import type { ComponentType, ReactNode } from 'react';

export type Lang = 'en' | 'ar';

export interface Route {
  name: string;
  params?: Record<string, string | number>;
}

export interface Nav {
  route: Route;
  push: (name: string, params?: Route['params']) => void;
  replace: (name: string, params?: Route['params']) => void;
  reset: (name: string, params?: Route['params']) => void;
  pop: () => void;
  canPop: boolean;
}

export interface DemoNotification {
  id: string;
  title: Record<Lang, string>;
  body: Record<Lang, string>;
  /** Screen the notification opens when tapped. */
  target: Route;
}

export interface AppApi {
  nav: Nav;
  lang: Lang;
  /** Pick the string for the current language. */
  t: (en: string, ar: string) => string;
  flags: Record<string, boolean>;
  setFlag: (key: string, value: boolean) => void;
  /** Show a push notification from inside the app (e.g. after an order is placed). */
  notify: (n: DemoNotification, delayMs?: number) => void;
  toast: (text: string) => void;
}

export interface DemoToggle {
  key: string;
  label: Record<Lang, string>;
  hint: Record<Lang, string>;
  initial: boolean;
}

export interface DemoDef {
  id: string;
  name: string;
  tagline: Record<Lang, string>;
  icon: ReactNode;
  /** Brand colour used by the control panel. */
  accent: string;
  /** Status bar text colour on the app's first screen. */
  statusDark: boolean;
  fontFamily: Record<Lang, string>;
  initialRoute: Route;
  notifications: DemoNotification[];
  jumps: { label: Record<Lang, string>; route: Route }[];
  toggles?: DemoToggle[];
  guide: Record<Lang, string[]>;
  App: ComponentType<{ api: AppApi }>;
}
