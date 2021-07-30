import React from 'react'
import { css } from '@emotion/react'

type Props = {
  children?: React.ReactNode
}

const TabDescription: React.FC<Props> = (props) => {
  return (
    <div css={layoutStyle}>
      <p css={subtitleStyle}>
        {props.children}
      </p>
    </div>
  )
}

const layoutStyle = css`
  padding: 20px 0;
`

const subtitleStyle = css`
  text-align: center;
`

export default TabDescription