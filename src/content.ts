import shopsiiaIcon from './assets/icons/shopsiia.png';
import salasaIcon from './assets/icons/salasa.png';
import letsIcon from './assets/icons/magchat.png';
import homecarIcon from './assets/icons/homecar.png';
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

export const services: { title: L; body: L }[] = [
  { title: { en: 'Mobile App Development', ar: 'تطوير تطبيقات الموبايل' }, body: { en: 'Production Flutter apps for Android and iOS from one codebase, with native features where they matter.', ar: 'تطبيقات Flutter منشورة على Android و iOS من كود واحد، مع ميزات Native وقت ما تحتاجها.' } },
  { title: { en: 'Real-time & Calls', ar: 'اللحظي والمكالمات' }, body: { en: 'Chat over WebSockets, voice and video calls with Agora, and calls that ring on the lock screen.', ar: 'شات بالـ WebSockets، ومكالمات صوت وفيديو بـ Agora، ومكالمات بترن على شاشة القفل.' } },
  { title: { en: 'Backend & API Integration', ar: 'ربط الـ APIs والباك إند' }, body: { en: 'REST, Firebase, payment gateways and maps, plus Spring Boot and PostgreSQL when the project needs its own backend.', ar: 'REST و Firebase وبوابات الدفع والخرايط، و Spring Boot و PostgreSQL لو المشروع محتاج باك إند خاص.' } },
  { title: { en: 'App Architecture', ar: 'معمارية التطبيق' }, body: { en: 'Clean Architecture with Bloc/Cubit, dependency injection, offline-first storage and code a team can keep working on.', ar: 'Clean Architecture مع Bloc/Cubit، و Dependency Injection، وتخزين بيشتغل من غير نت، وكود الفريق يقدر يكمّل عليه.' } },
  { title: { en: 'Release & Updates', ar: 'الرفع والتحديثات' }, body: { en: 'App Store and Google Play releases, CI/CD with GitHub Actions, and over-the-air fixes with Shorebird.', ar: 'رفع على App Store و Google Play، و CI/CD بـ GitHub Actions، وتحديثات فورية بـ Shorebird.' } },
];

export const processSteps: { title: L; body: L; tags: string[] }[] = [
  { title: { en: 'Understand the product', ar: 'فهم المنتج' }, body: { en: 'Read the requirements and designs, ask the awkward questions early, and agree what "done" means.', ar: 'أقرا المتطلبات والتصميمات، وأسأل الأسئلة الصعبة بدري، ونتفق يعني إيه "خلصت".' }, tags: ['Requirements', 'Figma', 'API contract'] },
  { title: { en: 'Plan the architecture', ar: 'تخطيط المعمارية' }, body: { en: 'Split the app into features, pick state management and storage, and set up the project so it scales.', ar: 'أقسّم التطبيق features، وأختار إدارة الحالة والتخزين، وأجهّز المشروع بحيث يكبر بسهولة.' }, tags: ['Clean Architecture', 'Bloc', 'DI'] },
  { title: { en: 'Build feature by feature', ar: 'بناء feature ورا التانية' }, body: { en: 'Pixel-accurate screens, API integration and edge cases like slow networks, empty states and errors.', ar: 'شاشات مطابقة للتصميم، وربط الـ APIs، والحالات الصعبة زي النت البطيء والشاشات الفاضية والأخطاء.' }, tags: ['UI', 'REST', 'WebSockets'] },
  { title: { en: 'Test and polish', ar: 'اختبار وتحسين' }, body: { en: 'Test on real devices, fix crashes from Crashlytics, and tune performance before release.', ar: 'أجرّب على أجهزة حقيقية، وأصلّح الـ crashes من Crashlytics، وأحسّن الأداء قبل الرفع.' }, tags: ['Testing', 'Crashlytics', 'Performance'] },
  { title: { en: 'Release and support', ar: 'الرفع والمتابعة' }, body: { en: 'Ship to both stores, automate the pipeline, and push quick fixes over the air after launch.', ar: 'أرفع على الستورين، وأعمل أتمتة للرفع، وأبعت تصليحات سريعة بعد الإطلاق.' }, tags: ['TestFlight', 'Google Play', 'Shorebird'] },
];

export interface Cert {
  title: string;
  issuer: string;
  url: string;
}

export const featuredCerts: { title: L; issuer: string; note: L; url: string; image: 'cs50' | 'performance' | 'best-employee' }[] = [
  { title: { en: 'CS50x: Introduction to Computer Science', ar: 'CS50x: مقدمة في علوم الحاسب' }, issuer: 'Harvard University', note: { en: 'Ten problem sets, nine labs and a final project.', ar: 'عشر مسائل وتسع معامل ومشروع نهائي.' }, url: 'https://cs50.harvard.edu/certificates/456ebd62-4741-49fc-bd87-208991611496', image: 'cs50' },
  { title: { en: 'Performance Recognition', ar: 'تكريم على الأداء' }, issuer: 'Tqnia IT', note: { en: 'Recognised for my work as a Flutter developer.', ar: 'تكريم على شغلي كمطور Flutter.' }, url: 'https://drive.google.com/file/d/1bQrENss8yM84gFOMx-Ig_MLUh6tcQ82p/view?usp=sharing', image: 'performance' },
  { title: { en: 'Best Employee of the Month', ar: 'أفضل موظف في الشهر' }, issuer: 'Webbing Agency', note: { en: 'Awarded while building e-commerce and logistics apps.', ar: 'وأنا ببني تطبيقات تجارة إلكترونية ولوجستيات.' }, url: 'https://drive.google.com/file/d/1m7W_g4lOCmxvyGmIqwo_-7Fk1HXRIa0/view?usp=sharing', image: 'best-employee' },
];

export const experienceCertUrl = 'https://drive.google.com/file/d/1wKYp0aphcUD4AbEE_9YnwPGKcSQzTCwB/view?usp=sharing';

export const certGroups: { id: string; name: L; items: Cert[] }[] = [
  {
    id: 'flutter',
    name: { en: 'Flutter & Software Engineering', ar: 'Flutter وهندسة البرمجيات' },
    items: [
      { title: 'CS50x: Introduction to Computer Science', issuer: 'Harvard', url: 'https://cs50.harvard.edu/certificates/456ebd62-4741-49fc-bd87-208991611496' },
      { title: 'Mastering Programming: A Comprehensive Course (Dart)', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-54834017-c3de-4772-9c8e-2cc1643ad96b/' },
      { title: 'Complete Flutter & Dart Development Course', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-c807ce73-5fd3-4816-8b1d-898abf085209/' },
      { title: 'Flutter Advanced Course: Bloc and MVVM Pattern', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-218f7578-629c-4717-95e3-d891a8b16142/' },
      { title: 'Deep Dive into Clean Architecture in Flutter', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-fe1bede9-7c4a-473a-9bf5-a814bce32082/' },
      { title: 'Flutter Payment Integration: Stripe, PayPal', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-212016fa-102f-483a-8cc3-6412b155a95c/' },
      { title: 'Mastering Flutter: Responsive & Adaptive UI Design', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-01c3d4e6-0481-47a9-9208-b23506473d9c/' },
      { title: 'Flutter & Firebase: Build Your Own E-Commerce', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-64e3031e-3fe4-4580-86eb-a5fba36003f0/' },
      { title: 'Flutter App Creation: Google Maps Integration Guide', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-3c35d384-d4c9-46ca-abd6-10323c7e55e0/' },
    ],
  },
  {
    id: 'design',
    name: { en: 'Design, Product & Business', ar: 'التصميم والمنتج والبيزنس' },
    items: [
      { title: 'UI/UX Design', issuer: 'ITI', url: 'https://drive.google.com/file/d/1nVGTwiKQTBbm2kq-ENm_ggqXMkxJNBgR/view?usp=drive_link' },
      { title: 'UX Design Fundamentals', issuer: '', url: 'https://drive.google.com/file/d/1BtssA25rJtQP7k9MI-7QJCdc5sUmacJm/view?usp=sharing' },
      { title: 'Web Design', issuer: 'Udemy', url: 'https://drive.google.com/file/d/1hV2aL_SgPQpzXRAbdcN9YZb9N-lnb2-i/view?usp=drive_link' },
      { title: 'Web Development', issuer: 'Udacity', url: 'https://drive.google.com/file/d/1tMh3Czy55zLvpbWQog68ahvDRP8tjUWq/view?usp=drive_link' },
      { title: 'Digital Marketing', issuer: 'Udacity', url: 'https://drive.google.com/file/d/1dEhZR8CUd2RUUbdIJgjQWF_FNVyhELFu/view?usp=drive_link' },
      { title: 'Photoshop for Beginners', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-6541218f-9975-4041-9940-f075814f2631/' },
      { title: 'Professional Adobe Photoshop', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-23b2d06a-280d-4118-97cb-f8cd1e034cb4/' },
      { title: 'Video Editing with Adobe Premiere', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-748bd1ee-e45f-4cd2-9353-8c58bef86f16/' },
    ],
  },
  {
    id: 'more',
    name: { en: 'Additional Technical Learning', ar: 'تعلم تقني إضافي' },
    items: [
      { title: 'CCNA', issuer: 'Cisco', url: 'https://drive.google.com/file/d/1e9mWIuzCapCT6J1fISeqEM_9yTmJou8w/view?usp=drive_link' },
      { title: 'ICDL', issuer: 'Misr Public Library', url: 'https://drive.google.com/file/d/1an9iP1n_lm-WD6MYt53OzXqgPc1EfkkP/view?usp=drive_link' },
      { title: 'Java Programming Language', issuer: 'TeraCourses', url: 'https://drive.google.com/file/d/1OjkM0iN5WuI0kPow3tQMuPexeJABQIc5/view?usp=sharing' },
      { title: 'Theoretical and Practical Understanding of Java', issuer: 'SoloLearn', url: 'https://drive.google.com/file/d/1a8hyCGxetr5gIQ8EjoRJIw7Z7Z8yLNBb/view?usp=sharing' },
      { title: 'Python Programming Language', issuer: 'Udemy', url: 'https://www.udemy.com/certificate/UC-da6aa825-2051-429e-8ddc-f91d92bc8257/' },
      { title: 'AI Fluency: Framework & Foundations', issuer: 'Anthropic', url: 'https://drive.google.com/file/d/15DJeEQlklyusF1I1ThrQM19hnAapbfxu/view?usp=sharing' },
      { title: 'Build Your Own Chatbot', issuer: 'Cognitive Class', url: 'https://drive.google.com/file/d/1YgUlEgorA3Md0NphUHip_a5oHSYRgxhs/view?usp=drive_link' },
    ],
  },
];

export const faq: { q: L; a: L }[] = [
  { q: { en: 'What platforms do you build for?', ar: 'بتعمل تطبيقات لأنهي منصات؟' }, a: { en: 'Android and iOS from a single Flutter codebase. I handle platform-specific work such as push notifications, CallKit, background location and deep links on both.', ar: 'Android و iOS من كود Flutter واحد. وبتعامل مع الحاجات الخاصة بكل منصة زي الإشعارات و CallKit والموقع في الخلفية والـ deep links.' } },
  { q: { en: 'How do you keep the code maintainable?', ar: 'إزاي بتحافظ إن الكود يفضل سهل التعديل؟' }, a: { en: 'Feature-first Clean Architecture, Bloc/Cubit for state, dependency injection with get_it, and typed error handling, so new people can find their way and features stay isolated.', ar: 'Clean Architecture مقسمة features، و Bloc/Cubit للحالة، و get_it للـ DI، وتعامل واضح مع الأخطاء، فأي حد جديد يلاقي طريقه والـ features متفصلة عن بعض.' } },
  { q: { en: 'Can you handle payments, maps and offline data?', ar: 'تقدر تشتغل على الدفع والخرايط والداتا من غير نت؟' }, a: { en: 'Yes. I have integrated Stripe, PayPal, Paymob, MyFatoorah and Fawaterak, Google Maps and Mapbox, and built offline-first sync on SQLite.', ar: 'أيوه. ربطت Stripe و PayPal و Paymob و MyFatoorah و Fawaterak، و Google Maps و Mapbox، وعملت sync بيشتغل من غير نت على SQLite.' } },
  { q: { en: 'Do you publish to the App Store and Google Play?', ar: 'بترفع على App Store و Google Play؟' }, a: { en: 'Yes, including TestFlight, store listings and review fixes. I automate builds with GitHub Actions and ship hotfixes with Shorebird.', ar: 'أيوه، ومعاها TestFlight وصفحات الستور وتصليح ملاحظات المراجعة. وبعمل أتمتة للبناء بـ GitHub Actions وتصليحات سريعة بـ Shorebird.' } },
  { q: { en: 'Are you open to relocation or remote work?', ar: 'متاح تسافر أو تشتغل ريموت؟' }, a: { en: 'Yes. I am based in Alexandria, Egypt, and open to remote roles, relocation and freelance projects.', ar: 'أيوه. أنا في الإسكندرية، ومتاح للشغل عن بُعد أو الانتقال أو مشاريع فريلانس.' } },
];
