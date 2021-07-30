import React from 'react'
import Link from 'next/link'
import { css } from '@emotion/react'
import { primaryColor } from '../../styles/colors'

type Props = {
  text: string
  path: string
  isSelected: boolean
}

const Tab: React.FC<Props> = (props) => {
  return (
    <Link href={props.path}>
      <div css={() => tabStyle(props.isSelected)}>
        <a css={() => textStyle(props.isSelected)}>{props.text}</a>
      </div>
    </Link>
  )
}

const tabStyle = (isSelected) => css`
  width: 50%;
  max-width: 200px;
  height: 30px;
  text-align: center;
  margin: 0 2px;
  cursor: pointer;
  padding: 8px 0;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  ${isSelected ? "border-bottom: 2px solid " + primaryColor + ";" : ""}
`
const textStyle = (isSelected) => css`
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: ${isSelected ? primaryColor : "rgb(150, 150, 150)"};
`

export default Tab