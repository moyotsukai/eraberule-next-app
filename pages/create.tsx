import React from 'react'
import { css } from '@emotion/react'
import Button from '../components/atoms/button'
import { useRouter } from 'next/router'
import Message from '../components/blocks/message'

const CreatePage: React.FC = () => {
  const router = useRouter()

  const toNewRoom = () => {
    router.push("/create/new")
  }

  return (
    <div css={layoutStyle}>
      <Message isLoading={false}>
        新しい投票ルームを作成
      </Message>
      <Button
        onClick={toNewRoom}
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

export default CreatePage