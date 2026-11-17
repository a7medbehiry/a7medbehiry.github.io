export type Kind =
  | 'earbuds'
  | 'headphones'
  | 'sneaker'
  | 'watch'
  | 'tshirt'
  | 'mug'
  | 'backpack'
  | 'perfume'
  | 'sunglasses'
  | 'lamp';

export interface Product {
  id: string;
  kind: Kind;
  title: { en: string; ar: string };
  vendor: { en: string; ar: string };
  price: number;
  compare?: number;
  rating: number;
  reviews: number;
  /** Tile background and the product's own colour. */
  tint: string;
  color: string;
  colors?: { name: { en: string; ar: string }; hex: string }[];
  sizes?: string[];
  stock: number;
  freeShipping?: boolean;
  about: { en: string; ar: string };
}

export const products: Product[] = [
  {
    id: 'p1',
    kind: 'earbuds',
    title: { en: 'Wireless Earbuds Pro with Charging Case', ar: 'سماعات لاسلكية برو مع علبة شحن' },
    vendor: { en: 'SoundLab', ar: 'ساوند لاب' },
    price: 349,
    compare: 449,
    rating: 4.6,
    reviews: 318,
    tint: '#EEF1F5',
    color: '#FFFFFF',
    colors: [
      { name: { en: 'White', ar: 'أبيض' }, hex: '#FFFFFF' },
      { name: { en: 'Black', ar: 'أسود' }, hex: '#2A2F34' },
    ],
    stock: 14,
    freeShipping: true,
    about: {
      en: 'Clear sound, a snug fit and up to 24 hours of play with the case. Pairs in a second with any phone.',
      ar: 'صوت نقي وتثبيت مريح وتشغيل لحد 24 ساعة مع العلبة. بتتوصل في ثانية بأي موبايل.',
    },
  },
  {
    id: 'p2',
    kind: 'tshirt',
    title: { en: 'Everyday Cotton T-Shirt, Relaxed Fit', ar: 'تيشيرت قطن يومي، قصة مريحة' },
    vendor: { en: 'Cotton Co.', ar: 'كوتون كو' },
    price: 199,
    compare: 249,
    rating: 4.4,
    reviews: 126,
    tint: '#FEF1C7',
    color: '#F9BE00',
    colors: [
      { name: { en: 'Sunny', ar: 'أصفر' }, hex: '#F9BE00' },
      { name: { en: 'Ink', ar: 'كحلي' }, hex: '#2A2F34' },
      { name: { en: 'White', ar: 'أبيض' }, hex: '#FFFFFF' },
    ],
    sizes: ['S', 'M', 'L', 'XL'],
    stock: 40,
    about: {
      en: '100% Egyptian cotton, soft from the first wash. Cut a little loose for all-day comfort.',
      ar: 'قطن مصري 100%، ناعم من أول غسلة. قصة واسعة شوية عشان تبقى مريح طول اليوم.',
    },
  },
  {
    id: 'p3',
    kind: 'mug',
    title: { en: 'Stoneware Coffee Mug, 350 ml', ar: 'مج قهوة سيراميك، 350 مل' },
    vendor: { en: 'Clay & Co.', ar: 'كلاي آند كو' },
    price: 237,
    compare: 280,
    rating: 4.8,
    reviews: 89,
    tint: '#FFEDE4',
    color: '#F26522',
    stock: 3,
    about: {
      en: 'Hand-glazed stoneware that keeps your coffee warm. Dishwasher and microwave safe.',
      ar: 'سيراميك متلمّع يدوي بيحافظ على سخونة القهوة. ينفع في غسالة الأطباق والميكروويف.',
    },
  },
  {
    id: 'p4',
    kind: 'watch',
    title: { en: 'Smart Watch Active 2, AMOLED', ar: 'ساعة ذكية أكتيف 2، شاشة AMOLED' },
    vendor: { en: 'Techno Hub', ar: 'تكنو هب' },
    price: 1299,
    compare: 1899,
    rating: 4.5,
    reviews: 204,
    tint: '#E7ECF7',
    color: '#2A2F34',
    colors: [
      { name: { en: 'Graphite', ar: 'رمادي غامق' }, hex: '#2A2F34' },
      { name: { en: 'Orange', ar: 'برتقالي' }, hex: '#F26522' },
    ],
    stock: 9,
    freeShipping: true,
    about: {
      en: 'Heart rate, sleep and 100+ workout modes on a bright AMOLED screen. Seven days per charge.',
      ar: 'نبض ونوم وأكتر من 100 تمرين على شاشة AMOLED واضحة. أسبوع كامل بالشحنة.',
    },
  },
  {
    id: 'p5',
    kind: 'sneaker',
    title: { en: 'Runner Lite Sneakers', ar: 'كوتشي رانر لايت' },
    vendor: { en: 'Stride', ar: 'سترايد' },
    price: 899,
    compare: 1250,
    rating: 4.3,
    reviews: 77,
    tint: '#FFF4E0',
    color: '#F26522',
    sizes: ['40', '41', '42', '43', '44'],
    stock: 12,
    about: {
      en: 'Light, breathable and cushioned for long walks and easy runs.',
      ar: 'خفيف وبيتهوّى ومبطّن للمشي الطويل والجري الخفيف.',
    },
  },
  {
    id: 'p6',
    kind: 'headphones',
    title: { en: 'Noise-Cancelling Headphones', ar: 'سماعة رأس عازلة للضوضاء' },
    vendor: { en: 'SoundLab', ar: 'ساوند لاب' },
    price: 1590,
    compare: 2100,
    rating: 4.7,
    reviews: 412,
    tint: '#ECEFF1',
    color: '#2A2F34',
    stock: 6,
    freeShipping: true,
    about: {
      en: 'Active noise cancelling, 40 hours of battery and a fold-flat design for travel.',
      ar: 'عزل ضوضاء نشط، وبطارية 40 ساعة، وتصميم بيتطبق للسفر.',
    },
  },
  {
    id: 'p7',
    kind: 'backpack',
    title: { en: 'Daily Laptop Backpack, 15.6"', ar: 'شنطة ظهر للابتوب، 15.6 بوصة' },
    vendor: { en: 'Urban Gear', ar: 'أوربان جير' },
    price: 650,
    compare: 790,
    rating: 4.6,
    reviews: 151,
    tint: '#E9F3EE',
    color: '#2F6B55',
    stock: 20,
    about: {
      en: 'Padded laptop sleeve, water-resistant fabric and a hidden pocket for your passport.',
      ar: 'جيب مبطّن للابتوب، وقماش ضد المية، وجيب مخفي للباسبور.',
    },
  },
  {
    id: 'p8',
    kind: 'perfume',
    title: { en: 'Amber Oud Eau de Parfum, 100 ml', ar: 'برفان عنبر وعود، 100 مل' },
    vendor: { en: 'Scent House', ar: 'سنت هاوس' },
    price: 1150,
    compare: 1400,
    rating: 4.9,
    reviews: 64,
    tint: '#F7ECE1',
    color: '#C98A3B',
    stock: 8,
    about: {
      en: 'Warm amber and oud with a soft vanilla base. Lasts all day.',
      ar: 'عنبر وعود دافي مع قاعدة فانيليا هادية. بيعيش معاك طول اليوم.',
    },
  },
  {
    id: 'p9',
    kind: 'sunglasses',
    title: { en: 'Polarised Sunglasses, UV400', ar: 'نظارة شمس بولارايزد، UV400' },
    vendor: { en: 'Optic Line', ar: 'أوبتك لاين' },
    price: 420,
    compare: 600,
    rating: 4.2,
    reviews: 58,
    tint: '#FDECEC',
    color: '#2A2F34',
    stock: 15,
    about: {
      en: 'Polarised lenses that cut glare, in a light frame you forget you are wearing.',
      ar: 'عدسات بولارايزد بتقلل اللمعة، في فريم خفيف مش هتحس بيه.',
    },
  },
  {
    id: 'p10',
    kind: 'lamp',
    title: { en: 'Bedside Lamp with Warm Light', ar: 'أباجورة بإضاءة دافية' },
    vendor: { en: 'Nest Home', ar: 'نست هوم' },
    price: 540,
    rating: 4.5,
    reviews: 33,
    tint: '#F3F0E8',
    color: '#F9BE00',
    stock: 11,
    about: {
      en: 'Three brightness levels and a warm glow for reading at night.',
      ar: 'تلات درجات إضاءة ونور دافي للقراية بالليل.',
    },
  },
];

export const productById = (id: string) => products.find((p) => p.id === id) ?? products[0];

export const discount = (p: Product) => (p.compare && p.compare > p.price ? Math.round((1 - p.price / p.compare) * 100) : 0);

export const categories = [
  { id: 'electronics', en: 'Electronics', ar: 'إلكترونيات', tint: '#E7ECF7', art: 'headphones' as Kind },
  { id: 'fashion', en: 'Fashion', ar: 'موضة', tint: '#FEF1C7', art: 'tshirt' as Kind },
  { id: 'shoes', en: 'Shoes', ar: 'أحذية', tint: '#FFF4E0', art: 'sneaker' as Kind },
  { id: 'home', en: 'Home', ar: 'البيت', tint: '#F3F0E8', art: 'lamp' as Kind },
  { id: 'beauty', en: 'Beauty', ar: 'جمال', tint: '#F7ECE1', art: 'perfume' as Kind },
  { id: 'bags', en: 'Bags', ar: 'شنط', tint: '#E9F3EE', art: 'backpack' as Kind },
  { id: 'kitchen', en: 'Kitchen', ar: 'المطبخ', tint: '#FFEDE4', art: 'mug' as Kind },
];

export const sections = [
  { id: 'limited', title: { en: 'Limited time', ar: 'لفترة محدودة' }, sub: { en: 'Deals that end tonight', ar: 'عروض بتخلص الليلة' }, ids: ['p1', 'p4', 'p6', 'p5', 'p9'] },
  { id: 'new', title: { en: 'New arrivals', ar: 'وصل حديثًا' }, sub: { en: 'Fresh from our vendors', ar: 'جديد من البائعين' }, ids: ['p8', 'p7', 'p2', 'p10', 'p3'] },
];

/** The basket the demo opens with: 3 units, 785 EGP. */
export const seedCart = [
  { pid: 'p1', qty: 1, variant: { en: 'White', ar: 'أبيض' } },
  { pid: 'p2', qty: 1, variant: { en: 'Sunny · M', ar: 'أصفر · M' } },
  { pid: 'p3', qty: 1 },
];

export const faqs = [
  {
    q: { en: 'How do I track my order?', ar: 'إزاي أتابع طلبي؟' },
    a: { en: 'Open Account › My orders and tap the order. You also get a notification at every step, from confirmed to delivered.', ar: 'افتح حسابي › طلباتي ودوس على الطلب. وكمان هيوصلك إشعار في كل خطوة، من التأكيد لحد التسليم.' },
  },
  {
    q: { en: 'Which payment methods do you accept?', ar: 'إيه طرق الدفع المتاحة؟' },
    a: { en: 'Cash on delivery. You pay the courier when the order arrives, and no card details are collected.', ar: 'الدفع عند الاستلام. بتدفع للمندوب لما الطلب يوصل، ومش بنطلب أي بيانات بطاقة.' },
  },
  {
    q: { en: 'How long does delivery take?', ar: 'التوصيل بياخد قد إيه؟' },
    a: { en: 'Usually 2 to 4 working days, depending on your city. Items from different vendors can arrive separately.', ar: 'غالبًا من 2 لـ 4 أيام عمل حسب مدينتك. المنتجات من بائعين مختلفين ممكن توصل منفصلة.' },
  },
  {
    q: { en: 'Can I return an item?', ar: 'أقدر أرجّع منتج؟' },
    a: { en: 'Yes, within 14 days of delivery. Start a return from the order page and a courier picks it up.', ar: 'أيوه، خلال 14 يوم من الاستلام. ابدأ المرتجع من صفحة الطلب والمندوب هييجي ياخده.' },
  },
  {
    q: { en: 'Do I need an account to shop?', ar: 'لازم يكون عندي حساب عشان أشتري؟' },
    a: { en: 'No. Browse and fill your cart as a guest. When you sign in, your cart comes with you.', ar: 'لأ. تقدر تتصفح وتملا السلة كزائر، ولما تسجل دخول السلة بتتنقل معاك.' },
  },
  {
    q: { en: 'Can I change my delivery address?', ar: 'أقدر أغيّر عنوان التوصيل؟' },
    a: { en: 'Yes, before the order ships. Pick a pin on the map and we match it to the nearest shipping city.', ar: 'أيوه، قبل ما الطلب يتشحن. حدد مكانك على الخريطة وإحنا بنربطه بأقرب مدينة شحن.' },
  },
  {
    q: { en: 'How do I become a vendor?', ar: 'إزاي أبيع على شوبسيا؟' },
    a: { en: 'Go to Account › Sell with Shopsiia and send your application. The team replies within two working days.', ar: 'روح لحسابي › بِع مع شوبسيا وابعت طلبك. الفريق بيرد خلال يومين عمل.' },
  },
];

export const money = (v: number, lang: 'en' | 'ar') => {
  const n = v.toLocaleString('en-US', { maximumFractionDigits: 2 });
  return lang === 'ar' ? `${n} ج.م` : `${n} EGP`;
};
