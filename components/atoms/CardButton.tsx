import React from 'react'
import { css } from '@emotion/react'
import { dividerColor } from '../../styles/colors'
import { motion } from "framer-motion"

type Props = {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  children?: React.ReactNode
}

const CardButton: React.FC<Props> = (props) => {
  return (
    <motion.button
      onClick={props.onClick}
      whileHover={{ scale: 1.01 }}
      whileTap={{ scale: 0.99 }}
      css={buttonStyle}
    >
      {props.children}
    </motion.button>
  )
}

const buttonStyle = css`
  width: 100%;
  min-height: 50px;
  text-align: left;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 12pt;
  border-radius: 6px;
  border: solid 1px ${dividerColor};
  color: #000;
  background-color: #fff;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  margin: 0 auto;
  padding: 0 12px;

  &:focus {
    outline: none;
  }
`

export default CardButton