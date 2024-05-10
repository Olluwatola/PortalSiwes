import { useState } from "react";
import { getAllNotInvitedApplications } from "../../controllers/fetchApplication";
import ApplicationListItem from "./adminListItem/ApplicationListItem";
import InvitationModal from "./adminModals/CreateInvitationModal";
import { MdOutlineRefresh } from "react-icons/md";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";

const ApplicantsNotInvited = ({
  arrayOfApplication,
  isLoading,
  getApplicationsError,
  setArrayOfApplication,
  setIsLoading,
  returnedApplications,
  setGetApplicationsError,
}) => {
  const [returnedDocument, setReturnedDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  function handleInviteApplication(item) {
    setReturnedDocument(item);
    openModal();
  }
  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <div className="flex flex-col gap-5">
      <span className="text-neutral-500 text-xs tracking-widest flex justify-between">
        YET TO BE SCREENED
        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              getAllNotInvitedApplications(
                setArrayOfApplication,
                setIsLoading,
                returnedApplications,
                setGetApplicationsError
              );
            }}
          >
            <MdOutlineRefresh
              className={`${isLoading ? "animate-spin" : null} text-lg`}
            />
          </button>
        </div>
      </span>
      {isLoading ? (
        <Skeleton count={5} className="h-16 rounded-md" />
      ) : arrayOfApplication ? (
        <div className="bg-white shadow-lg shadow-slate-100 border border-neutral-100 rounded-xl p-5 w-full">
          <div className="w-full mb-3 flex items-center justify-between text-neutral-400 text-xs">
            <div className="flex w-full justify-between items-center">
              <span className="w-4"></span>
              <span className="w-52">NAME</span>
              <span className="w-64">EMAIL ADDRESS</span>
              <span className="w-32">DURATION</span>
              <span className="w-36">DEPARTMENT</span>
            </div>
            <span className="w-36">ACTION</span>
          </div>
          {arrayOfApplication?.map((item, index) => (
            <div className="flex justify-between items-center" key={item.id}>
              <ApplicationListItem
                index={index}
                application={item}
                key={item.id}
                arrayOfApplication={arrayOfApplication}
                setArrayOfApplication={setArrayOfApplication}
              />
              <button
                className="w-36 bg-primary rounded-md text-sm text-white h-8"
                onClick={() => {
                  handleInviteApplication(item);
                }}
              >
                Schedule Now
              </button>
            </div>
          ))}
        </div>
      ) : arrayOfApplication?.length === 0 ? (
        "no applicaton fetched"
      ) : (
        "an error occurred"
      )}
      <br />
      <InvitationModal
        userObjectArray={[returnedDocument]}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      {getApplicationsError ? getApplicationsError : null}
    </div>
  );
};

export default ApplicantsNotInvited;
