import { voteFromFirestore } from './dataConverter';
import { Room } from '../../types/Room.type'
import { collection, onSnapshot, Unsubscribe } from 'firebase/firestore'
import { db } from '../../lib/firebase'
import { KEYS } from './key'
import { log } from '../../utils/log'

export const getResultSubscriber = (roomData: Room, callBack: (ranks: number[][]) => void): Unsubscribe => {
  const collectionRef = collection(db, KEYS.ROOMS, roomData.docId, KEYS.VOTES)
  const unsubscribe = onSnapshot(collectionRef, (querySnapshot) => {
    const personalRanks = querySnapshot.docs.map((doc => voteFromFirestore(doc).personalRank))
    callBack(personalRanks)
    log("getResultSubscriber: ", personalRanks)
  }, (error) => {
    log("getResultSubscriber: ", error)
  })

  return unsubscribe
}