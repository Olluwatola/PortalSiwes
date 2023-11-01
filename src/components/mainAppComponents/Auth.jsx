import { auth, googleProvider } from "./../../config/firebase";
import {
  //createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { useState } from "react";

export const Auth = ({studentEmail,setStudentEmail}) => {
  let welcomeMessageStarter=auth.currentUser?`Welcome ${auth?.currentUser?.displayName}`:'welcome guest, kindly login to proceed with submit with your application'
  const [welcomeMessage,setWelcomeMessage]=useState(welcomeMessageStarter)

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setWelcomeMessage(`Welcome ${auth?.currentUser?.displayName}`)
      setStudentEmail(auth?.currentUser?.email)
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setWelcomeMessage("welcome guest, kindly login to proceed with submit with your application")
      setStudentEmail("")
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div>
      <button onClick={signInWithGoogle}> Sign In With Google</button>

      <button onClick={logout}> Logout </button>
      <br/>
      {welcomeMessage}
    </div>
  );
};