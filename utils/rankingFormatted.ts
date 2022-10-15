import { Language } from "../i18n/i18n"

type Props = {
  rank: number,
  language: Language
}

export const rankingFormatted = (props: Props) => {
  const { rank, language } = props

  if (language == "ja") {
    return rank + "位"

  } else {
    if (rank === 1) {
      return "1st"
    }
    if (rank === 2) {
      return "2nd"
    }
    if (rank === 3) {
      return "3rd"
    }
    return rank + "th"
  }
}