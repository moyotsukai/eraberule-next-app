import { asLocaleTable } from '../i18n/i18n'

const T_COMMON = asLocaleTable({
  LOADING: {
    ja: "読み込み中...",
    en: "Loading..."
  },
  NOT_CONNECTED: {
    ja: "データベースに接続できません",
    en: "Not connected to the database"
  }
  // $GREET: {
  //   ja: (name) => `こんにちは、${name}`,
  //   en: (name) => `Hello, ${name}`
  // }
})

export default T_COMMON