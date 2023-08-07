import React, {useState } from "react";
import { auth } from "../config/firebase";
import { createUserWithEmailAndPassword, signOut ,signInWithEmailAndPassword } from "firebase/auth";

export default function Auth() {
    const [email, setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [error,setError] = useState("");

    console.log(auth?.currentUser?.email);


    const createAccount = async ()=>{
        try{
            await createUserWithEmailAndPassword(auth,email,password);
        }catch(e){
            console.error(e);
        }
        setEmail('');
        setPassword('');
        console.log("User Created Successfully...");
    }

    const signIn = async ()=>{
        try{
            await signInWithEmailAndPassword(auth, email,password);
        }catch(e){
            console.error(e)
        }
    }

    const signOUT = async ()=>{
        try{
            await signOut(auth)
        }catch(e){
            setError(e);
        }
        setEmail('');
        setPassword('');
    }

    useState(()=>{
        console.log(error)
    },[error])

  return (
    <div className="max-w-lg bg-white text-center mx-auto mt-10 px-20 py-10">
      <h2 className="text-indigo-800 italic font-bold underline text-2xl mb-8">
        Sign In With Mail
      </h2>
      <input
        type="email"
        placeholder="Email Here ..."
        value={email}
        className="my-3 border-b-2 border-sky-600 w-full outline-none placeholder:text-indigo-600 pl-2 text-base text-indigo-800"
        onChange={(e) => {
            setEmail(e.target.value)
        }}
      />
      <br />
      <input
        type="password"
        placeholder="Password Here ..."
        value={password}
        className="my-3 border-b-2 border-sky-600 w-full outline-none placeholder:text-indigo-600 pl-2 text-base text-indigo-800"
        onChange={(e) =>{
            setPassword(e.target.value)
        }}
      />
      <button className="h-12 w-36 mx-3 bg-slate-700 text-white rounded-sm mt-8 hover:bg-slate-900 hover:shadow-sm"
        onClick={createAccount}
      >
        Create Account
      </button>
      <br />
      <button className="h-12 w-36 mx-3 bg-slate-700 text-white rounded-sm mt-8 hover:bg-slate-900 hover:shadow-sm"
        onClick={signIn}
      >
        Sign In
      </button>
      <button className="h-12 w-36 mx-3 bg-slate-700 text-white rounded-sm mt-8 hover:bg-slate-900 hover:shadow-sm"
        onClick={signOUT}
      >
        Sign Out
      </button>
    </div>
  );
}
