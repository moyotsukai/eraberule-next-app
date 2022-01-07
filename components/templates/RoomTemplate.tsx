import React from 'react'
import { css } from '@emotion/react'
import { User } from '../../types/User.type'
import Message from '../blocks/message'
import ToVoteCard from '../blocks/toVoteCard'
import { Room } from '../../types/Room.type'

type Props = {
  user: User | undefined | null
  roomData: Room | null
  hasVoted: boolean | undefined
  handleOnClick: () => void
}

const RoomTemplate: React.FC<Props> = (props) => {
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

  if (props.roomData === null) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          検索結果がありません。
        </Message>
      </div>
    )
  }

  if (props.roomData.state === "closed") {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          このルームは非公開です。
        </Message>
      </div>
    )
  }

  return (
    <div css={layoutStyle}>
      <ToVoteCard
        roomTitle={props.roomData.title}
        hasVoted={props.hasVoted}
        onClick={props.handleOnClick}
      />
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  padding: 0 15px;
`

export default RoomTemplate