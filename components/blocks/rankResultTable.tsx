import React from 'react'
import { css } from '@emotion/react'
import { useRecoilValue } from 'recoil'
import { roomDataState } from '../../recoil/atom'

type Props = {
  personalRanks: number[]
}

const RankResultTable: React.FC<Props> = (props) => {
  const roomData = useRecoilValue(roomDataState)

  //UI
  return (
    <div css={tableStyle}>

    </div>
  )
}

const tableStyle = css`
  padding: 0 6px;
`

export default RankResultTable