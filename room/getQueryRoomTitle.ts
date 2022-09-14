import { useRouter } from "next/router"

export const getQueryRoomTitle = () => {
  const router = useRouter()
  const isLoadingRouter = router.isReady ? false : true
  const title = router.query["q"] as string ?? ""

  return { title, isLoadingRouter }
}