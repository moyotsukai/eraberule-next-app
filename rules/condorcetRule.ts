import { RankResults } from '../types/RankResults.type'
import { Room } from '../types/Room.type'
import { rankingFormatted } from '../utils/rankingFormatted'

export const condorcetRule = (roomData: Room, personalRanks: number[][], locale: string): RankResults[] => {
  //Setup results
  const results = roomData.options.map((option, index) => (
    {
      arrayIndex: index,
      name: option,
      rank: 0
    }
  ))

  //Setup nArray
  const numOfOptions = roomData.options.length
  const nArrayLength = (2 * numOfOptions * (numOfOptions - 1)) / 2
  const nArray = Array(nArrayLength).fill(0)

  //Calculate nArray
  for (let f = 0; f < personalRanks.length; f++) {
    const personalRank = personalRanks[f]

    for (let i = 0; i < numOfOptions; i++) {
      for (let g = 0; g < numOfOptions; g++) {
        const j = g + i + 1
        if (j > numOfOptions - 1) { break }
        //Count votes
        if (personalRank[i] < personalRank[j]) {
          let nArrayIndexOfIJ = nArrayIndex(i, j, numOfOptions)
          nArray[nArrayIndexOfIJ] += 1
        } else {
          let nArrayIndexOfJI = nArrayIndex(j, i, numOfOptions)
          nArray[nArrayIndexOfJI] += 1
        }
      }
    }
  }

  //Calculate pArrayElements
  const pArrayElements = pArrayElementsCalculate(numOfOptions)

  //Setup pArray
  const pArrayLength = factorial(numOfOptions)
  const pArray = Array(pArrayLength).fill(0)

  //Calculate pArray
  for (let k = 0; k < pArrayLength; k++) {
    const pElement = pArrayElements[k]
    const nElements = []

    for (let i = 0; i < numOfOptions; i++) {
      for (let g = 0; g < numOfOptions; g++) {
        const j = g + i + 1
        if (j > numOfOptions - 1) { break }
        const nIndex = nArrayIndex(pElement[i], pElement[j], numOfOptions)
        nElements.push(nArray[nIndex])
      }
    }

    for (let i = 0; i < nElements.length; i++) {
      pArray[k] += nElements[i]
    }
  }

  //Find the biggests
  let maxIndexes = [0]
  for (let i = 0; i < pArray.length; i++) {
    if (i === pArray.length - 1) { break }
    const maxIndexFirst = maxIndexes[0]
    if (pArray[i + 1] > pArray[maxIndexFirst]) {
      maxIndexes = [i + 1]
    } else if (pArray[maxIndexFirst] === pArray[i + 1]) {
      maxIndexes.push(i + 1)
    }
  }
  const maxPElements = []
  for (let i = 0; i < maxIndexes.length; i++) {
    maxPElements.push(pArrayElements[maxIndexes[i]])
  }

  //Array results
  const arrayOfResults = []
  for (let k = 0; k < maxPElements.length; k++) {
    const maxPElement = maxPElements[k]
    for (let i = 0; i < numOfOptions; i++) {
      results[i].rank = maxPElement[i] + 1
    }
    //Sort
    results.sort((a, b) => (
      a.rank - b.rank
    ))
    //To string
    const resultsString = results.map((result) => (
      {
        arrayIndex: result.arrayIndex,
        name: result.name,
        score: "",
        rank: rankingFormatted(result.rank, locale)
      }
    ))
    arrayOfResults.push(resultsString)
  }

  //Remove duplication
  const newArrayOfResults = removeDuplication(arrayOfResults)

  //Format
  const formatedNewArrayOfResults: RankResults[] = newArrayOfResults.map((results) => (
    results.map((result) => (
      {
        name: result.name,
        score: result.score,
        rank: result.rank
      }
    ))
  ))

  return formatedNewArrayOfResults
}

const nArrayIndex = (i, j, numOfOptions): number => {
  if (i < j) {
    return (numOfOptions - 1) * i + j - 1;
  } else {
    return (numOfOptions - 1) * i + (j + 1) - 1;
  }
}

const pArrayElementsCalculate = (numOfOptions): number[][] => {
  const pArrayElements = []
  const originalPArrayLength = Math.pow(numOfOptions, numOfOptions)

  for (let i = 0; i < originalPArrayLength; i++) {
    //Setup element
    const element = Array(numOfOptions).fill(0)
    //TODO
    //Calculate elements including redundancy
    let num = Number(i.toString(numOfOptions))
    for (let j = 0; j < numOfOptions; j++) {
      element[numOfOptions - 1 - j] = num % 10
      num = Math.floor(num / 10)
    }
    //Find redundancy
    const nonRedundantElement = element.filter((x, index, self) => (
      self.indexOf(x) === index
    ))
    if (nonRedundantElement.length === numOfOptions) {
      pArrayElements.push(element)
    }
  }

  return pArrayElements
}

const factorial = (num): number => {
  if (num === 0) {
    return 1
  }
  return num * factorial(num - 1)
}

const removeDuplication = (arrayOfResults): RankResults[] => {
  const optionNames = arrayOfResults.map((results) => {
    let optionsName = ""
    for (let i = 0; i < results.length; i++) {
      const result = results[i]
      optionsName += result.name + result.arrayIndex;
    }
    return optionsName
  })

  const newArray = [arrayOfResults[0]]
  for (let i = 0; i < arrayOfResults.length; i++) {
    for (let j = 0; j < i; j++) {
      if (i === 0) { break }
      const resultsI = optionNames[i]
      const resultsJ = optionNames[j]
      if (resultsI === resultsJ) { break }
      if (j === i - 1) {
        newArray.push(arrayOfResults[i])
      }
    }
  }

  return newArray
}
