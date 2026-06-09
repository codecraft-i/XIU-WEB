import en from './locales/en.json'
import ru from './locales/ru.json'
import uz from './locales/uz.json'

export const DEFAULT_LANGUAGE = 'uz'

export const SUPPORTED_LANGUAGES = ['uz', 'ru', 'en']

export const LANGUAGE_META = {
  uz: { label: "O'zbek", shortLabel: 'UZ', flag: 'https://flagcdn.com/w40/uz.png', locale: 'uz' },
  ru: { label: 'Русский', shortLabel: 'RU', flag: 'https://flagcdn.com/w40/ru.png', locale: 'ru' },
  en: { label: 'English', shortLabel: 'EN', flag: 'https://flagcdn.com/w40/gb.png', locale: 'en' },
}

export const siteContent = {
  uz,
  ru,
  en,
}

export const getLanguageContent = (language) =>
  siteContent[SUPPORTED_LANGUAGES.includes(language) ? language : DEFAULT_LANGUAGE]

