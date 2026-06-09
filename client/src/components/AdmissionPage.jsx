import {
  ArrowLeft,
  ArrowRight,
  BadgeCheck,
  CheckCheck,
  ChevronDown,
  ClipboardList,
  Phone,
  ShieldCheck,
  UserRound,
  X,
} from 'lucide-react'
import { useEffect, useMemo, useState } from 'react'
import { postJson } from '../lib/api'
import { useSiteContent } from '../i18n/useSiteContent'
import { CLOUDINARY_ASSETS } from '../lib/assets'

const INITIAL_FORM = {
  phone: '',
  extraPhone: '',
  name: '',
  surname: '',
  educationType: '',
  educationForm: '',
  educationLanguage: '',
  direction: '',
}

function formatUzPhone(value) {
  let digits = value.replace(/\D/g, '')

  if (digits.startsWith('998')) {
    digits = digits.slice(3)
  }

  digits = digits.slice(0, 9)

  let result = ''

  if (digits.length > 0) result += digits.slice(0, 2)
  if (digits.length > 2) result += `-${digits.slice(2, 5)}`
  if (digits.length > 5) result += `-${digits.slice(5, 7)}`
  if (digits.length > 7) result += `-${digits.slice(7, 9)}`

  return result
}

function formatUzPhoneFull(value) {
  return value ? `+998 ${value}` : '+998'
}

function AdmissionPage() {
  const { content } = useSiteContent()
  const pageContent = content.admissionPage
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState(INITIAL_FORM)
  const [errors, setErrors] = useState({})
  const [apiError, setApiError] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    document.title = content.app.pageTitles.admission
  }, [content.app.pageTitles.admission])

  const summaryRows = useMemo(
    () => [
      { label: pageContent.summary.phone, value: formatUzPhoneFull(formData.phone) },
      {
        label: pageContent.summary.extraPhone,
        value: formData.extraPhone ? formatUzPhoneFull(formData.extraPhone) : pageContent.summary.notEntered,
      },
      { label: pageContent.summary.fullName, value: `${formData.name} ${formData.surname}`.trim() },
      { label: pageContent.summary.educationType, value: formData.educationType },
      { label: pageContent.summary.educationForm, value: formData.educationForm },
      { label: pageContent.summary.educationLanguage, value: formData.educationLanguage },
      { label: pageContent.summary.direction, value: formData.direction },
    ],
    [formData, pageContent.summary],
  )

  const handleChange = (field, value) => {
    const nextValue = field === 'phone' || field === 'extraPhone' ? formatUzPhone(value) : value

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

  const validateStepOne = () => {
    const nextErrors = {}

    if (formData.phone.replace(/\D/g, '').length < 9) {
      nextErrors.phone = pageContent.errors.phoneRequired
    }

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const validateStepTwo = () => {
    const nextErrors = {}

    if (formData.name.trim().length < 2) nextErrors.name = pageContent.errors.nameShort
    if (formData.surname.trim().length < 2) nextErrors.surname = pageContent.errors.surnameShort

    if (formData.extraPhone.trim() && formData.extraPhone.replace(/\D/g, '').length < 9) {
      nextErrors.extraPhone = pageContent.errors.extraPhoneShort
    }

    if (!formData.educationType) nextErrors.educationType = pageContent.errors.educationTypeRequired
    if (!formData.educationForm) nextErrors.educationForm = pageContent.errors.educationFormRequired
    if (!formData.educationLanguage) nextErrors.educationLanguage = pageContent.errors.educationLanguageRequired
    if (!formData.direction) nextErrors.direction = pageContent.errors.directionRequired

    setErrors(nextErrors)
    return Object.keys(nextErrors).length === 0
  }

  const handleStepOneSubmit = (event) => {
    event.preventDefault()
    if (validateStepOne()) setStep(2)
  }

  const handleStepTwoSubmit = async (event) => {
    event.preventDefault()

    if (!validateStepTwo()) {
      return
    }

    setIsSubmitting(true)
    setApiError('')

    try {
      await postJson('/api/admissions/', formData)
      setStep(3)
    } catch (error) {
      setApiError(error.message || pageContent.errors.submitFailed)
      if (error.errors) {
        setErrors(error.errors)
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section className="admission-page" aria-label={pageContent.aria}>
      <div className="admission-shell">
        <aside className="admission-side">
          <a href="/" className="admission-side-logo" aria-label={pageContent.backHome}>
            <img src={CLOUDINARY_ASSETS.logo} alt="XIU logotipi" />
          </a>

          <div className="admission-side-copy">
            <span className="admission-side-kicker">{pageContent.onlineApplication}</span>
            <h2>{pageContent.sidebarTitle}</h2>
            <p>{pageContent.sidebarText}</p>
          </div>

          <div className="admission-step-list" aria-label={pageContent.stepsAria}>
            {pageContent.steps.map((item, index) => {
              const isActive = step === index + 1
              const isComplete = step > index + 1

              return (
                <div
                  key={item.number}
                  className={`admission-step-item ${
                    isActive ? 'admission-step-item-active' : ''
                  } ${isComplete ? 'admission-step-item-complete' : ''}`}
                >
                  <span className="admission-step-dot">{isComplete ? <CheckCheck size={16} /> : item.number}</span>
                  <div>
                    <strong>{item.title}</strong>
                    <p>{item.text}</p>
                  </div>
                </div>
              )
            })}
          </div>

          <div className="admission-side-note">
            <ShieldCheck size={18} />
            <span>{pageContent.sideNote}</span>
          </div>
        </aside>

        <main className="admission-main">
          <a href="/" className="admission-close-btn" aria-label={pageContent.backHome}>
            <X size={18} />
          </a>

          <div className="admission-main-inner">
            {step === 1 && (
              <>
                <div className="admission-form-head">
                  <span className="admission-icon-shell">
                    <Phone size={28} />
                  </span>
                  <h1>{pageContent.stepOne.title}</h1>
                  <p>{pageContent.stepOne.text}</p>
                </div>

                <form className="admission-form-card" onSubmit={handleStepOneSubmit}>
                  <div className={`admission-field ${errors.phone ? 'admission-field-error' : ''}`}>
                    <label htmlFor="admission-phone">{pageContent.stepOne.phoneLabel}</label>
                    <div className="admission-input-wrap admission-phone-wrap admission-phone-wrap-primary">
                      <span className="admission-phone-prefix">+998</span>
                      <span className="admission-phone-divider" aria-hidden="true" />
                      <input
                        id="admission-phone"
                        type="tel"
                        inputMode="numeric"
                        placeholder="90-123-45-67"
                        value={formData.phone}
                        onChange={(event) => handleChange('phone', event.target.value)}
                      />
                    </div>
                    <span className="admission-error-text">{errors.phone || ''}</span>
                  </div>

                  <button type="submit" className="admission-primary-btn">
                    {pageContent.stepOne.continue}
                    <ArrowRight size={18} />
                  </button>
                </form>
              </>
            )}

            {step === 2 && (
              <>
                <div className="admission-form-head">
                  <span className="admission-icon-shell">
                    <ClipboardList size={28} />
                  </span>
                  <h1>{pageContent.stepTwo.title}</h1>
                  <p>{pageContent.stepTwo.text}</p>
                </div>

                <form className="admission-form-card admission-form-card-large" onSubmit={handleStepTwoSubmit}>
                  <div className="admission-phone-preview">
                    <div className="admission-phone-preview-icon">
                      <Phone size={18} />
                    </div>
                    <div>
                      <span>{pageContent.stepTwo.primaryPhone}</span>
                      <strong>{formatUzPhoneFull(formData.phone)}</strong>
                    </div>
                    <button type="button" className="admission-edit-btn" onClick={() => setStep(1)}>
                      {pageContent.stepTwo.edit}
                    </button>
                  </div>

                  <div className="admission-grid">
                    <div className={`admission-field ${errors.name ? 'admission-field-error' : ''}`}>
                      <label htmlFor="admission-name">Ism</label>
                      <div className="admission-input-wrap">
                        <input
                          id="admission-name"
                          type="text"
                          placeholder="Ismingiz"
                          value={formData.name}
                          onChange={(event) => handleChange('name', event.target.value)}
                        />
                      </div>
                      <span className="admission-error-text">{errors.name || ''}</span>
                    </div>

                    <div className={`admission-field ${errors.surname ? 'admission-field-error' : ''}`}>
                      <label htmlFor="admission-surname">Familiya</label>
                      <div className="admission-input-wrap">
                        <input
                          id="admission-surname"
                          type="text"
                          placeholder="Familiyangiz"
                          value={formData.surname}
                          onChange={(event) => handleChange('surname', event.target.value)}
                        />
                      </div>
                      <span className="admission-error-text">{errors.surname || ''}</span>
                    </div>

                    <div className={`admission-field admission-field-full ${errors.extraPhone ? 'admission-field-error' : ''}`}>
                      <label htmlFor="admission-extra-phone">Qo‘shimcha telefon raqam</label>
                      <div className="admission-input-wrap admission-phone-wrap">
                        <span className="admission-phone-prefix">+998</span>
                        <span className="admission-phone-divider" aria-hidden="true" />
                        <input
                          id="admission-extra-phone"
                          type="tel"
                          inputMode="numeric"
                          placeholder="90-123-45-67"
                          value={formData.extraPhone}
                          onChange={(event) => handleChange('extraPhone', event.target.value)}
                        />
                      </div>
                      <span className="admission-error-text">{errors.extraPhone || ''}</span>
                    </div>
                  </div>

                  <div className="admission-education-block">
                    <div className="admission-education-head">
                      <h3>{pageContent.stepTwo.educationTitle}</h3>
                      <p>{pageContent.stepTwo.educationText}</p>
                    </div>

                    <div className="admission-education-grid">
                      <div className={`admission-field ${errors.educationType ? 'admission-field-error' : ''}`}>
                      <label htmlFor="admission-education-type">Ta’lim turi</label>
                      <div className="admission-select-wrap">
                        <select
                          id="admission-education-type"
                          value={formData.educationType}
                          onChange={(event) => handleChange('educationType', event.target.value)}
                        >
                          <option value="">{pageContent.stepTwo.select}</option>
                          {pageContent.options.educationTypes.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={18} />
                      </div>
                      <span className="admission-error-text">{errors.educationType || ''}</span>
                    </div>

                      <div className={`admission-field ${errors.educationForm ? 'admission-field-error' : ''}`}>
                      <label htmlFor="admission-education-form">Ta’lim shakli</label>
                      <div className="admission-select-wrap">
                        <select
                          id="admission-education-form"
                          value={formData.educationForm}
                          onChange={(event) => handleChange('educationForm', event.target.value)}
                        >
                          <option value="">{pageContent.stepTwo.select}</option>
                          {pageContent.options.educationForms.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={18} />
                      </div>
                      <span className="admission-error-text">{errors.educationForm || ''}</span>
                    </div>

                      <div className={`admission-field ${errors.educationLanguage ? 'admission-field-error' : ''}`}>
                      <label htmlFor="admission-education-language">Ta’lim tili</label>
                      <div className="admission-select-wrap">
                        <select
                          id="admission-education-language"
                          value={formData.educationLanguage}
                          onChange={(event) => handleChange('educationLanguage', event.target.value)}
                        >
                          <option value="">{pageContent.stepTwo.select}</option>
                          {pageContent.options.educationLanguages.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={18} />
                      </div>
                      <span className="admission-error-text">{errors.educationLanguage || ''}</span>
                    </div>

                      <div className={`admission-field admission-field-full ${errors.direction ? 'admission-field-error' : ''}`}>
                      <label htmlFor="admission-direction">Ta’lim yo‘nalishi</label>
                      <div className="admission-select-wrap">
                        <select
                          id="admission-direction"
                          value={formData.direction}
                          onChange={(event) => handleChange('direction', event.target.value)}
                        >
                          <option value="">{pageContent.stepTwo.selectDirection}</option>
                          {pageContent.options.directions.map((item) => (
                            <option key={item} value={item}>
                              {item}
                            </option>
                          ))}
                        </select>
                        <ChevronDown size={18} />
                      </div>
                      <span className="admission-error-text">{errors.direction || ''}</span>
                    </div>
                  </div>
                  </div>

                  {apiError ? <span className="admission-error-text">{apiError}</span> : null}

                  <div className="admission-actions">
                    <button type="button" className="admission-secondary-btn" onClick={() => setStep(1)}>
                      <ArrowLeft size={18} />
                      {pageContent.stepTwo.back}
                    </button>
                    <button type="submit" className="admission-primary-btn" disabled={isSubmitting}>
                      {isSubmitting ? pageContent.stepTwo.submitting : pageContent.stepTwo.submit}
                      <ArrowRight size={18} />
                    </button>
                  </div>
                </form>
              </>
            )}

            {step === 3 && (
              <>
                <div className="admission-form-head">
                  <span className="admission-icon-shell admission-icon-shell-success">
                    <BadgeCheck size={28} />
                  </span>
                  <h1>{pageContent.stepThree.title}</h1>
                  <p>{pageContent.stepThree.text}</p>
                </div>

                <div className="admission-form-card admission-form-card-large">
                  <div className="admission-summary-list">
                    {summaryRows.map((item) => (
                      <div key={item.label} className="admission-summary-row">
                        <span className="admission-summary-icon">
                          {item.label === 'F.I.Sh' ? <UserRound size={17} /> : <Phone size={17} />}
                        </span>
                        <div className="admission-summary-copy">
                          <small>{item.label}</small>
                          <strong>{item.value}</strong>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="admission-status-card">
                    <span className="admission-status-badge">
                      <CheckCheck size={18} />
                    </span>
                    <div>
                      <strong>{pageContent.stepThree.statusTitle}</strong>
                      <p>{pageContent.stepThree.statusText}</p>
                    </div>
                  </div>

                  <a href="/" className="admission-finish-btn">
                    {pageContent.stepThree.finish}
                  </a>
                </div>
              </>
            )}
          </div>
        </main>
      </div>
    </section>
  )
}

export default AdmissionPage
