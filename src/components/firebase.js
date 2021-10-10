import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/database'
import 'firebase/auth'

const firebaseConfig = {
  apiKey: "AIzaSyBWgQTK7o1prwq40bD5C1QdkoTZlrueYUE",
  authDomain: "cordura-9d771.firebaseapp.com",
  projectId: "cordura-9d771",
  storageBucket: "cordura-9d771.appspot.com",
  messagingSenderId: "387908976820",
  appId: "1:387908976820:web:bfb07f753fd814b94e97e1"
};

firebase.initializeApp(firebaseConfig);
const db = firebase.firestore()
const rl = firebase.database()
const auth = firebase.auth()

export { db, rl, auth }
