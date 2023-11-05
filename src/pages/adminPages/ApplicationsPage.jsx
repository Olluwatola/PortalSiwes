import ApplicationsPanel from "./../../components/adminComponents/ApplicationsPanel";
import { useParams } from "react-router-dom";

const ApplicationsPage = () => {
  const { c } = useParams();

  return (
    <>
      <h1>Applications</h1>
      <div>
        <ApplicationsPanel category={c} />
      </div>
    </>
  );
};

export default ApplicationsPage;
