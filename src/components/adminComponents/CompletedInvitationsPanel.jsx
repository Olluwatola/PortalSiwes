import { useState, useEffect } from "react";
import { fetchCompletedInvites } from "./../../controllers/ScreeningControllers";
import InvitationListItem from "./adminListItem/InvitationListItem";
import CompletedInvitationModal from "./adminModals/CompletedInvitationModal";
import InvitationToNotHoldModal from "./adminModals/InvitationToNotHoldModal";

const CompletedInvitationsPanel = () => {
  const [isCIVModalOpen, setIsCIVModalOpen] = useState(false);
  const [isIVTNHModalOpen, setIsIVTNHModalOpen] = useState(false);
  const [arrayOfCompletedInvites, setArrayOfCompletedInvites] = useState([]);
  const [fetchInviteError, setFetchInviteError] = useState(null);
  const [inviteFetchLoading, setInviteFetchLoading] = useState(false);

  const openCIVModal = () => {
    setIsCIVModalOpen(true);
  };

  const closeCIVModal = () => {
    setIsCIVModalOpen(false);
  };

  const openIVTNHModal = () => {
    setIsIVTNHModalOpen(true);
  };

  const closeIVTNHModal = () => {
    setIsIVTNHModalOpen(false);
  };

  useEffect(() => {
    fetchCompletedInvites(
      setArrayOfCompletedInvites,
      setInviteFetchLoading,
      setFetchInviteError,
      true
    );

    //   return () => {
    //     second
    //   }
  }, []);

  return (
    <>
      <h2>COMPLETED INVITATIONS</h2>
      <button
        onClick={() => {
          fetchCompletedInvites(
            setArrayOfCompletedInvites,
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
        ? { fetchInviteError }
        : arrayOfCompletedInvites?.map((invite, index) => (
            <InvitationListItem
              index={index}
              invite={invite}
              date={invite.date}
              time={invite.time}
              key={invite.id}
            />
          ))}
      <br />
      <button onClick={openIVTNHModal}>
        View Invitations that have been marked to not hold
      </button>
      <InvitationToNotHoldModal
        isIVTNHModalOpen={isIVTNHModalOpen}
        onIVTNHClose={closeIVTNHModal}
      />
      <CompletedInvitationModal
        isCIVOpen={isCIVModalOpen}
        onCIVClose={closeCIVModal}
      />
    </>
  );
};

export default CompletedInvitationsPanel;
