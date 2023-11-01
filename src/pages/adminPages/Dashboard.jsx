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
    <>
      <div>Dashboard:{auth?.currentUser?.email}</div>
      <button onClick={handleLogOut}>Log Out</button>
      <StatisticPanel />
      <br />
      <h2>PENDING APPLICATIONS</h2>
      <br />
      <SummarizedApplicationPanel />
      <NotCompletedInvitationPanel />
      <div>{errorFeedback ? errorFeedback : null}</div>
    </>
  );
};

export default Dashboard;
