import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { Room } from '../../types/Room.type'
import { ruleNames } from '../../types/rules'
import { RankResults } from '../../types/RankResults.type'
import { majorityJudgement } from '../../rules/majorityJudgement'
import SupportingTextCell from '../ui/SupportingTextCell'
import { mjDetails } from '../../rules/mjDetails'
import { dividerColor, primaryColor } from '../../styles/colors'
import { useLocale } from '../../locales/useLocale'

type Props = {
  roomData: Room,
  personalRanks: number[][]
}

const MjDetails: React.FC<Props> = (props) => {
  const [resultRanks, setResultRanks] = useState<RankResults[] | undefined>(undefined)
  const [mjDetailData, setMjDetailData] = useState<number[][] | undefined>(undefined)
  const { t, locale } = useLocale()
  const localizedString = t.functional.mjDetails

  //Set resultRanks, mjDetails
  useEffect(() => {
    if (props.roomData.rule === ruleNames.majorityJudgement) {
      const mjResult = majorityJudgement(props.roomData, props.personalRanks, locale)
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
      <div css={containerStyle}>
        <table css={tableStyle}>
          {mjDetailData.map((evaluations, optionIndex) => (
            <tr key={optionIndex} css={() => rowStyle(optionIndex % 2 !== 0)}>
              <td css={tableDataStyle}>
                <SupportingTextCell textAlign="left">
                  {props.roomData.options[optionIndex]}
                </SupportingTextCell>
                <ul css={listStyle}>
                  {evaluations.map((num, evaluationIndex) => (
                    <li
                      key={evaluationIndex}
                      css={() => cellStyle(resultRanks[0].find((option) => option.name === props.roomData.options[optionIndex]).score === props.roomData.commonLanguage[evaluationIndex])}
                    >
                      <span css={evaluationStyle}>
                        {props.roomData.commonLanguage[evaluationIndex]}
                      </span>
                      <span css={scoreStyle}>
                        {num + localizedString.numOfVotes}
                      </span>
                    </li>
                  ))}
                </ul>
              </td>
            </tr>
          ))}
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