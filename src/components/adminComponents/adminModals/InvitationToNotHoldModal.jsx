import Modal from "react-modal";
import InvitationToNotHoldModalContent from "./../adminModalContents/InvitationToNotHoldModalContent";

const InvitationToNotHoldModal = ({isIVTNHModalOpen,onIVTNHClose}) => {
  return (
    <Modal isOpen={isIVTNHModalOpen} onRequestClose={onIVTNHClose}>
      <InvitationToNotHoldModalContent />
    </Modal>
  )
}

export default InvitationToNotHoldModal