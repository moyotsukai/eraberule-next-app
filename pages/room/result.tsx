import React, { useState, useEffect } from 'react'
import { db } from '../../lib/firebase'
import { useRecoilValue } from 'recoil'
import { roomDataState } from '../../states/atoms'
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
    if (!roomData.title) {
      router.push("/")
    }
  }, [])

  // Set personalRanks
  useStrictEffect(() => {
    const unsubscribe = db.collection("rooms").doc(roomData.docId).collection("votes")
      .onSnapshot((snapshot) => {
        let ranks = []
        snapshot.forEach((doc) => {
          ranks.push(doc.data().personalRank)
        })
        setPersonalRanks(ranks)
      }, (error) => {
        console.error("Error getting documents: ", error)
        toError()
      })

    return () => {
      unsubscribe()
    }
  }, [])

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