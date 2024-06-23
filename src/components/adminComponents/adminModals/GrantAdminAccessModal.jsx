import Modal from "./InteractiveModal";
import GrantAdminAccessModalContent from "./../adminModalContents/GrantAdminAccessModalContent";

const GrantAdminAccessModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal ariaHideApp={false} isOpen={isOpen} onClose={onClose}>
        <GrantAdminAccessModalContent />
      </Modal>
    </>
  );
};

export default GrantAdminAccessModal;
