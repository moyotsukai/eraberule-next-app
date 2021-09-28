import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { db } from '../../lib/firebase'
import { useRouter } from 'next/router'
import Button from '../../components/atoms/button'
import Message from '../../components/blocks/message'
import VotePageCard from '../../components/blocks/votePageCard'
import Spacer from '../../components/atoms/spacer'
import { useRecoilValue, useRecoilState } from 'recoil'
import { roomDataState, personalRankState, attendedRoomIdsState } from '../../recoil/atom'
import { ruleNames } from '../../structs/rules'
import { useAuthenticate } from '../../hooks/auth'

const VotePage: React.FC = () => {
  const user = useAuthenticate()
  const roomData = useRecoilValue(roomDataState)
  const [personalRank, setPersonalRank] = useRecoilState(personalRankState)
  const router = useRouter()
  const [isEnabled, setIsEnabled] = useState(true)
  const [isClicked, setIsClicked] = useState(false)
  const [attendedRoomIds, setAttendedRoomIds] = useRecoilState(attendedRoomIdsState)

  useEffect(() => {
    if (roomData.isPlaceholder === true) {
      router.push("/")
    }
  }, [])

  useEffect(() => {
    console.log("roomData", roomData)

    return () => {
      setPersonalRank([])
    }
  }, [])

  useEffect(() => {
    switch (roomData.rule) {
      case ruleNames.majorityRule:
        setIsEnabled(personalRank.indexOf(1) !== -1)
        break
      case ruleNames.bordaRule:
      case ruleNames.condorcetRule:
      case ruleNames.majorityJusgement:
        setIsEnabled(personalRank.indexOf(0) === -1)
        break
    }
  }, [personalRank])

  const sendVote = () => {
    setIsClicked(true)
    setIsEnabled(false)

    sendRoomData().then(() => {
      sendAttendance().then(() => {
        console.log("attended room ids", attendedRoomIds)
        toResult()
      })
    })
  }

  const sendRoomData = async () => {
    console.log("sendRoomData")
    const votesRef = db.collection("rooms").doc(roomData.docId).collection("votes").doc()
    votesRef.set({
      personalRank: personalRank,
      date: new Date()
    })
  }

  const sendAttendance = async () => {
    console.log("sendAttendance")
    const userId = user.uid
    const roomIds = attendedRoomIds
    const newAttendedRoomIds = [
      roomData.docId,
      ...roomIds
    ]
    setAttendedRoomIds(newAttendedRoomIds)
    db.collection("users").doc(userId).set({
      attendedRooms: newAttendedRoomIds,
      createdRooms: [],
      date: new Date()
    })
  }

  const toResult = () => {
    router.push("/room/result")
  }

  const toError = () => {
    router.push("/error")
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

  return (
    <div css={layoutStyle}>
      <VotePageCard isEnabled={!isClicked} />

      <Button
        onClick={sendVote}
        isEnabled={isEnabled}
        isLoading={isClicked}
      >
        {isClicked ? "送信中" : "送信"}
      </Button>
      <Spacer y="35px" />
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  text-align: center;
`

export default VotePage