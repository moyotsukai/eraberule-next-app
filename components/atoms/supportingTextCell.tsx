import React from 'react'
import { css } from '@emotion/react'
import { errorColor, supportingTextColor } from '../../styles/colors'

type Props = {
  shouldAlignLeft: boolean
  isError?: boolean
  children?: React.ReactNode
}

const SupportingTextCell: React.FC<Props> = (props) => {
  const isError = props.isError || false

  if (props.shouldAlignLeft) {
    return (
      <div css={() => layoutStyle(isError, true)}>
        {props.children}
      </div>
    )
  } else {
    return (
      <div css={() => layoutStyle(isError, false)}>
        {props.children}
      </div>
    )
  }
}

const layoutStyle = (isError, shouldAlignLeft) => css`
  color: ${isError ? errorColor : supportingTextColor};
  text-align: ${shouldAlignLeft ? "left" : "right"};
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 10pt;
  margin: 5px 10px;
`

export default SupportingTextCell