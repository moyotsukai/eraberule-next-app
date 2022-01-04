import React from 'react'
import { css } from '@emotion/react'
import { User } from '../../types/User.type'
import Message from '../blocks/message'
import Button from '../atoms/button'

type Props = {
  user: User | undefined | null
  toNewRoom: () => void
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
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  text-align: center;
`

export default CreateTemplate