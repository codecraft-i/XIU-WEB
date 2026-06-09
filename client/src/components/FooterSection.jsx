import { ArrowRight } from 'lucide-react'

const SOCIALS = [
  { label: 'Facebook', href: 'https://facebook.com', icon: 'https://cdn.simpleicons.org/facebook/ffffff' },
  { label: 'Instagram', href: 'https://instagram.com', icon: 'https://cdn.simpleicons.org/instagram/ffffff' },
  { label: 'YouTube', href: 'https://youtube.com', icon: 'https://cdn.simpleicons.org/youtube/ffffff' },
  { label: 'TikTok', href: 'https://tiktok.com', icon: 'https://cdn.simpleicons.org/tiktok/ffffff' },
]

const FOOTER_COLUMNS = [
  {
    title: "Ta'lim",
    links: [
      "Bakalavr yo'nalishlari",
      "Magistratura dasturlari",
      "Qabul talablari",
      "Onlayn ariza topshirish",
      "Stipendiya imkoniyatlari",
      "Xalqaro dasturlar",
      "Qisqa kurslar",
      "Akademik taqvim",
    ],
  },
  {
    title: 'Tadqiqot',
    links: [
      'Ilmiy markazlar',
      'Professor-o‘qituvchilar',
      'Konferensiyalar',
      'Ilmiy jurnallar',
      'Hamkorlik loyihalari',
      'Innovatsiya laboratoriyasi',
      'Ekspertlar bazasi',
    ],
  },
  {
    title: 'Talabalar hayoti',
    links: [
      'Talabalar turar joyi',
      'Kampus hayoti',
      'Klublar va jamiyatlar',
      'Karyera markazi',
      'Kutubxona',
      'Ko‘ngillilar dasturi',
      'Student support',
      'Tadbirlar kalendari',
    ],
  },
  {
    title: "Qo'shimcha",
    links: [
      'Universitet haqida',
      "Yangiliklar va e'lonlar",
      'Media markaz',
      "Bo'sh ish o'rinlari",
      'Kampus xaritasi',
      "Bog'lanish",
      'Maxfiylik siyosati',
      'Foydalanish shartlari',
    ],
  },
]

function FooterSection() {
  return (
    <footer id="contact" className="footer-section" aria-label="Footer">
      <div className="footer-shell">
        <div className="footer-meta-row">
          <a href="#contact-section" className="footer-connect-link">
            Connect with XIU
            <ArrowRight size={23} />
          </a>

          <div className="footer-socials" aria-label="Ijtimoiy tarmoqlar">
            {SOCIALS.map((social) => (
              <a
                key={social.label}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="footer-social-link"
                aria-label={social.label}
              >
                <img
                  src={social.icon}
                  alt=""
                  aria-hidden="true"
                  className="footer-social-icon"
                  loading="lazy"
                />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-main">
          <div className="footer-brand">
            <a href="#" className="logo-lockup footer-logo-lockup" aria-label="XIU logotipi">
              <img src="/logo.png" alt="XIU" className="logo-image footer-logo-image" loading="lazy" />
              <span className="logo-title footer-logo-title">
                <span>Xorazm</span>
                <span>Iqtisodiyot Universiteti</span>
              </span>
            </a>

            <div className="footer-address">
              <p className="footer-address-strong">Xorazm Iqtisodiyot Universiteti</p>
              <p>Oyoq bogʻ MFY, Xiva ko'chasi , 41-uy</p>
              <p>Xorazm viloyati, 700000</p>
              <p>O'zbekiston</p>
              <a href="tel:+998999642613">+998999642613</a>
            </div>

            <p className="footer-note">
              XIU zamonaviy ta'lim, xalqaro hamkorlik va amaliy ilmiy faoliyatni birlashtirgan
              xususiy universitet sifatida faoliyat yuritadi.
            </p>

            <p className="footer-copy">© {new Date().getFullYear()} XIU</p>
          </div>

          <div className="footer-nav-grid" aria-label="Footer navigatsiya">
            {FOOTER_COLUMNS.map((column) => (
              <div key={column.title} className="footer-links">
                <h3 className="footer-block-title">{column.title}</h3>

                <nav className="footer-links-col" aria-label={column.title}>
                  {column.links.map((link) => (
                    <a key={link} href="#" className="footer-nav-link">
                      {link}
                    </a>
                  ))}
                </nav>
              </div>
            ))}
          </div>
        </div>
      </div>
    </footer>
  )
}

export default FooterSection
