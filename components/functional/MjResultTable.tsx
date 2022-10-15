import React from 'react'
import { css } from '@emotion/react'
import { RankResults } from '../../types/RankResults.type'
import { dividerColor } from '../../styles/colors'

type Props = {
  resultRanks: RankResults[] | undefined
}

const MjResultTable: React.FC<Props> = (props) => {
  const { resultRanks } = props

  return (
    <div css={containerStyle}>
      <table css={tableStyle}>
        {resultRanks[0].map((result, index) => (
          <React.Fragment key={index}>
            <tr css={() => rowStyle(index % 2 !== 0)}>
              <th css={rankStyle}>{result.rank}</th>
              <td css={mjBlockStyle}>
                <p>{result.name}</p>
                <p>{result.score}</p>
              </td>
            </tr>
          </React.Fragment>
        ))}
      </table>
    </div>
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
const rankStyle = css`
  width: 50px;
  text-align: center;
  border: solid 1px ${dividerColor};
`
const mjBlockStyle = css`
  padding: 5px 0 5px 5px;
  min-width: 260px;
  text-align: left;
  border: solid 1px ${dividerColor};
`

export default MjResultTable