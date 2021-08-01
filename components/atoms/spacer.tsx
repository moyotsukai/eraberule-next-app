import React from 'react'
import { css } from '@emotion/react'

type Props = {
  x?: string
  y?: string
}

const Spacer: React.FC<Props> = (props) => {
  const x = props.x ? props.x : "0"
  const y = props.y ? props.y : "0"

  return (
    <div css={() => layoutStyle(x, y)}></div>
  )
}

const layoutStyle = (x, y) => css`
  width: ${x};
  height: ${y};
`

export default Spacer