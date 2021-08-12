import { useEffect } from 'react'
import { userState } from './../recoil/atom'
import { useRecoilState } from 'recoil'
import { firebase } from '../lib/firebase'

export const useAuthenticate = () => {
  const [user, setUser] = useRecoilState(userState)

  useEffect(() => {
    if (firebase === undefined) { return null }
    if (user) { return }

    firebase.auth().signInAnonymously()
      .then(() => {
        //Signed in
      })
      .catch((error) => {
        console.error(error.code)
        console.error(error.message)
      });

    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        setUser({ uid: user.uid, isAnonymous: user.isAnonymous })
        console.log("uid", user.uid)
      } else {
        setUser(null)
      }
    })
  }, [])

  return user
}