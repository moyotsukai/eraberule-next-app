import React from 'react'
import { css } from '@emotion/react'
import Message from '../components/ui/Message'

const NotFoundPage: React.FC = () => {
  return (
    <div css={layoutStyle}>
      <Message isLoading={false}>
        404 Page Not Found
      </Message>
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
`

export default NotFoundPage