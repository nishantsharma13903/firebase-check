import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCCtqF3LfTHBilEnXR5jW4r2quj-rd7XFo",
  authDomain: "fir-check-331ba.firebaseapp.com",
  projectId: "fir-check-331ba",
  storageBucket: "fir-check-331ba.appspot.com",
  messagingSenderId: "501673149779",
  appId: "1:501673149779:web:efa2e3be29a98c0c894da6",
  measurementId: "G-4Z310EHENW"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);