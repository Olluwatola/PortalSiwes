import { getAllNotInvitedApplications } from "./../../controllers/fetchApplication";
import NotCompletedInvitationPanel from "./../../components/adminComponents/NotCompletedInvitationPanel";
import CompletedInvitationsPanel from "./../../components/adminComponents/CompletedInvitationsPanel";
import ApplicantsNotInvited from "./../../components/adminComponents/ApplicantsNotInvited";
import InvitationModal from "./../../components/adminComponents/adminModals/CreateInvitationModal";
import { useState, useEffect } from "react";

const ScreeningPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [arrayOfApplication, setArrayOfApplication] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [getApplicationsError, setGetApplicationsError] = useState(null);
  let returnedApplications;

  useEffect(() => {
    getAllNotInvitedApplications(
      setArrayOfApplication,
      setIsLoading,
      returnedApplications,
      setGetApplicationsError
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
      <ApplicantsNotInvited
        arrayOfApplication={arrayOfApplication}
        isLoading={isLoading}
        getApplicationsError={getApplicationsError}
        setArrayOfApplication={setArrayOfApplication}
        setIsLoading={setIsLoading}
        returnedApplications={returnedApplications}
        setGetApplicationsError={setGetApplicationsError}
      />
      <InvitationModal
        arrayOfApplication={arrayOfApplication}
        isLoading={isLoading}
        getApplicationsError={getApplicationsError}
        setArrayOfApplication={setArrayOfApplication}
        setIsLoading={setIsLoading}
        returnedApplications={returnedApplications}
        setGetApplicationsError={setGetApplicationsError}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </div>
  );
};

export default ScreeningPage;
