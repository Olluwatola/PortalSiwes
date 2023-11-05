import Modal from "react-modal";
import ChangePasswordModalContent from "./../adminModalContents/ChangePasswordModalContent";

const ChangePasswordModal = ({ isOpen, onClose }) => {
  return (
    <>
      <Modal ariaHideApp={false} isOpen={isOpen} onRequestClose={onClose}>
        <ChangePasswordModalContent />
      </Modal>
    </>
  );
};

export default ChangePasswordModal;
