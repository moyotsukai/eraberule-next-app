import React, { useEffect, useLayoutEffect, useRef, useState } from 'react'
import { css } from '@emotion/react'
import { useRouter } from 'next/router'
import { attendedRoomIdsState, hasNoUserDocState, personalRankState, roomDataState } from '../../states/atoms'
import { useRecoilState, useRecoilValue } from 'recoil'
import SignInProvider from '../common/SignInProvider'
import { useLocale } from '../../i18n/useLocale'
import { useAuth } from '../../model/auth/useAuth'
import VotePageCard from '../functional/VotePageCard'
import Button from '../ui/Button'
import Spacer from '../ui/Spacer'
import { T_VOTE } from '../../locales/votePage'
import { setVoteDocData } from '../../model/firestore/setVoteDocData'
import { userDocDataToFirebase, voteToFirestore } from '../../model/firestore/dataConverter'
import { setUserDocData } from '../../model/firestore/setUserDocData'
import { asyncTask } from '../../utils/asyncTask'
import { RULE_NAMES } from '../../rules/ruleNames'
import { log } from '../../utils/log'
import { updateUserDocData } from '../../model/firestore/updateUserDocData'

const VotePage: React.FC = () => {
  const { user } = useAuth()
  const router = useRouter()
  const roomData = useRecoilValue(roomDataState)
  const personalRank = useRecoilValue(personalRankState)
  const [attendedRoomIds, setAttendedRoomIds] = useRecoilState(attendedRoomIdsState)
  const [hasNoUserDoc, setHasNoUserDoc] = useRecoilState(hasNoUserDocState)
  const [isEnabled, setIsEnabled] = useState<boolean>(true)
  const [isClicked, setIsClicked] = useState<boolean>(false)
  const didSendRef = useRef<boolean>(false)
  const { t } = useLocale(T_VOTE)

  //Push router when reloaded
  useEffect(() => {
    log("vote page first rendered")
    if (!roomData.title) {
      router.push("/")
    }
  }, [])

  //Set isEnabled
  useLayoutEffect(() => {
    switch (roomData.rule) {
      case RULE_NAMES.MAJORITY_RULE:
        setIsEnabled(personalRank.indexOf(1) !== -1)
        break
      case RULE_NAMES.BORDA_COUNT_METHOD:
      case RULE_NAMES.CONDORCET_METHOD:
      case RULE_NAMES.MAJORITY_JUDGEMENT:
        setIsEnabled(personalRank.indexOf(0) === -1)
        break
    }
  }, [personalRank])

  const onSend = () => {
    if (didSendRef.current) { return }
    didSendRef.current = true
    setIsClicked(true)
    setIsEnabled(false)

    asyncTask(async () => {
      //Send vote
      const vote = voteToFirestore({
        personalRank: personalRank
      })
      await setVoteDocData({ roomData: roomData, data: vote })

      //Send attendance
      const newAttendedRoomIds = [roomData.docId, ...attendedRoomIds]
      const userDocData = hasNoUserDoc
        ? userDocDataToFirebase({
          attendedRooms: newAttendedRoomIds,
          createdRooms: []
        })
        : userDocDataToFirebase({
          attendedRooms: newAttendedRoomIds
        })
      if (hasNoUserDoc) {
        await setUserDocData({ userId: user.uid, data: userDocData })
        setHasNoUserDoc(false)
      } else {
        await updateUserDocData({ userId: user.uid, data: userDocData })
      }

      //Set attended room ids globally
      setAttendedRoomIds(newAttendedRoomIds)

      //Finally
      toResult()
    })
  }

  const toResult = () => {
    router.push("/room/result")
  }

  return (
    <SignInProvider>
      <div css={layoutStyle}>
        <VotePageCard isEnabled={!isClicked} />

        <Button
          onClick={onSend}
          isEnabled={isEnabled}
          isLoading={isClicked}
        >
          {isClicked ? t.SENDING : t.SEND}
        </Button>
        <Spacer y="35px" />
      </div>
    </SignInProvider>
  )
}

const layoutStyle = css`
  padding: 0 15px;
  `

export default VotePage