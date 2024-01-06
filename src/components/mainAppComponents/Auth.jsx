import { auth, googleProvider } from "./../../config/firebase";
import {
  //createUserWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { FcGoogle } from "react-icons/fc";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";

export const Auth = ({ studentEmail, setStudentEmail, setApplyModal }) => {
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
    <div className="w-full flex flex-col px-6 md:px-10 md:pt-8 pt-10">
      <button
        className="md:hidden flex text-xl text-white bg-primary absolute mt-2 top-0 left-0 px-2 rounded-e-lg py-1 justify-start items-center
      "
        onClick={() => setApplyModal(false)}
      >
        <IoIosArrowBack />
      </button>
      <div className="w-full flex justify-between items-center md:items-start">
        <div className="flex flex-col gap-1 md:gap-2">
          <span className="font-semibold md:text-3xl text-xl">Apply Now!</span>
          <span className="md:text-sm md:flex hidden text-xs text-slate-500">
            Enter your details below to get started
          </span>
          <span className="md:text-sm md:hidden flex text-xs text-slate-500">
            Enter your details below
          </span>
        </div>
        <div className="flex flex-col gap-2 items-center">
          {studentEmail ? (
            <button
              className="bg-primary hover:bg-transparent border md:text-base text-sm text-white md:px-5 px-4 py-2 hover:text-primary rounded-lg border-primary transition-all ease-in-out duration-300"
              onClick={logout}
            >
              Logout
            </button>
          ) : (
            <div className="md:w-48 flex flex-col gap-2 justify-center items-center">
              <button
                className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-3 hover:translate-y-[-2px] transition-all duration-300 ease-in-out hover:shadow-md"
                onClick={signInWithGoogle}
              >
                <FcGoogle className="text-base" />
                <span className="text-xs md:flex hidden">
                  Sign In With Google
                </span>
                <span className="text-xs md:hidden flex whitespace-nowrap">
                  Sign In
                </span>
              </button>
              <span className="text-xs md:flex hidden font-light text-slate-500">
                {welcomeMessage}
              </span>
            </div>
          )}
        </div>
      </div>
      {studentEmail ? (
        <span className="md:text-xl mt-3 font-semibold text-primary rounded-lg">
          {welcomeMessage}
        </span>
      ) : null}
    </div>
  );
};
