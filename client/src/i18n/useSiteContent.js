import { useTranslation } from 'react-i18next'
import { getLanguageContent, LANGUAGE_META } from './content'

export function useSiteContent() {
  const { i18n } = useTranslation()
  const content = getLanguageContent(i18n.language)

  return {
    language: i18n.language,
    locale: LANGUAGE_META[i18n.language]?.locale ?? 'uz-UZ',
    content,
  }
}

