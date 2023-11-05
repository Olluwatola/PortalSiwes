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
      <button onClick={openModal}>Change Password</button>
      <ChangePasswordModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default ChangePassword;
