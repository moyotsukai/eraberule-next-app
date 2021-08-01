export type Room = {
  title: string
  explanation: string
  options: string[]
  commonLanguage: string[]
  rule: string
  state: "ongoing" | "closed"
  senderId: string
  date?: Date
  docId?: string
}
