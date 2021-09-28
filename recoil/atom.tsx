import { atom } from 'recoil'
import { Room } from '../structs/room'
import { User } from '../structs/user'

export const userState = atom<User | null>({
  key: "userState",
  default: null
})

export const roomDataState = atom<Room>({
  key: "roomDataState",
  default: {
    title: "",
    explanation: "",
    options: [],
    rule: "",
    state: "ongoing",
    senderId: "",
    isPlaceholder: true
  }
})

export const attendedRoomIdsState = atom<string[] | undefined>({
  key: "attendedRoomIds",
  default: undefined
})

export const personalRankState = atom<number[]>({
  key: "personalRankState",
  default: []
})