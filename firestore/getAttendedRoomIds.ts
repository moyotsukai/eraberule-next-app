import { doc, getDoc } from 'firebase/firestore'
import { db } from '../firebase/initialize'
import { log } from '../utils/log'
import { KEYS } from './key'

export const getAttendedRoomIds = async (userId: string): Promise<string[] | null> => {
  const docRef = doc(db, KEYS.USERS, userId)
  const docSnapshot = await getDoc(docRef)
  if (docSnapshot.exists()) {
    const attendedRoomIds: string[] = docSnapshot.data()[KEYS.ATTENDED_ROOMS] ?? []
    log("getAttendedRoomIds: ", attendedRoomIds)
    return attendedRoomIds
  } else {
    log("Has no user doc")
    return null
  }
}