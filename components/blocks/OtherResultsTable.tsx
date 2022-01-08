import React from 'react'
import { Room } from '../../types/Room.type'
import { ruleDisplayNames, ruleNames } from '../../types/rules'
import { RankResults } from '../../types/RankResults.type'
import Accordion from '../atoms/Accordion'
import TextCell from '../atoms/textCell'
import ResultTable from './ResultTable'
import Spacer from '../atoms/spacer'

type Props = {
  otherResults: RankResults[][] | undefined | null
  roomData: Room
}

const OtherResultsTable: React.FC<Props> = (props) => {
  if (!props.otherResults) { return (<div />) }

  return (
    <Accordion title="もし〇〇だったら" >
      {props.otherResults.map((result, index) => (
        <React.Fragment key={index}>
          {result &&
            <React.Fragment>
              <TextCell>
                もし{Object.values(ruleDisplayNames)[index]}だったら
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