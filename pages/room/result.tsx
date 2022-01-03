import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { db } from '../../lib/firebase'
import Card from '../../components/atoms/card'
import SupportingTextCell from '../../components/atoms/supportingTextCell'
import TextCell from '../../components/atoms/textCell'
import Spacer from '../../components/atoms/spacer'
import Message from '../../components/blocks/message'
import { useRecoilState, useRecoilValue } from 'recoil'
import { roomDataState } from '../../recoil/atom'
import { ruleDisplayNames, ruleNames } from '../../types/rules'
import RankResultTable from '../../components/blocks/rankResultTable'
import { useRouter } from 'next/router'
import { useStrictEffect } from '../../hooks/useStrictEffect'
import { useAuthenticate } from '../../hooks/auth'

const ResultPage: React.FC = () => {
  const user = useAuthenticate()
  //PROD
  const roomData = useRecoilValue(roomDataState)
  //DEV
  // const [roomData, setRoomData] = useRecoilState(roomDataState)
  const router = useRouter()
  const [personalRanks, setPersonalRanks] = useState([])

  //PROD
  //Push router when reloaded
  useEffect(() => {
    if (roomData.isPlaceholder === true) {
      router.push("/")
    }
  }, [])

  //PROD
  // Set personalRanks
  useStrictEffect(() => {
    const unsubscribe = db.collection("rooms").doc(roomData.docId).collection("votes")
      .onSnapshot((snapshot) => {
        const newRanks = snapshot.docChanges().map((change) => {
          if (change.type === "added") {
            return change.doc.data().personalRank
          }
        })
        setPersonalRanks(newRanks)
      }, (error) => {
        console.error("Error getting documents: ", error)
        // toError()
      })

    return () => {
      unsubscribe()
    }
  }, [])

  // DEV
  // useEffect(() => {
  //   setRoomData({
  //     explanation: "みんなが好きな季節を投票で決めよう!",
  //     options: [
  //       "春",
  //       "夏",
  //       "秋",
  //       "冬"
  //     ],
  //     rule: "condorcetRule",
  //     senderId: "r2beUc7wMraEc7YAcM5tK9X7Rtn1",
  //     state: "ongoing",
  //     title: "好きな季節投票",
  //     docId: "zJjBNEVkCx3M7ztJiKpX"
  //   })
  //   setPersonalRanks(
  //     [
  //       [1, 2, 3, 4],
  //       [2, 1, 3, 4],
  //       [3, 4, 1, 2],
  //       [3, 2, 1, 4],
  //       [1, 2, 3, 4],
  //       [2, 1, 3, 4]
  //     ]
  //   )
  // }, [])

  //DEV
  useEffect(() => {
    console.log("personalRanks", personalRanks)
  }, [personalRanks])

  const toError = () => {
    router.push("/error")
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

  if (personalRanks.length === 0) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={true}>
          読み込み中...
        </Message>
      </div>
    )
  }

  return (
    <div css={layoutStyle}>
      <SupportingTextCell shouldAlignLeft={false}>
        ・ライブ
      </SupportingTextCell>

      <Card>
        <SupportingTextCell shouldAlignLeft={true}>
          タイトル
        </SupportingTextCell>
        <TextCell>
          {roomData.title}
        </TextCell>
        <Spacer y="15px" />

        <SupportingTextCell shouldAlignLeft={true}>
          結果
        </SupportingTextCell>

        <RankResultTable roomData={roomData} personalRanks={personalRanks} />

        <SupportingTextCell shouldAlignLeft={false}>
          {personalRanks.length}人が投票済み
        </SupportingTextCell>
        <Spacer y="15px" />

        <SupportingTextCell shouldAlignLeft={true}>
          この投票は{ruleDisplayNames[roomData.rule]}で集計されました。
        </SupportingTextCell>
      </Card>

      <Card>
        <SupportingTextCell shouldAlignLeft={true}>
          詳細
        </SupportingTextCell>
      </Card>

      <Card>
        <SupportingTextCell shouldAlignLeft={true}>
          もし〇〇だったら
        </SupportingTextCell>
      </Card>
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  text-align: center;
`

export default ResultPage