import { RankResults } from '../types/RankResults.type'
import { rankingFormatted } from '../utils/rankingFormatted'
import { RuleDataAsset } from '../types/RuleDataAsset';

export const majorityJudgement = (props: RuleDataAsset): RankResults[] => {
  const { roomData, personalRanks, language } = props

  //Setup
  let results = roomData.options.map((option) => (
    {
      name: option,
      score: 0,
      rank: 0
    }
  ))

  //Evaluate
  const tieBreakingEvaluations = []
  for (let i = 0; i < roomData.options.length; i++) {
    const evaluations = personalRanks.map((personalRank) => (
      personalRank[i]
    ))
    //Smaller the better
    evaluations.sort((a, b) => (
      a - b
    ))
    //Considering lower median
    const medianEvaluation = evaluations[Math.floor(evaluations.length / 2)]
    results[i].score = medianEvaluation
    const atLeastMedianEvaluations = evaluations.filter((evaluation) => (
      evaluation <= medianEvaluation
    ))
    tieBreakingEvaluations.push(atLeastMedianEvaluations.length)
  }

  //Tie break
  for (let j = 0; j < results.length; j++) {
    if (j === 0) { continue }
    for (let i = 0; i < j; i++) {
      if (results[i].score > results[j].score) {
        results = swapAt(results, i, j)
      } else if (results[i].score === results[j].score) {
        if (tieBreakingEvaluations[i] < tieBreakingEvaluations[j]) {
          results = swapAt(results, i, j)
        } else if (tieBreakingEvaluations[i] === tieBreakingEvaluations[j]) {
          results[i].rank = -results[i].score
          results[j].rank = -results[i].score
        }
      }
    }
  }

  const tieBreakedResults = results.map((result) => (
    {
      name: result.name,
      score: result.score,
      rank: 0
    }
  ))

  for (let i = 0; i < results.length; i++) {
    if (i === 0) {
      tieBreakedResults[i].rank = 1
      continue
    }
    if (results[i].rank === -results[i].score && results[i - 1].rank == -results[i].score) {
      tieBreakedResults[i].rank = tieBreakedResults[i - 1].rank
    } else {
      tieBreakedResults[i].rank = tieBreakedResults[i - 1].rank + 1
    }
  }

  //To string
  const TieBreakedResultsString = tieBreakedResults.map((result) => {
    const score = evaluationVocabulary(result, roomData)

    return {
      name: result.name,
      score: score,
      rank: rankingFormatted({
        rank: result.rank,
        language: language
      })
    }
  })

  return [TieBreakedResultsString]
}

const swapAt = (array, i, j) => {
  const newArray = [...array];
  [newArray[i], newArray[j]] = [newArray[j], newArray[i]]
  return newArray
}

const evaluationVocabulary = (result, roomData) => {
  if (roomData.commonLanguage) {
    return roomData.commonLanguage[result.score - 1]
  } else {
    return ""
  }
}
