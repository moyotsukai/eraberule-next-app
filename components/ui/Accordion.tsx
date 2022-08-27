import React, { useState } from 'react'
import { css } from '@emotion/react'
import SupportingTextCell from './SupportingTextCell'
import { motion } from 'framer-motion'
import Divider from './Divider'
import ToggleMarker from './ToggleMarker'
import Spacer from './Spacer'

type Props = {
  title: string
  children?: React.ReactNode
}

const Accordion: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
  }

  const variants = {
    open: {
      height: "auto",
      opacity: 1,
      y: 0
    },
    closed: {
      height: 0,
      opacity: 0,
      y: -10
    }
  }

  return (
    <div css={accordionStyle}>
      <motion.button
        onClick={toggleIsOpen}
        css={summaryContainerStyle}
      >
        <div css={titleContainerStyle}>
          <SupportingTextCell textAlign="left">
            {props.title}
          </SupportingTextCell>
        </div>
        <div css={toggleMarkerContainer}>
          <ToggleMarker isOpen={!isOpen} />
        </div>
      </motion.button>

      <motion.div
        initial={{
          height: 0,
          opacity: 0
        }}
        animate={isOpen ? "open" : "closed"}
        variants={variants}
        transition={{
          type: "tween",
          duration: 0.2,
          ease: "easeOut"
        }}
        css={detailContainerStyle}
      >
        <Divider />
        {props.children}
        <Spacer y="15px" />
      </motion.div>
    </div>
  )
}

const accordionStyle = css`
  background-color: #fff;
  margin: 25px auto;
  max-width: 600px;
  border-radius: 12px;
  text-align: center;
`
const summaryContainerStyle = css`
  display: flex;
  align-items: center;
  background-color: rgba(0,0,0,0);
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  width: 100%;
  padding: 15px 5px;

  @media(min-width: 500px) {
    padding: 15px 10px;
  }

  &:focus {
    outline: none;
  }
`
const titleContainerStyle = css`
  flex-grow: 1;
`
const toggleMarkerContainer = css`
  padding-right: 10px;
`
const detailContainerStyle = css`
  overflow: hidden;
  padding: 0 5px;

  @media(min-width: 500px) {
    padding: 0 10px;
  }
`

export default Accordion