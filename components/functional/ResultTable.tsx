import React from 'react'
import { Room } from '../../types/Room.type'
import { RankResults } from '../../types/RankResults.type'
import RelativeEvaluationReultTable from './RelativeEvaluationResultTable'
import MjResultTable from './MjResultTable'
import { RULE_NAMES } from '../../rules/ruleNames'

type Props = {
  resultRanks: RankResults[] | undefined
  roomData: Room
}

const ResultTable: React.FC<Props> = (props) => {
  const { resultRanks, roomData } = props
  if (!resultRanks) {
    return (
      <div />
    )
  }

  if (roomData.rule === RULE_NAMES.MAJORITY_JUDGEMENT) {
    return (
      <MjResultTable resultRanks={resultRanks} />
    )
  } else {
    return (
      <RelativeEvaluationReultTable
        resultRanks={resultRanks}
        roomData={roomData}
      />
    )
  }
}

export default ResultTable