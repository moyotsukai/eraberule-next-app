import React from 'react'
import { css } from '@emotion/react'
import { User } from '../../types/User.type'
import Message from '../blocks/message'
import { Room } from '../../types/Room.type'
import VotePageCard from '../blocks/votePageCard'
import Button from '../atoms/button'
import Spacer from '../atoms/spacer'

type Props = {
  user: User | undefined | null
  roomData: Room | null
  isClicked: boolean
  isEnabled: boolean
  sendVote: () => void
}

const VoteTemplate: React.FC<Props> = (props) => {
  if (props.user === undefined) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          読み込み中...
        </Message>
      </div>
    )
  }

  if (props.user === null) {
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
      <VotePageCard isEnabled={!props.isClicked} />

      <Button
        onClick={props.sendVote}
        isEnabled={props.isEnabled}
        isLoading={props.isClicked}
      >
        {props.isClicked ? "送信中" : "送信"}
      </Button>
      <Spacer y="35px" />
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  text-align: center;
  padding: 0 15px;`

export default VoteTemplate