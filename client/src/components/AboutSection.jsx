import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'
import { useSiteContent } from '../i18n/useSiteContent'
import { CLOUDINARY_ASSETS } from '../lib/assets'
import useIsMobileView from '../lib/useIsMobileView'

function AboutSection() {
  const { content } = useSiteContent()
  const aboutContent = content.home.about
  const sectionRef = useRef(null)
  const isMobileView = useIsMobileView()
  const [isStackedLayout, setIsStackedLayout] = useState(() =>
    typeof window !== 'undefined' ? window.innerWidth <= 1024 : false
  )

  useEffect(() => {
    const media = window.matchMedia('(max-width: 1024px)')
    const updateLayout = () => setIsStackedLayout(media.matches)

    updateLayout()
    media.addEventListener('change', updateLayout)

    return () => media.removeEventListener('change', updateLayout)
  }, [])

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })

  const shellOpacity = useTransform(scrollYProgress, [0, 0.16, 0.82, 1], [0.12, 1, 1, 0.15])
  const shellY = useTransform(scrollYProgress, [0, 0.24, 0.76, 1], [95, 0, 0, -95])
  const shellScale = useTransform(scrollYProgress, [0, 0.24, 0.78, 1], [0.96, 1, 1, 0.96])
  const contentOpacity = useTransform(scrollYProgress, [0.08, 0.22, 0.76, 0.92], [0, 1, 1, 0])
  const contentY = useTransform(scrollYProgress, [0.08, 0.24, 0.76, 0.92], [72, 0, 0, -64])
  const contentScale = useTransform(scrollYProgress, [0.08, 0.24, 0.76, 0.92], [0.96, 1, 1, 0.97])
  const contentRotateX = useTransform(scrollYProgress, [0.08, 0.24, 0.76, 0.92], [13, 0, 0, -8])
  const contentBlur = useTransform(scrollYProgress, [0.08, 0.24, 0.76, 0.92], [8, 0, 0, 6])
  const textX = useTransform(scrollYProgress, [0.12, 0.28, 0.76, 0.9], [-46, 0, 0, 30])
  const imageX = useTransform(scrollYProgress, [0.12, 0.28, 0.76, 0.9], [58, 0, 0, -34])
  const imageY = useTransform(scrollYProgress, [0.12, 0.55, 0.9], [38, 0, -34])
  const contentFilter = useMotionTemplate`blur(${contentBlur}px)`

  return (
    <section
      id="about"
      ref={sectionRef}
      className="about-section"
      aria-label={aboutContent.aria}
    >
      <div className="about-stage">
        <motion.div
          className="about-shell"
          style={isMobileView ? undefined : { opacity: shellOpacity, y: shellY, scale: shellScale }}
        >
          <motion.div
            className="about-content"
            style={
              isMobileView
                ? undefined
                : {
                    opacity: contentOpacity,
                    y: contentY,
                    scale: contentScale,
                    rotateX: contentRotateX,
                    filter: contentFilter,
                  }
            }
          >
            <motion.figure
              className="about-image-wrap"
              style={isMobileView || isStackedLayout ? undefined : { x: imageX, y: imageY }}
            >
              <img
                src={CLOUDINARY_ASSETS.about}
                alt={aboutContent.imageAlt}
                className="about-image"
                loading="lazy"
              />
            </motion.figure>

            <motion.article
              className="about-text"
              style={isMobileView || isStackedLayout ? undefined : { x: textX }}
            >
              <span className="about-kicker">{aboutContent.kicker}</span>
              <h2 className="about-title">{aboutContent.title}</h2>

              {aboutContent.paragraphs.map((paragraph) => (
                <p key={paragraph} className="about-paragraph">
                  {paragraph}
                </p>
              ))}

              <a href="/about" className="about-more-link">
                {aboutContent.cta}
                <ArrowUpRight size={16} />
              </a>
            </motion.article>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

export default AboutSection
