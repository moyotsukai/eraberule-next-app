import { collection, getDocs, limit, query, where } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { Room } from '../../types/Room.type'
import { log } from '../../utils/log'
import { roomFromFirestore } from './dataConverter'
import { KEYS } from './key'

export const getRoomDataByTitle = async (title: string): Promise<Room | null> => {
  const q = query(collection(db, KEYS.ROOMS), where(KEYS.TITLE, "==", title), limit(1))
  const querySnapshot = await getDocs(q)
  const room = querySnapshot.empty ? null : roomFromFirestore(querySnapshot.docs[0])
  log("getRoomDataByTitle, room: ", room)

  return room
}