import { AnimatePresence, motion } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import { Autoplay, EffectFade } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useRef, useState } from 'react'
import HeroSlide from './HeroSlide'
import 'swiper/css'
import 'swiper/css/effect-fade'

const SLIDES = [
  {
    id: 1,
    image: `${import.meta.env.BASE_URL}hero/hero1.jpg`,
    tag: 'Amaliy auditoriyalar',
    title: 'Nazariya va amaliyot bir joyda',
    summary: 'Darslar seminar, workshop va real keyslar bilan olib boriladi.',
  },
  {
    id: 2,
    image: `${import.meta.env.BASE_URL}hero/hero2.jpeg`,
    tag: 'Talaba muhiti',
    title: 'Faol va qulay kampus hayoti',
    summary: 'Klublar, uchrashuvlar va jamoaviy tashabbuslar doimiy ritm yaratadi.',
  },
  {
    id: 3,
    image: `${import.meta.env.BASE_URL}hero/hero3.jpg`,
    tag: 'Raqamli ta’lim',
    title: 'Zamonaviy o‘quv jarayoni',
    summary: 'Platformalar, laboratoriyalar va mentorlik orqali o‘qish tizimli quriladi.',
  },
  {
    id: 4,
    image: `${import.meta.env.BASE_URL}hero/hero4.jpg`,
    tag: 'Kasbiy yo‘nalish',
    title: 'Kelajak kasbiga aniq tayyorgarlik',
    summary: 'Bozor ehtiyojiga mos ko‘nikmalar bilan o‘qish va rivojlanish birga boradi.',
  },
]

function HeroSection() {
  const [activeSlide, setActiveSlide] = useState(0)
  const swiperRef = useRef(null)
  const activeSlideInfo = SLIDES[activeSlide] ?? SLIDES[0]

  return (
    <section
      id="hero"
      className="hero-section"
      aria-label="Xorazm Iqtisodiyot Universiteti bosh sahifa hero qismi"
    >
      <Swiper
        modules={[Autoplay, EffectFade]}
        effect="fade"
        speed={1100}
        loop
        autoplay={{
          delay: 5200,
          disableOnInteraction: false,
        }}
        onSwiper={(swiper) => {
          swiperRef.current = swiper
        }}
        onSlideChange={(swiper) => setActiveSlide(swiper.realIndex)}
        className="hero-swiper"
      >
        {SLIDES.map((slide) => (
          <SwiperSlide key={slide.id} className="hero-swiper-slide">
            {({ isActive }) => <HeroSlide slide={slide} isActive={isActive} />}
          </SwiperSlide>
        ))}
      </Swiper>

      <div className="hero-overlay" />

      <div className="hero-content-wrap">
        <div className="hero-content">
          <div className="hero-content-inner">
            <h1 className="hero-main-title">Xorazm Iqtisodiyot Universiteti</h1>

            <div className="hero-divider" />

            <div className="hero-bottom">
              <div className="hero-info-stack">
                <AnimatePresence mode="wait">
                  <motion.article
                    key={activeSlideInfo.id}
                    initial={{ opacity: 0, y: 16 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -16 }}
                    transition={{ duration: 0.35, ease: 'easeOut' }}
                    className="hero-info"
                  >
                    <h2 className="hero-focus-title">{activeSlideInfo.title}</h2>
                    <p className="hero-focus-summary">{activeSlideInfo.summary}</p>
                  </motion.article>
                </AnimatePresence>

                <div className="hero-nav-controls" aria-label="Hero navigation">
                  <button
                    type="button"
                    className="hero-nav-btn"
                    onClick={() => swiperRef.current?.slidePrev()}
                    aria-label="Oldingi slayd"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="hero-nav-btn"
                    onClick={() => swiperRef.current?.slideNext()}
                    aria-label="Keyingi slayd"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

export default HeroSection
