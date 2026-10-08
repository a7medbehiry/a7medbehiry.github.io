import type { DemoDef } from '../../shell/types';
import { LetsApp } from './LetsApp';
import icon from '../../assets/icons/magchat.png';

export const letsDemo: DemoDef = {
  id: 'lets',
  name: "Let's",
  tagline: { en: 'Chat, groups and calls', ar: 'شات وجروبات ومكالمات' },
  icon: <img src={icon} alt="" />,
  accent: '#E75480',
  statusDark: false,
  fontFamily: { en: "'Readex Pro', system-ui, sans-serif", ar: "'Readex Pro', system-ui, sans-serif" },
  initialRoute: { name: 'list' },
  notifications: [
    {
      id: 'call',
      title: { en: 'Incoming video call', ar: 'مكالمة فيديو جاية' },
      body: { en: 'Nada Mostafa is calling you…', ar: 'ندى مصطفى بتتصل بيك…' },
      target: { name: 'incoming', params: { id: 'nada', video: 1 } },
    },
    {
      id: 'msg',
      title: { en: 'Nada Mostafa', ar: 'ندى مصطفى' },
      body: { en: 'Video call at 8?', ar: 'هنتكلم فيديو الساعة 8؟' },
      target: { name: 'chat', params: { id: 'nada' } },
    },
    {
      id: 'group',
      title: { en: 'Mobile Team', ar: 'فريق الموبايل' },
      body: { en: 'Mariam: Push works on iOS 🎉', ar: 'مريم: الإشعارات شغالة على iOS 🎉' },
      target: { name: 'chat', params: { id: 'team' } },
    },
  ],
  jumps: [
    { label: { en: 'Chats', ar: 'الشاتات' }, route: { name: 'list' } },
    { label: { en: 'Conversation', ar: 'محادثة' }, route: { name: 'chat', params: { id: 'nada' } } },
    { label: { en: 'Incoming call', ar: 'مكالمة جاية' }, route: { name: 'incoming', params: { id: 'nada', video: 1 } } },
    { label: { en: 'My QR code', ar: 'الـ QR بتاعي' }, route: { name: 'qr' } },
  ],
  guide: {
    en: [
      'Lock the phone and send "Incoming video call". Answer it from the lock screen.',
      'Open a chat and send a message. The other person types and replies.',
      'Tap the paperclip to share a live location.',
      'Try the mute, camera and speaker buttons during a call.',
    ],
    ar: [
      'اقفل الموبايل وابعت "مكالمة فيديو جاية"، ورد عليها من شاشة القفل.',
      'افتح شات وابعت رسالة. هتلاقي الطرف التاني بيكتب ويرد.',
      'دوس على المشبك عشان تشارك موقع مباشر.',
      'جرّب زراير الكتم والكاميرا والسماعة وإنت في المكالمة.',
    ],
  },
  App: LetsApp,
};
