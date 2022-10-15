import { useEffect, useRef, useState } from 'react'
import { Room } from '../../types/Room.type'
import { getResultSubscriber } from '../firestore/getResultSubscriber'

export const useResult = (roomData: Room) => {
  const [personalRanks, setPersonalRanks] = useState<number[][] | undefined>(undefined)
  const _hasFetched = useRef<boolean>(false)

  useEffect(() => {
    if (_hasFetched.current) { return }

    _hasFetched.current = true
    const unsubscribe = getResultSubscriber(roomData, (ranks) => {
      setPersonalRanks(ranks)
    })

    return () => unsubscribe()
  }, [])

  return { personalRanks }
}
