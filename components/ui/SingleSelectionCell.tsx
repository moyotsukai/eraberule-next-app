import React from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { primaryColor, primarySelectedColor } from '../../styles/colors'
import RadioIcon from '../icons/RadioIcon'

type Props = {
  text: string
  onClick: () => void
  isSelected: boolean
  children?: React.ReactNode
}

const SingleSelectionCell: React.FC<Props> = (props) => {
  return (
    <motion.button
      onClick={props.onClick}
      whileHover={{
        borderColor: primaryColor,
        transition: { duration: 0.3 }
      }}
      css={() => layoutStyle(props.isSelected)}
    >
      <div>
        <RadioIcon isChecked={props.isSelected} color={primaryColor} />
      </div>
      <div>
        <p css={textStyle}>{props.text}</p>
        {props.children}
      </div>
    </motion.button>
  )
}

const layoutStyle = (isSelected: boolean) => css`
  width: 100%;
  margin: 3px 0;
  padding: 5px;
  border: none;
  border-radius: 6px;
  background-color: ${isSelected ? primarySelectedColor : "transparent"};
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  display: flex;
  align-items: center;
  border: 1px solid transparent;
  box-sizing: border-box;
  &:focus {
    outline: none;
  }
`
const textStyle = css`
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 12pt;
  text-align: left;
`

export default SingleSelectionCell