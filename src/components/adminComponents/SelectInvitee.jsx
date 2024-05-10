// import { useEffect } from "react";
// import { db } from "./../../config/firebase";
// import { collection } from "firebase/firestore";
// import { fetchApplications } from "./../../controllers/fetchApplication";
import InviteeItem from "./adminListItem/InviteeItem";

const SelectInvitees = ({
  arrayOfApplication,
  isLoading,
  getApplicationsError,
  // setArrayOfApplication,
  // setIsLoading,
  // //returnedApplications,
  // setGetApplicationsError,
  invitees,
  setInvitees,
  setFormInvitees,
  handleAddParticipantToggle,
}) => {
  //const applicationCollectionRef = collection(db, "studentApplication");

  // useEffect(() => {
  //   fetchApplications(
  //     applicationCollectionRef,
  //     setIsLoading,
  //     setArrayOfApplication,
  //     setGetApplicationsError
  //   );
  // }, [applicationCollectionRef]);

  function handleAddParticipantsToForm() {
    setFormInvitees(invitees);
    handleAddParticipantToggle();
  }

  return (
    <>
      {isLoading ? (
        "Loading..."
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
            <div className="flex flex-col gap-5 mt-5 text-sm">
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
                className="bg-primary fixed bottom-5 self-center text-white rounded-lg h-11 flex justify-center items-center w-full text-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/15 transition-all duration-200 ease-in-out"
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
