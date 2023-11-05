import { useState } from "react";
import { changeAdminPassword } from "./../../../controllers/authControllers";
import AdminStatusBar from "../adminStatusBar/AdminStatusBar";

const ChangePasswordModalContent = () => {
  const [conditionGood, setConditionGood] = useState(null);
  const [statusBarMessage, setStatusBarMessage] = useState(null);
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  async function handleChangePassword(e) {
    e.preventDefault();
    changeAdminPassword(
      loginEmail,
      loginPassword,
      newPassword,
      confirmNewPassword,
      setLoginEmail,
      setLoginPassword,
      setNewPassword,
      setConfirmNewPassword,
      setConditionGood,
      setStatusBarMessage
    );
  }

  return (
    <>
      <AdminStatusBar
        conditionGood={conditionGood}
        statusBarMessage={statusBarMessage}
      />
      <form onSubmit={handleChangePassword}>
        <input
          placeholder="confirm your login email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />
        <br />
        <input
          placeholder="current password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
        <br />
        <input
          placeholder="new password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <br />
        <input
          placeholder="confirm new password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />
        <br />
        <button type="submit">Change password</button>
      </form>
    </>
  );
};

export default ChangePasswordModalContent;
