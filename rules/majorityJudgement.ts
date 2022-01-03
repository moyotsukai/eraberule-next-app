import { RankResults } from '../types/RankResults.type'
import { Room } from '../types/Room.type'

export const majorityJudgement = (roomData: Room, personalRanks: number[][]): RankResults[] => {
  //Setup
  const results = roomData.options.map((option) => (
    {
      name: option,
      score: 0,
      rank: 0
    }
  ))

  //Score


  //Rank


  //Tie break


  //To string
  const resultsString = results.map((result) => (
    {
      name: result.name,
      score: result.score.toString() + "票",
      rank: result.rank.toString() + "位"
    }
  ))

  return [resultsString]
}