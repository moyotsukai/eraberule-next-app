import React from 'react'
import { css } from '@emotion/react'
import { errorColor, supportingTextColor } from '../../styles/colors'

type Props = {
  textAlign: "left" | "right" | "center"
  isError?: boolean
  children?: React.ReactNode
}

const SupportingTextCell: React.FC<Props> = (props) => {
  const isError = props.isError || false

  return (
    <div css={() => layoutStyle(isError, props.textAlign)}>
      {props.children}
    </div>
  )
}

const layoutStyle = (isError: boolean, textAlign: string) => css`
  color: ${isError ? errorColor : supportingTextColor};
  text-align: ${textAlign};
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 10pt;
  margin: 5px 10px;
`

export default SupportingTextCell