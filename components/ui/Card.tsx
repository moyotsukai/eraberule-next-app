import React, { memo } from 'react'
import { css } from '@emotion/react'

type Props = {
  children?: React.ReactNode
}

const Card: React.FC<Props> = (props) => {
  return (
    <div css={cardStyle}>
      {props.children}
    </div>
  )
}

const cardStyle = css`
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

export default memo(Card)