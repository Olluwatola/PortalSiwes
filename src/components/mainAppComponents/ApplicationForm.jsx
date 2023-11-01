import {
  //db,
  auth,
  //storage
} from "./../../config/firebase";
import { useState } from "react";

import //getDocs,
//collection,
//addDoc,
//deleteDoc,
//updateDoc,
//doc,
//serverTimestamp,
"firebase/firestore";


import { createApplication } from "./../../controllers/applicationControllers";


export function ApplicationForm({ studentEmail }) {
  const [
    applicationStatusCreationLoading,
    setApplicationStatusCreationLoading,
  ] = useState(false);
  const [applicationStatusCreationError, setApplicationStatusCreationError] =
    useState(null);
  const [studentLastName, setStudentLastName] = useState("");
  const [studentOtherNames, setStudentOtherNames] = useState("");
  const [studentPhoneNumber, setStudentPhoneNumber] = useState("");
  const [studentInstitution, setStudentInstitution] = useState("");
  const [studentCourse, setStudentCourse] = useState("");
  const [studentLevel, setStudentLevel] = useState("100");
  const [aboutStudent, setAboutStudent] = useState("");
  const [durationOfInternship, setDurationOfInternship] = useState("3");
  const [IDfile, setIDFile] = useState(null);
  const [siwesFile, setSiwesFile] = useState(null);

  const handleIDFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setIDFile(selectedFile);
  };

  const handleSiwesFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setSiwesFile(selectedFile);
  };

  const onSubmitApplication = async (e) => {
    try {
      e.preventDefault();
      await createApplication(
        setApplicationStatusCreationLoading,
        setApplicationStatusCreationError,
        IDfile,
        siwesFile,
        studentLastName,
        studentOtherNames,
        studentPhoneNumber,
        studentInstitution,
        studentLevel,
        studentCourse,
        aboutStudent,
        durationOfInternship
      );


      setStudentLastName("");
      setStudentOtherNames("");
      //setStudentEmail("");
      setStudentPhoneNumber("");
      setStudentInstitution("");
      setStudentCourse("");
      setAboutStudent("");
      setIDFile(null);
      setSiwesFile(null);
      //setDurationOfInternship("")

      console.log(auth?.currentUser);
      console.log("done");
    } catch (err) {
      console.error(err);
      console.log("ERRORRRRRR ");
    }
  };

  return (
    <div>
      {console.log(auth?.currentUser?.displayName, "hmmmm")}
      <form onSubmit={onSubmitApplication}>
        <input
          placeholder="Last Name..."
          value={studentLastName}
          required
          onChange={(e) => setStudentLastName(e.target.value)}
        />
        <input
          placeholder="First Name..."
          value={studentOtherNames}
          required
          onChange={(e) => setStudentOtherNames(e.target.value)}
        />
        <input placeholder="email..." value={studentEmail} required disabled />
        <br />
        <input
          placeholder="phonenumber..."
          required
          value={studentPhoneNumber}
          onChange={(e) => setStudentPhoneNumber(e.target.value)}
        />
        <input
          placeholder="institution...."
          value={studentInstitution}
          onChange={(e) => setStudentInstitution(e.target.value)}
        />
        <input
          placeholder="course of study..."
          value={studentCourse}
          onChange={(e) => setStudentCourse(e.target.value)}
        />
        <br />
        <select
          value={studentLevel}
          onChange={(e) => setStudentLevel(e.target.value)}
        >
          <option value={"100"}>100 level</option>
          <option value={"200"}>200 level</option>
          <option value={"300"}>300 level</option>
          <option value={"400"}>400 level</option>
          <option value={"500"}>500 level</option>
        </select>
        <input
          placeholder="tell us about what you would like us to know about you, your skills, experience, what you are looking to achieve during you internship..."
          value={aboutStudent}
          onChange={(e) => setAboutStudent(e.target.value)}
        />
        <select
          value={durationOfInternship}
          onChange={(e) => setDurationOfInternship(e.target.value)}
        >
          <option value={"3"}>3 months</option>
          <option value={"6"}>6 months</option>
          <option value={"12"}>12 months</option>
        </select>
        <br />
        <hr />
        <label>Upload pdf file of your school ID</label>
        <br />
        <input type="file" onChange={handleIDFileChange} />
        <br />
        <br />

        <label>Upload Siwes Letter file of your school ID</label>
        <br />
        <input type="file" onChange={handleSiwesFileChange} />
        <br />
        <br />
        <button type="submit"> Submit Application</button>
      </form>
    </div>
  );
}
