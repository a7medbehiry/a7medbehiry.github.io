import {
  Headphones, Watch, Footprints, Shirt, Laptop, Smartphone, Coffee, Sofa, Baby, Gamepad2, Sparkles, Dumbbell,
  Backpack, Camera, Lamp, Speaker, type LucideIcon,
} from 'lucide-react';

export interface Category {
  id: string;
  en: string;
  ar: string;
  icon: LucideIcon;
  tint: string;
}

export const categories: Category[] = [
  { id: 'electronics', en: 'Electronics', ar: 'إلكترونيات', icon: Laptop, tint: '#E7F0FF' },
  { id: 'mobiles', en: 'Mobiles', ar: 'موبايلات', icon: Smartphone, tint: '#FFF1D6' },
  { id: 'fashion', en: 'Fashion', ar: 'أزياء', icon: Shirt, tint: '#FFE6DA' },
  { id: 'home', en: 'Home', ar: 'المنزل', icon: Sofa, tint: '#E6F5EC' },
  { id: 'beauty', en: 'Beauty', ar: 'تجميل', icon: Sparkles, tint: '#FBE7F3' },
  { id: 'sports', en: 'Sports', ar: 'رياضة', icon: Dumbbell, tint: '#E9EEF3' },
  { id: 'kids', en: 'Kids', ar: 'أطفال', icon: Baby, tint: '#FFF6D9' },
  { id: 'gaming', en: 'Gaming', ar: 'ألعاب', icon: Gamepad2, tint: '#EEE8FF' },
];

export type Badge = 'deal' | 'best' | 'new' | 'official' | 'low';

export interface Product {
  id: string;
  en: string;
  ar: string;
  vendorEn: string;
  vendorAr: string;
  category: string;
  price: number;
  old?: number;
  rating: number;
  reviews: number;
  icon: LucideIcon;
  tint: string;
  badge?: Badge;
  colors?: { en: string; ar: string; hex: string }[];
  sizes?: string[];
  delivery: 'tomorrow' | 'twoDay';
  stock: number;
}

export const products: Product[] = [
  { id: 'p1', en: 'Wireless Noise-Cancelling Headphones', ar: 'سماعة لاسلكية بعزل للضوضاء', vendorEn: 'SoundHub', vendorAr: 'ساوند هب', category: 'electronics', price: 2499, old: 3299, rating: 4.7, reviews: 1284, icon: Headphones, tint: '#E7F0FF', badge: 'deal', colors: [{ en: 'Black', ar: 'أسود', hex: '#2A2F34' }, { en: 'Silver', ar: 'فضي', hex: '#C9CED4' }, { en: 'Navy', ar: 'كحلي', hex: '#26406B' }], delivery: 'tomorrow', stock: 14 },
  { id: 'p2', en: 'Smart Watch Series 6, 44mm', ar: 'ساعة ذكية سيريس 6، 44 مم', vendorEn: 'TechZone', vendorAr: 'تك زون', category: 'electronics', price: 3850, old: 4400, rating: 4.5, reviews: 642, icon: Watch, tint: '#FFF1D6', badge: 'best', colors: [{ en: 'Midnight', ar: 'ميدنايت', hex: '#1F2430' }, { en: 'Starlight', ar: 'ستارلايت', hex: '#EDE6D8' }], delivery: 'tomorrow', stock: 8 },
  { id: 'p3', en: 'Running Shoes Air Pro', ar: 'حذاء جري إير برو', vendorEn: 'StrideCo', vendorAr: 'سترايد', category: 'fashion', price: 1799, old: 2199, rating: 4.6, reviews: 389, icon: Footprints, tint: '#FFE6DA', badge: 'new', sizes: ['40', '41', '42', '43', '44'], colors: [{ en: 'White', ar: 'أبيض', hex: '#F4F4F4' }, { en: 'Orange', ar: 'برتقالي', hex: '#F26522' }], delivery: 'twoDay', stock: 21 },
  { id: 'p4', en: 'Cotton Oversized T-Shirt', ar: 'تيشيرت قطن أوفر سايز', vendorEn: 'Nile Wear', vendorAr: 'نايل وير', category: 'fashion', price: 349, rating: 4.3, reviews: 211, icon: Shirt, tint: '#E6F5EC', sizes: ['S', 'M', 'L', 'XL'], colors: [{ en: 'Olive', ar: 'زيتي', hex: '#6B7A4B' }, { en: 'Sand', ar: 'رملي', hex: '#D8C7A6' }, { en: 'Black', ar: 'أسود', hex: '#222' }], delivery: 'twoDay', stock: 40 },
  { id: 'p5', en: 'Portable Bluetooth Speaker', ar: 'سماعة بلوتوث محمولة', vendorEn: 'SoundHub', vendorAr: 'ساوند هب', category: 'electronics', price: 999, old: 1290, rating: 4.4, reviews: 978, icon: Speaker, tint: '#EEE8FF', badge: 'deal', delivery: 'tomorrow', stock: 3 },
  { id: 'p6', en: 'Espresso Machine 15 Bar', ar: 'ماكينة إسبريسو 15 بار', vendorEn: 'HomeMade', vendorAr: 'هوم ميد', category: 'home', price: 5299, old: 6100, rating: 4.8, reviews: 156, icon: Coffee, tint: '#FFF6D9', badge: 'official', delivery: 'twoDay', stock: 6 },
  { id: 'p7', en: 'Travel Laptop Backpack', ar: 'شنطة لابتوب للسفر', vendorEn: 'Carry+', vendorAr: 'كاري بلس', category: 'fashion', price: 649, rating: 4.5, reviews: 302, icon: Backpack, tint: '#E9EEF3', badge: 'best', delivery: 'tomorrow', stock: 18 },
  { id: 'p8', en: 'Mirrorless Camera Kit', ar: 'كاميرا ميرورليس مع عدسة', vendorEn: 'TechZone', vendorAr: 'تك زون', category: 'electronics', price: 28900, old: 31500, rating: 4.9, reviews: 88, icon: Camera, tint: '#FBE7F3', badge: 'low', delivery: 'twoDay', stock: 2 },
  { id: 'p9', en: 'LED Desk Lamp with Charger', ar: 'أباجورة مكتب LED بشاحن', vendorEn: 'HomeMade', vendorAr: 'هوم ميد', category: 'home', price: 459, old: 599, rating: 4.2, reviews: 140, icon: Lamp, tint: '#E6F5EC', badge: 'deal', delivery: 'tomorrow', stock: 25 },
  { id: 'p10', en: 'Wireless Game Controller', ar: 'دراع ألعاب لاسلكي', vendorEn: 'PlayPoint', vendorAr: 'بلاي بوينت', category: 'gaming', price: 1349, rating: 4.6, reviews: 517, icon: Gamepad2, tint: '#EEE8FF', badge: 'new', delivery: 'tomorrow', stock: 12 },
];

export const productById = (id: string) => products.find((p) => p.id === id) ?? products[0];

export const banners = [
  { id: 'b1', en: ['Mega Sale', 'Up to 40% off electronics'], ar: ['تخفيضات ميجا', 'خصم لحد 40% على الإلكترونيات'], bg: '#2A2F34', fg: '#F9BE00', cat: 'electronics' },
  { id: 'b2', en: ['Pay on delivery', 'Cash when it reaches your door'], ar: ['ادفع عند الاستلام', 'كاش لما الأوردر يوصلك'], bg: '#F26522', fg: '#FFFFFF', cat: 'fashion' },
  { id: 'b3', en: ['New season', 'Fresh fashion from local brands'], ar: ['الموسم الجديد', 'أزياء جديدة من براندات محلية'], bg: '#F9BE00', fg: '#2A2F34', cat: 'fashion' },
];

export const egp = (n: number, lang: 'en' | 'ar') =>
  lang === 'ar' ? `${n.toLocaleString('ar-EG')} ج.م` : `EGP ${n.toLocaleString('en-US')}`;
