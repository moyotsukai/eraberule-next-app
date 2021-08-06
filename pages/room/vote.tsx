import React, { useState, useEffect, useRef } from 'react'
import { css } from '@emotion/react'
import { firebase, db } from '../../lib/firebase'
import { useRouter } from 'next/router'
import Button from '../../components/atoms/button'
import Message from '../../components/blocks/message'
import VotePageCard from '../../components/blocks/votePageCard'
import { useRecoilValue, useRecoilState } from 'recoil'
import { roomDataState, personalRankState } from '../../recoil/atom'
import { ruleNames } from '../../structs/rules'

const VotePage: React.FC = () => {
  //RECOIL
  const roomData = useRecoilValue(roomDataState)
  const [personalRank, setPersonalRank] = useRecoilState(personalRankState)
  const router = useRouter()

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

  //UI SETUP
  const isConnected = useRef(undefined)
  useEffect(() => {
    if (db === undefined) {
      isConnected.current = false
    }
  }, [])
  const [isEnabled, setIsEnabled] = useState(true)
  const [isClicked, setIsClicked] = useState(false)

  //USER INTERACTION
  const sendVote = () => {
    console.log("send")
    setIsClicked(true)
    setIsEnabled(false)
  }

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

  // if (isConnected.current === false) {
  //   return (
  //     <div css={layoutStyle}>
  //       <Message isLoading={false}>
  //         データベースに接続できません。
  //       </Message>
  //     </div>
  //   )
  // }

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
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  text-align: center;
`

export default VotePage