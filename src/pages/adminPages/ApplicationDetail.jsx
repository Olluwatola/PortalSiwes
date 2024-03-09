import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getDoc, doc } from "firebase/firestore";
import InvitationModal from "./../../components/adminComponents/adminModals/CreateInvitationModal";
import PlacementButton from "./../../components/adminComponents/adminButtons/PlacementButton";
import { Link } from "react-router-dom";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";
import IDModal from "./../../components/adminComponents/adminModals/IDModal";

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

  const [modalImageUrl, setModalImageUrl] = useState(null);

  const openModalImg = (imageUrl) => {
    setModalImageUrl(imageUrl);
  };

  const closeModalImg = () => {
    setModalImageUrl(null);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const getStatusColor = (application) => {
    const {
      isAccepted,
      isRejected,
      isReviewed,
      placedTo,
      hasWrittenApplicationTest,
    } = application;
    if (isAccepted) {
      return "bg-green-300 text-green-800";
    } else if (isRejected) {
      return "bg-red-400 text-white";
    } else if (isReviewed) {
      return "bg-primary text-white";
    } else if (hasWrittenApplicationTest && placedTo === "yetToBePlaced") {
      return "bg-amber-500 bg-opacity-70 text-lime-950";
    } else if (!isReviewed) {
      return "bg-blue-500 text-white";
    }

    return "bg-gray-500";
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
    <div className="">
      <span classNam>Applications</span>
      <div className="mt-8 flex items-center gap-3 pb-3 border-b-neutral-300 border-b">
        <div className="text-primary">Review Application</div>
        <div className="w-[0.125rem] h-4 bg-black"></div>
        <Link to="/admin/applications" className="text-neutral-400">
          GO BACK
        </Link>
      </div>
      <br />
      <div className="border border-neutral-300 rounded-2xl px-10 py-8 text-sm flex flex-col gap-10">
        <div className="flex items-center gap-2">
          <span className="text-neutral-400"> STATUS</span>
          <span className="text-neutral-400">-</span>
          {!returnedDocument ? (
            <Skeleton width={100} height={30} />
          ) : (
            <span
              className={`rounded-lg px-2 py-1 ${getStatusColor(
                returnedDocument
              )}`}
            >
              {returnedDocument.isAccepted
                ? "Accepted"
                : returnedDocument.isRejected
                ? "Rejected"
                : returnedDocument.isReviewed
                ? "Reviewed"
                : returnedDocument.hasWrittenApplicationTest &&
                  returnedDocument.placedTo === "yetToBePlaced"
                ? "Pending"
                : !returnedDocument.isReviewed
                ? "Not Reviewed"
                : "Unknown Status"}
            </span>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-x-24 gap-y-10 w-full">
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400 text-sm">FIRST NAME</span>
            <span>
              {!returnedDocument ? (
                <Skeleton width={100} />
              ) : (
                returnedDocument.studentLastName
              )}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400 text-sm">LAST NAME</span>
            <span>
              {!returnedDocument ? (
                <Skeleton width={100} />
              ) : (
                returnedDocument.studentOtherNames
              )}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400 text-sm">EMAIL ADDRESS</span>
            <span>
              {!returnedDocument ? (
                <Skeleton width={150} />
              ) : (
                returnedDocument.studentEmail
              )}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400 text-sm">PHONE NUMBER</span>
            <span>
              {!returnedDocument ? (
                <Skeleton width={120} />
              ) : (
                returnedDocument.studentPhoneNumber
              )}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400 text-sm">
              INSTITUTION OF STUDY
            </span>
            <span>
              {!returnedDocument ? (
                <Skeleton width={150} />
              ) : (
                returnedDocument.studentInstitution
              )}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400 text-sm">DEPARTMENT</span>
            <span>
              {!returnedDocument ? (
                <Skeleton width={100} />
              ) : (
                returnedDocument.studentCourse
              )}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400 text-sm">LEVEL</span>
            <span>
              {!returnedDocument ? (
                <Skeleton width={50} />
              ) : (
                returnedDocument.studentLevel
              )}
            </span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400 text-sm">
              DURATION OF INTERNSHIP
            </span>
            <span>
              {!returnedDocument ? (
                <Skeleton width={100} />
              ) : (
                returnedDocument.durationOfInternship
              )}
            </span>
          </div>
        </div>
        <div className="flex flex-col gap-2">
          <span className="text-neutral-400 text-sm">
            TELL US ABOUT YOURSELF
          </span>
          <span className="tracking-wide leading-relaxed text-justify">
            {!returnedDocument ? (
              <Skeleton count={5} />
            ) : (
              returnedDocument.aboutStudent
            )}
          </span>
        </div>
        <div className="flex gap-2">
          <button
            className="bg-primary font-medium text-white py-2 px-4 rounded-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-200 ease-in-out"
            onClick={() => openModalImg(returnedDocument?.idFileReference)}
          >
            View ID
          </button>
          <button
            className="border-primary border font-medium text-primary py-2 px-4 rounded-lg hover:-translate-y-2 hover:shadow-xl transition-all duration-200 ease-in-out"
            onClick={() => openModalImg(returnedDocument?.siwesFileReference)}
          >
            View SIWES Letter
          </button>
        </div>
        {modalImageUrl && (
          <IDModal imageUrl={modalImageUrl} onClose={closeModalImg} />
        )}
        {/* <img
          src={returnedDocument?.idFileReference}
          alt="id image"
          style={{ width: "45vw" }}
        />
        <img
          src={returnedDocument?.siwesFileReference}
          alt="siwes image"
          style={{ width: "45vw" }}
        /> */}
        {returnedDocument?.hasWrittenApplicationTest === false
          ? "has not written test"
          : returnedDocument?.applicationTestScore}
        <br />
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
      </div>
    </div>
  );
};

export default ApplicationDetail;
