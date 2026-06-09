import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import {
  DEFAULT_LANGUAGE,
  siteContent,
  LANGUAGE_META,
  SUPPORTED_LANGUAGES,
} from './content'

const STORAGE_KEY = 'xiu-language'

const detectInitialLanguage = () => {
  if (typeof window === 'undefined') {
    return DEFAULT_LANGUAGE
  }

  const saved = window.localStorage.getItem(STORAGE_KEY)
  if (saved && SUPPORTED_LANGUAGES.includes(saved)) {
    return saved
  }

  return DEFAULT_LANGUAGE
}

i18n.use(initReactI18next).init({
  resources: SUPPORTED_LANGUAGES.reduce((acc, language) => {
    acc[language] = { translation: siteContent[language] }
    return acc
  }, {}),
  lng: detectInitialLanguage(),
  fallbackLng: DEFAULT_LANGUAGE,
  interpolation: {
    escapeValue: false,
  },
})

i18n.on('languageChanged', (language) => {
  if (typeof window === 'undefined') {
    return
  }

  window.localStorage.setItem(STORAGE_KEY, language)
  document.documentElement.lang = LANGUAGE_META[language]?.locale ?? language
})

if (typeof document !== 'undefined') {
  document.documentElement.lang = LANGUAGE_META[i18n.language]?.locale ?? i18n.language
}

export default i18n
