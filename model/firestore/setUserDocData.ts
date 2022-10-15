import { doc, setDoc } from "firebase/firestore"
import { db } from "../../lib/firebase"
import { KEYS } from "./key"
import { UserDocData } from '../../types/UserDocData.type';
import { log } from '../../utils/log';

type Props = {
  userId: string
  data: UserDocData
}

export const setUserDocData = async (props: Props) => {
  log("setUserDocData: ", props.data)
  const userRef = doc(db, KEYS.USERS, props.userId)
  await setDoc(userRef, props.data)
}