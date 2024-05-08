import Modal from "./InteractiveModal";
import NotCompletedInvitationModalContent from "./../adminModalContents/NotCompletedInvitationModalContent";

const NotCompletedInvitationModal = ({ isCIVOpen, onCIVClose }) => {
  return (
    <Modal isOpen={isCIVOpen} onClose={onCIVClose}>
      <NotCompletedInvitationModalContent />
    </Modal>
  );
};

export default NotCompletedInvitationModal;
