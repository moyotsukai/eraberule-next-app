import React, { useEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import { elevatedShadowColor, primaryColor, primaryTextColor } from '../../styles/colors'
import LanguageIcon from '../icons/LanguageIcon'
import { useRouter } from 'next/router'
import LanguageButton from '../ui/LanguageButton'

const LanguageMenu: React.FC = () => {
  const router = useRouter()
  const [isOpen, setIsOpen] = useState<boolean>(false)
  const buttonRef = useRef<HTMLButtonElement | null>(null)
  const menuRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    document.addEventListener("mousedown", onOutsideClick)
    return () => {
      document.removeEventListener("mousedown", onOutsideClick)
    }
  }, [])

  const toggleMenuOpen = () => {
    setIsOpen(!isOpen)
  }

  const onLanguageSelected = (url: string, lang: string) => {
    setIsOpen(false)
    router.push(url, url, { locale: lang })
  }

  const onOutsideClick = (e) => {
    if (buttonRef.current?.contains(e.target)) { return }
    if (!menuRef.current?.contains(e.target)) {
      setIsOpen(false)
    }
  }

  return (
    <div css={parentStyle}>
      <button
        onClick={toggleMenuOpen}
        ref={buttonRef}
        css={buttonStyle}
      >
        <LanguageIcon />
      </button>

      {isOpen &&
        <div
          ref={menuRef}
          css={menuStyle}
        >
          <LanguageButton
            onClick={() => onLanguageSelected(router.asPath, "ja")}
          >
            日本語
          </LanguageButton>
          <LanguageButton
            onClick={() => onLanguageSelected(router.asPath, "en")}
          >
            English
          </LanguageButton>
        </div>
      }
    </div>
  )
}

const parentStyle = css`
  position: relative;
`
const buttonStyle = css`
  min-width: 40px;
  min-height: 40px;
  color: ${primaryTextColor};
  background-color: transparent;
  border: none;
  cursor: pointer;
  -webkit-tap-highlight-color: rgba(0,0,0,0);
  display: flex;
  align-items: center;
  justify-content: center;

  &:hover {
    color: ${primaryColor};
  }

  &:focus {
    outline: none;
  }
`
const menuStyle = css`
  position: absolute;
  top: 40px;
  right: 0;
  transform: translate3d(0, 0, 0);
  z-index: 1000;
  background-color: #fff;
  padding: 6px 0;
  border-radius: 6px;
  box-shadow: 0 3px 10px 0 ${elevatedShadowColor};
`

export default LanguageMenu