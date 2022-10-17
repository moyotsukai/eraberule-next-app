import React from 'react'
import { Room } from '../../types/Room.type'
import { RankResults } from '../../types/RankResults.type'
import Accordion from '../ui/Accordion'
import TextCell from '../ui/TextCell'
import ResultTable from './ResultTable'
import Spacer from '../ui/Spacer'
import { useLocale } from '../../i18n/useLocale'
import { T_OTHER_RESULT_TABLE } from '../../locales/otherReusltTable'
import { T_RULES } from '../../locales/rules'
import { RuleKeyName, RULE_KEY_NAMES } from '../../rules/ruleNames'

type Props = {
  otherResults: Array<RankResults[] | null> | undefined | null
  roomData: Room
}

const OtherResultsTable: React.FC<Props> = (props) => {
  const { t } = useLocale(T_OTHER_RESULT_TABLE)
  const t_rules = useLocale(T_RULES).t
  const ruleDisplayNames = RULE_KEY_NAMES.map((RULE_KEY_NAME: RuleKeyName) => (
    t_rules.$RULE_DISPLAY_NAME(RULE_KEY_NAME)
  ))

  if (!props.otherResults) {
    return <div />
  }

  return (
    <Accordion title={t.WHAT_IF_ANALYSIS} >
      {props.otherResults.map((result, index) => (
        <React.Fragment key={index}>
          {result &&
            <React.Fragment>
              <TextCell>
                {t.IF + Object.values(ruleDisplayNames)[index] + t.WHAT}
              </TextCell>
              <ResultTable
                resultRanks={result}
                roomData={props.roomData}
              />
              {index !== props.otherResults.length - 1 &&
                <Spacer y="10px" />
              }
            </React.Fragment>
          }
        </React.Fragment>
      ))}
    </Accordion>
  )
}

export default OtherResultsTable