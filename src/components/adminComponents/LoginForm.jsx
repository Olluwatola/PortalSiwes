import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { auth } from "../../config/firebase"; // Import auth only, not db
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth"; // Import functions directly from firebase/auth
import {
  handleGetUserProfileAndReturnRole,
  handleCreateAdminProfileDocument,
} from "./../../controllers/authControllers";
import ResetPasswordComponent from "./ResetPasswordComponent";
import { motion, AnimatePresence } from "framer-motion";

const LoginForm = ({ setConditionGood, setStatusBarMessage }) => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpAttempt, setSignUpAttempt] = useState(false);
  const [resetPasswordToggle, setResetPasswordToggle] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState(null);
  const [adminProfileCreationLoading, setAdminProfileCreationLoading] =
    useState(false);
  const [signInButtonClicked, setSignInButtonClicked] = useState(false);
  const [signUpButtonClicked, setSignUpButtonClicked] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleToggleResetPassword = () => {
    setResetPasswordToggle(!resetPasswordToggle); // Toggle the resetPasswordToggle state
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      setSignInButtonClicked(true);
      console.log(auth);
      const userCredential = await signInWithEmailAndPassword(
        auth,
        loginEmail,
        loginPassword
      );
      const userRole = await handleGetUserProfileAndReturnRole(
        userCredential.user.uid
      );

      if (userRole === "admin" || userRole === "superAdmin") {
        navigate(from, { replace: true });
      } else {
        setErrorMessage(
          "You are not an admin or have not been approved as an admin."
        );
        throw new Error(
          "You are not an admin or have not been approved as an admin."
        );
      }

      setLoginEmail("");
      setLoginPassword("");
    } catch (err) {
      // Display specific error messages based on Firebase error codes
      if (err.code === "auth/email-already-in-use") {
        setErrorMessage("The email address is already in use.");
      } else if (err.code === "auth/invalid-email") {
        setErrorMessage("Invalid email address. Please check your email.");
      } else if (err.code === "auth/wrong-password") {
        setErrorMessage("Wrong password. Please try again.");
      } else if (err.code === "auth/user-not-found") {
        setErrorMessage("User not found. Please try again.");
      } else if (err.code === "auth/too-many-requests") {
        setErrorMessage("Too many requests. Please try again later.");
      } else if (err.code === "auth/network-request-failed") {
        setErrorMessage("Network error. Please try again later.");
      } else if (err.code === "auth/missing-password") {
        setErrorMessage("Invalid password. Please check your password.");
      } else {
        setErrorMessage(err.message);
      }
      console.log(err);
    } finally {
      setSignInButtonClicked(false);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();

    try {
      setSignUpButtonClicked(true);
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        signUpEmail,
        signUpPassword
      );

      await handleCreateAdminProfileDocument(
        setSignUpErrorMessage,
        setAdminProfileCreationLoading,
        userCredential.user.email,
        userCredential.user.uid
      );
      setSignUpEmail("");
      setSignUpPassword("");
    } catch (err) {
      setSignUpErrorMessage(err.message);
      console.log(err);
    } finally {
      setSignUpButtonClicked(false);
    }
  };

  const toggleSignUpAttempt = () => {
    setSignUpAttempt(!signUpAttempt); // Toggle the signUpAttempt state
  };

  return (
    <AnimatePresence>
      {resetPasswordToggle ? (
        <ResetPasswordComponent
          setConditionGood={setConditionGood}
          setStatusBarMessage={setStatusBarMessage}
          handleToggleResetPassword={handleToggleResetPassword}
        />
      ) : signUpAttempt ? (
        <motion.div
          key="signUp"
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 500 }}
          transition={{ duration: 0.2 }}
          className="w-[57%] absolute right-0 bg h-screen py-8 px-12 flex flex-col"
        >
          <div className="flex flex-col gap-1 md:gap-2">
            <span className="font-semibold md:text-2xl tracking-tight text-xl">
              Create your account
            </span>
            <span className="md:text-sm md:flex hidden text-xs text-slate-500">
              Admin approval may take time. You'll receive an email upon
              approval.
            </span>
          </div>
          <form
            onSubmit={handleSignUpSubmit}
            className="mt-8 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Email Address</label>
              <input
                className="border w-3/4 border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
                value={signUpEmail}
                placeholder="e.g thatemail@mail.com"
                name="signUpEmail"
                onChange={(e) => setSignUpEmail(e.target.value)}
              />
            </div>{" "}
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">
                Full Name (First Name first)
              </label>
              <input
                className="border w-3/4 border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
                // value={signUpName}
                placeholder="Tola David"
                // name="signUpName"
                // onChange={(e) => setSignUpName(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Password</label>
              <input
                className="border w-3/4 border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="● ● ● ● ● ● ● ●"
                name="signUpPassword"
                onChange={(e) => setSignUpPassword(e.target.value)}
                value={signUpPassword}
              />
            </div>
            {signUpErrorMessage && (
              <span className="-my-4 text-red-500 text-xs">
                {signUpErrorMessage}
              </span>
            )}
            <button
              type="submit"
              disabled={signUpButtonClicked}
              className={`
            ${
              signUpButtonClicked
                ? "bg-gray-300 text-gray-600 border-none cursor-not-allowed"
                : "bg-primary  text-white  hover:bg-white hover:text-primary hover:border-primary border border-primary"
            } w-3/4 py-3 rounded-lg text-sm transition-all duration-300 ease-in-out`}
            >
              {signUpButtonClicked ? "Signing up..." : "Sign up"}
            </button>
          </form>
          <span className="text-xs text-center w-3/4 mt-10">
            Have an account?{" "}
            <button
              className="text-primary underline"
              onClick={toggleSignUpAttempt}
            >
              Sign In
            </button>
          </span>{" "}
        </motion.div>
      ) : (
        <motion.div
          key="signIn"
          initial={{ opacity: 0, x: 500 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: 500 }}
          transition={{ duration: 0.2 }}
          className="w-[57%] absolute right-0 bg h-screen py-8 px-12 flex flex-col"
        >
          <div className="flex flex-col gap-1 md:gap-2">
            <span className="font-semibold md:text-2xl tracking-tight text-xl">
              Welcome Back!
            </span>
            <span className="md:text-sm md:flex hidden text-xs text-slate-500">
              Enter your details below to continue
            </span>
          </div>
          <form
            onSubmit={handleLoginSubmit}
            className="mt-8 flex flex-col gap-8"
          >
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Email Address</label>
              <input
                className="border w-3/4 border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
                value={loginEmail}
                placeholder="e.g thatemail@mail.com"
                name="loginEmail"
                onChange={(e) => setLoginEmail(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-1">
              <label className="text-xs text-gray-500">Password</label>
              <input
                className="border w-3/4 border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
                placeholder="● ● ● ● ● ● ● ●"
                name="loginPassword"
                onChange={(e) => setLoginPassword(e.target.value)}
                value={loginPassword}
              />
            </div>
            <button
              className="underline text-sm w-fit -mt-5"
              onClick={handleToggleResetPassword}
            >
              Forgot password?
            </button>
            {errorMessage && (
              <span className="-my-4 text-red-500 text-xs">{errorMessage}</span>
            )}
            <button
              type="submit"
              disabled={signInButtonClicked}
              className={`
            ${
              signInButtonClicked
                ? "bg-gray-300 text-gray-600 border-none cursor-not-allowed"
                : "bg-primary  text-white  hover:bg-white hover:text-primary hover:border-primary border border-primary"
            } w-3/4 py-3 rounded-lg text-sm transition-all duration-300 ease-in-out`}
            >
              {signInButtonClicked ? "Signing in..." : "Sign in"}
            </button>
          </form>
          <span className="text-xs text-center w-3/4 mt-10">
            Don't have an account?{" "}
            <button
              className="text-primary underline"
              onClick={toggleSignUpAttempt}
            >
              Sign Up
            </button>
          </span>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default LoginForm;
