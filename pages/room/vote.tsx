import React, { useState, useEffect } from 'react'
import { css } from '@emotion/react'
import { firebase, db } from '../../lib/firebase'
import { useRouter } from 'next/router'
import Card from '../../components/atoms/card'
import TextCell from '../../components/atoms/textCell'
import SupportingTextCell from '../../components/atoms/supportingTextCell'
import Button from '../../components/atoms/button'
import Spacer from '../../components/atoms/spacer'
import Message from '../../components/blocks/message'
import queryString from 'query-string'
import { Room } from '../../structs/room'
import { ruleDisplayNames } from '../../structs/rules'

const VotePage: React.FC = () => {
  const [roomData, setRoomData] = useState(undefined)

  const [isConnected, setIsConnected] = useState(undefined)
  if (db === undefined) { setIsConnected(false) }

  const router = useRouter()

  useEffect(() => {
    const queryParsed = queryString.parse(router.asPath.split(/\?/)[1])
    if (Object.keys(queryParsed).length === 0) { router.push("/") }
    setRoomData(queryParsed)
    console.log("roomData", roomData)
  }, [])

  const sendVote = () => {
    console.log("send")
  }

  if (roomData === undefined) {
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

        {roomData.explanation !== "" &&
          <React.Fragment>
            <SupportingTextCell shouldAlignLeft={true}>
              説明
            </SupportingTextCell>
            <TextCell>
              {roomData.explanation}
            </TextCell>
            <Spacer y="15px" />
          </React.Fragment>
        }

        <SupportingTextCell shouldAlignLeft={true}>
          候補
        </SupportingTextCell>
        {roomData.options.map((option, index) => {
          <TextCell key={index}>
            {option}
          </TextCell>
        })}
        <Spacer y="15px" />

        <SupportingTextCell shouldAlignLeft={true}>
          この投票は{ruleDisplayNames[roomData.rule]}で集計されます。
        </SupportingTextCell>
      </Card>
      <Button onClick={sendVote}>送信</Button>
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  text-align: center;
`

export default VotePage