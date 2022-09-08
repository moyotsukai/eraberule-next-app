import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '../firebase/initialize'
import { log } from '../utils/log'
import { fromFirestore } from './dataConverter'
import { KEYS } from './keys'

export const getRecentlyCreatedRoomData = async (userId: string) => {
  const q = query(collection(db, KEYS.ROOMS), where(KEYS.SENDER_ID, "==", userId))
  const querySnapshot = await getDocs(q)
  const rooms = querySnapshot.docs.map((doc) => fromFirestore(doc))
  log("getRecentlyCreatedRoomData, created rooms: ", rooms)
  const newest = rooms.sort((a, b) => (a.date > b.date) ? -1 : 1)[0]

  return newest
}