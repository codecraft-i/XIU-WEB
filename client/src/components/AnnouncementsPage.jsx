import { CalendarDays, BellRing } from 'lucide-react'
import { useEffect } from 'react'
import { announcementsPageItems } from '../data/newsPagesData'

const formatDate = (value) =>
  new Intl.DateTimeFormat('uz-UZ', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric',
  }).format(new Date(value))

function AnnouncementsPage() {
  useEffect(() => {
    document.title = "Barcha e'lonlar | Xorazm Iqtisodiyot Universiteti"
  }, [])

  return (
    <section className="listing-page" aria-label="Barcha e'lonlar">
      <div className="listing-page-shell">
        <section className="ann-hero">
          <span className="ann-glow ann-glow-one" />
          <span className="ann-glow ann-glow-two" />
          <div className="ann-pattern-circle" />

          <div className="ann-content">
            <h1 className="ann-title">Barcha e’lonlar</h1>

            <p className="ann-description">
              Universitet faoliyati, hamkorlik va muhim tashkiliy yangilanishlarga oid dolzarb
              e’lonlar shu sahifada jamlandi.
            </p>

            <div className="ann-actions">
              <div className="ann-mini-card">
                <span>
                  <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                    <path
                      d="M9 12.5l2 2 4-5M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </span>
                Rasmiy e’lonlar
              </div>
            </div>
          </div>

          <div className="ann-side-card">
            <div className="ann-side-icon">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <path
                  d="M4 5.5A2.5 2.5 0 0 1 6.5 3h11A2.5 2.5 0 0 1 20 5.5v13A2.5 2.5 0 0 1 17.5 21h-11A2.5 2.5 0 0 1 4 18.5v-13Z"
                  stroke="currentColor"
                  strokeWidth="2"
                />
                <path
                  d="M8 8h8M8 12h8M8 16h5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                />
              </svg>
            </div>

            <h3>Muhim ma’lumotlar</h3>

            <p>Qabul, uchrashuvlar va tashkiliy jarayonlar bo‘yicha e’lonlarni kuzatib boring.</p>
          </div>
        </section>

        <div className="listing-announcements-grid">
          {announcementsPageItems.map((item, index) => (
            <article key={item.id} className="listing-announcement-card">
              <div className={`listing-announcement-visual listing-announcement-visual-${index % 4}`}>
                <BellRing size={20} />
                <span>{item.department}</span>
              </div>

              {item.image && (
                <img
                  src={`${import.meta.env.BASE_URL}${item.image.replace(/^\//, '')}`}
                  alt={item.title}
                  className="listing-announcement-image"
                  loading="lazy"
                />
              )}

              <div className="listing-announcement-body">
                <div className="listing-announcement-date">
                  <CalendarDays size={15} />
                  {formatDate(item.date)}
                </div>
                <h2>{item.title}</h2>
                <p>{item.summary}</p>
                <div className="listing-announcement-content">
                  {item.content?.map((paragraph, contentIndex) => (
                    <p key={`${item.id}-paragraph-${contentIndex}`}>{paragraph}</p>
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

export default AnnouncementsPage
