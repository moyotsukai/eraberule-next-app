import { useRouter } from "next/router"
import { useEffect, useRef, useState } from "react"
import { getRoomDataByTitle } from "../firestore/getRoomData"
import { Room } from "../types/Room.type"
import { log } from "../utils/log"

type Props = {
  title: string
  isLoading: boolean
}

export const useQueryRoom = (props: Props) => {
  const [queriedRoomData, setQueriedRoomData] = useState<Room | null | undefined>(undefined)
  const [isLoadingRoomData, setIsLoadingRoomData] = useState<boolean>(true)
  const _hasFetched = useRef(false)

  useEffect(() => {
    if (props.isLoading) { return }
    if (!props.title) {
      setQueriedRoomData(null)
    }
    if (_hasFetched.current) { return }

    getRoomDataByTitle(props.title)
      .then((roomData) => {
        setQueriedRoomData(roomData)
        _hasFetched.current = true
      })
      .catch((error) => {
        log("useQueryRoom: ", error)
        setQueriedRoomData(null)
      })
      .finally(() => {
        setIsLoadingRoomData(false)
      })
  }, [props.title, props.isLoading])

  return { queriedRoomData, isLoadingRoomData }
}