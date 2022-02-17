import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthenticate } from '../hooks/auth'
import IndexTemplate from '../components/templates/IndexTemplate'
import { useSetRecoilState } from 'recoil'
import { roomDataState } from '../states/atoms'
import { anySpaceToSingleSpace } from '../utils/anySpaceToSingleSpace'

const IndexPage: React.FC = () => {
  const user = useAuthenticate()
  const router = useRouter()
  const [enteredTitle, setEnteredTitle] = useState("")
  const setRoomData = useSetRecoilState(roomDataState)

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value)
  }

  const handleOnClick = () => {
    if (!isValidTitle) { return }
    toRoom()
  }

  const isValidTitle = () => {
    if (enteredTitle === "") { return false }
    return true
  }

  const toRoom = () => {
    setRoomData(undefined)

    router.push({
      pathname: "/room",
      query: { q: anySpaceToSingleSpace(enteredTitle) }
    })
  }

  //UI
  return (
    <IndexTemplate
      user={user}
      enteredTitle={enteredTitle}
      handleTitleChange={handleTitleChange}
      handleOnClick={handleOnClick}
    />
  )
}

export default IndexPage