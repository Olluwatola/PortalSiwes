import { useState, useEffect } from "react";
import { fetchCompletedInvites } from "./../../controllers/ScreeningControllers";
import InvitationListItem from "./adminListItem/InvitationListItem";
import CompletedInvitationModal from "./adminModals/CompletedInvitationModal";
import InvitationToNotHoldModal from "./adminModals/InvitationToNotHoldModal";
import { MdOutlineRefresh } from "react-icons/md";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";

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
    <div className="flex flex-col gap-5 w-[70%]">
      <span className="text-neutral-500 text-xs tracking-widest flex justify-between">
        COMPLETED INVITATIONS{" "}
        <div className="flex items-center gap-3">
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

      <div className="bg-white h-[50vh] shadow-lg shadow-slate-100 border border-neutral-100 rounded-xl p-5 flex flex-col justify-start gap-5">
        {" "}
        {inviteFetchLoading ? (
          <Skeleton count={3} className="h-16 rounded-md" />
        ) : fetchInviteError ? (
          { fetchInviteError }
        ) : (
          arrayOfCompletedInvites?.map((invite, index) => (
            <InvitationListItem
              index={index}
              invite={invite}
              date={invite.date}
              time={invite.time}
              key={invite.id}
            />
          ))
        )}
        <button
          className="w-fit border border-red-500 font-semibold text-red-500 rounded-md p-2 hover:bg-red-500 hover:text-white transition-all duration-300 ease-in-out"
          onClick={openIVTNHModal}
        >
          View Declined Invitations
        </button>
      </div>
      <InvitationToNotHoldModal
        isIVTNHModalOpen={isIVTNHModalOpen}
        onIVTNHClose={closeIVTNHModal}
      />
      <CompletedInvitationModal
        isCIVOpen={isCIVModalOpen}
        onCIVClose={closeCIVModal}
      />
    </div>
  );
};

export default CompletedInvitationsPanel;
