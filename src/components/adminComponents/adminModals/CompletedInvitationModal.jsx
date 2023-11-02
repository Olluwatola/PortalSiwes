import Modal from "react-modal"; 
import CompletedInvitationModalContent from "./../adminModalContents/CompletedInvitationModalContent";


const CompletedInvitationModal = ({isCIVOpen,onCIVClose}) => {
  return (
    <Modal isOpen={isCIVOpen} onRequestClose={onCIVClose}>
      <CompletedInvitationModalContent />
    </Modal>
  );
  
}

export default CompletedInvitationModal