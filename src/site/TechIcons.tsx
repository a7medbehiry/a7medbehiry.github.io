// Small, simplified marks for the tech orbit around the hero photo.
export const tech: { name: string; label: { en: string; ar: string }; svg: JSX.Element }[] = [
  {
    name: 'Flutter',
    label: { en: 'Cross-platform mobile', ar: 'تطبيقات متعددة المنصات' },
    svg: (
      <svg viewBox="0 0 24 24"><path fill="#47C5FB" d="M14.3 2 4 12.3l3.2 3.2L20.7 2z" /><path fill="#47C5FB" d="M14.3 11.4 8.7 17l3.2 3.2 2.4-.1 6.4-8.7z" /><path fill="#00569E" d="m11.9 20.2 2.4 1.8h6.4l-5.6-5.6z" /><path fill="#00B5F8" d="m8.7 17 3.2-3.2 3.2 3.2-3.2 3.2z" /></svg>
    ),
  },
  {
    name: 'Dart',
    label: { en: 'Language I write every day', ar: 'اللغة اللي بكتب بيها كل يوم' },
    svg: (
      <svg viewBox="0 0 24 24"><path fill="#01579B" d="M5.2 18.8 2.6 16.2C1.8 15.4 1.6 13.8 2.1 12.8L5.7 5.4z" /><path fill="#40C4FF" d="M5.7 5.4c.6-.6 1.8-.6 2.6 0l9.3 9.4v6H11.7z" /><path fill="#29B6F6" d="M18.6 5.3 12 3.1c-1-.3-2 0-2.6.6L5.7 5.4l12 0z" /><path fill="#01579B" d="M17.6 21v-6.2L5.7 5.4l12 0 3.8 3.8V21z" opacity=".55" /></svg>
    ),
  },
  {
    name: 'Firebase',
    label: { en: 'Auth, Firestore, FCM', ar: 'Auth و Firestore و FCM' },
    svg: (
      <svg viewBox="0 0 24 24"><path fill="#FFA000" d="M4.6 18.4 7.2 2.3c.1-.4.6-.5.8-.1l2.7 5z" /><path fill="#F57C00" d="m14.3 9.5-2.3-4.3c-.2-.3-.6-.3-.8 0L4.6 18.4z" /><path fill="#FFCA28" d="m19.4 18.4-2.4-14.6c-.1-.4-.5-.5-.8-.3L4.6 18.4l6.7 3.8c.4.2.9.2 1.3 0z" /></svg>
    ),
  },
  {
    name: 'Android',
    label: { en: 'Google Play releases', ar: 'الرفع على Google Play' },
    svg: (
      <svg viewBox="0 0 24 24"><path fill="#3DDC84" d="M17.6 9.5 19.3 6.6a.4.4 0 0 0-.7-.4l-1.7 3a10.6 10.6 0 0 0-9.8 0l-1.7-3a.4.4 0 0 0-.7.4l1.7 2.9A9.9 9.9 0 0 0 1.5 17.4h21a9.9 9.9 0 0 0-4.9-7.9ZM7 14.6a1 1 0 1 1 0-2 1 1 0 0 1 0 2Zm10 0a1 1 0 1 1 0-2 1 1 0 0 1 0 2Z" /></svg>
    ),
  },
  {
    name: 'iOS',
    label: { en: 'App Store and TestFlight', ar: 'App Store و TestFlight' },
    svg: (
      <svg viewBox="0 0 24 24"><path fill="#111" d="M16.4 12.7c0-2.5 2-3.6 2.1-3.7-1.2-1.7-3-1.9-3.6-2-1.5-.2-3 .9-3.8.9s-2-.9-3.3-.9C6.1 7 4.5 8 3.6 9.6c-1.8 3.1-.5 7.8 1.3 10.4.9 1.3 1.9 2.7 3.2 2.6 1.3 0 1.8-.8 3.3-.8s2 .8 3.3.8c1.4 0 2.3-1.3 3.1-2.6 1-1.5 1.4-2.9 1.4-3-.1 0-2.8-1.1-2.8-4.3ZM14 5.2c.7-.8 1.2-2 1-3.2-1 0-2.2.7-2.9 1.5-.6.7-1.2 1.9-1 3.1 1.1.1 2.2-.6 2.9-1.4Z" /></svg>
    ),
  },
  {
    name: 'GitHub Actions',
    label: { en: 'Automated builds and releases', ar: 'أتمتة البناء والرفع' },
    svg: (
      <svg viewBox="0 0 24 24"><circle cx="6" cy="6" r="2.6" fill="none" stroke="#2088FF" strokeWidth="2" /><circle cx="18" cy="18" r="2.6" fill="none" stroke="#2088FF" strokeWidth="2" /><path d="M8.6 6H14a4 4 0 0 1 4 4v5.4" fill="none" stroke="#2088FF" strokeWidth="2" /><path d="M15.5 13 18 15.5 20.5 13" fill="none" stroke="#2088FF" strokeWidth="2" /></svg>
    ),
  },
  {
    name: 'Figma',
    label: { en: 'Pixel-accurate UI', ar: 'واجهات مطابقة للتصميم' },
    svg: (
      <svg viewBox="0 0 24 24"><path fill="#0ACF83" d="M8.5 22a3.5 3.5 0 0 0 3.5-3.5V15H8.5a3.5 3.5 0 0 0 0 7z" /><path fill="#A259FF" d="M5 11.5A3.5 3.5 0 0 1 8.5 8H12v7H8.5A3.5 3.5 0 0 1 5 11.5z" /><path fill="#F24E1E" d="M5 4.5A3.5 3.5 0 0 1 8.5 1H12v7H8.5A3.5 3.5 0 0 1 5 4.5z" /><path fill="#FF7262" d="M12 1h3.5a3.5 3.5 0 0 1 0 7H12z" /><path fill="#1ABCFE" d="M19 11.5a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0z" /></svg>
    ),
  },
  {
    name: 'Shorebird',
    label: { en: 'Over-the-air updates', ar: 'تحديثات فورية' },
    svg: (
      <svg viewBox="0 0 24 24"><path fill="#FF6A00" d="M3 15c3-1 6-4 8-8 1 3 4 5 9 5-3 2-6 5-11 6-2 .4-4-.8-6-3z" /><circle cx="15.5" cy="11.2" r="1" fill="#fff" /></svg>
    ),
  },
  {
    name: 'WebSockets',
    label: { en: 'Real-time chat and tracking', ar: 'شات وتتبع لحظي' },
    svg: (
      <svg viewBox="0 0 24 24"><path d="M4 9h11M11 5l4 4-4 4M20 15H9M13 11l-4 4 4 4" fill="none" stroke="#7C3AED" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
    ),
  },
];

export const PlayMark = () => (
  <svg viewBox="0 0 24 24"><path fill="#00D7FE" d="M3.6 1.8c-.3.3-.4.7-.4 1.2v18c0 .5.1.9.4 1.2L13.7 12z" /><path fill="#FFCE00" d="m17 15.4-3.3-3.4L17 8.6l3.9 2.2c1.1.6 1.1 1.7 0 2.4z" /><path fill="#FF3A44" d="M17 15.4 13.7 12 3.6 22.2c.4.4 1 .4 1.7 0z" /><path fill="#00F076" d="M17 8.6 5.3 1.9c-.7-.4-1.3-.4-1.7 0L13.7 12z" /></svg>
);
export const AppleMark = () => tech[4].svg;
