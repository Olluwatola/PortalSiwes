import { useState } from "react";
import {Auth} from './../../components/mainAppComponents/Auth'
import { ApplicationForm } from "./../../components/mainAppComponents/ApplicationForm";
import { Testimonials } from "./../../components/mainAppComponents/Testimonials";

const Home = () => {
  const [studentEmail, setStudentEmail] = useState("");
  return (
    <>
      <Auth studentEmail={studentEmail} setStudentEmail={setStudentEmail} />
      <ApplicationForm
        studentEmail={studentEmail}
        setStudentEmail={setStudentEmail}
      />
      <br />
      <Testimonials />
    </>
  );
};

export default Home;
