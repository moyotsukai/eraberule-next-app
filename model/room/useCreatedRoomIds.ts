import { hasNoUserDocState, recentlyCreatedRoomTitleState } from './../../states/atoms';
import { useSetRecoilState } from 'recoil';
import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { User } from '../../types/User.type'
import { asyncTask } from '../../utils/asyncTask'
import { log } from '../../utils/log'
import { getCreatedRoomsData } from '../firestore/getCreatedRoomsData'

export const useCreatedRoomIds = (user: User | undefined | null) => {
  const [createdRoomIds, setCreatedRoomIds] = useState<string[] | null | undefined>(undefined)
  const _hasFetched = useRef<boolean>(false)
  const setHasNoUserDoc = useSetRecoilState(hasNoUserDocState)
  const setRecentlyCreatedRoomTitle = useSetRecoilState(recentlyCreatedRoomTitleState)

  useEffect(() => {
    if (!user) { return }
    if (_hasFetched.current) { return }

    asyncTask(async () => {
      _hasFetched.current = true
      try {
        const createdRooms = await getCreatedRoomsData(user.uid)
        const ids = createdRooms.map((room) => room.docId)
        setCreatedRoomIds(ids ?? [])

        if (createdRoomIds !== null) {
          setHasNoUserDoc(false)
        } else {
          setHasNoUserDoc(true)
          setRecentlyCreatedRoomTitle(null)
        }
      } catch (error) {
        log("useCreatedRoomIds: ", error)
        setCreatedRoomIds(null)
      }
    })
  }, [user])

  return { createdRoomIds }
}