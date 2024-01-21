import { auth } from "./../../config/firebase";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import StatisticPanel from "./../../components/adminComponents/StatisticPanel";
import SummarizedApplicationPanel from "./../../components/adminComponents/SummarizedApplicationPanel";
import NotCompletedInvitationPanel from "./../../components/adminComponents/NotCompletedInvitationPanel";

const Dashboard = () => {
  const navigate = useNavigate();
  const [errorFeedback, setErrorFeedback] = useState("");

  const handleLogOut = async () => {
    try {
      await auth.signOut();
      navigate("/admin/auth");
    } catch (err) {
      console.log(err);
      setErrorFeedback(err.message);
    }
    //if(!error){navigate("/admin/auth")}
  };

  return (
    <div className="">
      <div className="py-2 px-4 bg-primary w-fit text-white rounded-lg">
        Hello, {auth?.currentUser?.displayName}
      </div>
      {/* <button onClick={handleLogOut}>Log Out</button>      <>Dashboard:{auth?.currentUser?.email}</> */}
      <StatisticPanel />
      <SummarizedApplicationPanel />
      <NotCompletedInvitationPanel />
      <div>{errorFeedback ? errorFeedback : null}</div>
    </div>
  );
};

export default Dashboard;
