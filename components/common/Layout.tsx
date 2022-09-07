import React from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import Header from './Header'
import TabBar from './TabBar'
import Footer from './Footer'
import { backgroundColor } from '../../styles/colors'

type Props = {
  children: React.ReactNode
}

const Layout: React.FC<Props> = (props) => {
  const router = useRouter()
  const path = router.pathname

  return (
    <div css={layoutStyle}>
      <div css={containerStyle}>
        <div>
          <Header />
          <TabBar path={path} />
        </div>
        <div>
          {props.children}
        </div>
      </div>
      <Footer />
    </div>
  )
}

const layoutStyle = css`
  background-color: ${backgroundColor};
`
const containerStyle = css`
  display: grid;
  grid-template-rows: auto 1fr auto;
  grid-template-columns: 100%;
  min-height: 100vh;
`

export default Layout