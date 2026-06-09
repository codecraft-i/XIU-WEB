import { motion, useMotionTemplate, useScroll, useTransform } from 'framer-motion'
import { ArrowRight, CalendarDays, ChevronLeft, ChevronRight } from 'lucide-react'
import { Navigation } from 'swiper/modules'
import { Swiper, SwiperSlide } from 'swiper/react'
import { useRef } from 'react'
import { useSiteContent } from '../i18n/useSiteContent'
import { formatLocalizedDate } from '../i18n/formatters'
import { resolveAssetUrl } from '../lib/assets'
import useIsMobileView from '../lib/useIsMobileView'
import 'swiper/css'

const sortLatest = (items) =>
  [...items].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

function NewsSection() {
  const { content, locale } = useSiteContent()
  const sectionContent = content.home.news
  const newsPageItems = content.listingPages.newsItems
  const announcementsPageItems = content.listingPages.announcementItems
  const sectionRef = useRef(null)
  const isMobileView = useIsMobileView()
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
    <section id="news" ref={sectionRef} className="news-section" aria-label={sectionContent.aria}>
      <motion.div
        className="news-shell"
        style={
          isMobileView
            ? undefined
            : {
                opacity: sectionOpacity,
                y: sectionY,
                scale: sectionScale,
                rotateX: sectionRotateX,
                filter: sectionFilter,
                transformStyle: 'preserve-3d',
              }
        }
      >
        <div className="news-main">
          <motion.div
            className="news-left"
            initial={isMobileView ? false : { opacity: 0, y: 36 }}
            whileInView={isMobileView ? undefined : { opacity: 1, y: 0 }}
            viewport={isMobileView ? undefined : { once: true, amount: 0.24 }}
            transition={isMobileView ? undefined : { duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="news-head">
              <span className="news-kicker" aria-hidden="true" />
              <div className="news-intro">
                <h2 className="news-title">{sectionContent.title}</h2>
                <p className="news-lead">{sectionContent.lead}</p>
              </div>
            </div>

            <div className="news-grid">
              {latestNews.map((item) => (
                <article key={item.id} className="news-card">
                  <img
                    src={resolveAssetUrl(item.image)}
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
                        {formatLocalizedDate(item.date, locale)}
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
              {sectionContent.allNews}
              <ArrowRight size={18} />
            </a>
          </motion.div>

          <motion.aside
            className="announcements-right"
            initial={isMobileView ? false : { opacity: 0, x: 30 }}
            whileInView={isMobileView ? undefined : { opacity: 1, x: 0 }}
            viewport={isMobileView ? undefined : { once: true, amount: 0.24 }}
            transition={
              isMobileView ? undefined : { duration: 0.72, ease: [0.22, 1, 0.36, 1], delay: 0.08 }
            }
          >
            <div className="announcements-layout">
              <div className="announcements-intro">
                <span className="announcements-kicker">{sectionContent.announcementsKicker}</span>
                <h2 className="announcements-title">{sectionContent.announcementsTitle}</h2>
                <p className="announcements-description">{sectionContent.announcementsDescription}</p>

                <a href="/announcements" className="announcements-all-link">
                  {sectionContent.allAnnouncements}
                  <ArrowRight size={16} />
                </a>

                <div className="announcements-nav">
                  <button type="button" className="announcements-prev" aria-label={sectionContent.prevAnnouncement}>
                    <ChevronLeft size={18} />
                  </button>
                  <button type="button" className="announcements-next" aria-label={sectionContent.nextAnnouncement}>
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
                            src={resolveAssetUrl(item.image)}
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
                              {formatLocalizedDate(item.date, locale)}
                            </span>
                          </div>
                          <a href="/announcements" className="announcement-cta">
                            {sectionContent.details}
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
