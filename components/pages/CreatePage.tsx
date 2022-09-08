import React, { useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import SignInProvider from '../common/SignInProvider'
import { useAuth } from '../../auth/useAuth'
import { useRouter } from 'next/router'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { recentlyCreatedRoomTitleState, suggestedRuleState } from '../../states/atoms'
import Message from '../ui/Message'
import Button from '../ui/Button'
import SupportingTextCell from '../ui/SupportingTextCell'
import CardButton from '../ui/CardButton'
import { useLocale } from '../../locales/useLocale'
import T_CREATE from '../../locales/createPage'
import { getRecentlyCreatedRoomData } from '../../firestore/getRoomData'

const CreatePage: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const [recentlyCreatedRoomTitle, setRecentlyCreatedRoomTitle] = useRecoilState(recentlyCreatedRoomTitleState)
  const setSuggestedRule = useSetRecoilState(suggestedRuleState)
  const hasFetchRecentlyCreatedRoomData = useRef(false)
  const t = useLocale(T_CREATE)

  //Set recently created room title
  useEffect(() => {
    if (!user) { return }
    if (recentlyCreatedRoomTitle !== undefined) { return }
    if (hasFetchRecentlyCreatedRoomData.current) { return }

    hasFetchRecentlyCreatedRoomData.current = true
    const fetchRecentlyCreatedRoomData = async () => {
      const userId = user.uid
      const recentlyCreatedRoom = await getRecentlyCreatedRoomData(userId)
      setRecentlyCreatedRoomTitle(recentlyCreatedRoom.title)
    }
    fetchRecentlyCreatedRoomData()
  }, [user])

  const toNewRoom = () => {
    setSuggestedRule(null)
    router.push("/create/suggest")
  }

  const toRecentlyCreatedRoom = () => {
    router.push({
      pathname: "/create/share",
      query: { title: recentlyCreatedRoomTitle }
    })
  }

  return (
    <SignInProvider>
      <Message>
        {t.CREATE_NEW}
      </Message>
      <Button
        onClick={toNewRoom}
        isEnabled={true}
        isLoading={false}
      >
        {t.CREATE}
      </Button>

      {recentlyCreatedRoomTitle &&
        <React.Fragment>
          <div css={spacerStyle} />
          <div css={recentlyCreatedRoomContainerStyle}>
            <SupportingTextCell textAlign="left">
              {t.RECENT_ROOM}
            </SupportingTextCell>
            <CardButton onClick={toRecentlyCreatedRoom}>
              {recentlyCreatedRoomTitle}
            </CardButton>
          </div>
        </React.Fragment>
      }
    </SignInProvider>
  )
}

const recentlyCreatedRoomContainerStyle = css`
  margin: 0 auto;
  max-width: 600px;
  padding: 0 20px;

  @media(min-width: 500px) {
    padding: 15px 10px;
  }
`
const spacerStyle = css`
  height: 38vh;
`

export default CreatePage