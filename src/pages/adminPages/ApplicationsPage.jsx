import ApplicationsPanel from "./../../components/adminComponents/ApplicationsPanel";
import { useParams } from "react-router-dom";

const ApplicationsPage = () => {
  const { c } = useParams();

  return (
    <>
      <span className="text-3xl font-medium">



Applications</span>
      <div>
        <ApplicationsPanel category={c} />
      </div>
    </>
  );
};

export default ApplicationsPage;
