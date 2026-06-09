import { CalendarDays } from 'lucide-react'
import { useEffect } from 'react'
import { useSiteContent } from '../i18n/useSiteContent'
import { formatLocalizedDate } from '../i18n/formatters'
import { resolveAssetUrl } from '../lib/assets'

function NewsPage() {
  const { content, locale } = useSiteContent()
  const pageContent = content.listingPages.news
  const newsPageItems = content.listingPages.newsItems

  useEffect(() => {
    document.title = content.app.pageTitles.news
  }, [content.app.pageTitles.news])

  return (
    <section className="listing-page" aria-label={pageContent.aria}>
      <div className="listing-page-shell">
        <section className="news-hero-compact">
          <span className="news-hero-orb news-hero-orb-one" />
          <span className="news-hero-orb news-hero-orb-two" />

          <div className="news-hero-content">
            <h1 className="news-hero-title">{pageContent.title}</h1>

            <p className="news-hero-description">{pageContent.description}</p>

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
                {pageContent.chip}
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

            <h3>{pageContent.cardTitle}</h3>

            <p>{pageContent.cardText}</p>
          </div>
        </section>

        <div className="listing-news-grid">
          {newsPageItems.map((item) => (
            <article key={item.id} className="listing-news-card">
              <img
                src={resolveAssetUrl(item.image)}
                alt={item.title}
                className="listing-news-image"
                loading="lazy"
              />

              <div className="listing-news-body">
                <div className="listing-news-meta">
                  <span>{item.department}</span>
                  <span>
                    <CalendarDays size={15} />
                    {formatLocalizedDate(item.date, locale)}
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
