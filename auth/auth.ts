import { signInAnonymously } from 'firebase/auth'
import { log } from '../utils/log'
import { auth } from '../firebase/initialize'

export const signIn = async () => {
  try {
    await signInAnonymously(auth)
  } catch (error) {
    log(error)
  }
}

export const signOut = async () => {
  try {
    await auth.signOut()
  } catch (error) {
    log(error)
  }
}