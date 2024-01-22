import { useState, useEffect } from "react";
import InvitationModal from "./adminModals/CreateInvitationModal";
import InvitationListItem from "./adminListItem/InvitationListItem";
import NotCompletedInvitationModal from "./adminModals/NotCompletedInvitationModal";
import { fetchInvites } from "./../../controllers/ScreeningControllers";
import { MdOutlineRefresh } from "react-icons/md";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";

const InvitationPanel = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCIVModalOpen, setIsCIVModalOpen] = useState(false);

  const [lastIndex, setLastIndex] = useState(0);

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
  }, []);

  useEffect(() => {
    const lastIndex = arrayOfInvites.length - 1;
    setLastIndex(lastIndex);
  }, [arrayOfInvites]);

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
    <div className="flex flex-col gap-5 w-[30%]">
      <span className="text-neutral-500 text-xs tracking-widest flex justify-between">
        SCHEDULED INVITATIONS
        <div className="flex items-center gap-3">
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
            <MdOutlineRefresh
              className={`${inviteFetchLoading ? "animate-spin" : null} text-lg`}
            />
          </button>
          <button className="text-primary" onClick={openCIVModal}>
            View all
          </button>
        </div>
      </span>

      <div className="bg-white h-[50vh] shadow-md border border-neutral-100 rounded-xl p-5 flex flex-col justify-center gap-3">
        {inviteFetchLoading ? (
          <div className="w-full">
            <Skeleton count={3} className="h-16" />
          </div>
        ) : fetchInviteError ? (
          { fetchInviteError }
        ) : (
          arrayOfInvites?.map((invite, index) => (
            <InvitationListItem
              index={index}
              lastIndex={lastIndex}
              invite={invite}
              date={invite.date}
              time={invite.time}
              key={invite.id}
            />
          ))
        )}
        <button
          className="border mt-3 border-primary rounded-md py-2.5 transition-all hover:bg-white hover:text-primary text-center text-sm duration-300 ease-in-out bg-primary text-white"
          onClick={openModal}
        >
          Create Invitation
        </button>
      </div>
      <InvitationModal isOpen={isModalOpen} onClose={closeModal} />
      <NotCompletedInvitationModal
        isCIVOpen={isCIVModalOpen}
        onCIVClose={closeCIVModal}
      />
    </div>
  );
};

export default InvitationPanel;
