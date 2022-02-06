import React from 'react'
import { css } from '@emotion/react'
import { User } from '../../types/User.type'
import Message from '../ui/Message'
import SearchBox from '../functional/SearchBox'
import SupportingTextCell from '../ui/SupportingTextCell'
import { supportingTextColor } from '../../styles/colors'

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
      <SearchBox
        value={props.enteredTitle}
        placeholder="ルーム名を入力"
        onChange={props.handleTitleChange}
        onEnterKey={props.handleOnClick}
      />
      <div css={spacerStyle} />
      <SupportingTextCell textAlign="center">
        <a
          href="https://www.eraberule.com/terms"
          target="_blank"
          rel="noopener noreferrer"
          css={linkStyle}
        >
          利用規約
        </a>
        に同意した上でアプリの利用を開始してください。
      </SupportingTextCell>
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
`
const spacerStyle = css`
  height: 38vh;
`
const linkStyle = css`
  color: ${supportingTextColor};
  text-decoration: underline;
`

export default IndexTemplate