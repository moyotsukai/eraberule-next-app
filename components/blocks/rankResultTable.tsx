import React from 'react'
import { css } from '@emotion/react'
import { useRecoilValue, useRecoilState } from 'recoil'
import { roomDataState, personalRankState } from '../../recoil/atom'

const RankResultTable: React.FC = () => {

  //RETURN
  return (
    <div css={tableStyle}>

    </div>
  )
}

const tableStyle = css`
  padding: 0 6px;
`

export default RankResultTable