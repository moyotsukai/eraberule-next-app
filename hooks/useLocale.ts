import { useRouter } from 'next/router'
import en from '../locales/en'
import ja from '../locales/ja'
import { Locale } from '../types/Locale.type'

const locales = {
  ja: ja,
  en: en
}

export const useLocale = () => {
  const { locale } = useRouter()
  const t: Locale = locales[locale]

  return { locale, t }
}