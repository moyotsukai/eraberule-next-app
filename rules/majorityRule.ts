import { RankResults } from '../types/RankResults.type'
import { Room } from '../types/Room.type'
import { ruleNames } from './ruleNames'
import { rankingFormatted } from '../utils/rankingFormatted'
import { scoreLabelString } from '../utils/scoreLabelString'

export const majorityRule = (roomData: Room, personalRanks: number[][], locale: string): RankResults[] => {
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
      score: `${result.score.toString()}${scoreLabelString(ruleNames.majorityRule, locale)}(${result.obtained}%)`,
      rank: rankingFormatted(result.rank, locale)
    }
  ))

  return [resultsString]
}