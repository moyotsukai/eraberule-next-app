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

type Props = {
  roomData: Room,
  personalRanks: number[][]
}

const RankResultTable: React.FC<Props> = (props) => {
  const [resultRanks, setResultRanks] = useState<RankResults[] | undefined>(undefined)

  useEffect(() => {
    switch (props.roomData.rule) {
      case ruleNames.majorityRule:
        const mResult = majorityRule(props.roomData, props.personalRanks)
        setResultRanks(mResult)
        break
      case ruleNames.bordaRule:
        const bResult = bordaRule(props.roomData, props.personalRanks)
        setResultRanks(bResult)
        break
      case ruleNames.condorcetRule:
        const cResult = condorcetRule(props.roomData, props.personalRanks)
        setResultRanks(cResult)
        break
      case ruleNames.majorityJusgement:
        const mjResult = majorityJudgement(props.roomData, props.personalRanks)
        setResultRanks(mjResult)
        break
    }
  }, [props.personalRanks])

  //UI
  if (resultRanks === undefined) {
    return (
      <div />
    )
  }

  if (resultRanks.length === 1) {
    return (
      <ul css={tableStyle}>
        {resultRanks[0].map((result, index) => (
          <li key={index} css={cellStyle}>
            <span css={rankStyle}>{result.rank}</span>
            <span css={nameStyle}>{result.name}</span>
            <span css={scoreStyle}>{result.score}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (resultRanks.length >= 2) {
    return (
      <div>
        {resultRanks.map((results, index) => (
          <React.Fragment>
            <SupportingTextCell shouldAlignLeft={true}>
              {index + 1}つ目の可能性
            </SupportingTextCell>
            <ul key={index} css={tableStyle}>
              {results.map((result, index) => (
                <li key={index} css={cellStyle}>
                  <span css={rankStyle}>{result.rank}</span>
                  <span css={nameStyle}>{result.name}</span>
                  <span css={scoreStyle}>{result.score}</span>
                </li>
              ))}
            </ul>
            {index !== resultRanks.length - 1 &&
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
const rankStyle = css`
  width: 50px;
  text-align: center;
`
const nameStyle = css`
  min-width: 200px;
  text-align: left;
`
const scoreStyle = css`
  min-width: 60px;
  text-align: right;
`

export default RankResultTable