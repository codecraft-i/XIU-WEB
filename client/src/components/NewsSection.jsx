import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useRef } from 'react'
import { announcementsPageItems, newsPageItems } from '../data/newsPagesData'
import 'swiper/css'

const formatDate = (value) =>
  new Intl.DateTimeFormat('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))

const sortLatest = (items) =>
  [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

function NewsSection() {
  const sectionRef = useRef(null)
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'end start'],
  })
  const sectionOpacity = useTransform(scrollYProgress, [0, 0.16, 0.84, 1], [0.08, 1, 1, 0.08])
  const sectionY = useTransform(scrollYProgress, [0, 0.2, 0.82, 1], [72, 0, 0, -64])
  const sectionScale = useTransform(scrollYProgress, [0, 0.2, 0.82, 1], [0.972, 1, 1, 0.978])
  const sectionRotateX = useTransform(scrollYProgress, [0, 0.2, 0.82, 1], [7, 0, 0, -5])
  const sectionBlur = useTransform(scrollYProgress, [0, 0.2, 0.82, 1], [10, 0, 0, 6])
  const sectionFilter = useMotionTemplate`blur(${sectionBlur}px)`

  const latestNews = sortLatest(newsPageItems).slice(0, 4)
  const latestAnnouncements = sortLatest(announcementsPageItems).slice(0, 10)

  return (
    <section id="news" ref={sectionRef} className="news-section" aria-label="Yangiliklar va e'lonlar">
      <motion.div
        className="news-shell"
        style={{
          opacity: sectionOpacity,
          y: sectionY,
          scale: sectionScale,
          rotateX: sectionRotateX,
          filter: sectionFilter,
          transformStyle: 'preserve-3d',
        }}
      >
        <div className="news-main">
          <motion.div
            className="news-left"
            initial={{ opacity: 0, y: 36 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="news-head">
              <span className="news-kicker" aria-hidden="true" />
              <div className="news-intro">
                <h2 className="news-title">Universitet hayotidan yangiliklar</h2>
                <p className="news-lead">
                  Talabalar, professor-o‘qituvchilar va universitet jamoasi ishtirokidagi
                  eng so‘nggi voqealar, tashabbuslar va muhim uchrashuvlarni kuzatib boring.
                </p>
              </div>
            </div>

            <div className="news-grid">
              {latestNews.map((item) => (
                <article key={item.id} className="news-card">
                  <img
                    src={`${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`}
                    alt={item.title}
                    className="news-card-image"
                    loading="lazy"
                  />
                  <div className="news-card-body">
                    <h3 className="news-card-title">{item.title}</h3>
                    <p className="news-card-excerpt">{item.excerpt}</p>
                    <div className="news-card-meta">
                      <span>
                        <CalendarDays size={15} />
                        {formatDate(item.date)}
                      </span>
                    </div>
                    <a href="/news" className="news-card-link">
                      {item.department}
                    </a>
                  </div>
                </article>
              ))}
            </div>

            <a href="/news" className="news-link-btn news-link-btn-bottom">
              Barcha yangiliklar
              <ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.aside
            className="announcements-right"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.24 }}
            transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.08 }}
          >
            <div className="announcements-layout">
              <div className="announcements-intro">
                <span className="announcements-kicker">E'lonlar</span>
                <h2 className="announcements-title">Muhim e'lonlar va imkoniyatlar</h2>
                <p className="announcements-description">
                  Qabul, grant, kurs va almashinuv dasturlariga oid dolzarb e'lonlarni shu
                  bo‘limda kuzatib boring.
                </p>

                <a href="/announcements" className="announcements-all-link">
                  Barcha e'lonlar
                  <ArrowRight size={16} />
                </a>

                <div className="announcements-nav">
                  <button type="button" className="announcements-prev" aria-label="Oldingi e'lon">
                    <ChevronLeft size={18} />
                  </button>
                  <button type="button" className="announcements-next" aria-label="Keyingi e'lon">
                    <ChevronRight size={18} />
                  </button>
                </div>
              </div>

              <div className="announcements-carousel">
                <Swiper
                  modules={[Navigation]}
                  slidesPerView={1.08}
                  spaceBetween={20}
                  speed={680}
                  navigation={{
                    nextEl: '.announcements-next',
                    prevEl: '.announcements-prev',
                  }}
                  breakpoints={{
                    640: { slidesPerView: 2.05, spaceBetween: 18 },
                    980: { slidesPerView: 3.05, spaceBetween: 20 },
                    1280: { slidesPerView: 4.05, spaceBetween: 22 },
                  }}
                  className="announcements-swiper"
                >
                  {latestAnnouncements.map((item) => (
                    <SwiperSlide key={item.id}>
                      <article className="announcement-card">
                        {item.image && (
                          <img
                            src={`${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`}
                            alt={item.title}
                            className="announcement-card-image"
                            loading="lazy"
                          />
                        )}

                        <div className="announcement-card-body">
                          <h3 className="announcement-title">{item.title}</h3>
                          <p className="announcement-summary">{item.summary}</p>
                          <div className="announcement-meta">
                            <span>{item.department}</span>
                            <span>
                              <CalendarDays size={15} />
                              {formatDate(item.date)}
                            </span>
                          </div>
                          <a href="/announcements" className="announcement-cta">
                            Batafsil
                            <ArrowRight size={16} />
                          </a>
                        </div>
                      </article>
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
            </div>
          </motion.aside>
        </div>
      </motion.div>
    </section>
  )
}

export default NewsSection
