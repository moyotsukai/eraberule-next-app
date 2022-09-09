import React from 'react'
import Card from '../ui/Card'
import TextCell from '../ui/TextCell'
import SupportingTextCell from '../ui/SupportingTextCell'
import Spacer from '../ui/Spacer'
import { useRecoilValue } from 'recoil'
import { roomDataState } from '../../states/atoms'
import { ruleNames } from '../../types/rules'
import SingleSelectionTable from './SingleSelectionTable'
import RankSelectionTable from './RankSelectionTable'
import MjSelectionTable from './MjSelectionTable'
import { useLocale } from '../../i18n/useLocale'

type Props = {
  isEnabled: boolean
}

const VotePageCard: React.FC<Props> = (props) => {
  const roomData = useRecoilValue(roomDataState)
  const { t } = useLocale()
  const localizedString = t.functional.votePageCard

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
        {localizedString.title}
      </SupportingTextCell>
      <TextCell>
        {roomData.title}
      </TextCell>
      <Spacer y="15px" />

      {roomData.explanation !== "" &&
        <React.Fragment>
          <SupportingTextCell textAlign="left">
            {localizedString.explanation}
          </SupportingTextCell>
          <TextCell>
            {roomData.explanation}
          </TextCell>
          <Spacer y="15px" />
        </React.Fragment>
      }

      <SupportingTextCell textAlign="left">
        {localizedString.options}
      </SupportingTextCell>

      <Table />
      <Spacer y="15px" />

      <SupportingTextCell textAlign="left">
        {localizedString.ruleExplanationF + t.ruleDisplayNames[roomData.rule] + localizedString.ruleExplanationB}
      </SupportingTextCell>
    </Card>
  )
}

export default VotePageCard