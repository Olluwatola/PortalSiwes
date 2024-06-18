import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import InvitationModal from "./../../components/adminComponents/adminModals/CreateInvitationModal";
import InvitationResultHandlerModal from "./../../components/adminComponents/adminModals/InvitationResultHandlerModal";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";

import {
  fetchOneInvite,
  markInviteHasHeld,
  markInviteHasNotHeld,
  markInviteToNotHold,
  unmarkInviteToNotHold,
} from "./../../controllers/ScreeningControllers";
import { getOneApplication } from "./../../controllers/fetchApplication";
import ApplicationListItem from "./../../components/adminComponents/adminListItem/ApplicationListItem";
import ToggleableMarkButton from "../../components/adminComponents/adminButtons/ToggleableMarkButton";

const InvitationDetails = () => {
  const [returnedInviteDocument, setReturnedInviteDocument] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isIRHMModalOpen, setIsIRHMModalOpen] = useState(false);
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

  const openIRHMModal = () => {
    setIsIRHMModalOpen(true);
  };
  const closeIRHMModal = () => {
    setIsIRHMModalOpen(false);
  };

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

  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    return new Date(dateString).toLocaleDateString(undefined, options);
  };

  return (
    <div className="flex flex-col gap-8">
      <>
        <span className="text-3xl font-medium">Invitation</span>
        <span className="text-neutral-500 text-xs tracking-widest flex justify-between">
          SUMMARY
        </span>
        <div className="flex items-center gap-20">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-neutral-400">TEST STATUS - </span>{" "}
            <div
              className={`h-6 rounded-lg px-3 text-xs text-white flex items-center justify-center ${
                returnedInviteDocument?.hasHeld
                  ? "bg-green-400"
                  : "bg-amber-500"
              }`}
            >
              {returnedInviteDocument?.hasHeld
                ? "Completed"
                : "Yet to complete"}
            </div>
          </div>
          <div className="flex items-center gap-2 text-sm">
            <span className="text-neutral-400">RESULT STATUS - </span>{" "}
            <div
              className={`h-6 rounded-lg px-3 text-xs text-white flex items-center justify-center ${
                returnedInviteDocument?.toNotHold
                  ? "bg-red-400"
                  : returnedInviteDocument?.hasResultUploaded
                  ? "bg-green-400"
                  : "bg-red-400"
              }`}
            >
              {returnedInviteDocument?.toNotHold
                ? "THIS INVITE HAS BEEN MARKED TO NOT HOLD"
                : returnedInviteDocument?.hasResultUploaded
                ? "RESULTS HAVE BEEN UPLOADED"
                : "RESULT NOT UPLOADED"}
            </div>
          </div>
        </div>
        <div className="flex flex-wrap items-start gap-x-24 gap-y-10 w-full text-sm">
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400">DATE</span>
            <span>{formatDate(returnedInviteDocument?.date)}</span>
          </div>{" "}
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400">TIME</span>
            <span>{returnedInviteDocument?.time}</span>
          </div>{" "}
          <div className="flex flex-col gap-2">
            <span className="text-neutral-400">VENUE</span>
            <span>{returnedInviteDocument?.venue}</span>
          </div>
        </div>
        <div className="flex gap-3 items-center">
          {" "}
          <ToggleableMarkButton
            id={id}
            returnedInviteDocument={returnedInviteDocument}
            setReturnedInviteDocument={setReturnedInviteDocument}
            setMarkInviteLoading={setMarkInviteLoading}
            setMarkInviteError={setMarkInviteError}
          />{" "}
          <button
            className="px-4 py-2 rounded-lg text-sm bg-emerald-400 text-white"
            onClick={openIRHMModal}
          >
            Upload Invite Result
          </button>
          <button
            className="w-fit bg-primary text-white px-4 py-2 rounded-lg text-sm"
            onClick={openModal}
          >
            Create New Invite (with the same invitees)
          </button>
        </div>

        <div className="mt-5">
          <span className="text-neutral-500 text-xs tracking-widest flex justify-between">
            APPLICANTS INVITED
          </span>
          {inviteFetchLoading ? (
            <Skeleton className="h-16" count={5} />
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
          <InvitationResultHandlerModal
            setReturnedInviteDocument={setReturnedInviteDocument}
            id={id}
            returnedInviteDocument={returnedInviteDocument}
            isIRHMOpen={isIRHMModalOpen}
            onIRHMClose={closeIRHMModal}
          />
        </div>
      </>
    </div>
  );
};

export default InvitationDetails;
