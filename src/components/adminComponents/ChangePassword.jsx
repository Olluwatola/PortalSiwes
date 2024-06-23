import { useState } from "react";
import ChangePasswordModal from "./adminModals/ChangePasswordModal";
const ChangePassword = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <>
      <button className="w-full bg-black text-white py-2 rounded-lg" onClick={openModal}>Change Password</button>
      <ChangePasswordModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ChangePassword;
