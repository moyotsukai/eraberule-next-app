import React, { useEffect } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { attendedRoomIdsState, personalRankState, roomDataState } from '../../states/atoms'
import { useRecoilState, useSetRecoilState } from 'recoil'
import SignInProvider from '../common/SignInProvider'
import SupportingTextCell from '../ui/SupportingTextCell'
import { useLocale } from '../../i18n/useLocale'
import { useAuth } from '../../model/auth/useAuth'
import Button from '../ui/Button'
import Spacer from '../ui/Spacer'
import { getQueryRoomTitle } from '../../model/room/getQueryRoomTitle'
import { useQueryRoom } from '../../model/room/useQueryRoom'
import { useHasVoted } from '../../model/room/useHasVoted'
import Card from '../ui/Card'
import TextCell from '../ui/TextCell'
import { T_ROOM } from '../../locales/roomPage'

const RoomPage: React.FC = () => {
  const { user, isLoadingUser } = useAuth()
  const router = useRouter()
  const { title, isLoadingRouter } = getQueryRoomTitle()
  const { queriedRoomData, isLoadingRoomData } = useQueryRoom({ title: title, isLoading: isLoadingRouter || isLoadingUser })
  const [roomData, setRoomData] = useRecoilState(roomDataState)
  const setPersonalRank = useSetRecoilState(personalRankState)
  const { attendedRoomIds, hasVoted, isLoadingHasVoted } = useHasVoted({ user: user, roomData: roomData, isLoading: isLoadingRoomData })
  const setAttendedRoomIds = useSetRecoilState(attendedRoomIdsState)
  const { t } = useLocale(T_ROOM)

  //Set room data state globally
  useEffect(() => {
    setRoomData(queriedRoomData)
  }, [queriedRoomData])

  //Set attended room ids state globally
  useEffect(() => {
    setAttendedRoomIds(attendedRoomIds)
  }, [attendedRoomIds])

  const onClick = () => {
    if (!hasVoted) {
      toVote()
    } else {
      toResult()
    }
  }

  const toVote = () => {
    const rank = Array(roomData.options.length).fill(0)
    setPersonalRank(rank)
    router.push("/room/vote")
  }

  const toResult = () => {
    router.push("/room/result")
  }

  return (
    <SignInProvider
      isLoading={isLoadingRouter || isLoadingRoomData}
      hasNoResults={roomData === null}
      isClosedRoom={roomData && roomData.state === "closed"}
    >
      {roomData &&
        <div css={cardContainerStyle}>
          <Card>
            <SupportingTextCell textAlign="left">
              {t.TITLE}
            </SupportingTextCell>
            <TextCell>
              {roomData.title}
            </TextCell>
            <Spacer y="20px" />
            <Button
              onClick={onClick}
              isEnabled={!isLoadingHasVoted}
              isLoading={isLoadingHasVoted}
            >
              {hasVoted
                ? t.SEE_RESULT
                : t.VOTE
              }
            </Button>
          </Card>
        </div>
      }
    </SignInProvider>
  )
}

const cardContainerStyle = css`
  padding: 0 15px;
`

export default RoomPage