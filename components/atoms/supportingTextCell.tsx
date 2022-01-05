import React from 'react'
import { css } from '@emotion/react'
import { supportingTextColor } from '../../styles/colors'

type Props = {
  shouldAlignLeft: boolean
  children?: React.ReactNode
}

const SupportingTextCell: React.FC<Props> = (props) => {
  if (props.shouldAlignLeft) {
    return (
      <div css={() => layoutStyle(true)}>
        {props.children}
      </div>
    )
  } else {
    return (
      <div css={() => layoutStyle(false)}>
        {props.children}
      </div>
    )
  }
}

const layoutStyle = (shouldAlignLeft) => css`
  text-align: ${shouldAlignLeft ? "left" : "right"};
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 10pt;
  color: ${supportingTextColor};
  margin: 5px 10px;
`

export default SupportingTextCell