import React from 'react'
import { css } from '@emotion/react'
import { User } from '../../types/User.type'
import Message from '../blocks/message'
import SearchBox from '../blocks/searchBox'

type Props = {
  user: User | undefined | null
  enteredTitle: string
  handleTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  handleOnClick: () => void
}

const IndexTemplate: React.FC<Props> = (props) => {
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
        ルーム名を検索して投票に参加
      </Message>
      <SearchBox value={props.enteredTitle} placeholder="ルーム名を入力" onChange={props.handleTitleChange} onEnterKey={props.handleOnClick} />
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
`

export default IndexTemplate