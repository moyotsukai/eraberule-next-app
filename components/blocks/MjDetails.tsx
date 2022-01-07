import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { Room } from '../../types/Room.type'
import { ruleNames } from '../../types/rules'
import { bordaRule } from '../../rules/bordaRule'
import { RankResults } from '../../types/RankResults.type'
import { majorityRule } from '../../rules/majorityRule'
import { condorcetRule } from '../../rules/condorcetRule'
import { majorityJudgement } from '../../rules/majorityJudgement'
import SupportingTextCell from '../../components/atoms/supportingTextCell'
import Spacer from '../atoms/spacer'
import { mjDetails } from '../../rules/mjDetails'

type Props = {
  roomData: Room,
  personalRanks: number[][]
}

const MjDetails: React.FC<Props> = (props) => {
  const [mjDetailData, setMjDetailData] = useState<number[][] | undefined>(undefined)

  //Set mjDetails
  useEffect(() => {
    if (props.roomData.rule === ruleNames.majorityJudgement) {
      const detail = mjDetails(props.roomData, props.personalRanks)
      setMjDetailData(detail)
    }
  }, [props.personalRanks])

  //UI
  if (mjDetailData === undefined) {
    return (
      <div />
    )
  }

  if (props.roomData.rule === ruleNames.majorityJudgement) {
    return (
      <div>
        {mjDetailData.map((evaluations, index) => (
          <React.Fragment key={index}>
            <SupportingTextCell shouldAlignLeft={true}>
              {props.roomData.options[index]}
            </SupportingTextCell>
            <ul css={tableStyle}>
              {evaluations.map((num, index) => (
                <li key={index} css={cellStyle}>
                  <span css={evaluationStyle}>{props.roomData.commonLanguage[index]}</span>
                  <span css={scoreStyle}>{num}票</span>
                </li>
              ))}
            </ul>
            {index !== mjDetailData.length - 1 &&
              <Spacer y="10px" />
            }
          </React.Fragment>
        ))}
      </div>
    )
  }

  return (
    <div />
  )
}

const tableStyle = css`
  padding: 0 6px;
`
const cellStyle = css`
  display: flex;
  justify-content: space-between;
`
const evaluationStyle = css`
  min-width: 200px;
  text-align: left;
`
const scoreStyle = css`
  min-width: 60px;
  text-align: right;
`

export default MjDetails