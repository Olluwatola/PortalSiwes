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

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  const handleToggleResetPassword = () => {
    setResetPasswordToggle(!resetPasswordToggle); // Toggle the resetPasswordToggle state
  };

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(auth)
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
    <>
      <h2>Login</h2>
      <form onSubmit={handleLoginSubmit}>
        <input
          value={loginEmail}
          placeholder="Login Email.."
          name="loginEmail"
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <input
          value={loginPassword}
          //type="password" // Make sure password input is of type password
          placeholder="Password.."
          name="loginPassword"
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        {errorMessage && <p>{errorMessage}</p>}
        <button type="submit">Login</button>
      </form>
      <button onClick={handleToggleResetPassword}>Reset password</button>
      <hr />
      <button onClick={toggleSignUpAttempt}>Sign Up</button>
    </>
  );
};

export default LoginForm;
