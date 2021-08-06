import React from 'react'
import { css } from '@emotion/react'
import { motion } from 'framer-motion'
import { primaryColor, primarySelectedColor } from '../../styles/colors'
import CheckIcon from '../icons/checkIcon'
import Spacer from '../atoms/spacer'

type Props = {
  text: string
  rank: string
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  isSelected: boolean
}

const RankSelectionCell: React.FC<Props> = (props) => {
  return (
    <motion.button
      onClick={props.onClick}
      css={() => layoutStyle(props.isSelected)}
    >
      <span><CheckIcon isChecked={props.isSelected} color={primaryColor} /></span>
      <Spacer x="6px" />
      <span css={textStyle}>{props.text}</span>
      <span css={() => rankStyle(props.isSelected)}>{props.rank}</span>
    </motion.button>
  )
}

const layoutStyle = (isSelected: boolean) => css`
  width: 100%;
  margin: 3px 0;
  padding: 6px;
  border: none;
  border-radius: 6px;
  background-color: ${isSelected ? primarySelectedColor : "transparent"};
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  display: flex;
  &:focus {
    outline: none;
  }
`

const textStyle = css`
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 12pt;
  text-align: left;
  flex: 8 1 80%;
`

const rankStyle = (isSelected: boolean) => css`
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 12pt;
  text-align: right;
  flex: 1 2 10%;
  color: ${isSelected ? primaryColor : ""};
`

export default RankSelectionCell