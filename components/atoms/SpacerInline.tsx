import React from 'react'
import { css } from '@emotion/react'

type Props = {
  x?: string
}

const SpacerInline: React.FC<Props> = (props) => {
  const x = props.x ? props.x : "0"

  return (
    <div css={() => layoutStyle(x)}></div>
  )
}

const layoutStyle = (x) => css`
  display: inline;
  width: ${x};
`

export default SpacerInline