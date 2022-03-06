import React from 'react'
import { css } from '@emotion/react'
import { primarySelectedColor, primaryTextColor } from '../../styles/colors'

type Props = {
  onClick: () => void,
  children: React.ReactNode
}

const LanguageButton: React.FC<Props> = (props) => {
  return (
    <button
      onClick={props.onClick}
      css={buttonStyle}
    >
      <a>
        {props.children}
      </a>
    </button>
  )
}

const buttonStyle = css`
  min-width: 140px;
  min-height: 40px;
  margin: 0;
  text-align: left;
  background-color: #fff;
  cursor: pointer;
  color: ${primaryTextColor};
  border: none;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 16px;
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  &:hover {
    background-color: ${primarySelectedColor};
  }

  &:focus {
    outline: none;
  }
`

export default LanguageButton