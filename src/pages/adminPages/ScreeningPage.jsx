import NotCompletedInvitationPanel from "./../../components/adminComponents/NotCompletedInvitationPanel";
import CompletedInvitationsPanel from "./../../components/adminComponents/CompletedInvitationsPanel";
import ApplicantsNotInvited from "./../../components/adminComponents/ApplicantsNotInvited";
import InvitationModal from "./../../components/adminComponents/adminModals/CreateInvitationModal";
import { useState } from "react";

const ScreeningPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col gap-8">
      <div className="flex items-center justify-between">
        <span className="text-3xl font-medium">Screening</span>
        <button
          onClick={openModal}
          className="bg-primary outline-none h-11 flex justify-center items-center w-80 rounded-lg text-white
            hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/15 transition-all duration-200 ease-in-out"
        >
          Create Invitation
        </button>
      </div>
      <div className="flex gap-10">
        <NotCompletedInvitationPanel buttonShow={false} />
        <CompletedInvitationsPanel />
      </div>
      <ApplicantsNotInvited />
      <InvitationModal isOpen={isModalOpen} onClose={closeModal} />
    </div>
  );
};

export default ScreeningPage;
