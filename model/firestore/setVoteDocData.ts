import { Room } from '../../types/Room.type';
import { collection, doc, setDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { KEYS } from "./key"
import { Vote } from '../../types/Vote.type';
import { log } from '../../utils/log';

type Props = {
  roomData: Room
  data: Vote
}

export const setVoteDocData = async (props: Props) => {
  const { roomData, data } = props
  const newVoteRef = doc(collection(db, KEYS.ROOMS, roomData.docId, KEYS.VOTES))
  await setDoc(newVoteRef, data)
  log("setVote: ", data)
}