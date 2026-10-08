import type { DemoDef } from '../../shell/types';
import { ShopsiiaApp } from './ShopsiiaApp';
import icon from '../../assets/icons/shopsiia.png';

export const shopsiiaDemo: DemoDef = {
  id: 'shopsiia',
  name: 'Shopsiia',
  tagline: { en: 'Multi-vendor marketplace', ar: 'سوق إلكتروني متعدد البائعين' },
  icon: <img src={icon} alt="" />,
  accent: '#F26522',
  statusDark: true,
  fontFamily: { en: "'Poppins', system-ui, sans-serif", ar: "'Cairo', system-ui, sans-serif" },
  initialRoute: { name: 'home' },
  notifications: [
    {
      id: 'out',
      title: { en: 'Out for delivery', ar: 'خرج للتوصيل' },
      body: { en: 'Order SH-10482 is with the courier. It arrives today by 6 PM.', ar: 'الأوردر SH-10482 مع المندوب. هيوصلك النهارده قبل 6 م.' },
      target: { name: 'tracking', params: { id: 'SH-10482', advance: 4 } },
    },
    {
      id: 'deal',
      title: { en: 'Flash deal, 2 hours only', ar: 'عرض سريع لمدة ساعتين' },
      body: { en: 'Noise-cancelling headphones are 24% off right now.', ar: 'السماعة العازلة للضوضاء عليها خصم 24% دلوقتي.' },
      target: { name: 'product', params: { id: 'p1' } },
    },
    {
      id: 'cart',
      title: { en: 'Still thinking about it?', ar: 'لسه بتفكر؟' },
      body: { en: 'The item in your cart is almost sold out.', ar: 'المنتج اللي في سلتك قرب يخلص.' },
      target: { name: 'cart' },
    },
  ],
  jumps: [
    { label: { en: 'Home', ar: 'الرئيسية' }, route: { name: 'home' } },
    { label: { en: 'Product', ar: 'منتج' }, route: { name: 'product', params: { id: 'p3' } } },
    { label: { en: 'Search', ar: 'البحث' }, route: { name: 'search' } },
    { label: { en: 'Cart', ar: 'السلة' }, route: { name: 'cart' } },
    { label: { en: 'Order tracking', ar: 'تتبع الأوردر' }, route: { name: 'tracking', params: { id: 'SH-10482' } } },
    { label: { en: 'Categories', ar: 'الأقسام' }, route: { name: 'categories' } },
  ],
  guide: {
    en: [
      'Pick a product, choose a colour and size, and add it to the cart.',
      'Check out with pay on delivery. A confirmation push arrives a few seconds later.',
      'Lock the phone, send "Out for delivery", then tap it on the lock screen.',
      'Switch the app to Arabic to see the full right-to-left layout.',
    ],
    ar: [
      'اختار منتج، وحدد اللون والمقاس، وضيفه للسلة.',
      'كمّل الطلب بالدفع عند الاستلام. هيوصلك إشعار تأكيد بعدها بثواني.',
      'اقفل الموبايل، وابعت "خرج للتوصيل"، ودوس عليه من شاشة القفل.',
      'حوّل التطبيق للعربي وشوف التصميم من اليمين للشمال.',
    ],
  },
  App: ShopsiiaApp,
};
