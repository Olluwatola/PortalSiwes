const ApplicationSummary = ({ application, index }) => {
  return (
    <div style={{ paddingLeft: "20px", paddingRight: "20px" }}>
      {index + 1} {application.studentLastName} {application.studentOtherNames}
      {" | "}
      {application.studentEmail}
      {" | "} {application.durationOfInternship} months {" | "}
      {application.studentCourse}
      <hr />
    </div>
  );
};

export default ApplicationSummary;
