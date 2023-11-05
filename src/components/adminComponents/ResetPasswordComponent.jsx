import { useState } from "react";
import { resetPassword } from "./../../controllers/authControllers";

const ResetPasswordComponent = ({
  handleToggleResetPassword,
  setConditionGood,
  setStatusBarMessage,
}) => {
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");

  async function handleResetPassword(e) {
    e.preventDefault();
    resetPassword(resetPasswordEmail, setConditionGood, setStatusBarMessage);
  }

  return (
    <>
      <h2>Reset password</h2>
      <form>
        <input
          value={resetPasswordEmail}
          placeholder="Email.."
          onChange={(e) => setResetPasswordEmail(e.target.value)}
        />
        <br />
        <button
          disabled={resetPasswordEmail.length < 1}
          onClick={handleResetPassword}
        >
          Reset Password
        </button>
      </form>
      <hr />
      <button onClick={handleToggleResetPassword}>Login</button>
    </>
  );
};

export default ResetPasswordComponent;
