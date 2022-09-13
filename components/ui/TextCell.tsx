import React, { memo } from 'react'
import { css } from '@emotion/react'

type Props = {
  children?: React.ReactNode
}

const TextCell: React.FC<Props> = (props) => {
  return (
    <div css={layoutStyle}>
      {props.children}
    </div>
  )
}

const layoutStyle = css`
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 12pt;
  margin: 5px 10px;
  text-align: left;
`

export default memo(TextCell)