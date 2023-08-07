import React from "react";
import { auth, googleProvider } from "../config/firebase";
import { signInWithPopup, signOut } from "firebase/auth";

export default function AuthGoogle() {
  const signIn = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (e) {
      console.error(e);
    }
  };

  const signOUT = async () => {
    try {
      await signOut(auth);
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <div className="max-w-lg bg-white text-center mx-auto mt-10 px-20 py-10">
      <button
        onClick={signIn}
        className="h-12 w-40 mb-2 mx-3 bg-slate-700 text-white rounded-sm hover:bg-slate-900 hover:shadow-sm"
      >
        Sign In With Google
      </button>
      <button
        onClick={signOUT}
        className="h-12 w-40 mx-3 bg-slate-700 text-white rounded-sm hover:bg-slate-900 hover:shadow-sm"
      >
        Sign Out
      </button>
    </div>
  );
}
