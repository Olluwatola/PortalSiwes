import { useState } from "react";
import Modal from "react-modal"; // Import the modal library
import CreateInvitation from "./../adminModalContents/CreateInvitation"; // Your CreateInvitation component

function InvitationModal({ userObjectArray, isOpen, onClose }) {
  const [addParticipantToggle, setAddParticipantToggle] = useState(false);

  function handleAddParticipantToggle() {
    setAddParticipantToggle(!addParticipantToggle);
    //console.log('i don change o')
  }

  return (
    <Modal ariaHideApp={false}  isOpen={isOpen} onRequestClose={onClose}>
      <CreateInvitation
        userObjectArray={userObjectArray}
        isOpen={isOpen}
        onRequestClose={onClose}
        handleAddParticipantToggle={handleAddParticipantToggle}
        addParticipantToggle={addParticipantToggle}
      />
    </Modal>
  );
}

export default InvitationModal;
