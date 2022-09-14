import { asLocaleTable } from '../i18n/i18n'

export const T_COMMON = asLocaleTable({
  LOADING: {
    ja: "読み込み中...",
    en: "Loading..."
  },
  NOT_CONNECTED: {
    ja: "データベースに接続できません",
    en: "Not connected to the database"
  },
  NO_RESULTS: {
    ja: "検索結果がありません。",
    en: "No results found"
  },
  CLOSED_ROOM: {
    ja: "このルームは非公開です。",
    en: "This poll is closed"
  }
})