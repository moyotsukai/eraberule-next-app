import { atom } from 'recoil'
import { Room } from '../types/Room.type'
import { User } from '../types/User.type'

export const userState = atom<User | undefined | null>({
  key: "userState",
  default: undefined
})

export const roomDataState = atom<Room>({
  key: "roomDataState",
  default: {
    title: "",
    explanation: "",
    options: [],
    rule: "",
    state: "ongoing",
    senderId: ""
  }
})

export const hasNoUserDocState = atom<boolean>({
  key: "hasNoUserDoc",
  default: true
})

export const attendedRoomIdsState = atom<string[] | undefined>({
  key: "attendedRoomIds",
  default: undefined
})

export const createdRoomIdsState = atom<string[] | undefined>({
  key: "createdRoomIds",
  default: undefined
})

export const recentlyCreatedRoomTitleState = atom<string | undefined | null>({
  key: "recentlyCreatedRoomTitle",
  default: undefined
})

export const personalRankState = atom<number[]>({
  key: "personalRankState",
  default: []
})