import { useState } from "react";
import { resetPassword } from "./../../controllers/authControllers";
import { motion } from "framer-motion";

const ResetPasswordComponent = ({
  handleToggleResetPassword,
  setConditionGood,
  setStatusBarMessage,
}) => {
  const [resetPasswordEmail, setResetPasswordEmail] = useState("");
  const [signUpButtonClicked, setSignUpButtonClicked] = useState(false);

  async function handleResetPassword(e) {
    e.preventDefault();
    setSignUpButtonClicked(true);
    resetPassword(resetPasswordEmail, setConditionGood, setStatusBarMessage);
  }

  return (
    <motion.div
      key="signUp"
      initial={{ opacity: 0, x: 500 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: 500 }}
      transition={{ duration: 0.2 }}
      className="w-[57%] absolute right-0 bg h-screen py-8 px-12 flex flex-col"
    >
      <div className="flex flex-col gap-1 md:gap-2">
        <span className="flex w-full justify-between items-center font-semibold md:text-2xl tracking-tight text-xl">
          Reset Password
          <button
            type="button"
            className="text-red-600 font-normal text-base"
            onClick={handleToggleResetPassword}
          >
            GO BACK
          </button>
        </span>
        <span className="md:text-sm md:flex hidden text-xs text-slate-500">
          Enter the email address linked to your account below{" "}
        </span>
      </div>{" "}
      <form className="mt-8 flex flex-col gap-8">
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Email Address</label>
          <input
            className="border w-3/4 border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            value={resetPasswordEmail}
            placeholder="e.g thatemail@mail.com"
            name="resetEmail"
            onChange={(e) => setResetPasswordEmail(e.target.value)}
          />
        </div>
        <button
          onClick={handleResetPassword}
          disabled={resetPasswordEmail.length < 1}
          className={`
            ${
              resetPasswordEmail.length < 1
                ? "bg-gray-300 text-gray-600 border-none cursor-not-allowed"
                : "bg-primary  text-white  hover:bg-white hover:text-primary hover:border-primary border border-primary"
            } w-3/4 py-3 rounded-lg text-sm transition-all duration-300 ease-in-out`}
        >
          {signUpButtonClicked ? "Processing..." : "Reset Password"}
        </button>
      </form>
    </motion.div>
  );
};

export default ResetPasswordComponent;
