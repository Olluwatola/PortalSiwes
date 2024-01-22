import { useState, useEffect } from "react";
import InvitationModal from "./adminModals/CreateInvitationModal";
import InvitationListItem from "./adminListItem/InvitationListItem";
import NotCompletedInvitationModal from "./adminModals/NotCompletedInvitationModal";
import { fetchInvites } from "./../../controllers/ScreeningControllers";

const InvitationPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCIVModalOpen, setIsCIVModalOpen] = useState(false);

  const [arrayOfInvites, setArrayOfInvites] = useState([]);
  const [fetchInviteError, setFetchInviteError] = useState(null);
  const [inviteFetchLoading, setInviteFetchLoading] = useState(false);

  useEffect(() => {
    fetchInvites(
      setArrayOfInvites,
      setInviteFetchLoading,
      setFetchInviteError,
      true
    );

    //   return () => {
    //     second
    //   }
  }, []);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const openCIVModal = () => {
    setIsCIVModalOpen(true);
  };

  const closeCIVModal = () => {
    setIsCIVModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-5 w-[30%] bg-blue-600">
      <h2>SCHEDULED INVITATIONS</h2>
      <button
        onClick={() => {
          fetchInvites(
            setArrayOfInvites,
            setInviteFetchLoading,
            setFetchInviteError,
            true
          );
        }}
      >
        refresh
      </button>
      <button onClick={openCIVModal}>view all</button>
      {inviteFetchLoading
        ? "loading...."
        : fetchInviteError
        ? {fetchInviteError}
        : arrayOfInvites?.map((invite, index) => (
            <InvitationListItem
              index={index}
              invite={invite}
              date={invite.date}
              time={invite.time}
              key={invite.id}
            />
          ))}
      <button onClick={openModal}>Create Invitation</button>
      <InvitationModal isOpen={isModalOpen} onClose={closeModal} />
      <NotCompletedInvitationModal
        isCIVOpen={isCIVModalOpen}
        onCIVClose={closeCIVModal}
      />
    </div>
  );
};

export default InvitationPanel;
