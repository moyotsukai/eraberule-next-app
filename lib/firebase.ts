import fb from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

let firebase = undefined
let db = undefined

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  databeseURL: process.env.NEXT_PUBLIC_DATABASE_URL,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurmentId: process.env.NEXT_PUBLIC_MEASURMENT_ID
}

try {
  firebase = !fb.apps.length ? fb.initializeApp(firebaseConfig) : fb.app()
  db = firebase.firestore()

} catch (error) {
  console.error(error)
}

export { firebase, db, firebaseConfig }
