import React, { useState, useEffect, useRef } from 'react'
import { db } from '../lib/firebase'
import { useRouter } from 'next/router'
import { useSetRecoilState, useRecoilState } from 'recoil'
import { roomDataState, personalRankState, attendedRoomIdsState, hasNoUserDocState } from '../recoil/atom'
import { useAuthenticate } from '../hooks/auth'
import { useStrictUpdateEffect } from '../hooks/useStrictUpdateEffect'
import RoomTemplate from '../components/templates/RoomTemplate'
import { useQuery } from '../hooks/useQuery'

const RoomPage: React.FC = () => {
  const user = useAuthenticate()
  const router = useRouter()
  const [roomData, setRoomData] = useRecoilState(roomDataState)
  const setHasNoUserDoc = useSetRecoilState(hasNoUserDocState)
  const didSetAttendedRoomsRef = useRef(false)
  const [attendedRoomIds, setAttendedRoomIds] = useRecoilState(attendedRoomIdsState)
  const [hasVoted, setHasVoted] = useState(undefined)
  const setPersonalRank = useSetRecoilState(personalRankState)

  //Set enteredTitle
  const enteredTitle = useQuery("q")

  //Set roomData
  useStrictUpdateEffect(() => {
    const getRoomData = async (title: string) => {
      if (!title) {
        router.push("/")
        return
      }
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
          toError()
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
              setHasNoUserDoc(false)
            } else {
              setAttendedRoomIds([])
              setHasNoUserDoc(true)
            }
          }).catch((error) => {
            console.error("Error getting documents: ", error)
            toError()
          })
        }

        getAttendedRoomIds()
      }
    }
  }, [user])

  //Set hasVoted
  useEffect(() => {
    if (roomData === null) { return }
    if (!roomData.title) { return }
    if (attendedRoomIds === undefined) { return }

    if (attendedRoomIds.includes(roomData.docId)) {
      setHasVoted(true)
    } else {
      setHasVoted(false)
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

  const toError = () => {
    router.push({
      pathname: "/error"
    })
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