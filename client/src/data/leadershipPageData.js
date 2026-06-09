const createTabs = ({ biography, academic, projects, contact }) => [
  {
    id: 'biografiya',
    label: 'Biografiya',
    paragraphs: biography,
  },
  {
    id: 'ilmiy-faoliyat',
    label: 'Ilmiy va pedagogik faoliyat',
    paragraphs: academic,
  },
  {
    id: 'loyihalar',
    label: 'Tadqiqotlar va loyihalar',
    paragraphs: projects,
  },
  {
    id: 'qabul',
    label: 'Qabul va bog‘lanish',
    paragraphs: contact,
  },
]

const leadershipMembers = [
  {
    slug: 'sharifzoda-sardorbek-orazboy-tabib-ogli',
    name: "Sharifzoda Sardorbek O'razboy Tabib O'g'li",
    degree: 'Fan doktori (DSc), professor',
    role: 'Rektor vazifasini bajaruvchi',
    shortDescription:
      'Universitetning strategik rivojlanishi, akademik siyosati va tashqi hamkorlik yo‘nalishlarini muvofiqlashtiradi.',
    employeeId: 'XIU-001',
    email: 'rector@xiuni.uz',
    reception: 'Dushanba, 15:00 - 17:00',
    group: 'rektorat',
    accent: {
      from: '#f1f5f9',
      to: '#dbeafe',
      ink: '#0f2d4b',
    },
    tabs: createTabs({
      biography: [
        "Sharifzoda Sardorbek O'razboy Tabib O'g'li universitet rahbari sifatida boshqaruv qarorlari, ta’lim siyosati va rivojlanish ustuvor yo‘nalishlarini yagona strategiya asosida olib boradi.",
        'Uning kundalik faoliyati akademik sifatni mustahkamlash, jamoa faoliyatini muvofiqlashtirish va universitetning ochiq boshqaruv tamoyillarini kuchaytirishga qaratilgan.',
      ],
      academic: [
        'Rahbarlik faoliyati bilan birga ta’lim mazmunini zamonaviy yondashuvlar asosida yangilash, o‘quv jarayonida sifat monitoringini kuchaytirish va professor-o‘qituvchilar salohiyatini qo‘llab-quvvatlash masalalariga e’tibor qaratadi.',
        'Ilmiy va pedagogik tashabbuslarda fan, amaliyot hamda boshqaruv o‘rtasidagi bog‘liqlikni kuchaytirish ustuvor yo‘nalish sifatida ko‘riladi.',
      ],
      projects: [
        'Strategik rejalashtirish, xalqaro hamkorliklarni kengaytirish va universitetning institutsional rivojlanish ko‘rsatkichlarini yaxshilash bo‘yicha loyihalarni boshqaradi.',
        'Ta’lim sifati, raqamlashtirish va infratuzilma yangilanishi bilan bog‘liq tashabbuslar rahbariyat darajasida muntazam nazorat qilinadi.',
      ],
      contact: [
        'Qabulga yozilish uchun murojaat mavzusini qisqa bayon qilib elektron pochta orqali oldindan bog‘lanish tavsiya etiladi.',
        'Rasmiy uchrashuvlar va xizmat yozishmalari universitet ichki tartibi asosida ko‘rib chiqiladi.',
      ],
    }),
  },
  {
    slug: 'avazov-xushnud-xolmuratovich',
    name: 'Avazov Xushnud Xolmuratovich',
    degree: 'Rektor maslahatchisi',
    role: "Talabalar orasida ijtimoiy-ma'naviy muhit barqarorligini ta'minlash bo‘yicha maslahatchi",
    shortDescription:
      'Talabalar bilan ishlash, ichki muhit barqarorligi va tarbiyaviy yo‘nalishdagi tashabbuslarni tahlil qiladi.',
    employeeId: 'XIU-002',
    email: 'advisor.students@xiuni.uz',
    reception: 'Seshanba, 14:00 - 16:00',
    group: 'rektorat',
    accent: {
      from: '#fff7ed',
      to: '#ffedd5',
      ink: '#9a3412',
    },
    tabs: createTabs({
      biography: [
        "Avazov Xushnud Xolmuratovich talabalar orasida sog‘lom ijtimoiy va ma'naviy muhitni shakllantirishga doir tashabbuslarni rektorat darajasida muvofiqlashtiradi.",
        'Uning faoliyati ichki profilaktika, kommunikatsiya sifati va talabalar bilan ishlash jarayonlarini tizimli tashkil etishga qaratilgan.',
      ],
      academic: [
        'Talabalar bilan ishlashga oid metodik yondashuvlar, ma’naviy-ma’rifiy dasturlar va tarbiyaviy jarayon samaradorligini oshirish bo‘yicha amaliy tavsiyalar tayyorlaydi.',
        'Pedagogik jamoa bilan birgalikda talabalarning universitet muhitiga moslashuvi va ijtimoiy faolligini qo‘llab-quvvatlashga xizmat qiluvchi mexanizmlarni ishlab chiqadi.',
      ],
      projects: [
        'Talabalar murojaatlari tahlili, ichki muhit monitoringi va profilaktik faoliyatni kuchaytirish bo‘yicha loyihalarda ishtirok etadi.',
        'Universitetdagi ma’naviy muhitni mustahkamlash va jamoaviy madaniyatni rivojlantirishga qaratilgan ichki tashabbuslarni kuzatib boradi.',
      ],
      contact: [
        'Talabalar bilan bog‘liq masalalarda murojaat yuborishda vaziyat tavsifi va kutilayotgan yechim qisqa va aniq ko‘rsatilishi tavsiya etiladi.',
        'Murojaatlar elektron pochta va qabul vaqti doirasida qabul qilinadi.',
      ],
    }),
  },
  {
    slug: 'nurjonov-arslonbek-otanazarovich',
    name: 'Nurjonov Arslonbek Otanazarovich',
    degree: 'Rektor maslahatchisi',
    role: 'Strategik rivojlantirish bo‘yicha rektor maslahatchisi',
    shortDescription:
      'Rivojlanish strategiyasi, institutsional o‘sish va boshqaruv samaradorligi bo‘yicha tahliliy takliflar tayyorlaydi.',
    employeeId: 'XIU-003',
    email: 'strategy@xiuni.uz',
    reception: 'Chorshanba, 10:00 - 12:00',
    group: 'rektorat',
    accent: {
      from: '#eff6ff',
      to: '#bfdbfe',
      ink: '#1d4ed8',
    },
    tabs: createTabs({
      biography: [
        'Nurjonov Arslonbek Otanazarovich universitetning uzoq muddatli rivojlanish yo‘nalishlari, ichki samaradorlik ko‘rsatkichlari va boshqaruv jarayonlarini takomillashtirish bo‘yicha maslahat beradi.',
        'U strategik tashabbuslarni amaliy jarayonlar bilan bog‘lash, natijadorlik indikatorlarini kuzatish va yangi o‘sish imkoniyatlarini aniqlash bilan shug‘ullanadi.',
      ],
      academic: [
        'Ta’lim boshqaruvi, rivojlanish rejalashtiruvi va ichki sifat tizimini mustahkamlashga qaratilgan tashkiliy yechimlar ustida ishlaydi.',
        'Akademik bo‘linmalar bilan hamkorlikda o‘quv muhitini yaxshilash va boshqaruv qarorlarini ma’lumotlarga tayangan holda shakllantirishga e’tibor qaratadi.',
      ],
      projects: [
        'Strategik xarita, samaradorlik indikatorlari va bo‘limlar kesimidagi monitoring mexanizmlarini yaratish bo‘yicha loyihalarda ishtirok etadi.',
        'Raqamlashtirish, ichki integratsiya va jarayonlarni soddalashtirishga xizmat qiluvchi yechimlarni ishlab chiqishga ko‘maklashadi.',
      ],
      contact: [
        'Strategiya, rivojlanish yoki ichki jarayonlar bo‘yicha murojaatlarda masala doirasi, kutilayotgan natija va mavjud holatni qisqacha ko‘rsatish tavsiya etiladi.',
        'Oldindan yozilish orqali uchrashuv va maslahat shakli belgilanadi.',
      ],
    }),
  },
  {
    slug: 'rejapov-izzatbek-olimbayevich',
    name: 'Rejapov Izzatbek Olimbayevich',
    degree: 'Falsafa doktori (PhD), dotsent',
    role: 'Xalqaro hamkorlik bo‘yicha prorektor',
    shortDescription:
      'Xalqaro sherikliklar, akademik almashinuv va tashqi aloqalar portfelini rivojlantiradi.',
    employeeId: 'XIU-004',
    email: 'international@xiuni.uz',
    reception: 'Chorshanba, 14:00 - 16:00',
    group: 'prorektorlar',
    accent: {
      from: '#eef2ff',
      to: '#c7d2fe',
      ink: '#3730a3',
    },
    tabs: createTabs({
      biography: [
        'Rejapov Izzatbek Olimbayevich universitetning xalqaro ochiqligi, hamkorlik loyihalari va tashqi akademik aloqalarini rivojlantirishga mas’ul rahbarlardan biri hisoblanadi.',
        'U xorijiy hamkorlar bilan aloqa, memorandumlar, qo‘shma tashabbuslar va akademik mobilitet masalalarini boshqaradi.',
      ],
      academic: [
        'Xalqaro standartlar, o‘quv hamkorliklari va professor-o‘qituvchilar almashinuvi asosida ta’lim jarayoniga yangi tajribalarni olib kirishga e’tibor qaratadi.',
        'Xorijiy ta’lim muassasalari bilan o‘zaro tajriba almashinuvi va qo‘shma dasturlarni muvofiqlashtiradi.',
      ],
      projects: [
        'Hamkor universitetlar bilan qo‘shma dasturlar, konferensiyalar va delegatsion uchrashuvlar doirasidagi tashabbuslarni olib boradi.',
        'Universitetning xalqaro reytinglar, akademik ko‘rinish va institutsional hamkorlik salohiyatini oshirishga qaratilgan yo‘nalishlarda ishlaydi.',
      ],
      contact: [
        'Xalqaro hamkorlik bo‘yicha murojaatlarda hamkor tashkilot nomi, taklif turi va kutilayotgan format ko‘rsatilishi maqsadga muvofiq.',
        'Elektron pochta orqali oldindan yuborilgan qisqa konsepsiya ko‘rib chiqish jarayonini tezlashtiradi.',
      ],
    }),
  },
  {
    slug: 'yuldashev-baxrom-sobirjanevich',
    name: 'Yuldashev Baxrom Sobirjanevich',
    degree: 'Fan doktori (DSc), professor',
    role: 'Tibbiyot ishlari bo‘yicha prorektor',
    shortDescription:
      'Tibbiyot yo‘nalishidagi o‘quv-amaliy jarayonlar, klinik hamkorlik va sifat nazoratini boshqaradi.',
    employeeId: 'XIU-005',
    email: 'medical@xiuni.uz',
    reception: 'Payshanba, 10:00 - 12:00',
    group: 'prorektorlar',
    accent: {
      from: '#ecfeff',
      to: '#bae6fd',
      ink: '#0f766e',
    },
    tabs: createTabs({
      biography: [
        'Yuldashev Baxrom Sobirjanevich tibbiyotga oid o‘quv-amaliy yo‘nalishlar, klinik baza bilan ishlash va soha sifat ko‘rsatkichlarini nazorat qilish masalalarini boshqaradi.',
        'U o‘quv jarayonining amaliyot bilan uyg‘unligini kuchaytirish va tibbiy yo‘nalishlarda resurslardan samarali foydalanishga e’tibor qaratadi.',
      ],
      academic: [
        'Tibbiyot ta’limi sifatini oshirish, amaliy mashg‘ulotlarni takomillashtirish va klinik ko‘nikmalarni rivojlantirishga qaratilgan ishlarda ishtirok etadi.',
        'Professor-o‘qituvchilar, klinik bazalar va akademik bo‘linmalar o‘rtasidagi hamkorlikni muvofiqlashtiradi.',
      ],
      projects: [
        'Klinik amaliyot, fan va o‘quv jarayonini birlashtiruvchi loyihalar, sifat nazorati tizimlari va amaliy infratuzilma bo‘yicha tashabbuslarni qo‘llab-quvvatlaydi.',
        'Sog‘liqni saqlash sohasi bilan hamkorlikda tashkiliy va amaliy dasturlarni rivojlantirish yo‘nalishida ishlaydi.',
      ],
      contact: [
        'Tibbiyotga oid ta’lim, klinik baza yoki amaliyot masalalari yuzasidan murojaat qilganda tegishli fakultet yoki bo‘lim nomini ko‘rsatish tavsiya etiladi.',
        'Ko‘rib chiqish uchun asosiy savol va zarur hujjatlarni ilova qilish maqsadga muvofiq.',
      ],
    }),
  },
  {
    slug: 'eshchanov-rahimbergan-egamberganovich',
    name: 'Eshchanov Rahimbergan Egamberganovich',
    degree: 'Magistr',
    role: 'Moliya va iqtisodiyot ishlari bo‘yicha prorektor',
    shortDescription:
      'Moliyaviy rejalashtirish, iqtisodiy samaradorlik va resurslardan oqilona foydalanishni muvofiqlashtiradi.',
    employeeId: 'XIU-006',
    email: 'finance@xiuni.uz',
    reception: 'Payshanba, 14:00 - 16:00',
    group: 'prorektorlar',
    accent: {
      from: '#f0fdf4',
      to: '#bbf7d0',
      ink: '#166534',
    },
    tabs: createTabs({
      biography: [
        'Eshchanov Rahimbergan Egamberganovich universitetning moliyaviy barqarorligi, iqtisodiy rejalashtirish va budjet intizomi bilan bog‘liq boshqaruv yo‘nalishlarini olib boradi.',
        'U resurslarni taqsimlash, xarajatlar samaradorligi va iqtisodiy ko‘rsatkichlar monitoringiga alohida e’tibor qaratadi.',
      ],
      academic: [
        'Moliyaviy va iqtisodiy boshqaruvning ta’lim muassasasi faoliyatiga ta’siri, ichki jarayonlar samaradorligi va boshqaruv intizomini mustahkamlash yo‘nalishlarida ishlaydi.',
        'Bo‘linmalar bilan hamkorlikda rejalar va ehtiyojlarni muvozanatli shakllantirishga xizmat qiluvchi amaliy mexanizmlarni qo‘llaydi.',
      ],
      projects: [
        'Budjetlashtirish, xarajatlarni optimallashtirish va infratuzilmaviy tashabbuslarni iqtisodiy asoslash bo‘yicha ichki loyihalarni muvofiqlashtiradi.',
        'Iqtisodiy tahlil, hisobdorlik va resurs samaradorligini oshirishga qaratilgan tashabbuslarni kuzatib boradi.',
      ],
      contact: [
        'Moliya va iqtisodiyot masalalarida murojaat yuborishda mavzu, bo‘lim nomi va mavjud hujjat asoslari ko‘rsatilishi tavsiya etiladi.',
        'Xizmat uchrashuvlari uchun oldindan yozilish talab etiladi.',
      ],
    }),
  },
  {
    slug: 'matyakubov-umidjon-raximovich',
    name: 'Matyakubov Umidjon Raximovich',
    degree: 'Fan doktori (DSc), professor',
    role: 'Ilmiy ishlar va innovatsiyalar bo‘yicha prorektor',
    shortDescription:
      'Ilmiy tadqiqotlar, grantlar, innovatsion tashabbuslar va ilmiy hamkorlik portfelini rivojlantiradi.',
    employeeId: 'XIU-007',
    email: 'science@xiuni.uz',
    reception: 'Juma, 10:00 - 12:00',
    group: 'prorektorlar',
    accent: {
      from: '#fdf4ff',
      to: '#e9d5ff',
      ink: '#7e22ce',
    },
    tabs: createTabs({
      biography: [
        'Matyakubov Umidjon Raximovich universitetning ilmiy salohiyatini oshirish, tadqiqot faoliyatini tizimli qo‘llab-quvvatlash va innovatsion muhitni rivojlantirish bo‘yicha ishlaydi.',
        'U ilmiy guruhlar, grant tashabbuslari va natijadorlik ko‘rsatkichlarini boshqarish jarayonlarini muvofiqlashtiradi.',
      ],
      academic: [
        'Professor-o‘qituvchilar va tadqiqotchilar uchun ilmiy faoliyat sifati, nashrlar, konferensiyalar va ilmiy mentorlik yo‘nalishlarini rivojlantirish ustida ishlaydi.',
        'Ilmiy ishlar va ta’lim o‘rtasidagi integratsiyani kuchaytirish orqali talabalar tadqiqot madaniyatini qo‘llab-quvvatlaydi.',
      ],
      projects: [
        'Grant arizalari, ilmiy laboratoriyalar, ilmiy seminarlar va innovatsion hamkorlik formatlari bilan bog‘liq loyihalarni qo‘llab-quvvatlaydi.',
        'Tadqiqot natijalarini amaliyotga joriy etish va universitetning ilmiy ko‘rinishini kuchaytirish yo‘nalishida tashabbuslar olib boradi.',
      ],
      contact: [
        'Ilmiy faoliyat bo‘yicha murojaatlarda mavzu yo‘nalishi, loyiha bosqichi va hamkorlik ehtiyoji aniq ko‘rsatilishi tavsiya etiladi.',
        'Dastlabki taqdimot yoki qisqa annotatsiya ilova qilinsa, ko‘rib chiqish jarayoni yengillashadi.',
      ],
    }),
  },
  {
    slug: 'egambergan-xudoynazarov-madraximovich',
    name: 'Egambergan Xudoynazarov Madraximovich',
    degree: 'Falsafa doktori (PhD), dotsent',
    role: "O‘quv ishlari bo‘yicha prorektor",
    shortDescription:
      'O‘quv rejalari, ta’lim sifati nazorati va dars jarayonlarining metodik muvofiqligini boshqaradi.',
    employeeId: 'XIU-008',
    email: 'academic@xiuni.uz',
    reception: 'Juma, 14:00 - 16:00',
    group: 'prorektorlar',
    accent: {
      from: '#eff6ff',
      to: '#dbeafe',
      ink: '#1e3a8a',
    },
    tabs: createTabs({
      biography: [
        "Egambergan Xudoynazarov Madraximovich universitetning o‘quv faoliyati, rejalashtirish va metodik uyg‘unlik bo‘yicha asosiy boshqaruv vazifalarini olib boradi.",
        'U ta’lim jarayonining ichki tartibi, sifat nazorati va akademik intizom ko‘rsatkichlarini barqaror ushlab turishga qaratilgan ishlarni muvofiqlashtiradi.',
      ],
      academic: [
        'O‘quv rejalari, fan dasturlari, nazorat jarayonlari va pedagogik yondashuvlar sifati bilan bog‘liq yo‘nalishlarda ishlaydi.',
        'Professor-o‘qituvchilar va dekanatlar bilan hamkorlikda o‘quv jarayonining uzluksiz va samarali tashkil etilishini qo‘llab-quvvatlaydi.',
      ],
      projects: [
        'Ta’lim sifati monitoringi, o‘quv jarayonlarini raqamlashtirish va akademik boshqaruvni soddalashtirish bo‘yicha loyihalarni muvofiqlashtiradi.',
        'Talabalar o‘zlashtirishi va o‘quv natijalarini yaxshilashga qaratilgan amaliy tashabbuslarni kuzatib boradi.',
      ],
      contact: [
        'O‘quv jarayoniga oid murojaatlarda fakultet, kurs yoki fan yo‘nalishini ko‘rsatish masalani tezroq yo‘naltirishga yordam beradi.',
        'Qabul uchun murojaat matni va zarur ilovalarni oldindan yuborish tavsiya etiladi.',
      ],
    }),
  },
]

export const leadershipGroups = [
  {
    id: 'rektorat',
    title: 'Rektor va maslahatchilar',
    members: leadershipMembers.filter((member) => member.group === 'rektorat'),
  },
  {
    id: 'prorektorlar',
    title: 'Prorektorlar',
    members: leadershipMembers.filter((member) => member.group === 'prorektorlar'),
  },
]

export function getLeadershipMember(slug) {
  return leadershipMembers.find((member) => member.slug === slug) ?? null
}

export { leadershipMembers }
