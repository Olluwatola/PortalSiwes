import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import InvitationModal from "./../../components/adminComponents/adminModals/CreateInvitationModal";
import PlacementButton from "./../../components/adminComponents/adminButtons/PlacementButton";

import {
  db,
  //  auth, storage
} from "../../config/firebase";
import {
  acceptApplication,
  rejectApplication,
  markApplicationAsUnderReview,
  unmarkApplicationAsUnderReview,
} from "./../../controllers/applicationControllers";

const ApplicationDetail = () => {
  const { id } = useParams();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [fetchDocError, setFetchDocError] = useState(undefined);
  const [returnedDocument, setReturnedDocument] = useState(null);
  const [applicationStatusUpdateLoading, setApplicationStatusUpdateLoading] =
    useState(false);
  const [applicationStatusUpdateError, setApplicationStatusUpdateError] =
    useState(undefined);
  const [returnedApplicationId, setReturnedApplicationId] = useState(undefined);
  const [placementError, setPlacementError] = useState(undefined);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  function handleAcceptApplication(id) {
    if (id !== undefined) {
      setApplicationStatusUpdateError(false);
      acceptApplication(
        id,
        returnedDocument,
        setReturnedDocument,
        setApplicationStatusUpdateLoading,
        setApplicationStatusUpdateError
      );
    } else {
      setApplicationStatusUpdateError("Application yet to be loaded");
    }
  }

  function handleRejectApplication(id) {
    if (id !== undefined) {
      setApplicationStatusUpdateError(false);
      rejectApplication(
        id,
        returnedDocument,
        setReturnedDocument,
        setApplicationStatusUpdateLoading,
        setApplicationStatusUpdateError
      );
    } else {
      setApplicationStatusUpdateError("Application yet to be loaded");
    }
  }

  function handleMarkApplicationAsUnderReview() {
    if (id !== undefined) {
      setApplicationStatusUpdateError(false);
      markApplicationAsUnderReview(
        id,
        returnedDocument,
        setReturnedDocument,
        setApplicationStatusUpdateLoading,
        setApplicationStatusUpdateError
      );
    } else {
      setApplicationStatusUpdateError("Application yet to be loaded");
    }
  }

  function handleUnmarkApplicationAsUnderReview() {
    if (id !== undefined) {
      setApplicationStatusUpdateError(false);
      unmarkApplicationAsUnderReview(
        id,
        returnedDocument,
        setReturnedDocument,
        setApplicationStatusUpdateLoading,
        setApplicationStatusUpdateError
      );
    } else {
      setApplicationStatusUpdateError("Application yet to be loaded");
    }
  }

  useEffect(() => {
    async function fetchApplicationDocument(queryId) {
      try {
        const studentApplicationDocumentRef = doc(
          db,
          "studentApplication",
          queryId
        );
        let returnedApplication = await getDoc(studentApplicationDocumentRef);
        setReturnedDocument({
          ...returnedApplication.data(),
          id: returnedApplication._key.path.segments[1],
        });
        setReturnedApplicationId(returnedApplication._key.path.segments[1]);
        console.log(returnedApplication._key.path.segments[1]);
      } catch (error) {
        setFetchDocError(error);
        console.log(error);
      }
    }

    fetchApplicationDocument(id);

    // return () => {
    //   second
    // }
  }, []);

  return (
    <>
      <h1>Applications</h1>
      <br />
      <h2>Review Application</h2>
      <br />
      <div>
        status{" "}
        {returnedDocument?.isAccepted
          ? "Accepted"
          : returnedDocument?.isRejected
          ? "Rejected"
          : returnedDocument?.isReviewed
          ? "Under review"
          : "Not Reviewed"}
      </div>
      <br />
      {returnedDocument?.studentLastName} {returnedDocument?.studentOtherNames}
      <br />
      {returnedDocument?.studentEmail}
      <br />
      {returnedDocument?.studentCourse}
      <br />
      {returnedDocument?.studentPhoneNumber}
      <br />
      {returnedDocument?.studentInstitution}
      <br />
      {returnedDocument?.durationOfInternship}
      <br />
      {returnedDocument?.aboutStudent}
      <br />
      {returnedDocument?.hasWrittenApplicationTest === false
        ? "has not written test"
        : returnedDocument?.applicationTestScore}
      <br />
      <img
        src={returnedDocument?.idFileReference}
        alt="id image"
        style={{ width: "45vw" }}
      />
      <img
        src={returnedDocument?.siwesFileReference}
        alt="siwes image"
        style={{ width: "45vw" }}
      />
      {applicationStatusUpdateLoading ? "updating application..." : null}
      {applicationStatusUpdateError ? "ERROR UPDATING APPLICATION" : null}
      <button
        disabled={returnedDocument?.isAccepted ? true : false}
        onClick={() => handleAcceptApplication(returnedApplicationId)}
      >
        Accept
      </button>
      <button
        disabled={returnedDocument?.isRejected ? true : false}
        onClick={() => handleRejectApplication(returnedApplicationId)}
      >
        Decline
      </button>
      <button
        disabled={returnedDocument?.isReviewed ? true : false}
        onClick={() =>
          handleMarkApplicationAsUnderReview(returnedApplicationId)
        }
      >
        Mark as under review
      </button>
      <button
        disabled={returnedDocument?.isReviewed === false ? true : false}
        onClick={() =>
          handleUnmarkApplicationAsUnderReview(returnedApplicationId)
        }
      >
        Unmark as under review
      </button>
      <button onClick={openModal}>Invite for test</button>
      <InvitationModal
        userObjectArray={[returnedDocument]}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      <br />
      <PlacementButton
        returnedDocument={returnedDocument}
        setReturnedDocument={setReturnedDocument}
        hasBeenApproved={returnedDocument?.isAccepted}
        setPlacementError={setPlacementError}
        applicationID={returnedApplicationId}
        setApplicationStatusUpdateLoading={setApplicationStatusUpdateLoading}
      >
        MIS
      </PlacementButton>
      <PlacementButton
        returnedDocument={returnedDocument}
        setReturnedDocument={setReturnedDocument}
        hasBeenApproved={returnedDocument?.isAccepted}
        setPlacementError={setPlacementError}
        applicationID={returnedApplicationId}
        setApplicationStatusUpdateLoading={setApplicationStatusUpdateLoading}
      >
        ITNH
      </PlacementButton>
      <PlacementButton
        returnedDocument={returnedDocument}
        setReturnedDocument={setReturnedDocument}
        hasBeenApproved={returnedDocument?.isAccepted}
        setPlacementError={setPlacementError}
        applicationID={returnedApplicationId}
        setApplicationStatusUpdateLoading={setApplicationStatusUpdateLoading}
      >
        TRD
      </PlacementButton>
      <PlacementButton
        returnedDocument={returnedDocument}
        setReturnedDocument={setReturnedDocument}
        hasBeenApproved={returnedDocument?.isAccepted}
        setPlacementError={setPlacementError}
        applicationID={returnedApplicationId}
        setApplicationStatusUpdateLoading={setApplicationStatusUpdateLoading}
      >
        UMC
      </PlacementButton>
      <PlacementButton
        returnedDocument={returnedDocument}
        setReturnedDocument={setReturnedDocument}
        hasBeenApproved={returnedDocument?.isAccepted}
        setPlacementError={setPlacementError}
        applicationID={returnedApplicationId}
        setApplicationStatusUpdateLoading={setApplicationStatusUpdateLoading}
      >
        SDU
      </PlacementButton>
      <PlacementButton
        returnedDocument={returnedDocument}
        setReturnedDocument={setReturnedDocument}
        hasBeenApproved={returnedDocument?.isAccepted}
        setPlacementError={setPlacementError}
        applicationID={returnedApplicationId}
        setApplicationStatusUpdateLoading={setApplicationStatusUpdateLoading}
      >
        ITU
      </PlacementButton>
    </>
  );
};

export default ApplicationDetail;
