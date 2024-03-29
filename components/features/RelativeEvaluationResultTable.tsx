import React from 'react'
import { css } from '@emotion/react'
import { Room } from '../../types/Room.type'
import SupportingTextCell from '../ui/SupportingTextCell'
import Spacer from '../ui/Spacer'
import { RankResults } from '../../types/RankResults.type'
import { useLocale } from '../../i18n/useLocale'
import { dividerColor } from '../../styles/colors'
import { T_RELATIVE_EVALUATION_RESULT_TABLE } from '../../locales/relativeEvaluationReultTable'

type Props = {
  resultRanks: RankResults[] | undefined
  roomData: Room
}

const RelativeEvaluationReultTable: React.FC<Props> = (props) => {
  const { t } = useLocale(T_RELATIVE_EVALUATION_RESULT_TABLE)

  if (props.resultRanks.length === 1) {
    return (
      <div css={containerStyle}>
        <table css={tableStyle}>
          <tbody>
            {props.resultRanks[0].map((result, index) => (
              <tr key={index} css={() => rowStyle(index % 2 !== 0)}>
                <th css={rankStyle}>{result.rank}</th>
                <td css={nameStyle}>{result.name}</td>
                {result.score &&
                  <td css={scoreStyle}>{result.score}</td>
                }
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  }

  if (props.resultRanks.length >= 2) {
    return (
      <div css={containerStyle}>
        {props.resultRanks.map((results, index) => (
          <React.Fragment key={index} >
            <SupportingTextCell textAlign="left">
              {t.N_POSSIBILITY_1 + (index + 1) + t.N_POSSIBILITY_2}
            </SupportingTextCell>
            <table css={tableStyle}>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index} css={() => rowStyle(index % 2 !== 0)}>
                    <th css={rankStyle}>{result.rank}</th>
                    <td css={nameStyle}>{result.name}</td>
                    {result.score &&
                      <td css={scoreStyle}>{result.score}</td>
                    }
                  </tr>
                ))}
              </tbody>
            </table>
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
  min-width: 50px;
  text-align: center;
  border: solid 1px ${dividerColor};
`
const nameStyle = css`
  min-width: 170px;
  padding-left: 5px;
  text-align: left;
  border: solid 1px ${dividerColor};
`
const scoreStyle = css`
  min-width: 90px;
  text-align: right;
  border: solid 1px ${dividerColor};
`

export default RelativeEvaluationReultTable