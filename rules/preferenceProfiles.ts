import { Room } from '../types/Room.type'

interface PreferenceProfile {
  rankOrdering: number[],
  obtained: number
}

export const preferenceProfiles = (roomData: Room, personalRanks: number[][]): PreferenceProfile[] => {
  const numOfOptions = roomData.options.length

  //Setup preference profiles with obtained number of voters as zero
  const profiles: PreferenceProfile[] = allRankOrderings(numOfOptions).map((rankOrdering) => (
    {
      rankOrdering: rankOrdering,
      obtained: 0
    }
  ))

  //Find the profile of which the rankOrdering is equal to the one given by personalRank
  for (let i = 0; i < personalRanks.length; i++) {
    const personalRank = personalRanks[i]
    const rankOrdering = personalRankToRankOrdering(personalRank)

    for (let j = 0; j < profiles.length; j++) {
      if (isEqualRankOrdering(rankOrdering, profiles[j].rankOrdering)) {
        profiles[j].obtained += 1
      }
    }
  }

  return profiles
}

const isEqualRankOrdering = (array1: any[], array2: any[]): boolean => {
  if (array1.length !== array2.length) { return false }
  for (let i = 0; i < array1.length; i++) {
    if (array1[i] !== array2[i]) {
      return false
    }
  }
  return true
}

const allRankOrderings = (num: number) => {
  const array = serialize(num).map((item) => (
    item += 1
  ))

  return permutation(array)
}

const serialize = (num: number): number[] => {
  return [...Array(num)].map((_, i) => i)
}

const permutation = (array: number[]): number[][] => {
  let result = []

  if (array.length === 1) {
    result.push(array)
    return result
  }

  for (let i = 0; i < array.length; i++) {
    const firstElem = array.slice(i, i + 1)
    const restElem = [
      ...array.slice(0, i),
      ...array.slice(i + 1),
    ]
    let innerPermutations = permutation(restElem)
    for (let j = 0; j < innerPermutations.length; j++) {
      result.push([...firstElem, ...innerPermutations[j]])
    }
  }

  return result
}

const personalRankToRankOrdering = (personalRank: number[]): number[] => {
  const rankWithIndex = personalRank.map((rank, index) => (
    {
      rank: rank,
      index: index
    }
  ))

  rankWithIndex.sort((a, b) => (
    a.rank - b.rank
  ))

  const indexArray = rankWithIndex.map((item) => (
    item.index
  ))

  const profileArray = indexArray.map((item) => (
    item += 1
  ))

  return profileArray
}