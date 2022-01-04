import React, { useState, useEffect, useRef } from 'react'
import { db } from '../../lib/firebase'
import { useRouter } from 'next/router'
import { useRecoilValue, useRecoilState } from 'recoil'
import { roomDataState, personalRankState, attendedRoomIdsState } from '../../recoil/atom'
import { ruleNames } from '../../types/rules'
import { useAuthenticate } from '../../hooks/auth'
import VoteTemplate from '../../components/templates/VoteTemplate'

const VotePage: React.FC = () => {
  const user = useAuthenticate()
  const router = useRouter()
  const roomData = useRecoilValue(roomDataState)
  const [personalRank, setPersonalRank] = useRecoilState(personalRankState)
  const [isEnabled, setIsEnabled] = useState(true)
  const [isClicked, setIsClicked] = useState(false)
  const [attendedRoomIds, setAttendedRoomIds] = useRecoilState(attendedRoomIdsState)
  const didSendRef = useRef(false)

  //Push router when reloaded
  useEffect(() => {
    if (roomData.isPlaceholder === true) {
      router.push("/")
    }
  }, [])

  //Set personalRank when unmounted
  useEffect(() => {
    console.log("roomData", roomData)
    return () => {
      setPersonalRank([])
    }
  }, [])

  //Set isEnabled
  useEffect(() => {
    switch (roomData.rule) {
      case ruleNames.majorityRule:
        setIsEnabled(personalRank.indexOf(1) !== -1)
        break
      case ruleNames.bordaRule:
      case ruleNames.condorcetRule:
      case ruleNames.majorityJudgement:
        setIsEnabled(personalRank.indexOf(0) === -1)
        break
    }
  }, [personalRank])

  const sendVote = () => {
    if (didSendRef.current === false) {
      didSendRef.current = true
      setIsClicked(true)
      setIsEnabled(false)

      const sendRoomData = async () => {
        const votesRef = db.collection("rooms").doc(roomData.docId).collection("votes").doc()
        votesRef.set({
          personalRank: personalRank,
          date: new Date()
        })
      }

      const sendAttendance = async () => {
        const userId = user.uid
        const roomIds = attendedRoomIds === undefined ? [] : attendedRoomIds
        const newAttendedRoomIds = [
          roomData.docId,
          ...roomIds
        ]
        console.log("newAttendedRoomIds", newAttendedRoomIds)
        setAttendedRoomIds(newAttendedRoomIds)
        const userRef = db.collection("users").doc(userId)
        userRef.set({
          attendedRooms: newAttendedRoomIds,
          createdRooms: [],
          date: new Date()
        })
      }

      sendRoomData().then(() => {
        sendAttendance().then(() => {
          toResult()
        })
      })
    }
  }

  const toResult = () => {
    router.push("/room/result")
  }

  //UI
  return (
    <VoteTemplate
      user={user}
      roomData={roomData}
      isClicked={isClicked}
      isEnabled={isEnabled}
      sendVote={sendVote}
    />)
}

export default VotePage