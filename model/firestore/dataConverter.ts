import { QueryDocumentSnapshot } from 'firebase/firestore'
import { RuleKeyName, RULE_NAMES } from '../../rules/ruleNames'
import { Room } from '../../types/Room.type'
import { UserDocData } from '../../types/UserDocData.type'
import { Vote } from '../../types/Vote.type'

export const roomFromFirestore = (doc: QueryDocumentSnapshot): Room => {
  return {
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
}


export const voteFromFirestore = (doc: QueryDocumentSnapshot): Vote => {
  return {
    personalRank: doc.data().personalRank ?? [],
    date: doc.data().date ?? new Date()
  }
}


export const ruleKeyNameFromRuleName = (ruleName: string): RuleKeyName => {
  if (ruleName === RULE_NAMES.MAJORITY_RULE) { return "MAJORITY_RULE" }
  if (ruleName === RULE_NAMES.BORDA_COUNT_METHOD) { return "BORDA_COUNT_METHOD" }
  if (ruleName === RULE_NAMES.CONDORCET_METHOD) { return "CONDORCET_METHOD" }
  if (ruleName === RULE_NAMES.MAJORITY_JUDGEMENT) { return "MAJORITY_JUDGEMENT" }
  return "MAJORITY_RULE"
}


type VoteToFirestoreProps = {
  personalRank: number[]
}

export const voteToFirestore = (props: VoteToFirestoreProps): Vote => {
  return {
    personalRank: props.personalRank,
    date: new Date()
  }
}


type UserDocDataToFirestoreProps = {
  attendedRooms?: string[]
  createdRooms?: string[]
}

export const userDocDataToFirebase = (props: UserDocDataToFirestoreProps): UserDocData => {
  if (props.attendedRooms && props.createdRooms) {
    return {
      attendedRooms: props.attendedRooms,
      createdRooms: props.createdRooms,
      date: new Date()
    }
  }
  if (props.attendedRooms) {
    return {
      attendedRooms: props.attendedRooms,
      date: new Date()
    }
  }
  if (props.createdRooms) {
    return {
      createdRooms: props.createdRooms,
      date: new Date()
    }
  }
  return {
    date: new Date()
  }
}
