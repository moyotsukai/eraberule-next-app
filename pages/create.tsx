import React, { useEffect, useRef } from 'react'
import { useRouter } from 'next/router'
import { db } from '../lib/firebase'
import CreateTemplate from '../components/templates/CreateTemplate'
import { useAuthenticate } from '../hooks/auth'
import { useRecoilState, useSetRecoilState } from 'recoil'
import { createdRoomIdsState, hasNoUserDocState, recentlyCreatedRoomTitleState } from '../states/atoms'

const CreatePage: React.FC = () => {
  const user = useAuthenticate()
  const router = useRouter()
  const didSetCreatedRoomsRef = useRef(false)
  const setHasNoUserDoc = useSetRecoilState(hasNoUserDocState)
  const [createdRoomIds, setCreatedRoomIds] = useRecoilState(createdRoomIdsState)
  const didSetRecentlyCreatedRoomTitleRef = useRef(false)
  const [recentlyCreatedRoomTitle, setRecentlyCreatedRoomTitle] = useRecoilState(recentlyCreatedRoomTitleState)

  //Set createdRoomIds, hasNoUserDoc
  useEffect(() => {
    if (!user) { return }
    if (createdRoomIds !== undefined) { return }
    if (didSetCreatedRoomsRef.current === false) {
      didSetCreatedRoomsRef.current = true

      const getCreatedRoomIds = async () => {
        const userId = user.uid
        db.collection("users").doc(userId).get().then((doc) => {
          if (doc.exists) {
            const docData = doc.data()
            const roomIds = docData.createdRooms ?? []
            setCreatedRoomIds(roomIds)
            setHasNoUserDoc(false)
          } else {
            setCreatedRoomIds([])
            setHasNoUserDoc(true)
            setRecentlyCreatedRoomTitle(null)
          }
        }).catch((error) => {
          console.error("Error getting documents: ", error)
          toError()
        })
      }

      getCreatedRoomIds()
    }
  }, [user])

  //Set recentlyCreatedRoomTitle
  useEffect(() => {
    if (!createdRoomIds) { return }
    if (recentlyCreatedRoomTitle !== undefined) { return }
    if (didSetRecentlyCreatedRoomTitleRef.current === false) {
      didSetRecentlyCreatedRoomTitleRef.current = true

      const getRoomData = async (docId) => {
        db.collection("rooms").doc(docId)
          .get()
          .then((doc) => {
            if (doc.exists) {
              setRecentlyCreatedRoomTitle(doc.data().title)
            }
          })
          .catch((error) => {
            console.error("Error getting documents: ", error)
            toError()
          })
      }

      getRoomData(createdRoomIds[0])
    }
  }, [createdRoomIds])

  const toNewRoom = () => {
    router.push("/create/new")
  }

  const toRecentlyCreatedRoom = () => {
    router.push({
      pathname: "/create/share",
      query: { title: recentlyCreatedRoomTitle }
    })
  }

  const toError = () => {
    router.push({
      pathname: "/error"
    })
  }

  return (
    <CreateTemplate
      user={user}
      toNewRoom={toNewRoom}
      recentlyCreatedRoomTitle={recentlyCreatedRoomTitle}
      toRecentlyCreatedRoom={toRecentlyCreatedRoom}
    />
  )
}

export default CreatePage