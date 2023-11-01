import { useState } from "react";

import { useNavigate, useLocation } from "react-router-dom";
import { auth, db } from "../../config/firebase";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import {
  handleGetUserProfileAndReturnRole,
  handleCreateAdminProfileDocument,
} from "./../../controllers/authControllers";

const LoginForm = () => {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [signUpEmail, setSignUpEmail] = useState("");
  const [signUpPassword, setSignUpPassword] = useState("");
  const [signUpAttempt, setSignUpAttempt] = useState(false);
  const [errorMessage, setErrorMessage] = useState(null);
  const [signUpErrorMessage, setSignUpErrorMessage] = useState(null);
  const [adminProfileCreationLoading, setAdminProfileCreationLoading] =
    useState(false);

  const navigate = useNavigate();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/admin";

  
  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log(auth);
      await signInWithEmailAndPassword(auth, loginEmail, loginPassword)
        .then(async (userCredential) => {
          //try to get the user profile to check user role
          const userRole = await handleGetUserProfileAndReturnRole(
            userCredential.user.uid
          );
          console.log(userRole);
          if (userRole === "admin") {
            navigate(from, { replace: true });
          }

          if (userRole !== "admin") {
            setErrorMessage(
              "you are not an admin, you might have not been approved as an admin"
            );
            throw new Error(
              "you are not an admin, you might have not been approved as an admin"
            );
          }
          setLoginEmail("");
          setLoginPassword("");

          console.log(userCredential.user);
          console.log(auth);
          return;
        })
        .catch((error) => {
          console.log(` first ${error}`);
          throw error;
          // ..
        });
    } catch (err) {
      console.log(`second catch ${err}`);
      // const errorCode = err.code;
      // const errorMessage = err.message;
      setErrorMessage(err.message);
    }
  };

  const handleSignUpSubmit = async (e) => {
    e.preventDefault();
    try {
      await createUserWithEmailAndPassword(auth, signUpEmail, signUpPassword)
        .then((userCredential) => {
          console.log(userCredential);
          handleCreateAdminProfileDocument(
            setSignUpErrorMessage,
            setAdminProfileCreationLoading,
            userCredential.user.email,
            userCredential.user.uid
          );
          setSignUpEmail("");
          setSignUpPassword("");
        })
        .catch((error) => {
          console.log(error);
          throw error;
        });
    } catch (err) {
      console.log(err);
      setSignUpErrorMessage(err.message);
    }
  };

  function toggleSignUpAttempt() {
    setSignUpAttempt(!signUpAttempt);
  }


  return adminProfileCreationLoading === false ? (
    signUpAttempt === false ? (
      <>
        <h2>Login</h2>
        <form onSubmit={handleLoginSubmit}>
          <input
            value={loginEmail}
            placeholder="loginEmail.."
            name="siwesLoginEmail"
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            value={loginPassword}
            placeholder="password.."
            name="siwesLoginPassword"
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          {errorMessage && <p>{errorMessage}</p>}
          <br />
          <button type="submit">Login</button>
        </form>
        <button onClick={toggleSignUpAttempt}>Sign Up</button>
      </>
    ) : (
      <>
        <h2>SignUp</h2>
        <p>Approval of your application to be an admin might take a while,</p>
        <p>
          You will recieve an approval email as soon as your application is
          approved
        </p>
        <form onSubmit={handleSignUpSubmit}>
          <input
            value={signUpEmail}
            placeholder="signUp Email.."
            onChange={(e) => setSignUpEmail(e.target.value)}
          />
          <input
            value={signUpPassword}
            placeholder="sign Up password.."
            onChange={(e) => setSignUpPassword(e.target.value)}
          />
          {signUpErrorMessage && <p>{signUpErrorMessage}</p>}
          <button type="submit">Apply to be an admin</button>
        </form>
        <button onClick={toggleSignUpAttempt}>login</button>
      </>
    )
  ) : (
    <p>loading....</p>
  );
};

export default LoginForm;
