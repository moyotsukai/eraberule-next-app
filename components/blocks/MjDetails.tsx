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
import { primaryColor } from '../../styles/colors'

type Props = {
  roomData: Room,
  personalRanks: number[][]
}

const MjDetails: React.FC<Props> = (props) => {
  const [resultRanks, setResultRanks] = useState<RankResults[] | undefined>(undefined)
  const [mjDetailData, setMjDetailData] = useState<number[][] | undefined>(undefined)

  //Set resultRanks, mjDetails
  useEffect(() => {
    if (props.roomData.rule === ruleNames.majorityJudgement) {
      const mjResult = majorityJudgement(props.roomData, props.personalRanks)
      setResultRanks(mjResult)
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
        {mjDetailData.map((evaluations, optionIndex) => (
          <React.Fragment key={optionIndex}>
            <SupportingTextCell shouldAlignLeft={true}>
              {props.roomData.options[optionIndex]}
            </SupportingTextCell>
            <ul css={tableStyle}>
              {evaluations.map((num, evaluationIndex) => (
                <li
                  key={evaluationIndex}
                  css={() => cellStyle(resultRanks[0][optionIndex].score === props.roomData.commonLanguage[evaluationIndex])}
                >
                  <span css={evaluationStyle}>
                    {props.roomData.commonLanguage[evaluationIndex]}
                  </span>
                  <span css={scoreStyle}>
                    {num}票
                  </span>
                </li>
              ))}
            </ul>
            {optionIndex !== mjDetailData.length - 1 &&
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
const cellStyle = (isHighlighted: boolean) => css`
  color: ${isHighlighted ? primaryColor : "#000"};
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