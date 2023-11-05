import { useState } from "react";
import GrantAdminAccessModal from "./adminModals/GrantAdminAccessModal";


const GrantAdminAccess = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <button onClick={openModal}>Grant admin access</button>
      <GrantAdminAccessModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default GrantAdminAccess;
