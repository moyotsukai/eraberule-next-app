import React from 'react'
import { css } from '@emotion/react'
import Spacer from '../atoms/spacer'
import { RankResults } from '../../types/RankResults.type'

type Props = {
  resultRanks: RankResults[] | undefined
}

const MjResultTable: React.FC<Props> = (props) => {
  return (
    <ul css={tableStyle}>
      {props.resultRanks[0].map((result, index) => (
        <React.Fragment key={index}>
          <li css={mjCellStyle}>
            <span css={rankStyle}>{result.rank}</span>
            <span css={mjBlockStyle}>
              <p>{result.name}</p>
              <p>{result.score}</p>
            </span>
          </li>
          {index !== props.resultRanks[0].length - 1 &&
            <Spacer y="10px" />
          }
        </React.Fragment>
      ))}
    </ul>
  )
}

const tableStyle = css`
  padding: 0 6px;
`
const rankStyle = css`
  width: 50px;
  text-align: center;
`
const mjCellStyle = css`
  display: flex;
  justify-content: space-between;
  align-items: center;
`
const mjBlockStyle = css`
  min-width: 260px;
  text-align: left;
`

export default MjResultTable