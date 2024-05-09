import { useState, useEffect } from "react";
import { db } from "./../../config/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";
import {
  fetchApplications,
  getAllNotInvitedApplications,
} from "./../../controllers/fetchApplication";
import InviteeItem from "./adminListItem/InviteeItem";

const SelectInvitees = ({
  invitees,
  setInvitees,
  setFormInvitees,
  handleAddParticipantToggle,
}) => {
  let returnedApplications;
  const [getApplicationsError, setGetApplicationsError] = useState(null);
  const [arrayOfApplication, setArrayOfApplication] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const applicationCollectionRef = collection(db, "studentApplication");

  useEffect(() => {
    // fetchApplications(
    //   applicationCollectionRef,
    //   setIsLoading,
    //   setArrayOfApplication,
    //   setGetApplicationsError
    // );
    getAllNotInvitedApplications(
      setArrayOfApplication,
      setIsLoading,
      returnedApplications,
      setGetApplicationsError
    );
  }, []);

  function handleAddParticipantsToForm() {
    setFormInvitees(invitees);
    handleAddParticipantToggle();
  }

  return (
    <>
      {getApplicationsError === null ? (
        <>
          <button onClick={handleAddParticipantToggle}>go back</button>
          <h1>Add Participants</h1>
          <h2>Select participant(s) you want to add</h2>
          {arrayOfApplication.length !== 0 ? (
            <>
              {arrayOfApplication.map((application, index) => (
                <InviteeItem
                  index={index}
                  application={application}
                  key={application.id}
                  invitees={invitees}
                  setInvitees={setInvitees}
                />
              ))}
              <button onClick={handleAddParticipantsToForm}>
                Add Participants
              </button>
            </>
          ) : (
            "there are no uninvited partcipants, go back"
          )}
        </>
      ) : isLoading ? (
        "Loading..."
      ) : (
        getApplicationsError
      )}
    </>
  );
};

export default SelectInvitees;
