import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { db } from '../../lib/firebase'
import Card from '../../components/atoms/card'
import SupportingTextCell from '../../components/atoms/supportingTextCell'
import TextCell from '../../components/atoms/textCell'
import Spacer from '../../components/atoms/spacer'
import Message from '../../components/blocks/message'
import { useRecoilValue } from 'recoil'
import { roomDataState } from '../../recoil/atom'
import { ruleDisplayNames, ruleNames } from '../../structs/rules'
import RankResultTable from '../../components/blocks/rankResultTable'
import { useRouter } from 'next/router'

const ResultPage: React.FC = () => {
  const roomData = useRecoilValue(roomDataState)
  const router = useRouter()
  const [personalRanks, setPersonalRanks] = useState([])

  useEffect(() => {
    if (roomData.isPlaceholder === true) {
      router.push("/")
    }
  }, [])

  useEffect(() => {
    const unsubscribe = db.collection("rooms").doc(roomData.docId).collection("votes")
      .onSnapshot((snapshot) => {
        console.log("listening to documents")
        let ranks = personalRanks
        snapshot.docChanges().forEach((change) => {
          if (change.type === "added") {
            ranks.push(change.doc.data().personalRank)
          }
        });
        setPersonalRanks(ranks)
        console.log("ranks", ranks)
      }, (error) => {
        console.error("Error getting documents: ", error)
        toError()
      })

    return () => {
      console.log("unsubscribed")
      unsubscribe()
    }
  }, [])

  const toError = () => {
    router.push("/error")
  }

  //UI
  const Table = () => {
    switch (roomData.rule) {
      case ruleNames.majorityRule:
        return <RankResultTable personalRanks={personalRanks} />
      case ruleNames.bordaRule:
      case ruleNames.condorcetRule:
        return <RankResultTable personalRanks={personalRanks} />
      case ruleNames.majorityJusgement:
        return <RankResultTable personalRanks={personalRanks} />
    }
  }

  if (personalRanks.length === 0) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={true}>
          読み込み中
        </Message>
      </div>
    )
  }

  return (
    <div css={layoutStyle}>
      <Card isAccordion={false}>
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
        <Table />
        <SupportingTextCell shouldAlignLeft={false}>
          {personalRanks.length}人が投票済み
        </SupportingTextCell>
        <Spacer y="15px" />

        <SupportingTextCell shouldAlignLeft={true}>
          この投票は{ruleDisplayNames[roomData.rule]}で集計されました。
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