import React from 'react'
import { css } from '@emotion/react'
import { User } from '../../types/User.type'
import Message from '../ui/Message'
import Button from '../ui/Button'
import SupportingTextCell from '../ui/SupportingTextCell'
import CardButton from '../ui/CardButton'
import { useLocale } from '../../hooks/useLocale'

type Props = {
  user: User | undefined | null
  toNewRoom: () => void
  recentlyCreatedRoomTitle: string | undefined | null
  toRecentlyCreatedRoom: () => void
}

const CreateTemplate: React.FC<Props> = (props) => {
  const { t } = useLocale()
  const localizedString = t.templates.createTemplate

  if (props.user === undefined) {
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

  return (
    <div css={layoutStyle}>
      <Message isLoading={false}>
        {localizedString.createNew}
      </Message>
      <Button
        onClick={props.toNewRoom}
        isEnabled={true}
        isLoading={false}
      >
        {localizedString.create}
      </Button>

      {props.recentlyCreatedRoomTitle &&
        <React.Fragment>
          <div css={spacerStyle} />
          <div css={recentlyCreatedRoomContainerStyle}>
            <SupportingTextCell textAlign="left">
              {localizedString.recentRoom}
            </SupportingTextCell>
            <CardButton onClick={props.toRecentlyCreatedRoom}>
              {props.recentlyCreatedRoomTitle}
            </CardButton>
          </div>
        </React.Fragment>
      }
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  text-align: center;
  padding: 0 15px;
`
const recentlyCreatedRoomContainerStyle = css`
  margin: 0 auto;
  max-width: 600px;
  padding: 0 5px;

  @media(min-width: 500px) {
    padding: 15px 10px;
  }
`
const spacerStyle = css`
  height: 38vh;
`

export default CreateTemplate