import React from 'react'
import { css } from '@emotion/react'
import { User } from '../../types/User.type'
import Message from '../ui/Message'
import { Room } from '../../types/Room.type'
import VotePageCard from '../functional/VotePageCard'
import Button from '../ui/Button'
import Spacer from '../ui/Spacer'
import { useLocale } from '../../i18n/useLocale'

type Props = {
  user: User | undefined | null
  roomData: Room | null
  isClicked: boolean
  isEnabled: boolean
  sendVote: () => void
}

const VoteTemplate: React.FC<Props> = (props) => {
  const { t } = useLocale()
  const localizedString = t.templates.voteTemplate

  // if (props.user === undefined) {
  //   return (
  //     <div css={layoutStyle}>
  //       <Message isLoading={false}>
  //         {localizedString.loading}
  //       </Message>
  //     </div>
  //   )
  // }

  // if (props.user === null) {
  //   return (
  //     <div css={layoutStyle}>
  //       <Message isLoading={false}>
  //         {localizedString.notConnected}
  //       </Message>
  //     </div>
  //   )
  // }

  return (
    // <div css={layoutStyle}>
    //   <VotePageCard isEnabled={!props.isClicked} />

    //   <Button
    //     onClick={props.sendVote}
    //     isEnabled={props.isEnabled}
    //     isLoading={props.isClicked}
    //   >
    //     {props.isClicked ? localizedString.sending : localizedString.send}
    //   </Button>
    //   <Spacer y="35px" />
    // </div>
  )
}

// const layoutStyle = css`
//   min-height: 100vh;
//   text-align: center;
//   padding: 0 15px;
//   `

export default VoteTemplate