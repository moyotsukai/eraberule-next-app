import { doc, getDoc } from 'firebase/firestore'
import { loadGetInitialProps } from 'next/dist/shared/lib/utils'
import { db } from '../firebase/initialize'
import { log } from '../utils/log'
import { fromFirestore } from './dataConverter'
import { KEYS } from './key'

export const getAttendedRoomIds = async (userId: string): Promise<string[] | null> => {
  const docRef = doc(db, KEYS.USERS, userId)
  const docSnapshot = await getDoc(docRef)
  if (docSnapshot.exists()) {
    const attendedRoomIds = docSnapshot.data()[KEYS.ATTENDED_ROOMS] ?? []
    loadGetInitialProps("getAttendedRoomIds: ", attendedRoomIds)
    return attendedRoomIds
  } else {
    return null
  }
}