import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY || 'AIzaSyC9CV2gAwgrzzKPBTjjFncQLsjQws2qZMw',
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN || 'gwin-92a9d.firebaseapp.com',
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID || 'gwin-92a9d',
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET || 'gwin-92a9d.firebasestorage.app',
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID || '363711512305',
  appId: import.meta.env.VITE_FIREBASE_APP_ID || '1:363711512305:web:81a50960ff1659e9fc3350',
}

const app = initializeApp(firebaseConfig)
export const auth = getAuth(app)
export const db = getFirestore(app)
