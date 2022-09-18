import { hasNoUserDocState } from './../states/atoms';
import { useSetRecoilState } from 'recoil';
import { useEffect, useRef, useState } from "react"
import { getAttendedRoomIds } from "../firestore/getAttendedRoomIds"
import { Room } from "../types/Room.type"
import { log } from "../utils/log"
import { User } from '../types/User.type';

type Props = {
  user: User
  roomData: Room
  isLoading: boolean
}

export const useHasVoted = (props: Props) => {
  const [attendedRoomIds, setAttendedRoomIds] = useState<string[]>(undefined)
  const [hasVoted, setHasVoted] = useState<boolean | undefined>(undefined)
  const [isLoadingHasVoted, setIsloadingHasVoted] = useState<boolean>(true)
  const _hasFetched = useRef(false)
  const setHasNoUserDoc = useSetRecoilState(hasNoUserDocState)

  useEffect(() => {
    if (props.isLoading) { return }
    if (!props.roomData) { return }
    if (!props.user.uid) {
      setHasVoted(false)
      return
    }
    if (_hasFetched.current) { return }
    _hasFetched.current = true

    getAttendedRoomIds(props.user.uid)
      .then((attendedRoomIds) => {
        setAttendedRoomIds(attendedRoomIds ?? [])

        if (attendedRoomIds) {
          setHasVoted(attendedRoomIds.includes(props.roomData.docId))
          setHasNoUserDoc(false)
        } else {
          setHasVoted(false)
          setHasNoUserDoc(true)
        }
      })
      .catch((error) => {
        log("useHasVoted: ", error)
        setHasVoted(false)
      })
      .finally(() => {
        setIsloadingHasVoted(false)
      })
  }, [props.user, props.roomData, props.isLoading])

  return { attendedRoomIds, hasVoted, isLoadingHasVoted }
}