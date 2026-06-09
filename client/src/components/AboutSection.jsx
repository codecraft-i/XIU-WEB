import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { ArrowUpRight } from 'lucide-react'
import { useEffect, useRef, useState } from 'react'

function AboutSection() {
  const sectionRef = useRef(null)
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
      aria-label="Universitet haqida"
    >
      <div className="about-stage">
        <motion.div
          className="about-shell"
          style={{ opacity: shellOpacity, y: shellY, scale: shellScale }}
        >
          <motion.div
            className="about-content"
            style={{
              opacity: contentOpacity,
              y: contentY,
              scale: contentScale,
              rotateX: contentRotateX,
              filter: contentFilter,
            }}
          >
            <motion.figure
              className="about-image-wrap"
              style={isStackedLayout ? undefined : { x: imageX, y: imageY }}
            >
              <img
                src={`${import.meta.env.BASE_URL}about.jpg`}
                alt="Xorazm Iqtisodiyot Universiteti kampusi"
                className="about-image"
                loading="lazy"
              />
            </motion.figure>

            <motion.article
              className="about-text"
              style={isStackedLayout ? undefined : { x: textX }}
            >
              <span className="about-kicker">Biz haqimizda</span>
              <h2 className="about-title">Xorazm Iqtisodiyot Universiteti</h2>

              <p className="about-paragraph">
                Xorazm Iqtisodiyot Universiteti iqtisodiyot, biznes va boshqaruv
                yo‘nalishlarida amaliy fikrlaydigan, zamonaviy mutaxassislar
                tayyorlashga yo‘naltirilgan oliy ta’lim maskanidir.
              </p>

              <p className="about-paragraph">
                Bu yerda nazariy bilimlar real loyihalar, raqamli ko‘nikmalar va
                talabaga yo‘naltirilgan muhit bilan uyg‘unlashadi. Maqsadimiz
                mehnat bozoriga tayyor, tahliliy va tashabbuskor kadrlarni
                shakllantirishdir.
              </p>

              <a href="/about" className="about-more-link">
                Batafsil
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
