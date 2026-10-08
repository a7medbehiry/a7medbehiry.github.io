import shopsiiaIcon from './assets/icons/shopsiia.png';
import salasaIcon from './assets/icons/salasa.png';
import letsIcon from './assets/icons/magchat.png';
import homecarIcon from './assets/icons/homecar.png';
import lusterIcon from './assets/icons/luster.png';
import taqyIcon from './assets/icons/taqy.png';
import perfumeIcon from './assets/icons/perfume.png';

type L = { en: string; ar: string };

export const profile = {
  name: { en: 'Ahmed Behiry', ar: 'أحمد بحيري' },
  role: { en: 'Flutter Developer', ar: 'مطور Flutter' },
  location: { en: 'Alexandria, Egypt · Open to relocation', ar: 'الإسكندرية، مصر · متاح للانتقال' },
  email: 'a7medbehiry@gmail.com',
  phone: '+20 110 248 5400',
  whatsapp: 'https://wa.me/201102485400',
  linkedin: 'https://www.linkedin.com/in/a7medbehiry/',
  github: 'https://github.com/a7medbehiry',
  medium: 'https://medium.com/@a7medbehiry',
  cv: 'Ahmed_Behiry_CV.pdf',
};

export interface Project {
  id: string;
  name: string;
  icon: string;
  kind: L;
  summary: L;
  points: { en: string[]; ar: string[] };
  stack: string[];
  role: L;
  play?: string;
  appStore?: string;
  web?: string;
  demo?: string;
  status: 'live' | 'demo';
}

export const projects: Project[] = [
  {
    id: 'shopsiia',
    name: 'Shopsiia',
    icon: shopsiiaIcon,
    kind: { en: 'Multi-vendor marketplace', ar: 'سوق إلكتروني متعدد البائعين' },
    summary: {
      en: 'A shopping app where customers buy from many sellers in one cart, pay on delivery, and follow each parcel to their door.',
      ar: 'تطبيق تسوق العميل فيه بيشتري من أكتر من بائع في سلة واحدة، ويدفع عند الاستلام، ويتابع كل طرد لحد باب البيت.',
    },
    points: {
      en: [
        'Full commerce journey: categories, search with filters, product variants, cart, checkout, order tracking and returns',
        'Guest-first: shoppers browse and fill a cart without an account; the cart moves to their account when they sign in',
        'Arabic and English with full right-to-left layout, plus light and dark themes',
        'In-memory caching that answers repeat screens instantly and merges duplicate requests',
      ],
      ar: [
        'رحلة شراء كاملة: أقسام، بحث بفلاتر، اختيارات للمنتج، سلة، دفع، تتبع أوردر ومرتجعات',
        'تقدر تتصفح وتملا السلة من غير حساب، والسلة بتتنقل لحسابك أول ما تسجل دخول',
        'عربي وإنجليزي بتصميم كامل من اليمين للشمال، ووضع فاتح وغامق',
        'كاش في الذاكرة بيفتح الشاشات المتكررة فورًا وبيدمج الطلبات المكررة',
      ],
    },
    stack: ['Flutter', 'Cubit', 'Clean Architecture', 'go_router', 'Dio', 'FCM', 'Shorebird'],
    role: { en: 'Freelance · sole mobile developer', ar: 'فريلانس · المطور الوحيد للموبايل' },
    demo: 'shopsiia',
    status: 'demo',
  },
  {
    id: 'lets',
    name: "Let's",
    icon: letsIcon,
    kind: { en: 'Real-time chat and calls', ar: 'شات ومكالمات لحظية' },
    summary: {
      en: 'A social messaging app with private, group and public chats, voice and video calls, stories and QR-based contact sharing.',
      ar: 'تطبيق رسائل فيه شات خاص وجروبات وغرف عامة، ومكالمات صوت وفيديو، وستوري، ومشاركة جهات اتصال بالـ QR.',
    },
    points: {
      en: [
        'Real-time messaging over WebSockets with typing indicators and presence',
        'Voice and video calls with Agora, ringing on the lock screen through CallKit even when the app is closed',
        'QR deep links that open a chat directly, and live location sharing between users',
      ],
      ar: [
        'رسائل لحظية بالـ WebSockets مع "بيكتب الآن" وحالة الأونلاين',
        'مكالمات صوت وفيديو بـ Agora، والموبايل بيرن على شاشة القفل بـ CallKit حتى والتطبيق مقفول',
        'لينكات QR بتفتح الشات مباشرة، ومشاركة الموقع المباشر بين المستخدمين',
      ],
    },
    stack: ['Flutter', 'Bloc', 'WebSockets', 'Agora', 'CallKit', 'FCM'],
    role: { en: 'Mobile engineer · calls and real-time', ar: 'مهندس موبايل · المكالمات والـ real-time' },
    play: 'https://play.google.com/store/apps/details?id=com.tqnia.magchat',
    appStore: 'https://apps.apple.com/eg/app/lets/id6749202582',
    demo: 'lets',
    status: 'live',
  },
  {
    id: 'homecar',
    name: 'Home & Car',
    icon: homecarIcon,
    kind: { en: 'On-demand services marketplace', ar: 'سوق خدمات عند الطلب' },
    summary: {
      en: 'Connects customers with drivers and handymen for home maintenance, car services and intercity trips.',
      ar: 'بيوصّل العملاء بالسواقين والفنيين لصيانة البيت وخدمات العربيات والرحلات بين المحافظات.',
    },
    points: {
      en: [
        'Live location tracking with background GPS that keeps running while the app is in the background',
        'Real-time bidding where providers send price offers over WebSockets',
        'Digital wallet with card tokenisation through Fawaterak, in-app chat and push notifications',
      ],
      ar: [
        'تتبع الموقع المباشر بالـ GPS حتى والتطبيق في الخلفية',
        'مزايدة لحظية: مقدمي الخدمة بيبعتوا عروض أسعار بالـ WebSockets',
        'محفظة إلكترونية وحفظ الكروت عن طريق فواتيرك، وشات داخل التطبيق وإشعارات',
      ],
    },
    stack: ['Flutter', 'GetX', 'Google Maps', 'Mapbox', 'WebSockets', 'Fawaterak'],
    role: { en: 'Mobile engineer', ar: 'مهندس موبايل' },
    play: 'https://play.google.com/store/apps/details?id=com.tqniait.homeandcars',
    appStore: 'https://apps.apple.com/us/app/home-and-car/id6742241271',
    status: 'live',
  },
  {
    id: 'salasa',
    name: 'Salasa CRM',
    icon: salasaIcon,
    kind: { en: 'Offline-first CRM', ar: 'CRM بيشتغل من غير نت' },
    summary: {
      en: 'A CRM for freelancers and small sales teams that keeps working without internet and syncs when the connection returns.',
      ar: 'CRM للفريلانسرز وفرق المبيعات الصغيرة، بيشتغل من غير نت ويعمل sync أول ما النت يرجع.',
    },
    points: {
      en: [
        'Every change is saved on the phone first, then synced in the background, so nothing is lost offline',
        'Follow-up reminders as scheduled local notifications',
        'Role-based access for admins and sales reps, with a Spring Boot and PostgreSQL backend I also built',
        'Automated iOS and Android releases with GitHub Actions and Shorebird',
      ],
      ar: [
        'أي تعديل بيتحفظ على الموبايل الأول وبعدين بيتعمله sync في الخلفية، فمفيش داتا بتضيع من غير نت',
        'تذكير بالمتابعات كإشعارات محلية في ميعادها',
        'صلاحيات للأدمن ومندوبي المبيعات، مع باك إند Spring Boot و PostgreSQL عملته برضه',
        'رفع نسخ iOS و Android أوتوماتيك بـ GitHub Actions و Shorebird',
      ],
    },
    stack: ['Flutter', 'Cubit', 'SQLite', 'Spring Boot', 'PostgreSQL', 'GitHub Actions'],
    role: { en: 'Own product · built end to end', ar: 'منتجي الخاص · من الفكرة للإطلاق' },
    demo: 'salasa',
    status: 'demo',
  },
  {
    id: 'taqy',
    name: 'TaQy',
    icon: taqyIcon,
    kind: { en: 'Office service requests', ar: 'إدارة طلبات المكتب' },
    summary: {
      en: 'Employees order drinks and office services from their desk; the office staff receive and complete them in real time; admins see everything.',
      ar: 'الموظف بيطلب مشروب أو خدمة من مكتبه، والأوفيس بوي بيستلم الطلب وينفذه لحظيًا، والأدمن شايف كل حاجة.',
    },
    points: {
      en: [
        'Three roles in one app: admin, employee and office staff, each with its own flow',
        'Built solo on Firebase: Authentication, Cloud Firestore real-time updates, Storage and Cloud Messaging',
      ],
      ar: [
        'تلات أدوار في تطبيق واحد: أدمن وموظف وأوفيس بوي، ولكل واحد شاشاته',
        'عملته لوحدي على Firebase: تسجيل دخول، وتحديثات لحظية بـ Firestore، وتخزين، وإشعارات',
      ],
    },
    stack: ['Flutter', 'Bloc', 'Firebase Auth', 'Firestore', 'FCM'],
    role: { en: 'Sole developer', ar: 'المطور الوحيد' },
    play: 'https://play.google.com/store/apps/details?id=com.tqniait.taqy',
    appStore: 'https://apps.apple.com/eg/app/taqy/id6755384464',
    status: 'live',
  },
  {
    id: 'luster',
    name: 'Luster',
    icon: lusterIcon,
    kind: { en: 'Business management', ar: 'إدارة البيزنس' },
    summary: {
      en: 'Runs a small business from the phone: orders, customers, team and products, in Arabic and English.',
      ar: 'تدير بيه بيزنس صغير من الموبايل: الأوردرات والعملاء والفريق والمنتجات، بالعربي والإنجليزي.',
    },
    points: {
      en: ['Orders, customers, team and product management', 'QR scanning and full Arabic/English support'],
      ar: ['إدارة الأوردرات والعملاء والفريق والمنتجات', 'قراءة QR ودعم كامل للعربي والإنجليزي'],
    },
    stack: ['Flutter', 'Bloc', 'Riverpod', 'Dio', 'FCM'],
    role: { en: 'Mobile engineer', ar: 'مهندس موبايل' },
    play: 'https://play.google.com/store/apps/details?id=com.tqnia.luster',
    appStore: 'https://apps.apple.com/eg/app/luster-app/id6757190651',
    status: 'live',
  },
  {
    id: 'perfume',
    name: 'Behiry Perfume',
    icon: perfumeIcon,
    kind: { en: 'E-commerce for a family business', ar: 'متجر إلكتروني لبيزنس العيلة' },
    summary: {
      en: 'I led the move of a real fragrance business online: product, UX, the mobile app and the release roadmap.',
      ar: 'قدت تحويل بيزنس عطور حقيقي للأونلاين: المنتج وتجربة المستخدم والتطبيق وخطة الإصدارات.',
    },
    points: {
      en: ['Catalog, categories, cart and checkout', 'Google sign-in, push notifications and Remote Config for feature flags'],
      ar: ['كتالوج وأقسام وسلة ودفع', 'تسجيل دخول بجوجل وإشعارات و Remote Config للتحكم في الميزات'],
    },
    stack: ['Flutter', 'Bloc', 'Firebase', 'Remote Config'],
    role: { en: 'Product owner and developer', ar: 'صاحب المنتج والمطور' },
    web: 'https://behiryperfume.com/',
    status: 'live',
  },
];

export const experience = [
  {
    role: { en: 'Mobile Software Engineer', ar: 'مهندس برمجيات موبايل' },
    org: 'Tqnia IT',
    when: { en: 'Oct 2024 – Sep 2026', ar: 'أكتوبر 2024 – سبتمبر 2026' },
    note: { en: 'Full-time · performance recognition', ar: 'دوام كامل · تكريم على الأداء' },
    points: {
      en: [
        'Built and maintained production Flutter apps across commerce, real-time communication, logistics and business tools',
        'Integrated REST APIs, WebSockets, Firebase, payment gateways and third-party SDKs',
        'Automated build and release with GitHub Actions and Shorebird',
      ],
      ar: [
        'بنيت وطوّرت تطبيقات Flutter منشورة في التجارة والتواصل اللحظي واللوجستيات وأدوات البيزنس',
        'ربطت REST APIs و WebSockets و Firebase وبوابات دفع و SDKs خارجية',
        'أتمتة البناء والرفع بـ GitHub Actions و Shorebird',
      ],
    },
  },
  {
    role: { en: 'Mobile Application Developer', ar: 'مطور تطبيقات موبايل' },
    org: 'Behiry Perfume',
    when: { en: 'Feb 2024 – present', ar: 'فبراير 2024 – الآن' },
    note: { en: 'Own product', ar: 'منتج خاص' },
    points: {
      en: ['Took a real fragrance business online, from product validation and UX to development and releases'],
      ar: ['نقلت بيزنس عطور حقيقي للأونلاين، من اختبار الفكرة وتجربة المستخدم للتطوير والإصدارات'],
    },
  },
  {
    role: { en: 'Mobile Engineer', ar: 'مهندس موبايل' },
    org: 'Webbing Agency',
    when: { en: 'Aug 2024 – Feb 2025', ar: 'أغسطس 2024 – فبراير 2025' },
    note: { en: 'Best Employee of the Month', ar: 'أفضل موظف في الشهر' },
    points: {
      en: ['Built multi-vendor e-commerce and logistics apps, including order tracking flows'],
      ar: ['بنيت تطبيقات تجارة إلكترونية متعددة البائعين ولوجستيات، منها تتبع الأوردرات'],
    },
  },
];

export const skills: { group: L; items: string[] }[] = [
  { group: { en: 'Mobile', ar: 'الموبايل' }, items: ['Flutter', 'Dart', 'Android', 'iOS', 'Platform channels'] },
  { group: { en: 'State & architecture', ar: 'الحالة والمعمارية' }, items: ['Bloc / Cubit', 'Provider', 'Riverpod', 'GetX', 'Clean Architecture', 'MVVM', 'SOLID'] },
  { group: { en: 'Data & real-time', ar: 'البيانات واللحظي' }, items: ['REST', 'WebSockets', 'Firebase', 'SQLite', 'Hive', 'Secure Storage'] },
  { group: { en: 'Payments & maps', ar: 'الدفع والخرائط' }, items: ['Stripe', 'PayPal', 'Paymob', 'MyFatoorah', 'Fawaterak', 'Google Maps', 'Mapbox'] },
  { group: { en: 'Release', ar: 'الإصدار' }, items: ['GitHub Actions', 'Shorebird', 'TestFlight', 'Google Play', 'Firebase App Distribution'] },
  { group: { en: 'Backend', ar: 'الباك إند' }, items: ['Spring Boot', 'Node.js', 'PostgreSQL', 'MySQL'] },
];

export const writing = [
  {
    title: { en: 'Shipping Flutter to TestFlight from Windows', ar: 'رفع Flutter على TestFlight من Windows' },
    where: 'Medium',
    url: 'https://medium.com/@a7medbehiry/shipping-flutter-to-testflight-from-windows-the-complete-github-actions-setup-4838a2a51864',
  },
  {
    title: { en: 'Mastering deep linking in Flutter', ar: 'الـ Deep Linking في Flutter بالتفصيل' },
    where: 'Medium',
    url: 'https://medium.com/@a7medbehiry/mastering-deep-linking-in-flutter-how-i-built-a-production-ready-system-aba71264d082',
  },
  {
    title: { en: 'Dart programming fundamentals', ar: 'أساسيات البرمجة بـ Dart' },
    where: 'YouTube',
    url: 'https://www.youtube.com/playlist?list=PLWjK-c1FkweWssXrz8puOybSqX8klC8Oy',
  },
];
