export const rankingFormatted = (rank: number, locale: string) => {
  if (locale == "ja") {
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