// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBt3t0FwjRatdCTnhrdYLqkQaLkTBkXMMk",
  authDomain: "netflix-clone-2d5e1.firebaseapp.com",
  projectId: "netflix-clone-2d5e1",
  storageBucket: "netflix-clone-2d5e1.appspot.com",
  messagingSenderId: "1089553026836",
  appId: "1:1089553026836:web:3d32257ad2497707483c01"
};

// Initialize Firebase
// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const db = getFirestore()
const auth = getAuth()

export default app
export { auth, db }