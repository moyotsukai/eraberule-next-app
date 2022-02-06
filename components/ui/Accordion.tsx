import React, { useState } from 'react'
import { css } from '@emotion/react'
import SupportingTextCell from './SupportingTextCell'
import { motion } from 'framer-motion'
import Divider from './Divider'
import ArrowIcon from '../icons/ArrowIcon'

type Props = {
  title: string
  children?: React.ReactNode
}
type ToggleMarkerProps = {
  isOpen: boolean
}

const ToggleMarker: React.FC<ToggleMarkerProps> = (props) => {
  const variants = {
    open: { rotate: 0 },
    closed: { rotate: -180 }
  }

  return (
    <motion.div
      animate={props.isOpen ? "open" : "closed"}
      variants={variants}
    >
      <ArrowIcon />
    </motion.div>
  )
}

const Accordion: React.FC<Props> = (props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false)

  const toggleIsOpen = () => {
    setIsOpen(!isOpen)
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
        <ToggleMarker isOpen={!isOpen} />
      </motion.button>

      {isOpen &&
        <div>
          <Divider />
          {props.children}
        </div>
      }
    </div>
  )
}

const accordionStyle = css`
  background-color: #fff;
  margin: 25px auto;
  max-width: 600px;
  padding: 15px 5px;
  border-radius: 12px;
  text-align: center;

  @media(min-width: 500px) {
    padding: 15px 10px;
  }
`
const summaryContainerStyle = css`
  display: flex;
  align-items: center;
  background-color: rgba(0,0,0,0);
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  width: 100%;

  &:focus {
    outline: none;
  }
`
const titleContainerStyle = css`
  flex-grow: 1;
`

export default Accordion