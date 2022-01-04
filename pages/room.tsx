import React, { useState, useEffect, useLayoutEffect, useRef } from 'react'
import { db } from '../lib/firebase'
import { useRouter } from 'next/router'
import queryString from 'query-string'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { roomDataState, personalRankState, attendedRoomIdsState } from '../recoil/atom'
import { useAuthenticate } from '../hooks/auth'
import { useStrictUpdateEffect } from '../hooks/useStrictUpdateEffect'
import RoomTemplate from '../components/templates/RoomTemplate'

const RoomPage: React.FC = () => {
  const user = useAuthenticate()
  const router = useRouter()
  const [enteredTitle, setEnteredTitle] = useState("")
  const [roomData, setRoomData] = useRecoilState(roomDataState)
  const [attendedRoomIds, setAttendedRoomIds] = useRecoilState(attendedRoomIdsState)
  const [hasVoted, setHasVoted] = useState(false)
  const setPersonalRank = useSetRecoilState(personalRankState)
  const didSetAttendedRoomsRef = useRef(false)

  //Set enteredTitle
  useLayoutEffect(() => {
    const queryParsed = queryString.parse(router.asPath.split(/\?/)[1])
    if (Object.keys(queryParsed).length === 0) { return }
    const q = queryParsed.q as string
    setEnteredTitle(q)
  }, [])

  //Set roomData
  useStrictUpdateEffect(() => {
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

  //Set attendedRoomIds
  useEffect(() => {
    if (user) {
      if (didSetAttendedRoomsRef.current === false) {
        didSetAttendedRoomsRef.current = true

        const getAttendedRoomIds = async () => {
          const userId = user.uid
          db.collection("users").doc(userId).get().then((doc) => {
            if (doc.exists) {
              const docData = doc.data()
              const roomIds = docData.attendedRooms === undefined ? [] : docData.attendedRooms
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
      }
    }
  }, [user])

  //Set hasVoted
  useEffect(() => {
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
  return (
    <RoomTemplate
      user={user}
      roomData={roomData}
      hasVoted={hasVoted}
      handleOnClick={handleOnClick}
    />
  )
}

export default RoomPage