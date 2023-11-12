import { useState } from "react";
import { Auth } from "./../../components/mainAppComponents/Auth";
import { ApplicationForm } from "./../../components/mainAppComponents/ApplicationForm";
import { Testimonials } from "./../../components/mainAppComponents/Testimonials";
import AdminStatusBar from "../../components/adminComponents/adminStatusBar/AdminStatusBar";

const Home = () => {
  const [studentEmail, setStudentEmail] = useState("");
  const [conditionGood, setConditionGood] = useState(null);
  const [statusBarMessage, setStatusBarMessage] = useState(null);
  return (
    <>
      <AdminStatusBar
        conditionGood={conditionGood}
        statusBarMessage={statusBarMessage}
      />
      <Auth studentEmail={studentEmail} setStudentEmail={setStudentEmail} />
      <ApplicationForm
        setConditionGood={setConditionGood}
        setStatusBarMessage={setStatusBarMessage}
        studentEmail={studentEmail}
        setStudentEmail={setStudentEmail}
      />
      <br />
      <Testimonials />
    </>
  );
};

export default Home;
