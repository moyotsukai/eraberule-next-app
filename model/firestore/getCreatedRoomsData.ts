import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { Room } from '../../types/Room.type'
import { log } from '../../utils/log'
import { roomFromFirestore } from './dataConverter'
import { KEYS } from './key'

export const getCreatedRoomsData = async (userId: string): Promise<Room[] | null> => {
  const q = query(collection(db, KEYS.ROOMS), where(KEYS.SENDER_ID, "==", userId))
  const querySnapshot = await getDocs(q)

  if (querySnapshot.empty) {
    return null
  } else {
    const rooms = querySnapshot.docs.map((doc) => roomFromFirestore(doc))
    log("getCreatedRoomsData: ", rooms)

    return rooms
  }
}