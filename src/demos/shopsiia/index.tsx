import type { DemoDef } from '../../shell/types';
import { ShopsiiaApp } from './ShopsiiaApp';
import icon from '../../assets/icons/shopsiia.webp';

export const shopsiiaDemo: DemoDef = {
  id: 'shopsiia',
  name: 'Shopsiia',
  tagline: { en: 'Multi-vendor e-commerce app', ar: 'تطبيق تجارة إلكترونية متعدد البائعين' },
  icon: <img src={icon} alt="" />,
  accent: '#F26522',
  statusDark: true,
  statusDarkWhen: (flags) => !flags.dark,
  fontFamily: { en: "'Poppins', system-ui, sans-serif", ar: "'Cairo', system-ui, sans-serif" },
  initialRoute: { name: 'home' },
  toggles: [
    {
      key: 'dark',
      label: { en: 'Dark theme', ar: 'الوضع الداكن' },
      hint: { en: 'The app follows the device theme, or the shopper picks one.', ar: 'التطبيق بيمشي مع ثيم الموبايل، أو العميل يختار.' },
      initial: false,
    },
  ],
  notifications: [
    {
      id: 'out',
      title: { en: 'Out for delivery', ar: 'خرج للتوصيل' },
      body: { en: 'Order SH-24817 is with the courier. It arrives today by 6 PM.', ar: 'الطلب SH-24817 مع المندوب. هيوصلك النهارده قبل 6 م.' },
      target: { name: 'tracking', params: { id: 'SH-24817', advance: 3 } },
    },
    {
      id: 'deal',
      title: { en: 'Limited time: 26% off', ar: 'لفترة محدودة: خصم 26%' },
      body: { en: 'Noise-cancelling headphones from SoundLab, today only.', ar: 'سماعة ساوند لاب العازلة للضوضاء، النهارده بس.' },
      target: { name: 'product', params: { id: 'p6' } },
    },
    {
      id: 'support',
      title: { en: 'Support replied', ar: 'رد من الدعم' },
      body: { en: 'Your order has shipped and arrives tomorrow before 6 PM.', ar: 'طلبك اتشحن وهيوصلك بكرة قبل 6 م.' },
      target: { name: 'chat' },
    },
    {
      id: 'cart',
      title: { en: 'Price dropped in your cart', ar: 'السعر نزل في سلتك' },
      body: { en: 'You now save 193 EGP on 3 items.', ar: 'دلوقتي هتوفّر 193 ج.م على 3 منتجات.' },
      target: { name: 'cart' },
    },
  ],
  jumps: [
    { label: { en: 'Home', ar: 'الرئيسية' }, route: { name: 'home' } },
    { label: { en: 'Product', ar: 'منتج' }, route: { name: 'product', params: { id: 'p1' } } },
    { label: { en: 'Cart', ar: 'السلة' }, route: { name: 'cart' } },
    { label: { en: 'Checkout', ar: 'إتمام الطلب' }, route: { name: 'checkout' } },
    { label: { en: 'Support', ar: 'المساعدة' }, route: { name: 'support' } },
    { label: { en: 'Offers', ar: 'العروض' }, route: { name: 'offers' } },
    { label: { en: 'Account', ar: 'حسابي' }, route: { name: 'account' } },
    { label: { en: 'Order tracking', ar: 'تتبع الطلب' }, route: { name: 'tracking', params: { id: 'SH-24817' } } },
  ],
  guide: {
    en: [
      'Scroll down on Home: the tab bar folds into a bubble on the right. Tap it, or go back to the top, to open it again.',
      'Open Cart: the checkout button and "You saved" ride on the same glass panel as the tabs.',
      'Open a product, pick a colour or size, tap Share, then add it to the cart and check out with cash on delivery.',
      'Turn on the dark theme, and switch the app to Arabic: the tabs keep their order, with Home on the right.',
    ],
    ar: [
      'انزل في الرئيسية: الـ tab bar بيتقفل لفقاعة على اليمين. دوس عليها أو ارجع لأول الصفحة عشان يفتح تاني.',
      'افتح السلة: زرار إتمام الشراء وسطر "وفّرت" على نفس اللوح الزجاجي مع التابات.',
      'افتح منتج، واختار لون أو مقاس، ودوس مشاركة، وبعدين ضيفه للسلة وكمّل بالدفع عند الاستلام.',
      'شغّل الوضع الداكن، وحوّل التطبيق للعربي: التابات ترتيبها ثابت والرئيسية على اليمين.',
    ],
  },
  App: ShopsiiaApp,
};
