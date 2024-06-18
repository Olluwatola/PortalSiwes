import { useState } from "react";
import {
  markInviteHasHeld,
  markInviteHasNotHeld,
} from "./../../../controllers/ScreeningControllers";

const ToggleableMarkButton = ({
  id,
  returnedInviteDocument,
  setReturnedInviteDocument,
  setMarkInviteLoading,
  setMarkInviteError,
}) => {
  const [isHovered, setIsHovered] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleToggleMark = async () => {
    setIsLoading(true);
    try {
      await markInviteHasHeld(
        id,
        returnedInviteDocument,
        setReturnedInviteDocument,
        setMarkInviteLoading,
        setMarkInviteError
      );
    } finally {
      setIsLoading(false);
    }
  };

  const handleToggleUnmark = async () => {
    setIsLoading(true);
    try {
      await markInviteHasNotHeld(
        id,
        returnedInviteDocument,
        setReturnedInviteDocument,
        setMarkInviteLoading,
        setMarkInviteError
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <button
      onClick={
        isLoading
          ? null
          : returnedInviteDocument?.hasHeld
          ? handleToggleUnmark
          : handleToggleMark
      }
      className={`px-4 py-2 rounded-lg text-white text-sm w-48 cursor-pointer ${
        isLoading ? "opacity-50 cursor-wait" : ""
      } ${
        returnedInviteDocument?.hasHeld
          ? "bg-blue-500 border border-blue-5   00 hover:bg-white hover:border hover:border-blue-500 hover:text-blue-500"
          : "bg-gray-400 border border-gray-400 hover:bg-white hover:border hover:border-gray-400 hover:text-gray-500"
      } transition-all duration-200 ease-in-out`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      disabled={isLoading}
    >
      {returnedInviteDocument?.hasHeld
        ? isLoading
          ? "Loading..."
          : isHovered
          ? "Click to unmark"
          : "Unmark invite as held"
        : isLoading
        ? "Loading..."
        : isHovered
        ? "Click to mark"
        : "Mark invite as held"}
    </button>
  );
};

export default ToggleableMarkButton;
