import React, { useEffect, useState } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { useSetRecoilState } from 'recoil'
import { roomDataState } from '../../states/atoms'
import { anySpaceToSingleSpace } from '../../utils/anySpaceToSingleSpace'
import { useAuth } from '../../auth/useAuth'
import SignInProvider from '../common/SignInProvider'
import Message from '../ui/Message'
import SearchBox from '../functional/SearchBox'
import SupportingTextCell from '../ui/SupportingTextCell'
import { useLocale } from '../../locales/useLocale'
import T_INDEX_PAGE from '../../locales/indexPage'
import { supportingTextColor } from '../../styles/colors'

const IndexPage: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [enteredTitle, setEnteredTitle] = useState("")
  const setRoomData = useSetRecoilState(roomDataState)
  const t = useLocale(T_INDEX_PAGE)

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value)
  }

  const handleOnClick = () => {
    if (!isValidTitle) { return }
    toRoom()
  }

  const isValidTitle = () => {
    if (enteredTitle === "") { return false }
    return true
  }

  const toRoom = () => {
    setRoomData(undefined)

    router.push({
      pathname: "/room",
      query: { q: anySpaceToSingleSpace(enteredTitle) }
    })
  }

  return (
    <SignInProvider>
      <Message>
        {t.SEARCH_ROOMS}
      </Message>
      <SearchBox
        value={enteredTitle}
        placeholder={t.ENTER_TITLE}
        onChange={handleTitleChange}
        onEnterKey={handleOnClick}
      />
      <div css={spacerStyle} />
      <SupportingTextCell textAlign="center">
        {t.AGREE_TO_TERMS_1}
        <a
          href="https://www.eraberule.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          css={linkStyle}
        >
          {t.TERMS}
        </a>
        {t.AGREE_TO_TERMS_2}
      </SupportingTextCell>
    </SignInProvider>
  )
}

const spacerStyle = css`
  height: 38vh;
`
const linkStyle = css`
  color: ${supportingTextColor};
  text-decoration: underline;
`

export default IndexPage