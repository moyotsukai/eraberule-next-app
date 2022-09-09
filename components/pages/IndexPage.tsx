import React, { useState } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { roomDataState } from '../../states/atoms'
import { useSetRecoilState } from 'recoil'
import { anySpaceToSingleSpace } from '../../utils/anySpaceToSingleSpace'
import { removeBlanks } from '../../utils/removeBlanks'
import SignInProvider from '../common/SignInProvider'
import Message from '../ui/Message'
import SupportingTextCell from '../ui/SupportingTextCell'
import { useLocale } from '../../i18n/useLocale'
import T_INDEX_PAGE from '../../locales/indexPage'
import { supportingTextColor } from '../../styles/colors'
import SearchBox from '../functional/SearchBox'

const IndexPage: React.FC = () => {
  const router = useRouter()
  const setRoomData = useSetRecoilState(roomDataState)
  const [enteredTitle, setEnteredTitle] = useState<string>("")
  const t = useLocale(T_INDEX_PAGE)

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEnteredTitle(event.target.value)
  }

  const isValidTitle = () => {
    if (removeBlanks(enteredTitle) === "") { return false }
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
        onChange={onTitleChange}
        isValid={isValidTitle}
        onSubmit={toRoom}
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