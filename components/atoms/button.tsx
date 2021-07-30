import React from 'react'
import { css } from '@emotion/react'
import { primaryColor, primaryShadowColor } from '../../styles/colors'

type Props = {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  children?: React.ReactNode
}

const Button: React.FC<Props> = (props) => {
  return (
    <button onClick={props.onClick} css={buttonStyle}>
      {props.children}
    </button>
  )
}

const buttonStyle = css`
  min-width: 95px;
  min-height: 42px;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 12pt;
  border-radius: 6px;
  color: #fff;
  background-color: ${primaryColor};
  box-shadow: 0 2px 3px 0 ${primaryShadowColor};
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  &:focus {
    outline: none;
  }
`

export default Button