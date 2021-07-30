import React, { useState } from 'react'
import { css } from '@emotion/react'
import TabDescription from '../components/blocks/tabDescription'
import SearchBox from '../components/blocks/searchBox'
import { bgBlueColor } from '../styles/colors'
import { useRouter } from 'next/router'

const IndexPage: React.FC = () => {
  const router = useRouter()
  const [enteredTitle, setEnteredTitle] = useState("")

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value)
    console.log(enteredTitle)
  }

  const toRoom = () => {
    router.push("/room")
  }

  return (
    <div css={layoutStyle}>
      <TabDescription>
        ルーム名を検索して投票に参加
      </TabDescription>
      <SearchBox value={enteredTitle} placeholder="ルーム名を入力" onChange={handleTitleChange} onEnterKey={toRoom} />
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  background-color: ${bgBlueColor};
`

export default IndexPage