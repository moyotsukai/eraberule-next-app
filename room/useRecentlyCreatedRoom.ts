import { useEffect } from 'react'
import { useRef, useState } from 'react'
import { getRecentlyCreatedRoomData } from '../firestore/getRecentlyCreatedRoomData'
import { Room } from '../types/Room.type'
import { User } from '../types/User.type'
import { log } from '../utils/log'

export const useRecentlyCreatedRoom = (user: User | undefined | null) => {
  const [recentlyCreatedRoomData, setRecentlyCreatedRoomData] = useState<Room | null | undefined>(undefined)
  const _hasFetched = useRef<boolean>(false)

  useEffect(() => {
    if (!user) { return }
    if (_hasFetched.current) { return }

    (async () => {
      _hasFetched.current = true
      try {
        const recentlyCreatedRoom = await getRecentlyCreatedRoomData(user.uid)
        setRecentlyCreatedRoomData(recentlyCreatedRoom)
      } catch (error) {
        log("useRecentlyCreatedRoom: ", error)
        setRecentlyCreatedRoomData(null)
      }
    })()
  }, [user])

  return { recentlyCreatedRoomData }
}