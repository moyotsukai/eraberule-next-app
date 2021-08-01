import React, { useState } from 'react'
import { css } from '@emotion/react'
import Message from '../components/blocks/message'
import SearchBox from '../components/blocks/searchBox'
import { useRouter } from 'next/router'

const IndexPage: React.FC = () => {
  const router = useRouter()
  const [enteredTitle, setEnteredTitle] = useState("")

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value)
  }

  const toRoom = () => {
    if (enteredTitle === "") { return }
    router.push({
      pathname: "/room",
      query: { title: enteredTitle }
    })
  }

  return (
    <div css={layoutStyle}>
      <Message isLoading={false}>
        ルーム名を検索して投票に参加
      </Message>
      <SearchBox value={enteredTitle} placeholder="ルーム名を入力" onChange={handleTitleChange} onEnterKey={toRoom} />
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
`

export default IndexPage