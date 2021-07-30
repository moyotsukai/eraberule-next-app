import React from 'react'
import { css } from '@emotion/react'
import { firebase, db } from '../lib/firebase'

const buttonClicked = () => {
  const enteredTitle = "好きな季節投票"
  const roomsRef = db.collection("rooms")
  let roomData = undefined

  db.collection("rooms").where("title", "==", enteredTitle)
    .get()
    .then((querySnapshot) => {
      querySnapshot.forEach((doc) => {
        roomData = doc.data()
        console.log("docData", doc.data())
      })
    })
}

const Room: React.FC = () => {
  return (
    <div>
      <h1 css={style}>Hello!</h1>
      <button onClick={buttonClicked}>button</button>
    </div>
  )
}

const style = css`
  color: blue;
`

export default Room