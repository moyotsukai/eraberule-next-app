import React from 'react'
import { css } from '@emotion/react'
import { primaryColor } from '../../styles/colors'

type Props = {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  children?: React.ReactNode
}

const TextButton: React.FC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      css={buttonStyle}
    >
      {props.children}
    </button>
  )
}

const buttonStyle = () => css`
  min-width: 95px;
  min-height: 42px;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 12pt;
  background-color: rgba(0,0,0,0);
  color: ${primaryColor};
  border: none;
  border-radius: 6px;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  text-align: center;
  margin: 0 auto;
  padding: 0 5px;

  &:focus {
    outline: none;
  }
`

export default TextButton