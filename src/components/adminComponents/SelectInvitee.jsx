import { useState, useEffect } from "react";
import { db } from "./../../config/firebase";
import { query, where, getDocs, collection } from "firebase/firestore";
import {fetchApplications} from "./../../controllers/fetchApplication"
import InviteeItem from "./adminListItem/InviteeItem"

const SelectInvitees = ({
  invitees,
  setInvitees,
  setFormInvitees,
  handleAddParticipantToggle,
}) => {
  const [getApplicationsError, setGetApplicationsError] = useState(null);
  const [arrayOfApplication, setArrayOfApplication] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const applicationCollectionRef = collection(db, "studentApplication");

  // function InviteeItem({ application }) {
  //   const [objectExistsInArray, setObjectExistsInArray] = useState(false);

  //   useEffect(() => {
  //     function checkExisting(invitee) {
  //       console.log(`checking check`)
  //       console.log(invitees)
  //       console.log(invitee)
  //       const existingObject = invitees.find((obj) => obj.id === invitee.id);
  //       console.log(existingObject)
  //       console.log(existingObject !== undefined)
  //       setObjectExistsInArray(existingObject !== undefined);
  //     }
  //     checkExisting(application);
  //   }, [application, invitees]);

  //   function handleAddOrRemoveItems(invitee) {
  //     if (!objectExistsInArray) {
  //       setInvitees((invitees) => [...invitees, invitee]);
  //     } else {
  //       setInvitees((invitees) =>
  //         invitees.filter((inviteeObject) => inviteeObject.id !== invitee.id)
  //       );
  //     }
  //   }

  //   return (
  //     <>
  //       <input
  //         type="checkbox"
  //         checked={objectExistsInArray}
  //         onChange={() => {
  //           handleAddOrRemoveItems(application);
  //         }}
  //       />
  //       <span>
  //         {application.studentLastName} {application.studentOtherNames}
  //       </span>
  //       <br />
  //       <hr />
  //       <br />
  //     </>
  //   );
  // }

  useEffect(() => {
    // async function fetchApplications() {
    //   setIsLoading(true);
    //   try {
    //     const q = query(
    //       applicationCollectionRef,
    //       where("hasBeenInvitedForTest", "==", false)
    //     );

    //     const data = await getDocs(q);
    //     const returnedApplications = data.docs?.map((doc) => ({
    //       ...doc.data(),
    //       id: doc.id,
    //     }));
    //     setArrayOfApplication(returnedApplications);
    //   } catch (err) {
    //     console.error(err);
    //     setGetApplicationsError(err.message);
    //   } finally {
    //     setIsLoading(false);
    //   }
    // }

    fetchApplications(applicationCollectionRef,setIsLoading,setArrayOfApplication,setGetApplicationsError);
  }, [applicationCollectionRef]);

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
            <div className="flex flex-col gap-5 text-sm">
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
            </div>
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
