import { CheckCircle2, Mail, MessageSquareText, Phone, ShieldCheck, X } from 'lucide-react'
import { useEffect, useState } from 'react'
import { postJson } from '../lib/api'

const INITIAL_FORM = {
  name: '',
  phone: '',
  email: '',
  message: '',
}

function MessagePage() {
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [showToast, setShowToast] = useState(false)
  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (!showToast) {
      return undefined
    }

    const timeoutId = window.setTimeout(() => {
      setShowToast(false)
    }, 3000)

    return () => {
      window.clearTimeout(timeoutId)
    }
  }, [showToast])

  const formatUzPhone = (value) => {
    let digits = value.replace(/\D/g, '')

    if (digits.startsWith('998')) {
      digits = digits.slice(3)
    }

    digits = digits.slice(0, 9)

    let result = '+998'

    if (digits.length > 0) result += ` ${digits.slice(0, 2)}`
    if (digits.length > 2) result += ` ${digits.slice(2, 5)}`
    if (digits.length > 5) result += ` ${digits.slice(5, 7)}`
    if (digits.length > 7) result += ` ${digits.slice(7, 9)}`

    return result
  }

  const validateEmail = (email) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)

  const validateForm = () => {
    const nextErrors = {}

    if (formData.name.trim().length < 2) {
      nextErrors.name = 'Ism kamida 2 ta belgidan iborat bo‘lishi kerak'
    }

    if (formData.phone.trim() && formData.phone.replace(/\D/g, '').length < 12) {
      nextErrors.phone = 'Telefon raqamni to‘liq kiriting'
    }

    if (formData.email.trim() && !validateEmail(formData.email.trim())) {
      nextErrors.email = 'Email manzil noto‘g‘ri kiritilgan'
    }

    if (formData.message.trim().length < 10) {
      nextErrors.message = 'Xabar matni kamida 10 ta belgidan iborat bo‘lishi kerak'
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleChange = (field, value) => {
    const nextValue = field === 'phone' ? formatUzPhone(value) : value

    setFormData((current) => ({
      ...current,
      [field]: nextValue,
    }))

    setApiError('')
    setErrors((current) => ({
      ...current,
      [field]: '',
    }))
  }

  const handleSubmit = async (event) => {
    event.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)
    setApiError('')

    try {
      await postJson('/api/messages/', formData)
      setShowToast(true)
      setFormData(INITIAL_FORM)
      setErrors({})
    } catch (error) {
      setApiError(error.message || "Xabarni yuborishda xatolik yuz berdi.")
      if (error.errors) {
        setErrors(error.errors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="message-page" aria-label="Xabar yozish sahifasi">
      <div className="message-page-shell">
        <div className={`message-toast ${showToast ? 'message-toast-show' : ''}`} role="status" aria-live="polite">
          <CheckCircle2 size={18} />
          <span>Xabaringiz qabul qilindi.</span>
        </div>

        <div className="message-card">
          <a href="/" className="message-close-btn" aria-label="Bosh sahifaga qaytish">
            <X size={20} />
          </a>

          <aside className="message-info">
            <div>
              <div className="message-badge">
                <MessageSquareText size={17} />
                Universitet aloqa markazi
              </div>

              <h1>Savolingizni universitetga yuboring</h1>
              <p>
                Murojaatingiz mas’ul bo‘limga yetkaziladi. Ma’lumotlarni aniq yozsangiz, javob olish
                jarayoni tezroq bo‘ladi.
              </p>

              <div className="message-info-list">
                <div className="message-info-item">
                  <div className="message-info-icon">
                    <Phone size={21} />
                  </div>
                  <div>
                    <strong>Telefon</strong>
                    <span>Istasangiz raqamingizni qoldirib, tezkor aloqa olishingiz mumkin</span>
                  </div>
                </div>

                <div className="message-info-item">
                  <div className="message-info-icon">
                    <Mail size={21} />
                  </div>
                  <div>
                    <strong>Email</strong>
                    <span>Javobni email orqali ham qabul qilish imkoniyati mavjud</span>
                  </div>
                </div>

                <div className="message-info-item">
                  <div className="message-info-icon">
                    <ShieldCheck size={21} />
                  </div>
                  <div>
                    <strong>Tezkor ko‘rib chiqish</strong>
                    <span>Xabar matni aniq bo‘lsa, tegishli bo‘limga yo‘naltirish osonlashadi</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="message-mini-note">
              Maslahat: murojaat matnida fakultet, yo‘nalish, guruh yoki kerakli bo‘lim nomini yozib
              qoldiring.
            </div>
          </aside>

          <main className="message-form-side">
            <div className="message-form-header">
              <div className="message-eyebrow">Murojaat formasi</div>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="message-form-grid">
                <div className={`message-field ${errors.name ? 'message-field-error' : ''}`}>
                  <label htmlFor="message-name">
                    Ism <span className="message-required">*</span>
                  </label>
                  <div className="message-input-wrap">
                    <input
                      id="message-name"
                      type="text"
                      placeholder="Ismingizni kiriting"
                      value={formData.name}
                      onChange={(event) => handleChange('name', event.target.value)}
                    />
                  </div>
                  <span className="message-error-text">{errors.name || ''}</span>
                </div>

                <div className={`message-field ${errors.phone ? 'message-field-error' : ''}`}>
                  <label htmlFor="message-phone">Telefon raqam</label>
                  <div className="message-input-wrap">
                    <input
                      id="message-phone"
                      type="tel"
                      placeholder="+998 90 123 45 67"
                      value={formData.phone}
                      onChange={(event) => handleChange('phone', event.target.value)}
                    />
                  </div>
                  <span className="message-error-text">{errors.phone || ''}</span>
                </div>

                <div className={`message-field message-field-full ${errors.email ? 'message-field-error' : ''}`}>
                  <label htmlFor="message-email">Email</label>
                  <div className="message-input-wrap">
                    <input
                      id="message-email"
                      type="email"
                      placeholder="you@example.com"
                      value={formData.email}
                      onChange={(event) => handleChange('email', event.target.value)}
                    />
                  </div>
                  <span className="message-error-text">{errors.email || ''}</span>
                </div>

                <div className={`message-field message-field-full ${errors.message ? 'message-field-error' : ''}`}>
                  <label htmlFor="message-body">
                    Xabar matni <span className="message-required">*</span>
                  </label>
                  <div className="message-input-wrap">
                    <textarea
                      id="message-body"
                      placeholder="Yozmoqchi bo‘lgan xabaringizni kiriting"
                      value={formData.message}
                      onChange={(event) => handleChange('message', event.target.value)}
                    />
                    <span className="message-counter">{formData.message.length}/1200</span>
                  </div>
                  <span className="message-error-text">{errors.message || ''}</span>
                </div>
              </div>

              {apiError ? <span className="message-error-text">{apiError}</span> : null}

              <div className="message-form-footer">
                <div className="message-privacy">
                  <ShieldCheck size={18} />
                  <span>Qoldirilgan ma’lumotlar faqat murojaatingizga javob berish uchun ishlatiladi.</span>
                </div>

                <div className="message-actions">
                  <a href="/" className="message-btn message-btn-secondary">
                    Bekor qilish
                  </a>
                  <button type="submit" className="message-btn message-btn-primary" disabled={isSubmitting}>
                    <MessageSquareText size={18} />
                    {isSubmitting ? 'Yuborilmoqda...' : 'Xabarni yuborish'}
                  </button>
                </div>
              </div>
            </form>
          </main>
        </div>
      </div>
    </section>
  )
}

export default MessagePage
