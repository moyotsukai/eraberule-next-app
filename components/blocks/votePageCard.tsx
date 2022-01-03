import React from 'react'
import Card from '../atoms/card'
import TextCell from '../atoms/textCell'
import SupportingTextCell from '../atoms/supportingTextCell'
import Spacer from '../atoms/spacer'
import { ruleDisplayNames } from '../../types/rules'
import { useRecoilValue } from 'recoil'
import { roomDataState } from '../../recoil/atom'
import { ruleNames } from '../../types/rules'
import SingleSelectionTable from '../blocks/singleSelectionTable'
import RankSelectionTable from './rankSelectionTable'
import MjSelectionTable from './mjSelectionTable'

type Props = {
  isEnabled: boolean
}

const VotePageCard: React.FC<Props> = (props) => {
  //STATE
  const roomData = useRecoilValue(roomDataState)

  //COMPONENTS
  const Table = () => {
    switch (roomData.rule) {
      case ruleNames.majorityRule:
        return <SingleSelectionTable isEnabled={props.isEnabled} />
      case ruleNames.bordaRule:
      case ruleNames.condorcetRule:
        return <RankSelectionTable isEnabled={props.isEnabled} />
      case ruleNames.majorityJusgement:
        return <MjSelectionTable isEnabled={props.isEnabled} />
    }
  }

  //RETURN
  return (
    <Card>
      <SupportingTextCell shouldAlignLeft={true}>
        タイトル
      </SupportingTextCell>
      <TextCell>
        {roomData.title}
      </TextCell>
      <Spacer y="15px" />

      {roomData.explanation !== "" &&
        <React.Fragment>
          <SupportingTextCell shouldAlignLeft={true}>
            説明
          </SupportingTextCell>
          <TextCell>
            {roomData.explanation}
          </TextCell>
          <Spacer y="15px" />
        </React.Fragment>
      }

      <SupportingTextCell shouldAlignLeft={true}>
        候補
      </SupportingTextCell>

      <Table />
      <Spacer y="15px" />

      <SupportingTextCell shouldAlignLeft={true}>
        この投票は{ruleDisplayNames[roomData.rule]}で集計されます。
      </SupportingTextCell>
    </Card>
  )
}

export default VotePageCard