import React from 'react'
import { css } from '@emotion/react'
import { Room } from '../../types/Room.type'
import SupportingTextCell from '../ui/SupportingTextCell'
import Spacer from '../ui/Spacer'
import { RankResults } from '../../types/RankResults.type'

type Props = {
  resultRanks: RankResults[] | undefined
  roomData: Room
}

const RelativeEvaluationReultTable: React.FC<Props> = (props) => {
  if (props.resultRanks.length === 1) {
    return (
      <ul css={tableStyle}>
        {props.resultRanks[0].map((result, index) => (
          <li key={index} css={cellStyle}>
            <span css={rankStyle}>{result.rank}</span>
            <span css={nameStyle}>{result.name}</span>
            <span css={scoreStyle}>{result.score}</span>
          </li>
        ))}
      </ul>
    )
  }

  if (props.resultRanks.length >= 2) {
    return (
      <div>
        {props.resultRanks.map((results, index) => (
          <React.Fragment key={index} >
            <SupportingTextCell shouldAlignLeft={true}>
              {index + 1}つ目の可能性
            </SupportingTextCell>
            <ul css={tableStyle}>
              {results.map((result, index) => (
                <li key={index} css={cellStyle}>
                  <span css={rankStyle}>{result.rank}</span>
                  <span css={nameStyle}>{result.name}</span>
                  <span css={scoreStyle}>{result.score}</span>
                </li>
              ))}
            </ul>
            {index !== props.resultRanks.length - 1 &&
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

export default RelativeEvaluationReultTable