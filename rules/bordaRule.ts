import { RankResults } from '../types/RankResults.type'
import { RULE_NAMES } from './ruleNames'
import { rankingFormatted } from '../utils/rankingFormatted'
import { scoreLabelString } from '../utils/scoreLabelString'
import { RuleDataAsset } from '../types/RuleDataAsset'

export const bordaRule = (props: RuleDataAsset): RankResults[] => {
  const { roomData, personalRanks, language } = props

  //Setup
  const results = roomData.options.map((option) => (
    {
      name: option,
      score: 0,
      rank: 0
    }
  ))

  //Score
  for (let i = 0; i < personalRanks.length; i++) {
    const personalRank = personalRanks[i]
    for (let j = 0; j < personalRank.length; j++) {
      const score = personalRank.length - personalRank[j] + 1
      results[j].score += score
    }
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

  //To string
  const resultsString: RankResults = results.map((result) => (
    {
      name: result.name,
      score: result.score.toString() + scoreLabelString({
        ruleName: RULE_NAMES.BORDA_COUNT_METHOD,
        language: language
      }),
      rank: rankingFormatted({
        rank: result.rank,
        language: language
      })
    }
  ))

  return [resultsString]
}