import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { Room } from '../../types/Room.type'
import { RankResults } from '../../types/RankResults.type'
import { majorityJudgement } from '../../rules/majorityJudgement'
import SupportingTextCell from '../ui/SupportingTextCell'
import { mjDetails } from '../../rules/mjDetails'
import { dividerColor, primaryColor } from '../../styles/colors'
import { useLocale } from '../../i18n/useLocale'
import { T_MJ_DETAILS } from '../../locales/mjDetails'
import { RuleDataAsset } from '../../types/RuleDataAsset'
import { RULE_NAMES } from '../../rules/ruleNames'

type Props = {
  roomData: Room,
  personalRanks: number[][]
}

const MjDetails: React.FC<Props> = (props) => {
  const { roomData, personalRanks } = props
  const [resultRanks, setResultRanks] = useState<RankResults[] | undefined>(undefined)
  const [mjDetailData, setMjDetailData] = useState<number[][] | undefined>(undefined)
  const { t, language } = useLocale(T_MJ_DETAILS)

  //Set resultRanks, mjDetails
  useEffect(() => {
    if (!personalRanks) { return }
    if (roomData.rule !== RULE_NAMES.MAJORITY_JUDGEMENT) { return }

    const ruleDataAsset: RuleDataAsset = {
      roomData: roomData,
      personalRanks: personalRanks,
      language: language
    }
    const mjResult = majorityJudgement(ruleDataAsset)
    setResultRanks(mjResult)
    const detail = mjDetails(roomData, personalRanks)
    setMjDetailData(detail)
  }, [personalRanks])

  const isGroupEvaluation = ({ optionIndex, evaluationIndex }): boolean => {
    return resultRanks[0].find((option) => option.name === roomData.options[optionIndex]).score === roomData.commonLanguage[evaluationIndex]
  }

  //UI
  if (mjDetailData === undefined) {
    return (
      <div />
    )
  }

  if (roomData.rule === RULE_NAMES.MAJORITY_JUDGEMENT) {
    return (
      <div css={containerStyle}>
        <table css={tableStyle}>
          <tbody>
            {mjDetailData.map((evaluations, optionIndex) => (
              <tr key={optionIndex} css={() => rowStyle(optionIndex % 2 !== 0)}>
                <td css={tableDataStyle}>
                  <SupportingTextCell textAlign="left">
                    {roomData.options[optionIndex]}
                  </SupportingTextCell>
                  <ul css={listStyle}>
                    {evaluations.map((num, evaluationIndex) => (
                      <li
                        key={evaluationIndex}
                        css={() => cellStyle(isGroupEvaluation({ optionIndex: optionIndex, evaluationIndex: evaluationIndex }))}
                      >
                        <span css={evaluationStyle}>
                          {props.roomData.commonLanguage[evaluationIndex]}
                        </span>
                        <span css={scoreStyle}>
                          {num + t.NUM_OF_VOTES}
                        </span>
                      </li>
                    ))}
                  </ul>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  return (
    <div />
  )
}

const containerStyle = css`
  padding: 5px 8px;
`
const tableStyle = css`
  width: 100%;
  border-collapse: collapse;
  font-size: 16px;
`
const rowStyle = (hasColor: boolean) => css`
  background-color: ${hasColor ? "#fafbff" : "transparent"};
`
const tableDataStyle = css`
  border: solid 1px ${dividerColor};
  padding-bottom: 5px;
`
const listStyle = css`
  padding: 0 5px;
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