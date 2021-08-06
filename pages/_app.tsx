import { useRouter } from 'next/router'
import Header from '../components/blocks/header'
import TabBar from '../components/blocks/tabBar'
import Footer from '../components/blocks/footer'
import '../styles/global.css'
import { RecoilRoot } from 'recoil'

function MyApp({ Component, pageProps }) {
  const router = useRouter()
  const path = router.pathname

  return (
    <RecoilRoot>
      <Header />
      <TabBar path={path} />
      <Component {...pageProps} />
      <Footer />
    </RecoilRoot>
  )
}

export default MyApp
