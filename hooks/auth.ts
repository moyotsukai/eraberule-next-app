import { useEffect } from 'react'
import { userState } from '../states/atoms'
import { useRecoilState } from 'recoil'
import { firebase } from '../lib/firebase'
import { log } from '../utils/log'

export const useAuthenticate = () => {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (firebase === undefined) { return null }
    if (user) { return }

    firebase.auth().signInAnonymously()
      .then(() => {
        log("Signed in")
      })
      .catch((error) => {
        console.error(error.code)
        console.error(error.message)
      })

    const unsubscribe = firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ uid: user.uid, isAnonymous: user.isAnonymous })
      } else {
        setUser(null)
      }
    })

    return unsubscribe
  }, [])

  return user
}