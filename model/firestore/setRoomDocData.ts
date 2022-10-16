import { Room } from '../../types/Room.type';
import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { KEYS } from "./key"
import { log } from '../../utils/log';

type Props = {
  roomData: Room
}

export const setRoomDocData = async (props: Props) => {
  const { roomData } = props
  const newRoomRef = doc(collection(db, KEYS.ROOMS))
  await setDoc(newRoomRef, roomData)
  log("setRoom: ", roomData)

  return newRoomRef.id
}