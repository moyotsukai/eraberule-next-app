import { RankResults } from '../types/RankResults.type'
import { Room } from '../types/Room.type'

export const majorityRule = (roomData: Room, personalRanks: number[][]): RankResults[] => {
  //Setup
  const results = roomData.options.map((option) => (
    {
      name: option,
      score: 0,
      obtained: 0,
      rank: 0
    }
  ))

  //Score
  for (let i = 0; i < personalRanks.length; i++) {
    const personalRank = personalRanks[i]
    const indexOfTop = personalRank.findIndex((item) => item === 1)
    results[indexOfTop].score += 1
  }

  //Rank
  results.sort((a, b) => (
    b.score - a.score
  ))
  for (let i = 0; i < results.length; i++) {
    results[i].rank = i + 1
  }

  //Tie break
  for (let i = 0; i < results.length; i++) {
    if (i === results.length - 1) { break }
    if (results[i].score === results[i + 1].score) {
      results[i + 1].rank = results[i].rank
    }
  }

  //Percentage of votes obtained
  for (let i = 0; i < results.length; i++) {
    const result = results[i]
    result.obtained = Math.round(result.score / personalRanks.length * 100)
  }

  //To string
  const resultsString: RankResults = results.map((result) => (
    {
      name: result.name,
      score: `${result.score.toString()}票(${result.obtained}%)`,
      rank: `${result.rank.toString()}位`
    }
  ))

  return [resultsString]
}