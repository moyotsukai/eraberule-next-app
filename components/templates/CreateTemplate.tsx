import React from 'react'
import { css } from '@emotion/react'
import { User } from '../../types/User.type'
import Message from '../blocks/message'
import Button from '../atoms/button'
import SupportingTextCell from '../atoms/supportingTextCell'
import TextCell from '../atoms/textCell'
import Spacer from '../atoms/spacer'
import CardButton from '../atoms/CardButton'

type Props = {
  user: User | undefined | null
  toNewRoom: () => void
  recentlyCreatedRoomTitle: string | undefined | null
  toRecentlyCreatedRoom: () => void
}

const CreateTemplate: React.FC<Props> = (props) => {
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
      <Message isLoading={false}>
        新しい投票ルームを作成
      </Message>
      <Button
        onClick={props.toNewRoom}
        isEnabled={true}
        isLoading={false}
      >
        作成
      </Button>

      {props.recentlyCreatedRoomTitle &&
        <React.Fragment>
          <div css={spaerStyle} />
          <div css={recentlyCreatedRoomContainerStyle}>
            <SupportingTextCell shouldAlignLeft={true}>
              最近作成したルーム
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
const spaerStyle = css`
  height: 40vh;
`

export default CreateTemplate