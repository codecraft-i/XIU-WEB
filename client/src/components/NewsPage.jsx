import { CalendarDays } from 'lucide-react'
import { useEffect } from 'react'
import { newsPageItems } from '../data/newsPagesData'

const formatDate = (value) =>
  new Intl.DateTimeFormat('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))

function NewsPage() {
  useEffect(() => {
    document.title = 'Barcha yangiliklar | Xorazm Iqtisodiyot Universiteti'
  }, [])

  return (
    <section className="listing-page" aria-label="Barcha yangiliklar">
      <div className="listing-page-shell">
        <section className="news-hero-compact">
          <span className="news-hero-orb news-hero-orb-one" />
          <span className="news-hero-orb news-hero-orb-two" />

          <div className="news-hero-content">
            <h1 className="news-hero-title">Barcha yangiliklar</h1>

            <p className="news-hero-description">
              Universitet hayoti, kampus voqealari va akademik tashabbuslar bo‘yicha eng so‘nggi
              yangiliklar shu sahifada jamlandi.
            </p>

            <div className="news-hero-bottom">
              <div className="news-hero-chip">
                <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                  <path
                    d="M7 3v3M17 3v3M4.5 9.5h15M6 21h12a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                  />
                </svg>
                So‘nggi yangiliklar
              </div>
            </div>
          </div>

          <div className="news-hero-card">
            <div className="news-hero-card-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M5 6.5h14M5 12h14M5 17.5h8"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3>Universitet yangiliklari bir joyda</h3>

            <p>Qabul, ta’lim jarayoni va muhim tashabbuslar bo‘yicha ma’lumotlar.</p>
          </div>
        </section>

        <div className="listing-news-grid">
          {newsPageItems.map((item) => (
            <article key={item.id} className="listing-news-card">
              <img
                src={`${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`}
                alt={item.title}
                className="listing-news-image"
                loading="lazy"
              />

              <div className="listing-news-body">
                <div className="listing-news-meta">
                  <span>{item.department}</span>
                  <span>
                    <CalendarDays size={15} />
                    {formatDate(item.date)}
                  </span>
                </div>

                <h2>{item.title}</h2>
                <p>{item.excerpt}</p>
                <div className="listing-news-content">
                  {item.content?.map((paragraph, index) => (
                    <p key={`${item.id}-paragraph-${index}`}>{paragraph}</p>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}

export default NewsPage
