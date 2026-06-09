import { AnimatePresence, motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { ChevronLeft, ChevronRight, Images, X } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

const GALLERY_IMAGES = [
  { id: 'g1', src: '/hero/hero1.jpeg', alt: 'Universitet kampusi umumiy ko‘rinish', className: 'gallery-item-a' },
  { id: 'g2', src: '/hero/hero2.jpg', alt: 'Markaziy bino va hovli', className: 'gallery-item-b' },
  { id: 'g3', src: '/hero/hero3.jpg', alt: 'Talabalar hayoti lavhasi', className: 'gallery-item-c' },
  { id: 'g4', src: '/hero/hero2.jpg', alt: 'Ilmiy markaz old qismi', className: 'gallery-item-d' },
  { id: 'g5', src: '/hero/hero1.jpeg', alt: 'Kampusning yuqoridan ko‘rinishi', className: 'gallery-item-e' },
  { id: 'g6', src: '/hero/hero3.jpg', alt: 'Auditoriya va ta’lim muhiti', className: 'gallery-item-f' },
  { id: 'g7', src: '/hero/hero2.jpg', alt: 'Universitet arxitekturasi', className: 'gallery-item-g' },
]

function GallerySection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.14, 0.84, 1], [0.1, 1, 1, 0.08])
  const sectionY = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [74, 0, 0, -60])
  const sectionScale = useTransform(scrollYProgress, [0, 0.18, 0.82, 1], [0.97, 1, 1, 0.98])
  const sectionRotateY = useTransform(scrollYProgress, [0, 0.22, 0.84, 1], [-3, 0, 0, 2.5])
  const sectionBlur = useTransform(scrollYProgress, [0, 0.2, 0.82, 1], [8, 0, 0, 5.5])
  const sectionFilter = useMotionTemplate`blur(${sectionBlur}px)`

  const [activeIndex, setActiveIndex] = useState(-1)
  const hasActive = activeIndex >= 0

  const openLightbox = (index) => setActiveIndex(index)
  const closeLightbox = () => setActiveIndex(-1)
  const showNext = () => {
    setActiveIndex((current) => (current + 1) % GALLERY_IMAGES.length)
  }
  const showPrev = () => {
    setActiveIndex((current) => (current - 1 + GALLERY_IMAGES.length) % GALLERY_IMAGES.length)
  }

  useEffect(() => {
    if (!hasActive) return undefined
    const onKeyDown = (event) => {
      if (event.key === 'Escape') closeLightbox()
      if (event.key === 'ArrowRight') showNext()
      if (event.key === 'ArrowLeft') showPrev()
    }
    document.addEventListener('keydown', onKeyDown)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKeyDown)
      document.body.style.overflow = ''
    }
  }, [hasActive])

  return (
    <>
      <section id="gallery" ref={sectionRef} className="gallery-section" aria-label="Universitet galereyasi">
        <motion.div
          className="gallery-shell"
          style={{
            opacity: sectionOpacity,
            y: sectionY,
            scale: sectionScale,
            rotateY: sectionRotateY,
            filter: sectionFilter,
            transformStyle: 'preserve-3d',
          }}
        >
          <motion.div
            className="gallery-head"
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
          >
            <h2 className="gallery-title">
              <Images size={24} />
              Galereya
            </h2>
            <p className="gallery-subtitle">
              Universitet hayoti, kampus muhitini va ta’lim jarayonini aks ettiruvchi lavhalar.
            </p>
          </motion.div>

          <div className="gallery-mosaic">
            {GALLERY_IMAGES.map((item, index) => (
              <motion.button
                key={item.id}
                type="button"
                className={`gallery-item ${item.className}`}
                onClick={() => openLightbox(index)}
                initial={{ opacity: 0, y: 18, scale: 0.98 }}
                whileInView={{ opacity: 1, y: 0, scale: 1 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.52, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                <img
                  src={`${import.meta.env.BASE_URL}${item.src.replace(/^\//, '')}`}
                  alt={item.alt}
                  className="gallery-image"
                  loading="lazy"
                />
              </motion.button>
            ))}
          </div>
        </motion.div>
      </section>

      <AnimatePresence>
        {hasActive && (
          <motion.div
            className="gallery-lightbox"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: 'easeOut' }}
            role="dialog"
            aria-modal="true"
            aria-label="Galereya preview"
          >
            <button
              type="button"
              className="gallery-lightbox-backdrop"
              onClick={closeLightbox}
              aria-label="Yopish"
            />

            <motion.figure
              className="gallery-lightbox-stage"
              initial={{ y: 28, scale: 0.98, opacity: 0 }}
              animate={{ y: 0, scale: 1, opacity: 1 }}
              exit={{ y: 20, scale: 0.98, opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
            >
              <img
                src={`${import.meta.env.BASE_URL}${GALLERY_IMAGES[activeIndex].src.replace(/^\//, '')}`}
                alt={GALLERY_IMAGES[activeIndex].alt}
                className="gallery-lightbox-image"
              />
              <figcaption className="gallery-lightbox-caption">
                {GALLERY_IMAGES[activeIndex].alt}
              </figcaption>
            </motion.figure>

            <button type="button" className="gallery-lightbox-close" onClick={closeLightbox} aria-label="Yopish">
              <X size={22} />
            </button>
            <button type="button" className="gallery-lightbox-prev" onClick={showPrev} aria-label="Oldingi rasm">
              <ChevronLeft size={24} />
            </button>
            <button type="button" className="gallery-lightbox-next" onClick={showNext} aria-label="Keyingi rasm">
              <ChevronRight size={24} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default GallerySection
