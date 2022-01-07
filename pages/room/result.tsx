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
  const roomData = useRecoilValue(roomDataState)
  const router = useRouter()
  const [personalRanks, setPersonalRanks] = useState([])

  //Push router when reloaded
  useEffect(() => {
    if (roomData.isPlaceholder === true) {
      router.push("/")
    }
  }, [])

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