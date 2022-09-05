import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import IndexTemplate from '../components/templates/IndexTemplate'
import { useSetRecoilState } from 'recoil'
import { roomDataState } from '../states/atoms'
import { anySpaceToSingleSpace } from '../utils/anySpaceToSingleSpace'
import { useAuth } from '../auth/useAuth'
import { signIn } from '../auth/auth'

const IndexPage: React.FC = () => {
  const { user, isLoading } = useAuth()
  const router = useRouter()
  const [enteredTitle, setEnteredTitle] = useState("")
  const setRoomData = useSetRecoilState(roomDataState)

  //
  useEffect(() => {
    if (!user) {
      signIn()
    }
  }, [])

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
  //
  if (isLoading) {
    return (
      <div>
        Loading...
      </div>
    )
  }

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