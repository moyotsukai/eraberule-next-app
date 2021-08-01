import React from 'react'
import { css } from '@emotion/react'
import { primaryColor, primaryShadowColor } from '../../styles/colors'
import { motion } from 'framer-motion'

const LoadingCircle: React.FC = () => {
  return (
    <motion.div
      animate={{ rotate: 360 }}
      transition={{ ease: "easeInOut", duration: 1.5, repeat: Infinity }}
      css={circleStyle} />
  )
}

const circleStyle = css`
  width: 22px;
  height: 22px;
  border-radius: 50%;
  border: 3px solid ${primaryShadowColor};
  border-top: 3px solid ${primaryColor};
  display: inline-block;
`

export default LoadingCircle