import React from 'react'
import Card from '../ui/Card'
import TextCell from '../ui/TextCell'
import SupportingTextCell from '../ui/SupportingTextCell'
import Spacer from '../ui/Spacer'
import { ruleDisplayNames } from '../../types/rules'
import { useRecoilValue } from 'recoil'
import { roomDataState } from '../../states/atoms'
import { ruleNames } from '../../types/rules'
import SingleSelectionTable from './SingleSelectionTable'
import RankSelectionTable from './RankSelectionTable'
import MjSelectionTable from './MjSelectionTable'

type Props = {
  isEnabled: boolean
}

const VotePageCard: React.FC<Props> = (props) => {
  const roomData = useRecoilValue(roomDataState)

  //UI
  const Table = () => {
    switch (roomData.rule) {
      case ruleNames.majorityRule:
        return <SingleSelectionTable isEnabled={props.isEnabled} />
      case ruleNames.bordaRule:
      case ruleNames.condorcetRule:
        return <RankSelectionTable isEnabled={props.isEnabled} />
      case ruleNames.majorityJudgement:
        return <MjSelectionTable isEnabled={props.isEnabled} />
    }
  }

  return (
    <Card>
      <SupportingTextCell textAlign="left">
        タイトル
      </SupportingTextCell>
      <TextCell>
        {roomData.title}
      </TextCell>
      <Spacer y="15px" />

      {roomData.explanation !== "" &&
        <React.Fragment>
          <SupportingTextCell textAlign="left">
            説明
          </SupportingTextCell>
          <TextCell>
            {roomData.explanation}
          </TextCell>
          <Spacer y="15px" />
        </React.Fragment>
      }

      <SupportingTextCell textAlign="left">
        候補
      </SupportingTextCell>

      <Table />
      <Spacer y="15px" />

      <SupportingTextCell textAlign="left">
        この投票は{ruleDisplayNames[roomData.rule]}で集計されます。
      </SupportingTextCell>
    </Card>
  )
}

export default VotePageCard