import React, { useState, useEffect } from 'react'
import { db } from '../../lib/firebase'
import { useRecoilValue } from 'recoil'
import { roomDataState } from '../../recoil/atom'
import { useRouter } from 'next/router'
import { useStrictEffect } from '../../hooks/useStrictEffect'
import { useAuthenticate } from '../../hooks/auth'
import ResultTemplate from '../../components/templates/ResultTemplate'

const ResultPage: React.FC = () => {
  const user = useAuthenticate()
  //PROD
  const roomData = useRecoilValue(roomDataState)
  //DEV
  // const [roomData, setRoomData] = useRecoilState(roomDataState)
  const router = useRouter()
  const [personalRanks, setPersonalRanks] = useState([])

  //PROD
  //Push router when reloaded
  useEffect(() => {
    if (roomData.isPlaceholder === true) {
      router.push("/")
    }
  }, [])

  //PROD
  // Set personalRanks
  useStrictEffect(() => {
    const unsubscribe = db.collection("rooms").doc(roomData.docId).collection("votes")
      .onSnapshot((snapshot) => {
        const newRanks = snapshot.docChanges().map((change) => {
          if (change.type === "added") {
            return change.doc.data().personalRank
          }
        })
        setPersonalRanks(newRanks)
      }, (error) => {
        console.error("Error getting documents: ", error)
        // toError()
      })

    return () => {
      unsubscribe()
    }
  }, [])

  // DEV
  // useEffect(() => {
  //   setRoomData({
  //     explanation: "みんなが好きな季節を投票で決めよう!",
  //     options: [
  //       "春",
  //       "夏",
  //       "秋",
  //       "冬"
  //     ],
  //     rule: "condorcetRule",
  //     senderId: "r2beUc7wMraEc7YAcM5tK9X7Rtn1",
  //     state: "ongoing",
  //     title: "好きな季節投票",
  //     docId: "zJjBNEVkCx3M7ztJiKpX"
  //   })
  //   setPersonalRanks(
  //     [
  //       [1, 2, 3, 4],
  //       [2, 1, 3, 4],
  //       [3, 4, 1, 2],
  //       [3, 2, 1, 4],
  //       [1, 2, 3, 4],
  //       [2, 1, 3, 4]
  //     ]
  //   )
  // }, [])

  //DEV
  useEffect(() => {
    console.log("personalRanks", personalRanks)
  }, [personalRanks])

  const toError = () => {
    router.push("/error")
  }

  //UI
  return (
    <ResultTemplate
      user={user}
      roomData={roomData}
      personalRanks={personalRanks}
    />
  )
}

export default ResultPage