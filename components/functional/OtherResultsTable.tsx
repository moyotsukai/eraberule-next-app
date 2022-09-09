import React from 'react'
import { Room } from '../../types/Room.type'
import { RankResults } from '../../types/RankResults.type'
import Accordion from '../ui/Accordion'
import TextCell from '../ui/TextCell'
import ResultTable from './ResultTable'
import Spacer from '../ui/Spacer'
import { useLocale } from '../../i18n/useLocale'

type Props = {
  otherResults: RankResults[][] | undefined | null
  roomData: Room
}

const OtherResultsTable: React.FC<Props> = (props) => {
  const { t } = useLocale()
  const localizedString = t.functional.otherResultTable

  if (!props.otherResults) { return (<div />) }

  return (
    <Accordion title={localizedString.whatIfAnalysis} >
      {props.otherResults.map((result, index) => (
        <React.Fragment key={index}>
          {result &&
            <React.Fragment>
              <TextCell>
                {localizedString.if + Object.values(t.ruleDisplayNames)[index] + localizedString.what}
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