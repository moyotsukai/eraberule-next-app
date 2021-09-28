import React from 'react'
import { css } from '@emotion/react'
import { primaryColor, primaryDisabledColor } from '../../styles/colors'
import { motion } from "framer-motion"
import LoadingCircle from "../atoms/loadingCircle"

type Props = {
  onClick: (event: React.MouseEvent<HTMLInputElement>) => void
  isEnabled: boolean
  isLoading: boolean
  children?: React.ReactNode
}

const CircleButton: React.FC<Props> = (props) => {
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
          onClick={props.onClick}
          disabled={true}
          css={buttonLoadingStyle}
        >
          <LoadingCircle />
        </button>
      )

    } else {
      return (
        <button
          onClick={props.onClick}
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
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: none;
  background-color: ${isEnabled ? primaryColor : primaryDisabledColor};
  cursor: ${isEnabled ? "pointer" : "default"};
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5px;
  top: 0;
  bottom: 0;
  margin: auto;
  -webkit-tap-highlight-color: rgba(0,0,0,0);

  &:focus {
    outline: none;
  }
`

const buttonLoadingStyle = css`
  width: 36px;
  height: 36px;
  border-radius: 18px;
  border: none;
  background-color: ${primaryDisabledColor};
  cursor: default;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  right: 5px;
  top: 0;
  bottom: 0;
  margin: auto;
`

export default CircleButton