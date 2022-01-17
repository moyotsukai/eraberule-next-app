import React from 'react'
import { css } from '@emotion/react'
import Message from '../components/blocks/message'

const ErrorPage: React.FC = () => {
  return (
    <div css={layoutStyle}>
      <Message isLoading={false}>
        エラー
      </Message>
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
`

export default ErrorPage