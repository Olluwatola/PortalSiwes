import { auth, googleProvider } from "./../../config/firebase";
import {
  //createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { useState } from "react";

export const Auth = ({ studentEmail, setStudentEmail }) => {
  let welcomeMessageStarter = auth.currentUser
    ? `Welcome ${auth?.currentUser?.displayName}`
    : "Welcome! Log in to apply.";
  const [welcomeMessage, setWelcomeMessage] = useState(welcomeMessageStarter);

  const signInWithGoogle = async () => {
    try {
      await signInWithPopup(auth, googleProvider);
      setWelcomeMessage(`Welcome ${auth?.currentUser?.displayName}`);
      setStudentEmail(auth?.currentUser?.email);
    } catch (err) {
      console.error(err);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setWelcomeMessage("Welcome! Log in to apply.");
      setStudentEmail("");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <div className="w-full flex flex-col">
      <div className="w-full flex justify-between items-start">
        <div className="flex flex-col gap-2">
          <span className="font-semibold text-3xl">Apply Now!</span>
          <span className="text-sm text-slate-500">
            Enter your details below to get started
          </span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          {studentEmail ? (
            <button
              className="bg-primary hover:bg-transparent border text-white px-5 py-2 hover:text-primary rounded-lg border-primary transition-all ease-in-out duration-300"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <div className="w-48 flex flex-col gap-2 justify-center items-center">
              <button
                className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-3 hover:translate-y-[-2px] transition-all duration-300 ease-in-out hover:shadow-md"
                onClick={signInWithGoogle}
              >
                <FcGoogle className="text-base" />
                <span className="text-xs">Sign In With Google</span>
              </button>
              <span className="text-xs font-light text-slate-500">
                {welcomeMessage}
              </span>
            </div>
          )}
        </div>
      </div>
      {studentEmail ? (
        <span className="text-xl mt-3 font-semibold text-primary rounded-lg">
          {welcomeMessage}
        </span>
      ) : null}
    </div>
  );
};
