import Modal from "./InteractiveModal";
import CompletedInvitationModalContent from "./../adminModalContents/CompletedInvitationModalContent";


const CompletedInvitationModal = ({isCIVOpen,onCIVClose}) => {
  return (
    <Modal isOpen={isCIVOpen} onClose={onCIVClose}>
      <CompletedInvitationModalContent />
    </Modal>
  );
  
}

export default CompletedInvitationModal