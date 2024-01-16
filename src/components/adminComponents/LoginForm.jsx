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

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleToggleResetPassword = () => {
    setResetPasswordToggle(!resetPasswordToggle); // Toggle the resetPasswordToggle state
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
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
      setErrorMessage(err.message);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      setSignInButtonClicked(true);

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
      setSignInButtonClicked(false);
    }
  };

  const toggleSignUpAttempt = () => {
    setSignUpAttempt(!signUpAttempt); // Toggle the signUpAttempt state
  };

  return resetPasswordToggle ? (
    <ResetPasswordComponent
      setConditionGood={setConditionGood}
      setStatusBarMessage={setStatusBarMessage}
      handleToggleResetPassword={handleToggleResetPassword}
    />
  ) : signUpAttempt ? (
    <>
      <h2>Sign Up</h2>
      <p>Approval of your application to be an admin might take a while.</p>
      <p>
        You will receive an approval mail as soon as your application is
        approved.
      </p>
      <form onSubmit={handleSignUpSubmit}>
        <input
          value={signUpEmail}
          placeholder="Sign Up Email.."
          onChange={(e) => setSignUpEmail(e.target.value)}
        />
        <input
          value={signUpPassword}
          placeholder="Sign Up Password.."
          onChange={(e) => setSignUpPassword(e.target.value)}
        />
        {signUpErrorMessage && <p>{signUpErrorMessage}</p>}
        <button type="submit">Apply to be an admin</button>
      </form>
      <hr />
      <button onClick={toggleSignUpAttempt}>Login</button>
    </>
  ) : (
    <div className="w-[57%] h-screen py-8 px-12">
      <div className="flex flex-col gap-1 md:gap-2">
        <span className="font-semibold md:text-2xl tracking-tight text-xl">
          Welcome Back!
        </span>
        <span className="md:text-sm md:flex hidden text-xs text-slate-500">
          Enter your details below to continue
        </span>
      </div>
      <form onSubmit={handleLoginSubmit} className="mt-8 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Email</label>
          <input
            className="border w-3/4 border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            value={loginEmail}
            placeholder="Login Email.."
            name="loginEmail"
            onChange={(e) => setLoginEmail(e.target.value)}
          />
        </div>{" "}
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Password</label>
          <input
            className="border w-3/4 border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Password.."
            name="loginPassword"
            onChange={(e) => setLoginPassword(e.target.value)}
            value={loginPassword}
          />
        </div>
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
        {errorMessage && <p>{errorMessage}</p>}
      </form>
      <button onClick={handleToggleResetPassword}>Reset password</button>
      <hr />
      <button onClick={toggleSignUpAttempt}>Sign Up</button>
    </div>
  );
};

export default LoginForm;
