import { useState, useEffect } from "react";
import InvitationModal from "./adminModals/CreateInvitationModal";
import InvitationListItem from "./adminListItem/InvitationListItem";
import NotCompletedInvitationModal from "./adminModals/NotCompletedInvitationModal";
import { fetchInvites } from "./../../controllers/ScreeningControllers";
import { MdOutlineRefresh } from "react-icons/md";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";

const InvitationPanel = ({ buttonShow = true }) => {
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
              className={`${
                inviteFetchLoading ? "animate-spin" : null
              } text-lg`}
            />
          </button>
          <button className="text-primary" onClick={openCIVModal}>
            View all
          </button>
        </div>
      </span>

      <div className="bg-white max-h-[50vh] h-full shadow-lg shadow-slate-100 border border-neutral-100 rounded-xl p-5 flex flex-col gap-3">
        {inviteFetchLoading ? (
          <div className="w-full">
            <Skeleton count={3} className="h-16 rounded-md" />
          </div>
        ) : fetchInviteError ? (
          { fetchInviteError }
        ) : (
          arrayOfInvites?.map((invite, index) => (
            <InvitationListItem
              index={index}
              invite={invite}
              date={invite.date}
              time={invite.time}
              key={invite.id}
              color="bg-amber-500"
            />
          ))
        )}
        <button
          className={`border mt-3 border-primary rounded-md py-2.5 transition-all hover:bg-white hover:text-primary text-center text-sm duration-300 ease-in-out bg-primary text-white
            ${buttonShow ? "block" : "hidden"}
          `}
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
