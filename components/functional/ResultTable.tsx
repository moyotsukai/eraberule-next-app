import React from 'react'
import { Room } from '../../types/Room.type'
import { ruleNames } from '../../rules/ruleNames'
import { RankResults } from '../../types/RankResults.type'
import RelativeEvaluationReultTable from './RelativeEvaluationResultTable'
import MjResultTable from './MjResultTable'

type Props = {
  resultRanks: RankResults[] | undefined
  roomData: Room
}

const ResultTable: React.FC<Props> = (props) => {
  if (!props.resultRanks) {
    return (
      <div />
    )
  }

  if (props.roomData.rule === ruleNames.majorityJudgement) {
    return (
      <MjResultTable resultRanks={props.resultRanks} />
    )
  } else {
    return (
      <RelativeEvaluationReultTable
        resultRanks={props.resultRanks}
        roomData={props.roomData}
      />
    )
  }
}

export default ResultTable