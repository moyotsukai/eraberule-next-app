import { atom } from 'recoil'
import { Room } from '../structs/room'

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

export const personalRankState = atom<number[]>({
  key: "personalRankState",
  default: []
})