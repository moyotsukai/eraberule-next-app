import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import Message from '../components/blocks/message'
import SearchBox from '../components/blocks/searchBox'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import { db } from '../lib/firebase'
import { roomDataState, attendedRoomIdsState } from '../recoil/atom'
import { useRecoilState } from 'recoil'
import { useAuthenticate } from '../hooks/auth'

const IndexPage: React.FC = () => {
  const user = useAuthenticate()
  const router = useRouter()
  const [enteredTitle, setEnteredTitle] = useState("")
  const [roomData, setRoomData] = useRecoilState(roomDataState)
  const [attendedRoomIds, setAttendedRoomIds] = useRecoilState(attendedRoomIdsState)
  const hasRequested = useRef(false)

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value)
  }

  const handleOnClick = async () => {
    // const queryParsed = queryString.parse(router.asPath.split(/\?/)[1])
    // if (Object.keys(queryParsed).length === 0) { router.push("/") }
    // const enteredTitle = queryParsed.title as string

    if (!isValidTitle) { return }

    getRoomData().then(() => {
      console.log("data fetched", roomData)
      getAttendedRoomIds().then(() => {
        console.log("attended room ids", attendedRoomIds)
        toRoom()
      })
    })
  }

  const isValidTitle = () => {
    if (enteredTitle === "") { return false }
    if (hasRequested.current) { return false }
    if (roomData.title === enteredTitle) { return false }
    return true
  }

  const getRoomData = async () => {
    db.collection("rooms").where("title", "==", enteredTitle)
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
        hasRequested.current = true
      })
      .catch((error) => {
        console.error("Error getting documents: ", error)
        toError()
      })
  }

  const getAttendedRoomIds = async () => {
    if (attendedRoomIds !== undefined) { return }
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
      toError()
    })
  }

  const toRoom = () => {
    router.push("/room")
  }

  const toError = () => {
    router.push({
      pathname: "/error"
    })
  }

  // const setTestData = () => {
  //   setRoomData({
  //     explanation: "みんなが好きな季節を投票で決めよう！",
  //     options: [
  //       "春",
  //       "夏",
  //       "秋",
  //       "冬"
  //     ],
  //     rule: "majorityJusgement",
  //     commonLanguage: ["非常に良い", "良い", "まずまず", "容認", "不十分", "失格"],
  //     senderId: "r2beUc7wMraEc7YAcM5tK9X7Rtn1",
  //     state: "ongoing",
  //     title: "好きな季節投票",
  //     docId: "zJjBNEVkCx3M7ztJiKpX"
  //   })
  // }

  //UI
  if (user === null) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          データベースに接続中
        </Message>
      </div>
    )
  }

  return (
    <div css={layoutStyle}>
      <Message isLoading={false}>
        ルーム名を検索して投票に参加
      </Message>
      <SearchBox value={enteredTitle} placeholder="ルーム名を入力" onChange={handleTitleChange} onEnterKey={handleOnClick} />
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
`

export default IndexPage