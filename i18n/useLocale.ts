import { useRouter } from 'next/router'
import { I18n, Language, DEFAULT_LANGUAGE, isLanguage, LocaleTable } from './i18n'

export const useLocale = <T>(localeTable: LocaleTable<T>) => {
  const { locale } = useRouter()
  const language: Language = isLanguage(locale) ? locale as Language : DEFAULT_LANGUAGE
  const i18n = new I18n(localeTable, { language: language })
  const t = i18n.t

  return t
}
