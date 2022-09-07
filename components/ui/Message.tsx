import React from 'react'
import { css } from '@emotion/react'
import LoadingCircle from './LoadingCircle'

type Props = {
  isLoading?: boolean
  children?: React.ReactNode
}

const Message: React.FC<Props> = (props) => {
  const isLoading = props.isLoading || false

  if (isLoading) {
    return (
      <div css={loadingStyle}>
        <LoadingCircle />
        <span css={textStyle}>{props.children}</span>
      </div>
    )

  } else {
    return (
      <div css={messageStyle}>
        <span css={textStyle}>{props.children}</span>
      </div>
    )
  }
}

const textStyle = css`
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 12pt;
  margin: 0 10px;
`

const loadingStyle = css`
  padding: 30px 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const messageStyle = css`
  padding: 30px 0;
  text-align: center;
`

export default Message