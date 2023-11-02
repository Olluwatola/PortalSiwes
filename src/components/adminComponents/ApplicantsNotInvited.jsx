import { useEffect, useState } from "react";
import { getAllNotInvitedApplications } from "./../../controllers/fetchApplication";
import ApplicationListItem from "./adminListItem/ApplicationListItem";
import InvitationModal from "./adminModals/CreateInvitationModal";

const ApplicantsNotInvited = () => {
  let returnedApplications;
  const [isLoading, setIsLoading] = useState(false);
  const [returnedDocument, setReturnedDocument] = useState(null);
  const [getApplicationsError, setGetApplicationsError] = useState(null);
  const [arrayOfApplication, setArrayOfApplication] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const containerFlex = {
    display: "flex", // Set the display property to 'flex' to enable Flexbox layout
    alignItems: "center", // Adjust the vertical alignment as needed
  };

  const itemmargin = {
    marginRight: "10px",
    marginBottom: "10px",
  };

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
    <>
      <h2>YET TO BE SCREENED</h2>
      {isLoading ? (
        <h1>loading applications....</h1>
      ) : arrayOfApplication ? (
        <>
          {arrayOfApplication?.map((item, index) => (
            <>
              <div style={containerFlex}>
                <ApplicationListItem
                  index={index}
                  application={item}
                  key={item.id}
                  arrayOfApplication={arrayOfApplication}
                  setArrayOfApplication={setArrayOfApplication}
                />
                <button
                  onClick={() => {
                    handleInviteApplication(item);
                  }}
                  style={itemmargin}
                >
                  Invite for test
                </button>

                <br />
              </div>
            </>
          ))}
        </>
      ) : arrayOfApplication?.length === 0 ? (
        "no applicaton fetched"
      ) : (
        "an error occurred"
      )}
      <br />
      <InvitationModal
        userObject={returnedDocument}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
      {getApplicationsError ? getApplicationsError : null}
    </>
  );
};

export default ApplicantsNotInvited;
