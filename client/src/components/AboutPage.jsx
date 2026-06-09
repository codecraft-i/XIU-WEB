import { motion } from 'framer-motion'
import {
  ArrowDown,
  ArrowRight,
  Building2,
} from 'lucide-react'
import { useEffect } from 'react'
import { useSiteContent } from '../i18n/useSiteContent'
import { CLOUDINARY_ASSETS, resolveAssetUrl } from '../lib/assets'

const fadeUp = {
  initial: { opacity: 0, y: 18 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, amount: 0.2 },
  transition: { duration: 0.4, ease: 'easeOut' },
}

function RevealShell({ className, children, motionProps }) {
  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, y: 34, scale: 0.985, filter: 'blur(6px)' }}
      whileInView={{ opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }}
      viewport={{ once: true, amount: 0.16 }}
      transition={{ duration: 0.56, ease: [0.22, 1, 0.36, 1] }}
      {...motionProps}
    >
      {children}
    </motion.div>
  )
}

function AboutPage() {
  const { content } = useSiteContent()
  const pageContent = content.aboutPage

  useEffect(() => {
    document.title = content.app.pageTitles.about
    const meta = document.querySelector('meta[name="description"]')
    const metaContent = content.app.meta.about
    if (meta) {
      meta.setAttribute('content', metaContent)
    } else {
      const metaTag = document.createElement('meta')
      metaTag.setAttribute('name', 'description')
      metaTag.setAttribute('content', metaContent)
      document.head.appendChild(metaTag)
    }
  }, [content.app.meta.about, content.app.pageTitles.about])

  return (
    <main className="about-page about-page-v2">
      <div className="about-v2-content">
        <section className="about-page-intro">
          <RevealShell
            className="about-page-shell"
            motionProps={{
              initial: { opacity: 0, y: 54, scale: 0.96, filter: 'blur(10px)' },
              whileInView: { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' },
              viewport: { once: true, amount: 0.22 },
              transition: { duration: 0.72, ease: [0.22, 1, 0.36, 1] },
            }}
          >
            <div className="about-page-intro-grid">
              <motion.article className="about-page-intro-content" {...fadeUp}>
                <span className="about-page-intro-eyebrow">
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M12 3L21 8L12 13L3 8L12 3Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinejoin="round"
                    />
                    <path
                      d="M6 10.5V15.5C6 17.4 8.7 19 12 19C15.3 19 18 17.4 18 15.5V10.5"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                    />
                  </svg>
                  {pageContent.introBadge}
                </span>

                <h1 className="about-title">{pageContent.title}</h1>

                {pageContent.intro.map((paragraph) => (
                  <p key={paragraph} className="about-page-intro-text">
                    {paragraph}
                  </p>
                ))}

                <div className="about-page-intro-features">
                  <article className="about-page-intro-feature">
                    <span className="about-page-intro-feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M4 19V8.5C4 7.4 4.7 6.4 5.8 6.1L12 4L18.2 6.1C19.3 6.4 20 7.4 20 8.5V19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                        />
                        <path d="M3 19H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path
                          d="M9 19V13H15V19"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <h3>{pageContent.features[0].title}</h3>
                      <p>{pageContent.features[0].text}</p>
                    </div>
                  </article>

                  <article className="about-page-intro-feature">
                    <span className="about-page-intro-feature-icon">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M12 3V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        <path
                          d="M6 7H15.5C17.4 7 19 8.6 19 10.5C19 12.4 17.4 14 15.5 14H8"
                          stroke="currentColor"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </span>
                    <div>
                      <h3>{pageContent.features[1].title}</h3>
                      <p>{pageContent.features[1].text}</p>
                    </div>
                  </article>
                </div>

                <div className="about-page-actions about-page-intro-actions">
                  <a href="#talim-yonalishlari" className="about-page-btn about-page-intro-btn-primary">
                    {pageContent.primaryCta}
                    <ArrowRight size={18} />
                  </a>
                  <a href="#contact-section" className="about-page-btn about-page-intro-btn-secondary">
                    {pageContent.secondaryCta}
                  </a>
                </div>
              </motion.article>

              <motion.div className="about-page-intro-media" {...fadeUp}>
                <figure className="about-page-intro-image-card">
                  <img
                    src={CLOUDINARY_ASSETS.about}
                    alt={pageContent.introImageAlt}
                    className="about-page-intro-image"
                    loading="lazy"
                  />
                </figure>

                <article className="about-page-intro-floating-card">
                  <div className="about-page-intro-floating-icon">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path
                        d="M12 3L20 7.5V12C20 16.7 16.6 20.2 12 21C7.4 20.2 4 16.7 4 12V7.5L12 3Z"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinejoin="round"
                      />
                      <path
                        d="M9 12L11 14L15.5 9.5"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>

                  <div>
                    <h3>{pageContent.floatingCard.title}</h3>
                    <p>{pageContent.floatingCard.text}</p>
                  </div>
                </article>
              </motion.div>
            </div>
          </RevealShell>

          <motion.a
            href="#talim-yonalishlari"
            className="about-page-scroll-btn"
            aria-label={pageContent.nextSection}
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.8, ease: 'easeInOut', repeat: Infinity }}
          >
            <ArrowDown size={22} />
          </motion.a>
        </section>

        <section className="about-page-section" id="talim-yonalishlari">
          <RevealShell className="about-page-shell about-programs-shell">
            <div className="about-programs-header">
              <div className="about-programs-header-content">
                <span className="about-programs-eyebrow">{pageContent.programs.eyebrow}</span>
                <h2>{pageContent.programs.title}</h2>
                <p>{pageContent.programs.description}</p>
              </div>

              <a href="#" className="about-programs-all-link">
                {pageContent.programs.all}
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M5 12H19M13 6L19 12L13 18"
                    stroke="currentColor"
                    strokeWidth="2.2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>

            <div className="about-programs-grid">
              {pageContent.programs.items.map((program, index) => (
                <motion.a key={program.title} href="#" className="about-program-card" {...fadeUp}>
                  <div className="about-program-card-top">
                    <div className="about-program-icon">{index + 1}</div>

                    <div className="about-program-arrow">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path
                          d="M7 17L17 7M17 7H9M17 7V15"
                          stroke="currentColor"
                          strokeWidth="2.2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    </div>
                  </div>

                  <h3>{program.title}</h3>
                  <p>{program.text}</p>

                  <div className="about-program-card-bottom">
                    <span>{pageContent.programs.details}</span>
                  </div>
                </motion.a>
              ))}
            </div>
          </RevealShell>
        </section>

        <section className="about-page-section" id="afzalliklar">
          <RevealShell className="about-page-shell about-why-shell">
            <div className="about-why-header">
              <span className="about-why-badge">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path d="M12 3L21 8L12 13L3 8L12 3Z" />
                  <path d="M6 10.5V15.5C6 17.2 8.7 19 12 19C15.3 19 18 17.2 18 15.5V10.5" />
                </svg>
                {pageContent.why.badge}
              </span>

              <h2>{pageContent.why.title}</h2>

              <p>{pageContent.why.description}</p>
            </div>

            <div className="about-why-layout">
              <motion.div className="about-why-main-card" {...fadeUp}>
                <div className="about-why-card-heading">
                  <span className="about-why-section-icon">
                    <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                      <path d="M9 6V5C9 3.9 9.9 3 11 3H13C14.1 3 15 3.9 15 5V6" />
                      <path d="M4 8C4 6.9 4.9 6 6 6H18C19.1 6 20 6.9 20 8V18C20 19.1 19.1 20 18 20H6C4.9 20 4 19.1 4 18V8Z" />
                      <path d="M4 11H20" />
                    </svg>
                  </span>

                  <div>
                    <h3>{pageContent.why.cardTitle}</h3>
                    <span>{pageContent.why.cardSubtitle}</span>
                  </div>
                </div>

                <div className="about-why-feature-grid">
                  {pageContent.benefits.items.map((item, index) => (
                    <article className="about-why-feature-card" key={item.title}>
                      <div className="about-why-feature-top">
                        <span className="about-why-mini-icon">
                          {index === 0 && (
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M4 19V5M4 19H20" />
                              <path d="M8 16V11M12 16V7M16 16V9" />
                            </svg>
                          )}
                          {index === 1 && (
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M12 3L20 7L12 11L4 7L12 3Z" />
                              <path d="M6 10V15C6 16.7 8.7 18 12 18C15.3 18 18 16.7 18 15V10" />
                            </svg>
                          )}
                          {index === 2 && (
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M5 5H19V15H5V5Z" />
                              <path d="M9 19H15M12 15V19" />
                            </svg>
                          )}
                          {index === 3 && (
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M4 19C7 14 17 14 20 19" />
                              <path d="M12 12C14.2 12 16 10.2 16 8C16 5.8 14.2 4 12 4C9.8 4 8 5.8 8 8C8 10.2 9.8 12 12 12Z" />
                            </svg>
                          )}
                          {index === 4 && (
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M12 3V21" />
                              <path d="M7 8C7 5.8 9.2 4 12 4C14.8 4 17 5.8 17 8C17 10.2 14.8 12 12 12C9.2 12 7 13.8 7 16C7 18.2 9.2 20 12 20C14.8 20 17 18.2 17 16" />
                            </svg>
                          )}
                          {index === 5 && (
                            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                              <path d="M3 12H21" />
                              <path d="M12 3C14.5 5.4 16 8.5 16 12C16 15.5 14.5 18.6 12 21C9.5 18.6 8 15.5 8 12C8 8.5 9.5 5.4 12 3Z" />
                              <path d="M12 21C17 21 21 17 21 12C21 7 17 3 12 3C7 3 3 7 3 12C3 17 7 21 12 21Z" />
                            </svg>
                          )}
                        </span>
                        <h4>{item.title}</h4>
                      </div>
                      <p>{item.text}</p>
                    </article>
                  ))}
                </div>
              </motion.div>

              <div className="about-why-side">
                <motion.div className="about-why-side-card" {...fadeUp}>
                  <div className="about-why-card-heading">
                    <span className="about-why-section-icon">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M4 10L12 5L20 10" />
                        <path d="M6 10V18M10 10V18M14 10V18M18 10V18" />
                        <path d="M4 19H20" />
                      </svg>
                    </span>

                    <div>
                      <h3>{pageContent.why.valuesTitle}</h3>
                      <span>{pageContent.why.valuesSubtitle}</span>
                    </div>
                  </div>

                  <div className="about-why-list">
                    {pageContent.values.items.slice(0, 5).map((item) => (
                      <article className="about-why-list-item" key={item.title}>
                        <span className="about-why-dot" />
                        <div>
                          <h4>{item.title}</h4>
                          <p>{item.text}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </motion.div>

                <motion.div className="about-why-side-card about-why-blue-card" {...fadeUp}>
                  <div className="about-why-card-heading">
                    <span className="about-why-section-icon">
                      <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                        <path d="M8 12L10.5 14.5L16 9" />
                        <path d="M12 3L20 7V12C20 17 16.5 20.2 12 21C7.5 20.2 4 17 4 12V7L12 3Z" />
                      </svg>
                    </span>

                    <div>
                      <h3>{pageContent.why.internationalTitle}</h3>
                      <span>{pageContent.why.internationalSubtitle}</span>
                    </div>
                  </div>

                  <div className="about-why-list">
                    {pageContent.why.internationalItems.map((item) => (
                      <article className="about-why-list-item" key={item.title}>
                        <span className="about-why-dot" />
                        <div>
                          <h4>{item.title}</h4>
                          <p>{item.text}</p>
                        </div>
                      </article>
                    ))}
                  </div>
                </motion.div>
              </div>
            </div>

            <motion.div className="about-why-bottom" {...fadeUp}>
              <div>
                <h3>{pageContent.why.bottomTitle}</h3>
                <p>{pageContent.why.bottomText}</p>
              </div>

              <span>{pageContent.why.bottomTag}</span>
            </motion.div>
          </RevealShell>
        </section>

            <section className="about-page-section" id="kampus-muhiti">
              <RevealShell className="about-page-shell">
                <h2 className="about-page-h2">{pageContent.campus.title}</h2>
                <p className="about-page-p">{pageContent.campus.description}</p>
                <div className="about-page-grid-4">
                  {pageContent.gallery.images.map((item, idx) => (
                    <motion.figure key={item.alt} className="about-page-cp-item" {...fadeUp}>
                      {item.image ? (
                        <img src={resolveAssetUrl(item.image)} alt={item.alt} loading="lazy" />
                      ) : (
                        <CampusPlaceholder title={item.alt} />
                      )}
                      <figcaption>{item.alt}</figcaption>
                      <span className="about-v2-image-index">{idx + 1}</span>
                    </motion.figure>
                  ))}
                </div>
              </RevealShell>
            </section>
      </div>

    </main>
  )
}

function CampusPlaceholder({ title }) {
  return (
    <div className="about-page-placeholder">
      <Building2 size={30} />
      <p>{title}</p>
    </div>
  )
}

export default AboutPage
