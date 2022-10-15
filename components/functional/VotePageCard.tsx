import React from 'react'
import Card from '../ui/Card'
import TextCell from '../ui/TextCell'
import SupportingTextCell from '../ui/SupportingTextCell'
import Spacer from '../ui/Spacer'
import { useRecoilValue } from 'recoil'
import { roomDataState } from '../../states/atoms'
import { RuleKeyName, RULE_NAMES } from '../../rules/ruleNames'
import SingleSelectionTable from './SingleSelectionTable'
import RankSelectionTable from './RankSelectionTable'
import MjSelectionTable from './MjSelectionTable'
import { useLocale } from '../../i18n/useLocale'
import { T_VOTE } from '../../locales/votePage'
import { T_RULES } from '../../locales/rules'
import { ruleKeyNameFromRuleName } from '../../model/firestore/dataConverter'

type Props = {
  isEnabled: boolean
}

const VotePageCard: React.FC<Props> = (props) => {
  const roomData = useRecoilValue(roomDataState)
  const ruleKeyName: RuleKeyName = ruleKeyNameFromRuleName(roomData.rule)
  const t = useLocale(T_VOTE)
  const t_RULES = useLocale(T_RULES)

  //UI
  const Table = () => {
    switch (roomData.rule) {
      case RULE_NAMES.MAJORITY_RULE:
        return <SingleSelectionTable isEnabled={props.isEnabled} />
      case RULE_NAMES.BORDA_COUNT_METHOD:
      case RULE_NAMES.CONDORCET_METHOD:
        return <RankSelectionTable isEnabled={props.isEnabled} />
      case RULE_NAMES.MAJORITY_JUDGEMENT:
        return <MjSelectionTable isEnabled={props.isEnabled} />
    }
  }

  return (
    <Card>
      <SupportingTextCell textAlign="left">
        {t.TITLE}
      </SupportingTextCell>
      <TextCell>
        {roomData.title}
      </TextCell>
      <Spacer y="15px" />

      {roomData.explanation !== "" &&
        <React.Fragment>
          <SupportingTextCell textAlign="left">
            {t.EXPLANATION}
          </SupportingTextCell>
          <TextCell>
            {roomData.explanation}
          </TextCell>
          <Spacer y="15px" />
        </React.Fragment>
      }

      <SupportingTextCell textAlign="left">
        {t.OPTIONS}
      </SupportingTextCell>

      <Table />
      <Spacer y="15px" />

      <SupportingTextCell textAlign="left">
        {t.RULE_EXPLANATION_1 + t_RULES.$RULE_DISPLAY_NAME(ruleKeyName) + t.RULE_EXPLANATION_2}
      </SupportingTextCell>
    </Card>
  )
}

export default VotePageCard