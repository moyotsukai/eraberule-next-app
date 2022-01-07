import { Room } from '../types/Room.type'

export const mjDetail = (roomData: Room, personalRanks: number[][]): number[][] => {
  //Array which has all evaluations in each candidate
  const allEvaluationsInEachOption = roomData.options.map((_, index) => {
    const allEvaluations = personalRanks.map((personalRank) => (personalRank[index]))
    return allEvaluations
  })

  //Array which has numbers of each evaluation in all candidates
  const numsOfEachEvaluationInAllOptions = allEvaluationsInEachOption.map((evaluations) => {
    const numOfEachEvaluation = roomData.commonLanguage.map((_, index) => {
      const filteredEvaluation = evaluations.filter((evaluation) => (evaluation === index + 1))
      return filteredEvaluation.length
    })
    return numOfEachEvaluation
  })

  return numsOfEachEvaluationInAllOptions
}