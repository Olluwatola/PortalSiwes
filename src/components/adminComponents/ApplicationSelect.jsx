import ApplicationSelectItem from "./adminListItem/ApplicationSelectItem";

const ApplicationSelect = ({
  arrayOfApplication,
  setArrayOfApplicantsToBePosted,
  arrayOfApplicantsToBePosted,
}) => {
  return (
    <>
      {arrayOfApplication?.length !== 0 ? (
        <>
          {arrayOfApplication?.map((application, index) => (
            <ApplicationSelectItem
              index={index}
              application={application}
              arrayOfApplicantsToBePosted={arrayOfApplicantsToBePosted}
              setArrayOfApplicantsToBePosted={setArrayOfApplicantsToBePosted}
              key={application.id}
            />
          ))}
        </>
      ) : (
        "there are no applicants that have been approved and not been placed"
      )}
    </>
  );
};

export default ApplicationSelect;
