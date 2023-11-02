import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InvitationModal from "./../../components/adminComponents/adminModals/CreateInvitationModal";
import {
  fetchOneInvite,
  markInviteHasHeld,
  markInviteHasNotHeld,
  markInviteToNotHold,
  unmarkInviteToNotHold,
} from "./../../controllers/ScreeningControllers";
import { getOneApplication } from "./../../controllers/fetchApplication";
import ApplicationListItem from "./../../components/adminComponents/adminListItem/ApplicationListItem";

const InvitationDetails = () => {
  const [returnedInviteDocument, setReturnedInviteDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [inviteFetchLoading, setInviteFetchLoading] = useState(false);
  const [fetchInviteError, setFetchInviteError] = useState(null);
  const [markInviteError, setMarkInviteError] = useState(null);
  const [markInviteLoading, setMarkInviteLoading] = useState(false);
  const [arrayOfInvitationApplication, setArrayOfInvitationApplication] =
    useState([]);
  const [getApplicationsError, setGetApplicationsError] = useState(null);
  const [fetchInviteApplicationsLoading, setfetchInviteApplicationsLoading] =
    useState(false);

  const { id } = useParams();
  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };
  useEffect(() => {
    fetchOneInvite(
      id,
      setReturnedInviteDocument,
      setInviteFetchLoading,
      setFetchInviteError
    );
    // console.log(` interesting ${returnedInviteDocument}`);

    // return () => {
    //   second
    // }
  }, [id]);

  useEffect(() => {
    async function handleFetchInvitationApplications() {
      setfetchInviteApplicationsLoading(true);

      if (
        returnedInviteDocument?.participantsIdArray?.length !== 0 &&
        returnedInviteDocument?.participantsIdArray?.[0]
      ) {
        const responses = await Promise.all(
          returnedInviteDocument?.participantsIdArray?.map(async (element) => {
            try {
              const data = await getOneApplication(
                element,
                setGetApplicationsError
              );
              console.log(`this is response data ${data}`);
              return data;
            } catch (error) {
              // Handle errors here, if necessary
              console.error(error);
              return null;
            }
          })
        );

        console.log("promise", responses);
        setArrayOfInvitationApplication(
          responses.filter((response) => response !== null)
        );
      }

      setfetchInviteApplicationsLoading(false);
    }

    handleFetchInvitationApplications();
  }, [returnedInviteDocument?.participantsIdArray]);

  return (
    <>
      <h1>INVITATION</h1>
      <h2>invitation summary</h2>
      <h3>{returnedInviteDocument?.date}</h3>
      <b>{returnedInviteDocument?.time}</b><br/>
      {returnedInviteDocument?.toNotHold === true
        ? "THIS INVITE HAS BEEN MARKED TO NOT HOLD"
        : null}
        <br/>
      <button
        onClick={() => {
          markInviteHasHeld(
            id,
            returnedInviteDocument,
            setReturnedInviteDocument,
            setMarkInviteLoading,
            setMarkInviteError
          );
        }}
        disabled={returnedInviteDocument?.hasHeld}
      >
        Mark invite has held
      </button>
      {/* <button
        onClick={() => {
          console.log(returnedInviteDocument);
        }}
      >
        click me
      </button> */}
      <button
        onClick={() => {
          markInviteHasNotHeld(
            id,
            returnedInviteDocument,
            setReturnedInviteDocument,
            setMarkInviteLoading,
            setMarkInviteError
          );
        }}
        disabled={returnedInviteDocument?.hasHeld===false}

      >
        mark as not held
      </button><br/>
      
      <button
        onClick={() => {
          markInviteToNotHold(
            id,
            returnedInviteDocument,
            setReturnedInviteDocument,
            setMarkInviteLoading,
            setMarkInviteError
          );
        }}
        disabled={returnedInviteDocument?.toNotHold}

      >
        mark invitation to not hold
      </button>
      <button
        onClick={() => {
          unmarkInviteToNotHold(
            id,
            returnedInviteDocument,
            setReturnedInviteDocument,
            setMarkInviteLoading,
            setMarkInviteError
          );
        }}
        disabled={returnedInviteDocument?.toNotHold===false}

      >
        unmark invitation to not hold
      </button>
      <br/>
      <button onClick={openModal}>
        Create New Invite(with the same invitees)
      </button>
      <br />
      {returnedInviteDocument?.venue}
      <br />
      {returnedInviteDocument?.hasHeld ? "Completed" : "Not held"}
      <>
        <h2>APPLICANTS INVITED</h2>
        {inviteFetchLoading ? (
          <h1>loading applications....</h1>
        ) : arrayOfInvitationApplication ? (
          <>
            {arrayOfInvitationApplication?.map((item, index) => (
              <>
                <ApplicationListItem
                  index={index}
                  application={item}
                  key={item.id}
                  arrayOfApplication={arrayOfInvitationApplication}
                  setArrayOfApplication={setArrayOfInvitationApplication}
                />
                <br />
              </>
            ))}
          </>
        ) : arrayOfInvitationApplication?.length === 0 ? (
          "no applicaton fetched"
        ) : (
          <>
            an error occurred
            {console.log(
              ` lets try that again, ${arrayOfInvitationApplication}`
            )}
          </>
        )}
        <InvitationModal
          userObjectArray={arrayOfInvitationApplication}
          isOpen={isModalOpen}
          onClose={closeModal}
        />
        {getApplicationsError ? getApplicationsError : null}
      </>
    </>
  );
};

export default InvitationDetails;
