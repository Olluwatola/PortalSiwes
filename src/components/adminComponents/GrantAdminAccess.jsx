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
      <button
        className="border border-black py-2 rounded-lg"
        onClick={openModal}
      >
        Grant admin access
      </button>
      <GrantAdminAccessModal isOpen={isModalOpen} onClose={closeModal} />
    </>
  );
};

export default GrantAdminAccess;
