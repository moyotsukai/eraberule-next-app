import { doc, updateDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { KEYS } from "./key"
import { UserDocData } from '../../types/UserDocData.type';
import { log } from '../../utils/log';

type Props = {
  userId: string
  data: UserDocData
}

export const updateUserDocData = async (props: Props) => {
  log("updateUserDoc: ", props.data)
  const userRef = doc(db, KEYS.USERS, props.userId)
  await updateDoc(userRef, props.data)
}