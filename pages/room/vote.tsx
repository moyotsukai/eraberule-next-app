import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { firebase, db } from '../../lib/firebase'
import { useRouter } from 'next/router'
import Button from '../../components/atoms/button'
import Message from '../../components/blocks/message'
import VotePageCard from '../../components/blocks/votePageCard'
import Spacer from '../../components/atoms/spacer'
import { useRecoilValue, useRecoilState } from 'recoil'
import { roomDataState, personalRankState } from '../../recoil/atom'
import { ruleNames } from '../../structs/rules'
import { useAuthenticate } from '../../hooks/auth'

const VotePage: React.FC = () => {
  //STATE
  const user = useAuthenticate()
  const roomData = useRecoilValue(roomDataState)
  const [personalRank, setPersonalRank] = useRecoilState(personalRankState)
  const router = useRouter()
  const [isEnabled, setIsEnabled] = useState(true)
  const [isClicked, setIsClicked] = useState(false)

  useEffect(() => {
    if (roomData.isPlaceholder === true) {
      router.push("/")
    }
  }, [])

  useEffect(() => {
    return () => {
      setPersonalRank([])
      console.log("Page unmounted")
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

  //USER INTERACTION
  const sendVote = () => {
    console.log("send")
    setIsClicked(true)
    setIsEnabled(false)
    console.log("roomData", roomData)

    sendRoomData().then(() => {
      console.log("did send roomData")
      sendAttendance().then(() => {
        console.log("did send attendance")
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
  }

  const toResult = () => {
    console.log("roResult")
    router.push("/room/result")
  }

  //RETURN
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