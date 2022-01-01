import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { db } from '../lib/firebase'
import { useRouter } from 'next/router'
import Message from '../components/blocks/message'
import ToVoteCard from '../components/blocks/toVoteCard'
import queryString from 'query-string'
import { useRecoilValue, useSetRecoilState, useRecoilState } from 'recoil'
import { roomDataState, personalRankState, attendedRoomIdsState } from '../recoil/atom'
import { useAuthenticate } from '../hooks/auth'
import { useDidUpdateEffect } from '../hooks/useDidUpdateEffect'
import { useStrictEffect } from '../hooks/useStrictEffect'

const RoomPage: React.FC = () => {
  const user = useAuthenticate()
  // const roomData = useRecoilValue(roomDataState)
  const setPersonalRank = useSetRecoilState(personalRankState)
  const [hasVoted, setHasVoted] = useState(false)
  const router = useRouter()
  const [roomData, setRoomData] = useRecoilState(roomDataState)
  const [enteredTitle, setEnteredTitle] = useState("")
  const [attendedRoomIds, setAttendedRoomIds] = useRecoilState(attendedRoomIdsState)

  useLayoutEffect(() => {
    const queryParsed = queryString.parse(router.asPath.split(/\?/)[1])
    if (Object.keys(queryParsed).length === 0) { return }
    const q = queryParsed.q as string
    setEnteredTitle(q)
  }, [])

  useStrictEffect(() => {
    const getRoomData = async (title: string) => {
      db.collection("rooms").where("title", "==", title).limit(1)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size === 0) {
            setRoomData(null)
          } else {
            const docData = querySnapshot.docs[0]
            setRoomData({
              ...docData.data(),
              docId: docData.id
            })
          }
        })
        .catch((error) => {
          console.error("Error getting documents: ", error)
          // toError()
        })
    }

    getRoomData(enteredTitle)
  }, [enteredTitle])

  useStrictEffect(() => {
    const getAttendedRoomIds = async () => {
      const userId = user.uid
      db.collection("users").doc(userId).get().then((doc) => {
        if (doc.exists) {
          const roomIds = doc.data().attendedRooms
          setAttendedRoomIds(roomIds)
        } else {
          setAttendedRoomIds([])
        }
      }).catch((error) => {
        console.error("Error getting documents: ", error)
        // toError()
      })
    }
    getAttendedRoomIds()
  }, [user])

  useDidUpdateEffect(() => {
    if (roomData === null) { return }
    if (roomData.isPlaceholder === true) { return }
    if (attendedRoomIds === undefined) { return }

    if (attendedRoomIds.includes(roomData.docId)) {
      setHasVoted(true)
    }
  }, [roomData, attendedRoomIds])

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
  if (user === undefined) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          読み込み中...
        </Message>
      </div>
    )
  }

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