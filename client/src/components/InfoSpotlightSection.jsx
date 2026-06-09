import {
  AnimatePresence,
  motion,
  useMotionTemplate,
  useScroll,
  useTransform,
} from 'framer-motion'
import { ArrowRight } from 'lucide-react'
import { useEffect, useState } from 'react'

const SPOTLIGHT_ITEMS = [
  {
    id: 'global-opportunities',
    tag: 'Xalqaro imkoniyatlar',
    title: "Xalqaro ta’lim sari yo‘l",
    description:
      "Almashinuv dasturlari, xorijiy hamkorliklar va grantlar orqali talabalar global tajriba orttiradi.",
    cta: 'Xalqaro dasturlar',
  },
  {
    id: 'digital-campus',
    tag: 'Raqamli kampus',
    title: "Raqamli Kampus - Smart Ta'lim Ekotizimi",
    description:
      "Darslar, laboratoriyalar va loyihalar zamonaviy raqamli platformalar asosida yuritiladi.",
    cta: 'Smart Campus',
  },
  {
    id: 'economy-and-business',
    tag: "Iqtisodiyot va biznes yo'nalishi",
    title: 'Kelajak iqtisodchilari markazi',
    description:
      "Iqtisodiyot, moliya, marketing va boshqaruv yo‘nalishlari amaliy tajriba bilan birga o‘qitiladi.",
    cta: "Iqtisodiyot yo'nalishlari",
  },
  {
    id: 'applied-learning',
    tag: "Amaliy ta'lim",
    title: "Amaliy bilim markazi",
    description:
      "Nazariya real keyslar, loyiha ishlari va amaliy mashg‘ulotlar bilan mustahkamlanadi.",
    cta: 'Amaliy loyihalar',
  },
]

function InfoSpotlightSection({ embedded = false }) {
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)

  const { scrollY } = useScroll()
  const embedOpacity = useTransform(scrollY, [0, 220, 420], [1, 0.72, 0])
  const embedY = useTransform(scrollY, [0, 220, 420], [0, -38, -90])
  const embedScale = useTransform(scrollY, [0, 220, 420], [1, 0.97, 0.93])
  const embedRotateX = useTransform(scrollY, [0, 220, 420], [0, -2.5, -6])
  const embedBlur = useTransform(scrollY, [0, 220, 420], [0, 2, 8])
  const embedFilter = useMotionTemplate`blur(${embedBlur}px)`

  useEffect(() => {
    if (isPaused) return undefined

    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % SPOTLIGHT_ITEMS.length)
    }, 5400)

    return () => window.clearInterval(timer)
  }, [isPaused])

  const activeItem = SPOTLIGHT_ITEMS[activeIndex]
  const sectionClass = embedded
    ? 'spotlight-section spotlight-section-embedded'
    : 'spotlight-section'
  const wrapClass = embedded ? 'spotlight-wrap spotlight-wrap-embedded' : 'spotlight-wrap'
  const contentClass = embedded
    ? 'spotlight-content spotlight-content-embedded'
    : 'spotlight-content'
  const indicatorsClass = embedded
    ? 'spotlight-indicators spotlight-indicators-embedded'
    : 'spotlight-indicators'
  const embeddedMotionStyle = embedded
    ? {
        opacity: embedOpacity,
        y: embedY,
        scale: embedScale,
        rotateX: embedRotateX,
        filter: embedFilter,
      }
    : undefined
  const titleParts = activeItem.title.split(' - ')
  const hasSplitTitle = titleParts.length > 1

  return (
    <section
      className={sectionClass}
      aria-label="Universitet haqida batafsil ma'lumot"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      {!embedded && <div className="spotlight-backdrop" />}
      <motion.div className={wrapClass} style={embeddedMotionStyle}>
        <AnimatePresence mode="wait">
          <motion.div
            key={activeItem.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
            className={contentClass}
          >
            <div className="spotlight-left">
              <h2 className="spotlight-title">
                {hasSplitTitle ? (
                  <>
                    {titleParts[0]} -<br />
                    {titleParts.slice(1).join(' - ')}
                  </>
                ) : (
                  activeItem.title
                )}
              </h2>
              <p className="spotlight-description">{activeItem.description}</p>
              <a href="#" className="spotlight-cta">
                {activeItem.cta}
                <ArrowRight size={18} />
              </a>
            </div>
          </motion.div>
        </AnimatePresence>

        <div className={indicatorsClass} role="tablist" aria-label="Ma'lumot bloklari">
          {SPOTLIGHT_ITEMS.map((item, index) => (
            <button
              key={item.id}
              type="button"
              className={`spotlight-indicator ${activeIndex === index ? 'spotlight-indicator-active' : ''}`}
              onClick={() => setActiveIndex(index)}
              aria-selected={activeIndex === index}
              role="tab"
            >
              {item.tag}
            </button>
          ))}
        </div>
      </motion.div>
    </section>
  )
}

export default InfoSpotlightSection
