import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useRecoilState } from 'recoil'
import { userState } from '../../states/atoms'
import { log } from '../../utils/log'
import { auth } from '../../lib/firebase'

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState)
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          setUser({ uid: user.uid, isAnonymous: user.isAnonymous })
          log("useAuth, uid: ", user.uid)
        } else {
          setUser(undefined)
          log("useAuth, Not signed in")
        }
      } catch (error) {
        //Most probably a connection error
        setUser(null)
        log("useAuth, error", error)
      } finally {
        setIsLoadingUser(false)
      }
    })

    return () => unsubscribe()
  }, [])

  return { user, isLoadingUser }
}