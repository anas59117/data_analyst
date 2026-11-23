import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: 'AIzaSyC9CV2gAwgrzzKPBTjjFncQLsjQws2qZMw',
  authDomain: 'gwin-92a9d.firebaseapp.com',
  projectId: 'gwin-92a9d',
  storageBucket: 'gwin-92a9d.firebasestorage.app',
  messagingSenderId: '363711512305',
  appId: '1:363711512305:web:81a50960ff1659e9fc3350',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
