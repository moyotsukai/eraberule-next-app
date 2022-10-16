import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { Room } from '../../types/Room.type'
import { User } from '../../types/User.type'
import { asyncTask } from '../../utils/asyncTask'
import { log } from '../../utils/log'
import { getCreatedRoomsData } from '../firestore/getCreatedRoomsData'

export const useRecentlyCreatedRoom = (user: User | undefined | null) => {
  const [recentlyCreatedRoomData, setRecentlyCreatedRoomData] = useState<Room | null | undefined>(undefined)
  const _hasFetched = useRef<boolean>(false)

  useEffect(() => {
    if (!user) { return }
    if (_hasFetched.current) { return }

    asyncTask(async () => {
      _hasFetched.current = true
      try {
        const createdRooms = await getCreatedRoomsData(user.uid)
        const newest = createdRooms.sort((a, b) => (a.date > b.date) ? -1 : 1)[0]
        setRecentlyCreatedRoomData(newest)
      } catch (error) {
        log("useRecentlyCreatedRoom: ", error)
        setRecentlyCreatedRoomData(null)
      }
    })
  }, [user])

  return { recentlyCreatedRoomData }
}