import React from 'react'
import { css } from '@emotion/react'
import Image from 'next/image'
import Logo from '../../public/logo.png'
import LanguageMenu from '../functional/LanguageMenu'

const Header: React.FC = () => {
  return (
    <header css={headerStyle}>
      <a href="https://eraberule.com">
        <div css={linkStyle}>
          <Image src={Logo} alt="logo" />
        </div>
      </a>
      <div css={spacerStyle} />
      <LanguageMenu />
    </header>
  )
}

const headerStyle = css`
  padding: 8px 10px 6px 10px;
  background-color: #fff;
  border-bottom: 1px solid rgb(220, 220, 220);
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  display: flex;
  align-items: center;

   @media(min-width: 500px) {
    padding: 8px 20px 6px 20px;
  }
`
const linkStyle = css`
  width: 144px;
  height: 36px;
  cursor: pointer;
`
const spacerStyle = css`
  flex-grow: 1;
`

export default Header