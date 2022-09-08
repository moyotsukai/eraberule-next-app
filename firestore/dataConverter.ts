import { QueryDocumentSnapshot } from 'firebase/firestore'
import { Room } from '../types/Room.type'

export const fromFirestore = (doc: QueryDocumentSnapshot) => {
  const converted: Room = {
    title: doc.data().title ?? "",
    explanation: doc.data().explanation ?? "",
    options: doc.data().options ?? [],
    commonLanguage: doc.data().commonLanguage ?? [],
    rule: doc.data().rule ?? "",
    state: doc.data().state ?? "ongoing",
    senderId: doc.data().senderId ?? "",
    date: doc.data().date ?? new Date(),
    docId: doc.id ?? ""
  }

  return converted
}