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
        setStatusBarMessage={setStatusBarMessage}
      />
      <form className="flex flex-col gap-2" onSubmit={handleChangePassword}>
        <input
          className="border border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary outline-none"
          placeholder="Confirm your login email"
          value={loginEmail}
          onChange={(e) => setLoginEmail(e.target.value)}
        />

        <input
          className="border border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary outline-none"
          placeholder="Current password"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />

        <input
          className="border border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary outline-none"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />

        <input
          className="border border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary outline-none"
          placeholder="Confirm new password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
        />

        <button
          className="bg-primary  text-white  hover:bg-white hover:text-primary hover:border-primary border border-primary w-full py-3 rounded-lg text-sm transition-all duration-300 ease-in-out mt-5"
          type="submit"
        >
          Change password
        </button>
      </form>
    </>
  );
};

export default ChangePasswordModalContent;
