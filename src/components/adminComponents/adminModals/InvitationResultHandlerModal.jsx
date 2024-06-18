import Modal from "./InteractiveModal";
import InvitationResultHandler from "./../adminModalContents/InvitationResultHandler"; // Your CreateInvitation component

const InvitationResultHandlerModal = ({setReturnedInviteDocument,id,returnedInviteDocument, isIRHMOpen, onIRHMClose }) => {
  return (
    <Modal ariaHideApp={false} isOpen={isIRHMOpen} onClose={onIRHMClose}>
      <InvitationResultHandler
          participantsIdArray={returnedInviteDocument?.participantsIdArray}
          invitationId={id}
          onRequestClose={onIRHMClose}
          returnedInviteDocument={returnedInviteDocument}
          setReturnedInviteDocument={setReturnedInviteDocument}
        />
    </Modal>
  );
};

export default InvitationResultHandlerModal;
