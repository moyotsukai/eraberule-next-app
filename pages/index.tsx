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

  //Dev
  // const setTestData = () => {
  //   setRoomData({
  //     explanation: "みんなが好きな季節を投票で決めよう！",
  //     options: [
  //       "春",
  //       "夏",
  //       "秋",
  //       "冬"
  //     ],
  //     rule: "majorityJusgement",
  //     commonLanguage: ["非常に良い", "良い", "まずまず", "容認", "不十分", "失格"],
  //     senderId: "r2beUc7wMraEc7YAcM5tK9X7Rtn1",
  //     state: "ongoing",
  //     title: "好きな季節投票",
  //     docId: "zJjBNEVkCx3M7ztJiKpX"
  //   })
  // }

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