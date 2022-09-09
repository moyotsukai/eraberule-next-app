import React from 'react'
import { css } from '@emotion/react'
import { User } from '../../types/User.type'
import Message from '../ui/Message'
import ToVoteCard from '../functional/ToVoteCard'
import { Room } from '../../types/Room.type'
import { useLocale } from '../../i18n/useLocale'

type Props = {
  user: User | undefined | null
  roomData: Room | null
  hasVoted: boolean | undefined
  handleOnClick: () => void
}

const RoomTemplate: React.FC<Props> = (props) => {
  const { t } = useLocale()
  const localizedString = t.templates.roomTemplate

  if (props.user === undefined || props.roomData === undefined) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          {localizedString.loading}
        </Message>
      </div>
    )
  }

  if (props.user === null) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          {localizedString.notConnected}
        </Message>
      </div>
    )
  }

  if (props.roomData === null) {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          {localizedString.noResults}
        </Message>
      </div>
    )
  }

  if (props.roomData.state === "closed") {
    return (
      <div css={layoutStyle}>
        <Message isLoading={false}>
          {localizedString.closedRoom}
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