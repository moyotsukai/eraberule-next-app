import { Language } from './../i18n/i18n'
import { Room } from './Room.type'

export type RuleDataAsset = {
  roomData: Room,
  personalRanks: number[][],
  language: Language
}