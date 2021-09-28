import React, { useState, useEffect, useLayoutEffect } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import Message from '../components/blocks/message'
import ToVoteCard from '../components/blocks/toVoteCard'
import { useRecoilValue, useSetRecoilState } from 'recoil'
import { roomDataState, personalRankState, attendedRoomIdsState } from '../recoil/atom'
import { useAuthenticate } from '../hooks/auth'

const RoomPage: React.FC = () => {
  const user = useAuthenticate()
  const roomData = useRecoilValue(roomDataState)
  const setPersonalRank = useSetRecoilState(personalRankState)
  const attendedRoomIds = useRecoilValue(attendedRoomIdsState)
  const [hasVoted, setHasVoted] = useState(false)
  const router = useRouter()

  useLayoutEffect(() => {
    if (roomData.isPlaceholder === true) {
      router.push("/")
      return
    }

    if (attendedRoomIds.includes(roomData.docId)) {
      setHasVoted(true)
    }
  }, [])

  const handleOnClick = () => {
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

  //UI
  if (user === null) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          データベースに接続できません。
        </Message>
      </div>
    )
  }

  if (roomData === null) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          検索結果がありません。
        </Message>
      </div>
    )
  }

  if (roomData.state === "closed") {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          このルームは非公開です。
        </Message>
      </div>
    )
  }

  return (
    <div css={layoutStyle}>
      <ToVoteCard
        roomTitle={roomData.title}
        hasVoted={hasVoted}
        onClick={handleOnClick}
      />
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
`

export default RoomPage