import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { firebase, db } from '../lib/firebase'
import { useRouter } from 'next/router'
import Message from '../components/blocks/message'
import queryString from 'query-string'
import ToVoteCard from '../components/blocks/toVoteCard'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { roomDataState, personalRankState } from '../recoil/atom'
import { useAuthenticate } from '../hooks/auth'
import { Room } from '../structs/room'

const RoomPage: React.FC = () => {
  //STATE
  const user = useAuthenticate()
  const [roomData, setRoomData] = useRecoilState(roomDataState)
  const setPersonalRank = useSetRecoilState(personalRankState)
  const [enteredTitle, setEnteredTitle] = useState("")
  const router = useRouter()
  const isFirstRender = useRef(true)
  const hasRequested = useRef(false)

  useEffect(() => {
    const queryParsed = queryString.parse(router.asPath.split(/\?/)[1])
    if (Object.keys(queryParsed).length === 0) { router.push("/") }
    setEnteredTitle(queryParsed.title as string)
    console.log("enteredTitle", enteredTitle)
  }, [])

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false
    } else {
      if (hasRequested.current) { return }

      db.collection("rooms").where("title", "==", enteredTitle)
        .get()
        .then((querySnapshot) => {
          if (querySnapshot.size === 0) {
            setRoomData(null)
          }
          querySnapshot.forEach((doc) => {
            const docData: Room = doc.data()
            docData.docId = doc.id
            setRoomData(docData)
          })
          console.log("roomData", roomData)
          hasRequested.current = true
        })
        .catch((error) => {
          console.error("Error getting documents: ", error)
        })

      // setRoomData({
      //   explanation: "みんなが好きな季節を投票で決めよう！",
      //   options: [
      //     "春",
      //     "夏",
      //     "秋",
      //     "冬"
      //   ],
      //   rule: "majorityJusgement",
      //   commonLanguage: ["非常に良い", "良い", "まずまず", "容認", "不十分", "失格"],
      //   senderId: "r2beUc7wMraEc7YAcM5tK9X7Rtn1",
      //   state: "ongoing",
      //   title: "好きな季節投票",
      //   docId: "zJjBNEVkCx3M7ztJiKpX"
      // })

      console.log("data fetched")
    }
  }, [enteredTitle])

  const toVote = () => {
    console.log("clicked")
    const rank = Array(roomData.options.length).fill(0)
    setPersonalRank(rank)

    router.push({
      pathname: "/room/vote"
    })
  }

  if (roomData.isPlaceholder === true) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={true}>
          検索中
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
        onClick={toVote}
      />
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
`

export default RoomPage