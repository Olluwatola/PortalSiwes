import { useState, useEffect } from "react";
import { db } from "./../../config/firebase";
import { collection } from "firebase/firestore";
import { fetchApplications } from "./../../controllers/fetchApplication";
import "react-loading-skeleton/dist/skeleton.css"; // Don't forget to import the styles
import Skeleton from "react-loading-skeleton";
import InviteeItem from "./adminListItem/InviteeItem";

const SelectInvitees = ({
  invitees,
  setInvitees,
  setFormInvitees,
  handleAddParticipantToggle,
}) => {
  const [arrayOfApplication, setArrayOfApplication] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [getApplicationsError, setGetApplicationsError] = useState(null);
  const applicationCollectionRef = collection(db, "studentApplication");

  useEffect(() => {
    fetchApplications(
      applicationCollectionRef,
      setIsLoading,
      setArrayOfApplication,
      setGetApplicationsError
    );
  }, []);

  function handleAddParticipantsToForm() {
    setFormInvitees(invitees);
    handleAddParticipantToggle();
  }

  return (
    <>
      {isLoading ? (
        <Skeleton className="h-14 gap-1 rounded-lg" count={10} />
      ) : getApplicationsError ? (
        getApplicationsError
      ) : (
        <div className="flex flex-col relative">
          <div className="flex justify-between justify-items-center">
            <div className="flex flex-col">
              <span className="text-primary font-semibold text-2xl tracking-tighter">
                Add Participants
              </span>
              <span className="text-neutral-500 text-sm">
                Select participant(s) you want to add
              </span>
            </div>
            <button
              className="text-neutral-500 text-xs"
              onClick={handleAddParticipantToggle}
            >
              GO BACK
            </button>
          </div>
          <div className="text-primary text-xs mt-3">
            ({invitees.length}) Selected
          </div>
          {arrayOfApplication.length !== 0 ? (
            <div className="flex flex-col gap-5 mt-5 mb-16 text-sm">
              {arrayOfApplication.map((application, index) => (
                <InviteeItem
                  index={index}
                  application={application}
                  key={application.id}
                  invitees={invitees}
                  setInvitees={setInvitees}
                />
              ))}

              <button
                className="bg-primary fixed bottom-14 self-center text-white rounded-lg h-11 flex justify-center items-center w-[31rem] text-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/15 transition-all duration-200 ease-in-out"
                onClick={handleAddParticipantsToForm}
              >
                Add Participants
              </button>
            </div>
          ) : (
            "There are no uninvited participants. Go back."
          )}
        </div>
      )}
    </>
  );
};

export default SelectInvitees;
