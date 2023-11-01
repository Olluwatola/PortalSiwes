import Modal from "react-modal"; // Import the modal library
import NotCompletedInvitationModalContent from "./../adminModalContents/NotCompletedInvitationModalContent";

const NotCompletedInvitationModal = ({ isCIVOpen, onCIVClose }) => {
  return (
    <Modal isOpen={isCIVOpen} onRequestClose={onCIVClose}>
      <NotCompletedInvitationModalContent />
    </Modal>
  );
};

export default NotCompletedInvitationModal;
