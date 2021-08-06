import React from 'react'
import { css } from '@emotion/react'

type Props = {
  isAccordion: boolean
  children?: React.ReactNode
}

const Card: React.FC<Props> = (props) => {

  if (props.isAccordion) {
    return (
      <div css={cardAccordionStyle}>
        {props.children}
      </div>
    )

  } else {
    return (
      <div css={cardStyle}>
        {props.children}
      </div>
    )
  }
}

const cardStyle = css`
  background-color: #fff;
  margin: 35px 15px;
  padding: 15px 5px;
  border-radius: 12px;
  text-align: center;

  @media(min-width: 500px) {
    padding: 15px 10px;
  }
`

const cardAccordionStyle = css`

`

export default Card