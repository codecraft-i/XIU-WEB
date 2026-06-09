import { motion } from 'framer-motion'
import { Briefcase, ChevronDown, FilePenLine, Mail, MapPin, Menu, MessageSquare, Phone, Users } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useTranslation } from 'react-i18next'
import MobileMenu from './MobileMenu'
import { LANGUAGE_META, SUPPORTED_LANGUAGES } from '../i18n/content'
import { useSiteContent } from '../i18n/useSiteContent'
import { CLOUDINARY_ASSETS } from '../lib/assets'

function DropdownIcon({ name }) {
  if (name === 'building') {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3 21h18" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M6 21V7.5l6-3.5 6 3.5V21" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M9.25 10.25h.01M14.75 10.25h.01M9.25 14h.01M14.75 14h.01" stroke="currentColor" strokeWidth="2.4" strokeLinecap="round" />
        <path d="M10 21v-4.5h4V21" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'user') {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 12a4 4 0 1 0 0-8 4 4 0 0 0 0 8Z" stroke="currentColor" strokeWidth="1.9" />
        <path d="M4.5 20.25a7.5 7.5 0 0 1 15 0" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'campus') {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3.75 10.5 12 5l8.25 5.5L12 16l-8.25-5.5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M6 12.25V17l6 4 6-4v-4.75" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'structure') {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 4v5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M6 20v-5h12v5" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M4.5 9.5h15v5.5h-15V9.5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'document') {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M7 3.75h7l3 3V20.25H7V3.75Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M14 3.75V7.5h3.75" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M9.5 11.5h5M9.5 15.25h5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'location') {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 21s6.5-4.8 6.5-10.75a6.5 6.5 0 1 0-13 0C5.5 16.2 12 21 12 21Z" stroke="currentColor" strokeWidth="1.9" />
        <path d="M12 12.75a2.75 2.75 0 1 0 0-5.5 2.75 2.75 0 0 0 0 5.5Z" stroke="currentColor" strokeWidth="1.9" />
      </svg>
    )
  }

  if (name === 'cap') {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M3.5 9.25 12 5l8.5 4.25L12 13.5 3.5 9.25Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M7 11.6V15.5c0 .9 2.25 2.5 5 2.5s5-1.6 5-2.5v-3.9" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'briefcase') {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M4 9.25h16v8.25A1.5 1.5 0 0 1 18.5 19h-13A1.5 1.5 0 0 1 4 17.5V9.25Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M4 12.5c2.3 1.3 4.95 1.95 8 1.95 3.05 0 5.7-.65 8-1.95" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    )
  }

  if (name === 'megaphone') {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M14.5 7.25 8.25 9.5v5l6.25 2.25V7.25Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M14.5 8.25c1.5 0 2.75-1.25 2.75-2.75v13c0-1.5-1.25-2.75-2.75-2.75" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M8.25 14.5 9.5 18.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M5 14.5h3.25v-5H5a1.5 1.5 0 0 0-1.5 1.5V13A1.5 1.5 0 0 0 5 14.5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'spark') {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M12 3.5 13.9 9l5.6 1.1-4.1 4 1 5.7-4.4-2.5-4.4 2.5 1-5.7-4.1-4L10.1 9 12 3.5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
      </svg>
    )
  }

  if (name === 'support') {
    return (
      <svg viewBox="0 0 24 24" fill="none">
        <path d="M6 14.5a6 6 0 1 1 12 0" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
        <path d="M5.5 13.5H5A1.5 1.5 0 0 0 3.5 15v2A1.5 1.5 0 0 0 5 18.5h1.5V13.5ZM18.5 13.5H19A1.5 1.5 0 0 1 20.5 15v2a1.5 1.5 0 0 1-1.5 1.5h-1.5V13.5Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
        <path d="M9.75 20h4.5" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      </svg>
    )
  }

  return (
    <svg viewBox="0 0 24 24" fill="none">
      <path d="M4.5 12h15" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M12 4.5v15" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" />
      <path d="M6.5 6.5h11v11h-11v-11Z" stroke="currentColor" strokeWidth="1.9" strokeLinejoin="round" />
    </svg>
  )
}

function HemisIcon() {
  return (
    <svg
      width="42"
      height="42"
      viewBox="0 0 512 512"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <rect width="512" height="512" rx="0" fill="#0B84F3" />
      <rect x="118" y="84" width="56" height="346" rx="28" fill="white" />
      <rect x="338" y="84" width="56" height="346" rx="28" fill="white" />
      <rect x="146" y="229" width="220" height="56" fill="white" />
    </svg>
  )
}

const NAV_ITEMS = [
  {
    label: 'Universitet',
    badge: 'Universitet',
    heading: 'Universitet hayoti va boshqaruvi',
    description:
      "Universitet missiyasi, boshqaruv tuzilmasi, kampus muhiti va asosiy bo‘limlarga tezkor kirish.",
    actionLabel: "Qabul bo'limiga o'tish",
    actionHref: '/admission',
    submenu: [
      {
        label: 'Biz haqimizda',
        description: "Universitetning missiyasi, qadriyatlari va rivojlanish yo'nalishi",
        href: '/about',
        icon: 'building',
      },
      {
        label: 'Rahbariyat',
        description: "Universitet boshqaruvi va mas'ul jamoa bilan tanishing",
        href: '/rahbariyat',
        icon: 'user',
      },
      {
        label: 'Kampus hayoti',
        description: 'Talabalar muhiti, tadbirlar va klub faoliyatlari',
        href: '/campus-life',
        icon: 'campus',
      },
      {
        label: 'Aloqa va manzil',
        description: 'Lokatsiya, telefon va murojaat kanallari',
        href: '#contact-section',
        icon: 'location',
      },
    ],
  },
  {
    label: "Yo'nalishlar",
    badge: "Yo'nalishlar",
    heading: "Ta'lim dasturlari va qabul",
    description:
      "Bakalavr va magistratura dasturlari, qabul jarayoni hamda xalqaro akademik imkoniyatlar.",
    actionLabel: "Dasturlarni ko'rish",
    actionHref: '/admission',
    submenu: [
      {
        label: 'Iqtisodiyot',
        href: '#',
        icon: 'cap',
      },
      {
        label: 'Tarix',
        href: '#',
        icon: 'document',
      },
    ],
  },
  {
    label: 'Talabalar uchun',
    badge: 'Talabalar',
    heading: 'Talabalar hayoti va imkoniyatlar',
    description:
      'Stipendiyalar, karyera markazi, klublar va akademik qo‘llab-quvvatlash xizmatlari bir joyda.',
    actionLabel: "Talabalar bo'limiga o'tish",
    actionHref: '#',
    submenu: [
      {
        label: 'Stipendiyalar',
        description: 'Grantlar, chegirmalar va iqtidorli talabalar dasturlari',
        href: '#',
        icon: 'spark',
      },
      {
        label: 'Karyera markazi',
        description: 'Amaliyot, mentoring va ishga joylashish yordami',
        href: '#',
        icon: 'briefcase',
      },
      {
        label: 'Talabalar klublari',
        description: 'Ijtimoiy, sport va professional hamjamiyatlar',
        href: '#',
        icon: 'campus',
      },
      {
        label: 'Kutubxona',
        description: 'Bosma va raqamli resurslar, ilmiy bazalarga kirish',
        href: '#',
        icon: 'document',
      },
      {
        label: 'Talaba servislari',
        description: 'Arizalar, ma’lumotnomalar va ichki servislar',
        href: '#',
        icon: 'support',
      },
      {
        label: 'Xalqaro almashinuv',
        description: 'Hamkor universitetlar va mobility dasturlari',
        href: '#',
        icon: 'location',
      },
    ],
  },
  {
    label: 'Yangiliklar',
    badge: 'Media',
    heading: 'Yangiliklar, tadbirlar va e’lonlar',
    description:
      'Universitetdagi so‘nggi voqealar, media chiqishlar va yaqinlashayotgan tadbirlarni kuzating.',
    actionLabel: 'Barcha yangiliklar',
    actionHref: '/news',
    submenu: [
      {
        label: 'So‘nggi yangiliklar',
        description: 'Kampus va akademik hayotdagi dolzarb yangilanishlar',
        href: '/news',
        icon: 'megaphone',
      },
      {
        label: 'Tadbirlar',
        description: 'Forumlar, seminarlar va ochiq darslar kalendari',
        href: '#',
        icon: 'campus',
      },
      {
        label: 'E’lonlar',
        description: 'Qabul, grant va ichki jarayonlar bo‘yicha muhim e’lonlar',
        href: '/announcements',
        icon: 'document',
      },
      {
        label: 'Intervyular',
        description: 'Talaba, mentor va professorlar bilan suhbatlar',
        href: '#',
        icon: 'user',
      },
    ],
  },
  {
    label: 'Bog‘lanish',
    badge: 'Aloqa',
    heading: "Biz bilan bog'lanish",
    description:
      'Qabul bo‘limi, universitet manzili, aloqa formasi va tezkor support kanallariga kirish.',
    actionLabel: "Contact bo'limini ochish",
    actionHref: '#contact-section',
    submenu: [
      {
        label: 'Qabul bo‘limi',
        description: 'Ariza topshirish va qabul bo‘yicha murojaatlar',
        href: '/admission',
        icon: 'cap',
      },
      {
        label: 'Aloqa formasi',
        description: 'Savol, taklif va murojaatlar uchun asosiy kanal',
        href: '/send-message',
        icon: 'document',
      },
      {
        label: 'Call-center',
        description: 'Telefon orqali tezkor yordam va ma’lumot olish',
        href: 'tel:+998999642613',
        icon: 'support',
      },
    ],
  },
]

const LANGUAGES = ['UZ', 'RU', 'EN']
const LANGUAGE_FLAGS = {
  UZ: 'https://flagcdn.com/w40/uz.png',
  RU: 'https://flagcdn.com/w40/ru.png',
  EN: 'https://flagcdn.com/w40/gb.png',
}

const TOP_CONTACT_ITEMS = [
  { id: 'address', Icon: MapPin, text: "Oyoq bogʻ MFY, Xiva ko'chasi , 41-uy", href: '#' },
  { id: 'phone', Icon: Phone, text: '+998999642613', href: 'tel:+998999642613' },
  { id: 'email', Icon: Mail, text: 'xiuniuz@gmail.com', href: 'mailto:xiuniuz@gmail.com' },
]

const HEMIS_LINKS = [
  { id: 'hemis-students', Icon: Users, label: 'Hemis (Talabalar)', href: '#' },
  { id: 'hemis-staff', Icon: Briefcase, label: 'Hemis (Xodimlar)', href: '#' },
]

function Header() {
  const { i18n } = useTranslation()
  const { content, language } = useSiteContent()
  const headerContent = content.header
  const [isHeaderInteractive, setIsHeaderInteractive] = useState(true)
  const [isAfterHero, setIsAfterHero] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isLanguageOpen, setIsLanguageOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const languageRef = useRef(null)
  const navListRef = useRef(null)
  const languages = SUPPORTED_LANGUAGES.map((code) => ({
    code,
    ...LANGUAGE_META[code],
  }))
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || 0
      const trigger = Math.max(320, window.innerHeight * 0.6)
      const afterHero = y >= trigger
      setIsAfterHero(afterHero)
      setIsHeaderInteractive(afterHero || y < 24)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [])

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isMobileMenuOpen])

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false)
      }

      if (navListRef.current && !navListRef.current.contains(event.target)) {
        setActiveDropdown(null)
      }
    }

    const handleEscape = (event) => {
      if (event.key === 'Escape') {
        setIsLanguageOpen(false)
        setActiveDropdown(null)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
      document.removeEventListener('keydown', handleEscape)
    }
  }, [])

  const handleLanguageSelect = (nextLanguage) => {
    i18n.changeLanguage(nextLanguage)
  }

  const navContent = (
    <nav className="top-nav top-nav-top">
      {!isAfterHero && (
        <div className="top-header-row">
          <div className="top-header-meta">
            {headerContent.topContacts.map((item) => (
              <a key={item.id} href={item.href} className="top-header-meta-link">
                {item.id === 'address' ? <MapPin size={14} /> : item.id === 'phone' ? <Phone size={14} /> : <Mail size={14} />}
                <span>{item.text}</span>
              </a>
            ))}
            <a href="/send-message" className="top-header-action-link top-header-message-link">
              <MessageSquare size={14} />
              <span>{headerContent.messageLink}</span>
            </a>
          </div>
          <div className="top-header-links">
            <div className="top-header-action-dropdown">
              <button type="button" className="top-header-action-link top-header-dropdown-trigger">
                <HemisIcon />
                <span>{headerContent.hemis.label}</span>
                <ChevronDown size={13} className="top-header-dropdown-chevron" />
              </button>
              <div className="top-header-dropdown-menu">
                {headerContent.hemis.links.map((item) => (
                  <a key={item.id} href={item.href} className="top-header-dropdown-link">
                    {item.id === 'hemis-students' ? <Users size={14} /> : <Briefcase size={14} />}
                    <span>{item.label}</span>
                  </a>
                ))}
              </div>
            </div>
            <div className="language-dropdown" ref={languageRef}>
              <button
                type="button"
                className={`lang-toggle-btn ${isLanguageOpen ? 'lang-toggle-btn-open' : ''}`}
                onClick={() => setIsLanguageOpen((current) => !current)}
                aria-expanded={isLanguageOpen}
                aria-label={headerContent.languageLabel}
              >
                <span className="lang-flag-wrap">
                  <img
                    src={LANGUAGE_META[language]?.flag}
                    alt=""
                    aria-hidden="true"
                    className="lang-flag"
                    loading="lazy"
                  />
                </span>
                <span className="lang-code">{LANGUAGE_META[language]?.shortLabel}</span>
                <ChevronDown size={13} className="nav-chevron language-chevron" />
              </button>
              <div className={`lang-menu ${isLanguageOpen ? 'lang-menu-open' : ''}`}>
                {languages.map((item) => (
                  <button
                    key={item.code}
                    type="button"
                    onClick={() => {
                      handleLanguageSelect(item.code)
                      setIsLanguageOpen(false)
                    }}
                    className={`lang-item ${language === item.code ? 'lang-item-active' : ''}`}
                  >
                    <span className="lang-flag-wrap">
                      <img
                        src={item.flag}
                        alt=""
                        aria-hidden="true"
                        className="lang-flag"
                        loading="lazy"
                      />
                    </span>
                    <span className="lang-code">{item.shortLabel}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

      <div className="main-nav-row">
        <a href="/" className="logo-lockup">
          <img src={CLOUDINARY_ASSETS.logo} alt="XIUNI" className="logo-image" loading="eager" />
          <span className="logo-title">
            <span>{content.app.brand[0]}</span>
            <span>{content.app.brand[1]}</span>
          </span>
        </a>

        <ul className="nav-list" ref={navListRef}>
          {headerContent.navItems.map((item) => (
            <li
              key={item.label}
              className={`nav-item ${activeDropdown === item.label ? 'nav-item-open' : ''}`}
              onMouseEnter={() => setActiveDropdown(item.label)}
              onMouseLeave={() =>
                setActiveDropdown((current) => (current === item.label ? null : current))
              }
            >
              <button
                type="button"
                className="nav-link-btn"
                aria-expanded={activeDropdown === item.label}
                onClick={() =>
                  setActiveDropdown((current) => (current === item.label ? null : item.label))
                }
              >
                <span>{item.label}</span>
                <ChevronDown size={14} className="nav-chevron" />
              </button>
              <div className="nav-dropdown">
                <div className="nav-dropdown-inner">
                  <aside className="nav-dropdown-side">
                    <div className="nav-side-badge">{item.badge}</div>
                    <h3>{item.heading}</h3>
                    <p>{item.description}</p>
                    <a href={item.actionHref} className="nav-side-action">
                      <span>→</span>
                      {item.actionLabel}
                    </a>
                  </aside>

                  <div
                    className={`nav-dropdown-grid ${
                      item.id === 'programs' ? 'nav-dropdown-grid-compact' : ''
                    }`}
                  >
                    {item.submenu.map((link) => (
                      <a
                        key={link.label}
                        href={link.href}
                        className={`nav-dropdown-link ${
                          item.id === 'programs' ? 'nav-dropdown-link-compact' : ''
                        }`}
                      >
                        <div className="nav-dropdown-icon-box">
                          <DropdownIcon name={link.icon} />
                        </div>

                        <div className="nav-dropdown-link-content">
                          <strong>{link.label}</strong>
                          {link.description ? <span>{link.description}</span> : null}
                        </div>
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="header-actions">
          <a href="/admission" className="btn-primary header-cta">
            <FilePenLine size={17} />
            {headerContent.mobileMenu.cta}
          </a>

          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(true)}
            className="icon-button menu-toggle-btn"
            aria-label={headerContent.mobileMenu.title}
          >
            <Menu size={20} />
          </button>
        </div>
      </div>
    </nav>
  )

  return (
    <>
      {!isAfterHero && (
        <header
          className="site-header site-header-top"
          style={{ pointerEvents: isHeaderInteractive ? 'auto' : 'none' }}
        >
          {navContent}
        </header>
      )}

      {isAfterHero && (
        <motion.header
          initial={{ y: -92, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
          className="site-header site-header-floating"
        >
          {navContent}
        </motion.header>
      )}

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
        navItems={headerContent.navItems}
        languages={languages}
        activeLanguage={language}
        onLanguageSelect={handleLanguageSelect}
        content={headerContent.mobileMenu}
      />
    </>
  )
}

export default Header
