import React from 'react'
import { useRouter } from 'next/router'
import Header from '../components/blocks/header'
import TabBar from '../components/blocks/tabBar'
import Footer from '../components/blocks/footer'
import '../styles/global.css'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const path = router.pathname

  return (
    <React.Fragment>
      <Header />
      <TabBar path={path} />
      <Component {...pageProps} />
      <Footer />
    </React.Fragment>
  )
}

export default MyApp
