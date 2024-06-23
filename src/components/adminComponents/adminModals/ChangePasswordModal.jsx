import Modal from "./InteractiveModal";
import ChangePasswordModalContent from "./../adminModalContents/ChangePasswordModalContent";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal ariaHideApp={false} isOpen={isOpen} onClose={onClose}>
        <ChangePasswordModalContent />
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
