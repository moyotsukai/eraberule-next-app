import React from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'
import Link from 'next/link'
import Logo from '../../public/logo.png'

const Header: React.FC = () => {

  return (
    <div css={headerStyle}>
      <Link href="/" passHref>
        <div css={linkStyle}>
          <Image src={Logo} alt="logo" />
        </div>
      </Link>
    </div>
  )
}

const headerStyle = css`
  padding: 8px 10px 6px 10px;
  background-color: #fff;
  border-bottom: 1px solid rgb(220, 220, 220);
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  transform: translate3d(0, 0, 0);
  z-index: 100;
`

const linkStyle = css`
  width: 144px;
  height: 36px;
  cursor: pointer;
`


export default Header