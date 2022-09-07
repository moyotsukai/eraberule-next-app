import { useEffect, useState } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { useRecoilState } from 'recoil'
import { userState } from '../states/atoms'
import { log } from '../utils/log'
import { auth } from '../firebase/initialize'

export const useAuth = () => {
  const [user, setUser] = useRecoilState(userState)
  const [isLoadingUser, setIsLoadingUser] = useState<boolean>(true)

  useEffect(() => {
    const unsubscriber = onAuthStateChanged(auth, async (user) => {
      try {
        if (user) {
          //User is signed in
          setUser({ uid: user.uid, isAnonymous: user.isAnonymous })
          log("Signed in, uid: ", user.uid)
        } else {
          //User is not signed in
          setUser(undefined)
        }
      } catch (error) {
        //Most probably a connection error
        setUser(null)
        log(error)
      } finally {
        setIsLoadingUser(false)
      }
    })

    return () => unsubscriber()
  }, [])

  return { user, isLoadingUser }
}