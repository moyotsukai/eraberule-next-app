import { useRouter } from 'next/router'
import Header from '../components/common/Header'
import TabBar from '../components/common/TabBar'
import Footer from '../components/common/Footer'
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
