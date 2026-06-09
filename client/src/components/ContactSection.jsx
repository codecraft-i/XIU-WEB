import { Clock3, Mail, MapPin, MessageSquareText, Phone } from 'lucide-react'

const CONTACT_ITEMS = [
  {
    id: 'phone',
    Icon: Phone,
    label: 'Telefon raqam',
    content: '+998999642613',
    href: 'tel:+998999642613',
  },
  {
    id: 'email',
    Icon: Mail,
    label: 'Email manzil',
    content: 'xiuniuz@gmail.com',
    href: 'mailto:xiuniuz@gmail.com',
  },
  {
    id: 'address',
    Icon: MapPin,
    label: 'Universitet manzili',
    content: "Oyoq bogʻ MFY, Xiva ko'chasi , 41-uy",
  },
  {
    id: 'hours',
    Icon: Clock3,
    label: 'Ish vaqti',
    content: 'Dushanba - Shanba, 09:00 - 18:00',
  },
]

function ContactSection() {
  return (
    <section id="contact-section" className="contact-section" aria-label="Biz bilan bog'laning">
      <div className="contact-container">
        <div className="map-card">
          <iframe
            title="XIUNI xaritada"
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
            Xaritada ochish
          </a>

          <div className="map-gradient" aria-hidden="true" />

          <div className="location-panel">
            <div className="location-label">
              <MapPin size={15} />
              Bizning manzil
            </div>

            <div className="location-text">
              <MapPin size={24} />
              <p>Oyoq bogʻ MFY, Xiva ko'chasi , 41-uy</p>
            </div>
          </div>
        </div>

        <div className="info-card">
          <div className="section-badge">
            <Phone size={17} />
            Aloqa markazi
          </div>

          <h2 className="section-title">
            Biz bilan <span>bog'laning</span>
          </h2>

          <p className="section-desc">
            Savol, taklif yoki qabul jarayoni bo‘yicha murojaatingiz bo‘lsa, quyidagi aloqa
            ma’lumotlari orqali biz bilan bog‘lanishingiz mumkin.
          </p>

          <div className="contact-list">
            {CONTACT_ITEMS.map((item) => (
              <div key={item.id} className="contact-item">
                <div className="icon-box">
                  <item.Icon size={22} />
                </div>

                <div className="contact-item-content">
                  <small>{item.label}</small>
                  {item.href ? <a href={item.href}>{item.content}</a> : <p>{item.content}</p>}
                </div>
              </div>
            ))}
          </div>

          <div className="action-row">
            <a className="primary-btn" href="tel:+998999642613">
              <Phone size={21} />
              Qo‘ng‘iroq qilish
            </a>

            <a className="secondary-btn" href="/send-message">
              <MessageSquareText size={21} />
              Xabar yozish
            </a>
          </div>

          <div className="mini-note">
            Qabul, hujjatlar, yo‘nalishlar yoki universitet faoliyati bo‘yicha savollaringizga
            ish vaqtida javob beramiz.
          </div>
        </div>
      </div>
    </section>
  )
}

export default ContactSection
