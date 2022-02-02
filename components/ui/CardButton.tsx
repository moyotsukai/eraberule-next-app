import React from 'react'
import { css } from '@emotion/react'
import { dividerColor, primaryShadowColor } from '../../styles/colors'
import { motion } from "framer-motion"

type Props = {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  children?: React.ReactNode
}

const CardButton: React.FC<Props> = (props) => {
  return (
    <motion.button
      onClick={props.onClick}
      whileHover={{ scale: 1.005 }}
      whileTap={{ scale: 0.995 }}
      css={buttonStyle}
    >
      {props.children}
    </motion.button>
  )
}

const buttonStyle = css`
  width: 100%;
  min-height: 55px;
  text-align: left;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 12pt;
  border-radius: 6px;
  border: none;
  color: #000;
  background-color: #fff;
  box-shadow: 0 2px 3px 0 ${primaryShadowColor};
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  margin: 0 auto;
  padding: 0 12px;

  &:hover {
    box-shadow: 0 6px 9px 0 ${primaryShadowColor}
  }

  &:focus {
    outline: none;
  }
`

export default CardButton