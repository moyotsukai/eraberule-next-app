import '../styles/global.css'
import { RecoilRoot } from 'recoil'
import Layout from '../components/common/Layout'

function MyApp({ Component, pageProps }) {

  return (
    <RecoilRoot>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </RecoilRoot>
  )
}

export default MyApp
