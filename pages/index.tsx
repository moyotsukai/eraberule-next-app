import React, { useState } from 'react'
import { useRouter } from 'next/router'
import { useAuthenticate } from '../hooks/auth'
import IndexTemplate from '../components/templates/IndexTemplate'

const IndexPage: React.FC = () => {
  const user = useAuthenticate()
  const router = useRouter()
  const [enteredTitle, setEnteredTitle] = useState("")

  const handleTitleChange = (event) => {
    setEnteredTitle(event.target.value)
  }

  const handleOnClick = async () => {
    if (!isValidTitle) { return }
    toRoom()
  }

  const isValidTitle = () => {
    if (enteredTitle === "") { return false }
    return true
  }

  const toRoom = () => {
    router.push({
      pathname: "/room",
      query: { q: enteredTitle }
    })
  }

  const toError = () => {
    router.push({
      pathname: "/error"
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