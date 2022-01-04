import React from 'react'
import { css } from '@emotion/react'
import { primaryColor, primaryShadowColor } from '../../styles/colors'
import { motion } from 'framer-motion'

const LiveIndicator: React.FC = () => {
  return (
    <div css={smallCircleStyle} >
      <motion.div
        animate={{ scale: 2 }}
        transition={{ ease: "easeInOut", duration: 2, repeat: Infinity }}
        css={bgCircleStyle}
      />
    </div>
  )
}
const smallCircleStyle = css`
  width: 6px;
  height: 6px;
  border-radius: 3px;
  background-color: ${primaryColor};
  position: relative;
  display: inline-block;
`
const bgCircleStyle = css`
  width: 8px;
  height: 8px;
  border-radius: 16px;
  background-color: ${primaryShadowColor};
  position: absolute;
  top: -1px;
  left: -1px;
`

export default LiveIndicator