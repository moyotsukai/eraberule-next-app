import React from 'react'
import { css } from '@emotion/react'

type Props = {
  y?: string
}

const Spacer: React.FC<Props> = (props) => {
  const y = props.y ? props.y : "0"

  return (
    <div css={() => layoutStyle(y)}></div>
  )
}

const layoutStyle = (y) => css`
  height: ${y};
`

export default Spacer