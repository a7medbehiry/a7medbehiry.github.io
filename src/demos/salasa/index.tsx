import type { DemoDef } from '../../shell/types';
import { SalasaApp } from './SalasaApp';
import icon from '../../assets/icons/salasa.png';

export const salasaDemo: DemoDef = {
  id: 'salasa',
  name: 'Salasa CRM',
  tagline: { en: 'Offline-first CRM for small sales teams', ar: 'CRM بيشتغل من غير نت لفرق المبيعات' },
  icon: <img src={icon} alt="" style={{ background: '#fff', objectFit: 'contain' }} />,
  accent: '#1E3A8A',
  statusDark: false,
  fontFamily: { en: "'Manrope', system-ui, sans-serif", ar: "'IBM Plex Sans Arabic', system-ui, sans-serif" },
  initialRoute: { name: 'dashboard' },
  notifications: [
    {
      id: 'rem',
      title: { en: 'Follow up with Sara Hassan', ar: 'متابعة مع سارة حسن' },
      body: { en: 'Demo call: clinic booking module, in 15 minutes.', ar: 'مكالمة ديمو: موديول حجز العيادة، بعد 15 دقيقة.' },
      target: { name: 'followup', params: { id: 'f2' } },
    },
    {
      id: 'late',
      title: { en: 'Overdue follow up', ar: 'متابعة متأخرة' },
      body: { en: 'You planned to call Hany Samir yesterday.', ar: 'كان المفروض تكلم هاني سمير امبارح.' },
      target: { name: 'followups', params: { tab: 'overdue' } },
    },
    {
      id: 'won',
      title: { en: 'Deal won', ar: 'صفقة اتقفلت' },
      body: { en: 'Omar Naguib from Delta Motors moved to Won.', ar: 'عمر نجيب من دلتا موتورز اتنقل لـ "تم البيع".' },
      target: { name: 'client', params: { id: 'c4' } },
    },
  ],
  jumps: [
    { label: { en: 'Dashboard', ar: 'الرئيسية' }, route: { name: 'dashboard' } },
    { label: { en: 'Clients', ar: 'العملاء' }, route: { name: 'clients' } },
    { label: { en: 'Follow ups', ar: 'المتابعات' }, route: { name: 'followups' } },
    { label: { en: 'New follow up', ar: 'متابعة جديدة' }, route: { name: 'newFollowup' } },
  ],
  toggles: [
    {
      key: 'offline',
      label: { en: 'Turn off internet', ar: 'اقفل النت' },
      hint: { en: 'Keep working offline, then switch it back to watch the sync.', ar: 'كمّل شغل من غير نت، وبعدين رجّعه وشوف الـ sync.' },
      initial: false,
    },
  ],
  guide: {
    en: [
      'Turn off internet, add a client or a follow up, then turn it back on and watch the changes sync.',
      'Create a follow up. The reminder arrives as a push about 6 seconds later.',
      'Open a client and move them through the pipeline: Lead, Contacted, Won.',
      'Switch to Arabic to see the right-to-left layout.',
    ],
    ar: [
      'اقفل النت، وضيف عميل أو متابعة، وبعدين افتح النت وشوف التعديلات بتترفع.',
      'اعمل متابعة جديدة. التذكير هيوصلك كإشعار بعد حوالي 6 ثواني.',
      'افتح عميل وحرّكه في مراحل البيع: محتمل، تم التواصل، تم البيع.',
      'حوّل للعربي وشوف التصميم من اليمين للشمال.',
    ],
  },
  App: SalasaApp,
};
