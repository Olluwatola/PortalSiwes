import Modal from "./InteractiveModal";
import InvitationToNotHoldModalContent from "./../adminModalContents/InvitationToNotHoldModalContent";

const InvitationToNotHoldModal = ({isIVTNHModalOpen,onIVTNHClose}) => {
  return (
    <Modal isOpen={isIVTNHModalOpen} onClose={onIVTNHClose}>
      <InvitationToNotHoldModalContent />
    </Modal>
  )
}

export default InvitationToNotHoldModal