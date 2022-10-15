import { useRouter } from "next/router"
import { spaceToPlus } from "../../utils/spaceToPlus"

export const generateRoomLink = () => {
  const router = useRouter()
  const isLoadingRouter = router.isReady ? false : true
  const title = router.query["title"] as string ?? ""
  const replacedTitle = spaceToPlus(title)
  const roomLink = `https://app.eraberule.com/room?q=${replacedTitle}`

  return { title, roomLink, isLoadingRouter }
}