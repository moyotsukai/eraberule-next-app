import React from 'react'
import { css } from '@emotion/react'
import { primaryColor, primaryShadowColor, primaryDisabledColor } from '../../styles/colors'
import { motion } from "framer-motion"
import LoadingCircle from "../atoms/loadingCircle"
import SpacerInline from './SpacerInline'

type Props = {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  isEnabled: boolean
  isLoading: boolean
  children?: React.ReactNode
}

const Button: React.FC<Props> = (props) => {
  if (props.isEnabled) {
    return (
      <motion.button
        onClick={props.onClick}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        css={() => buttonStyle(props.isEnabled)}
      >
        {props.children}
      </motion.button>
    )

  } else {
    if (props.isLoading) {
      return (
        <button
          disabled={true}
          css={buttonLoadingStyle}
        >
          <LoadingCircle />
          <SpacerInline x="5px" />
          {props.children}
        </button>
      )
    } else {
      return (
        <button
          disabled={true}
          css={() => buttonStyle(props.isEnabled)}
        >
          {props.children}
        </button>
      )
    }
  }
}

const buttonStyle = (isEnabled) => css`
  min-width: 95px;
  min-height: 42px;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 12pt;
  border-radius: 6px;
  color: #fff;
  background-color: ${isEnabled ? primaryColor : primaryDisabledColor};
  box-shadow: 0 2px 3px 0 ${primaryShadowColor};
  border: none;
  cursor: ${isEnabled ? "pointer" : "default"};
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  text-align: center;
  margin: 0 auto;
  padding: 0 12px;

  &:focus {
    outline: none;
  }
`

const buttonLoadingStyle = css`
  min-width: 95px;
  min-height: 42px;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 12pt;
  border-radius: 6px;
  color: #fff;
  background-color: ${primaryDisabledColor};
  box-shadow: 0 2px 3px 0 ${primaryShadowColor};
  border: none;
  cursor: default;
  display: flex;
  align-items: center;
  margin: 0 auto;
`

export default Button