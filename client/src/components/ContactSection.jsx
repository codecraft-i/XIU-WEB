import { Clock3, Mail, MapPin, MessageSquareText, Phone } from 'lucide-react'
import { useSiteContent } from '../i18n/useSiteContent'

function ContactSection() {
  const { content } = useSiteContent()
  const sectionContent = content.contactSection
  const icons = {
    phone: Phone,
    email: Mail,
    address: MapPin,
    hours: Clock3,
  }

  return (
    <section id="contact-section" className="contact-section" aria-label={sectionContent.aria}>
      <div className="contact-container">
        <div className="map-card">
          <iframe
            title={sectionContent.mapTitle}
            src="https://www.google.com/maps?q=41.519130,60.569178&output=embed"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
          />

          <a
            className="map-open-btn"
            href="https://www.google.com/maps/search/?api=1&query=41.519130,60.569178"
            target="_blank"
            rel="noopener noreferrer"
          >
            <MapPin size={18} />
            {sectionContent.openMap}
          </a>

          <div className="map-gradient" aria-hidden="true" />

          <div className="location-panel">
            <div className="location-label">
              <MapPin size={15} />
              {sectionContent.locationLabel}
            </div>

            <div className="location-text">
              <MapPin size={24} />
              <p>{sectionContent.address}</p>
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className="section-badge">
            <Phone size={17} />
            {sectionContent.badge}
          </div>

          <h2 className="section-title">
            {sectionContent.title[0]} <span>{sectionContent.title[1]}</span>
          </h2>

          <p className="section-desc">{sectionContent.description}</p>

          <div className="contact-list">
            {sectionContent.items.map((item) => {
              const Icon = icons[item.id]
              return (
              <div key={item.id} className="contact-item">
                <div className="icon-box">
                  <Icon size={22} />
                </div>

                <div className="contact-item-content">
                  <small>{item.label}</small>
                  {item.href ? <a href={item.href}>{item.content}</a> : <p>{item.content}</p>}
                </div>
              </div>
            )})}
          </div>

          <div className="action-row">
            <a className="primary-btn" href="tel:+998999642613">
              <Phone size={21} />
              {sectionContent.call}
            </a>

            <a className="secondary-btn" href="/send-message">
              <MessageSquareText size={21} />
              {sectionContent.message}
            </a>
          </div>

          <div className="mini-note">{sectionContent.note}</div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
