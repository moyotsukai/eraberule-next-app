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

export const setVote = async (props: Props) => {
  log("setVote: ", props.data)
  const newVoteRef = doc(collection(db, KEYS.ROOMS, props.roomData.docId, KEYS.VOTES))
  await setDoc(newVoteRef, props.data)
}