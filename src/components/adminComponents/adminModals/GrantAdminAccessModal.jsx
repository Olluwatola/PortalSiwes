import Modal from "react-modal";
import GrantAdminAccessModalContent from "./../adminModalContents/GrantAdminAccessModalContent";

const GrantAdminAccessModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={onClose}>
        <GrantAdminAccessModalContent />
      </Modal>
    </>
  );
};

export default GrantAdminAccessModal;
