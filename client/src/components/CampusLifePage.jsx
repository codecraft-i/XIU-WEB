import { AnimatePresence, motion, useInView } from 'framer-motion'
import {
  BadgeDollarSign,
  BookOpen,
  CalendarDays,
  Coffee,
  Cpu,
  Languages,
  Laptop2,
  LibraryBig,
  Lightbulb,
  Megaphone,
  MonitorPlay,
  ParkingSquare,
  Presentation,
  Rocket,
  Trophy,
  Users,
  Wifi,
  X,
  Trees,
} from 'lucide-react'
import { useEffect, useMemo, useRef, useState } from 'react'
import { useSiteContent } from '../i18n/useSiteContent'
import { resolveAssetUrl } from '../lib/assets'

const ICONS = {
  Users,
  Trophy,
  CalendarDays,
  Lightbulb,
  Megaphone,
  Rocket,
  BadgeDollarSign,
  Languages,
  Laptop2,
  BookOpen,
  MonitorPlay,
  LibraryBig,
  Cpu,
  Presentation,
  Coffee,
  Wifi,
  Trees,
  ParkingSquare,
}

const fadeUp = {
  initial: { opacity: 0, y: 22 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.18 },
  transition: { duration: 0.45, ease: 'easeOut' },
}

function RevealShell({ className, children }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 32, scale: 0.99, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.52, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  )
}

function StatCounter({ value, suffix, label }) {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, amount: 0.6 })
  const [displayValue, setDisplayValue] = useState(0)

  useEffect(() => {
    if (!isInView) return

    let frameId = 0
    const duration = 1400
    const startTime = performance.now()

    const tick = (currentTime) => {
      const progress = Math.min((currentTime - startTime) / duration, 1)
      const eased = 1 - (1 - progress) ** 3
      setDisplayValue(Math.round(value * eased))
      if (progress < 1) {
        frameId = requestAnimationFrame(tick)
      }
    }

    frameId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(frameId)
  }, [isInView, value])

  return (
    <div ref={ref} className="campus-stat-card">
      <strong>
        {displayValue}
        {suffix}
      </strong>
      <span>{label}</span>
    </div>
  )
}

function CampusLifePage() {
  const { content } = useSiteContent()
  const pageContent = content.campusPage
  const [activeGalleryFilter, setActiveGalleryFilter] = useState(pageContent.allFilter)
  const [activeImageIndex, setActiveImageIndex] = useState(null)
  const campusHero = {
    badge: pageContent.badge,
    title: pageContent.title,
    subtitle: pageContent.subtitle,
    description: pageContent.description,
    primaryCta: pageContent.primaryCta,
    secondaryCta: pageContent.secondaryCta,
    collage: pageContent.collage,
    stats: pageContent.stats,
  }
  const campusHighlights = pageContent.highlights.items
  const studentOrganizations = pageContent.organizations.items
  const campusGallery = pageContent.gallery.items
  const sportsData = pageContent.sports
  const campusFacilities = pageContent.facilities.items

  const galleryFilters = useMemo(
    () => [pageContent.allFilter, ...new Set(campusGallery.map((item) => item.category))],
    [campusGallery, pageContent.allFilter],
  )

  const filteredGallery = useMemo(() => {
    if (activeGalleryFilter === pageContent.allFilter) {
      return campusGallery
    }
    return campusGallery.filter((item) => item.category === activeGalleryFilter)
  }, [activeGalleryFilter, campusGallery, pageContent.allFilter])

  useEffect(() => {
    setActiveGalleryFilter(pageContent.allFilter)
  }, [pageContent.allFilter])

  useEffect(() => {
    document.title = content.app.pageTitles.campus
    const meta = document.querySelector('meta[name="description"]')
    const metaContent = content.app.meta.campus
    if (meta) {
      meta.setAttribute('content', metaContent)
    } else {
      const metaTag = document.createElement('meta')
      metaTag.setAttribute('name', 'description')
      metaTag.setAttribute('content', metaContent)
      document.head.appendChild(metaTag)
    }
  }, [content.app.meta.campus, content.app.pageTitles.campus])

  useEffect(() => {
    if (activeImageIndex === null) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') {
        setActiveImageIndex(null)
      }
      if (event.key === 'ArrowRight') {
        setActiveImageIndex((current) =>
          current === null ? current : (current + 1) % filteredGallery.length,
        )
      }
      if (event.key === 'ArrowLeft') {
        setActiveImageIndex((current) =>
          current === null ? current : (current - 1 + filteredGallery.length) % filteredGallery.length,
        )
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [activeImageIndex, filteredGallery.length])

  const activeLightboxItem =
    activeImageIndex === null ? null : filteredGallery[activeImageIndex] ?? filteredGallery[0]

  return (
    <main className="about-page about-page-v2 campus-page">
      <div className="campus-page-content">
        <section className="about-page-hero campus-hero-section">
          <RevealShell className="about-page-shell campus-hero-shell">
            <motion.article className="campus-hero-copy" {...fadeUp}>
              <span className="about-page-badge">{campusHero.badge}</span>
              <h1 className="about-page-title campus-hero-title">{campusHero.title}</h1>
              <p className="about-page-subtitle campus-hero-subtitle">{campusHero.subtitle}</p>
              <p className="about-page-description campus-hero-description">{campusHero.description}</p>
              <div className="about-page-actions campus-hero-actions">
                <a href={campusHero.primaryCta.href} className="about-page-btn about-page-btn-primary">
                  {campusHero.primaryCta.label}
                </a>
                <a href={campusHero.secondaryCta.href} className="about-page-btn about-page-btn-ghost">
                  {campusHero.secondaryCta.label}
                </a>
              </div>
            </motion.article>

            <motion.article className="campus-hero-visual" {...fadeUp}>
              <div className="campus-hero-shape campus-hero-shape-a" />
              <div className="campus-hero-shape campus-hero-shape-b" />
              <div className="campus-hero-collage">
                {campusHero.collage.map((item, index) => (
                  <figure
                    key={item.alt}
                    className={`campus-hero-collage-item campus-collage-item-${index + 1}`}
                  >
                    <img
                      src={resolveAssetUrl(item.image)}
                      alt={item.alt}
                      loading="lazy"
                    />
                  </figure>
                ))}
              </div>
              <div className="campus-hero-floating-stats">
                {campusHero.stats.map((item) => (
                  <div key={item.label} className="campus-hero-stat-card">
                    <strong>{item.value}</strong>
                    <span>{item.label}</span>
                  </div>
                ))}
              </div>
            </motion.article>
          </RevealShell>
        </section>

        <section className="about-page-section">
          <RevealShell className="about-page-shell campus-section-shell">
            <div className="campus-section-heading">
              <span className="campus-section-kicker">{pageContent.highlights.kicker}</span>
              <h2 className="about-page-h2">{pageContent.highlights.title}</h2>
            </div>
            <div className="campus-highlights-grid">
              {campusHighlights.map((item) => {
                const Icon = ICONS[item.icon]
                return (
                  <motion.article key={item.title} className="campus-highlight-card" {...fadeUp}>
                    <div className="campus-highlight-icon">
                      <Icon size={24} />
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                  </motion.article>
                )
              })}
            </div>
          </RevealShell>
        </section>

        <section className="about-page-section">
          <RevealShell className="about-page-shell campus-section-shell">
            <div className="campus-section-heading">
              <span className="campus-section-kicker">{pageContent.organizations.kicker}</span>
              <h2 className="about-page-h2">{pageContent.organizations.title}</h2>
            </div>
            <div className="campus-org-grid">
              {studentOrganizations.map((item) => {
                const Icon = ICONS[item.icon]
                return (
                  <motion.article key={item.title} className="campus-org-card" {...fadeUp}>
                    <div className="campus-org-card-top">
                      <span className="campus-org-icon">
                        <Icon size={20} />
                      </span>
                      <span className="campus-org-members">{item.members} {pageContent.organizations.membersSuffix}</span>
                    </div>
                    <h3>{item.title}</h3>
                    <p>{item.text}</p>
                    <a href="#contact-section" className="campus-inline-link">
                      {pageContent.organizations.details}
                    </a>
                  </motion.article>
                )
              })}
            </div>
          </RevealShell>
        </section>

        <section className="about-page-section" id="campus-gallery">
          <RevealShell className="about-page-shell campus-section-shell">
            <div className="campus-section-heading">
              <span className="campus-section-kicker">{pageContent.gallery.kicker}</span>
              <h2 className="about-page-h2">{pageContent.gallery.title}</h2>
            </div>
            <div className="campus-filter-row">
              {galleryFilters.map((filter) => (
                <button
                  key={filter}
                  type="button"
                  className={`campus-filter-pill ${filter === activeGalleryFilter ? 'is-active' : ''}`}
                  onClick={() => {
                    setActiveGalleryFilter(filter)
                    setActiveImageIndex(null)
                  }}
                >
                  {filter}
                </button>
              ))}
            </div>
            <div className="campus-gallery-grid">
              {filteredGallery.map((item, index) => (
                <motion.button
                  key={`${item.title}-${index}`}
                  type="button"
                  className={`campus-gallery-item campus-gallery-item-${item.size}`}
                  {...fadeUp}
                  onClick={() => setActiveImageIndex(index)}
                >
                  <img
                    src={resolveAssetUrl(item.image)}
                    alt={item.alt}
                    loading="lazy"
                  />
                  <span className="campus-gallery-overlay">
                    <strong>{item.title}</strong>
                    <small>{item.category}</small>
                  </span>
                </motion.button>
              ))}
            </div>
          </RevealShell>
        </section>

        <section className="about-page-section">
          <RevealShell className="about-page-shell campus-section-shell campus-sports-shell">
            <div className="campus-sports-media">
              <img
                src={resolveAssetUrl(sportsData.image)}
                alt={pageContent.sportsImageAlt}
                loading="lazy"
              />
            </div>
            <div className="campus-sports-copy">
              <span className="campus-section-kicker">{pageContent.sports.kicker}</span>
              <h2 className="about-page-h2">{pageContent.sports.title}</h2>
              <p className="about-page-p">{pageContent.sports.description}</p>
              <div className="campus-sports-list">
                {sportsData.sports.map((sport) => (
                  <div key={sport} className="campus-sport-pill">
                    <Trophy size={16} />
                    <span>{sport}</span>
                  </div>
                ))}
              </div>
              <div className="campus-sports-stats">
                {sportsData.stats.map((item) => (
                  <StatCounter
                    key={item.label}
                    value={item.value}
                    suffix={item.suffix}
                    label={item.label}
                  />
                ))}
              </div>
            </div>
          </RevealShell>
        </section>

        <section className="about-page-section">
          <RevealShell className="about-page-shell campus-section-shell">
            <div className="campus-section-heading">
              <span className="campus-section-kicker">{pageContent.facilities.kicker}</span>
              <h2 className="about-page-h2">{pageContent.facilities.title}</h2>
            </div>
            <div className="campus-facilities-grid">
              {campusFacilities.map((item) => {
                const Icon = ICONS[item.icon]
                return (
                  <motion.article key={item.title} className="campus-facility-card" {...fadeUp}>
                    <span className="campus-facility-icon">
                      <Icon size={22} />
                    </span>
                    <h3>{item.title}</h3>
                  </motion.article>
                )
              })}
            </div>
          </RevealShell>
        </section>

        <section className="about-page-section campus-cta-section">
          <RevealShell className="about-page-shell campus-cta-shell">
            <div>
              <span className="campus-section-kicker campus-section-kicker-light">{pageContent.cta.kicker}</span>
              <h2 className="about-page-h2">{pageContent.cta.title}</h2>
            </div>
            <div className="campus-cta-actions">
              <a href="/admission" className="about-page-btn about-page-btn-primary campus-cta-primary">
                {pageContent.cta.primary}
              </a>
              <a href="#contact-section" className="about-page-btn about-page-btn-ghost campus-cta-secondary">
                {pageContent.cta.secondary}
              </a>
            </div>
          </RevealShell>
        </section>
      </div>

      <AnimatePresence>
        {activeLightboxItem && (
          <motion.div
            className="campus-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <button
              type="button"
              className="campus-lightbox-backdrop"
              aria-label={pageContent.close}
              onClick={() => setActiveImageIndex(null)}
            />
            <motion.div
              className="campus-lightbox-dialog"
              initial={{ opacity: 0, y: 30, scale: 0.96 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 24, scale: 0.98 }}
              transition={{ duration: 0.3, ease: 'easeOut' }}
              role="dialog"
              aria-modal="true"
              aria-label={activeLightboxItem.title}
            >
              <button
                type="button"
                className="campus-lightbox-close"
                onClick={() => setActiveImageIndex(null)}
                aria-label={pageContent.lightboxClose}
              >
                <X size={18} />
              </button>
              <img
                src={resolveAssetUrl(activeLightboxItem.image)}
                alt={activeLightboxItem.alt}
              />
              <div className="campus-lightbox-meta">
                <strong>{activeLightboxItem.title}</strong>
                <span>{activeLightboxItem.category}</span>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </main>
  )
}

export default CampusLifePage
