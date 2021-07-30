import React from 'react'
import { css } from '@emotion/react'
import TabDescription from '../components/blocks/tabDescription'
import { bgBlueColor } from '../styles/colors'
import Button from '../components/atoms/button'
import { useRouter } from 'next/router'

const Create: React.FC = () => {
  const router = useRouter()

  const toNewRoom = () => {
    router.push("/create/new")
  }

  return (
    <div css={layoutStyle}>
      <TabDescription>
        新しい投票ルームを作成
      </TabDescription>
      <Button onClick={toNewRoom}>作成</Button>
    </div>
  )
}

const layoutStyle = css`
  min-height: 100vh;
  background-color: ${bgBlueColor};
  text-align: center;
`

export default Create