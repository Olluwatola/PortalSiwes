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

export function ApplicationForm({
  studentEmail,
  setConditionGood,
  setStatusBarMessage,
}) {
  //  const [
  //   applicationStatusCreationLoading,
  //   setApplicationStatusCreationLoading,
  // ] = useState(false);
  //const [applicationStatusCreationError, setApplicationStatusCreationError] =
  //useState(null);
  const [submitButtonClicked, setsubmitButtonClicked] = useState(false);
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
      if (studentEmail.length < 1) {
        setConditionGood("error");
        setStatusBarMessage("ensure you fill in the email field");
        return;
      } else {
        setsubmitButtonClicked(true);
        await createApplication(
          setsubmitButtonClicked,
          setConditionGood,
          setStatusBarMessage,
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
        ).then((res) => {
          if (res instanceof Error) {
            return;
          } else {
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
          }
        });
      }
    } catch (err) {
      console.error(err);
      console.log("ERRORRRRRR ");
      setsubmitButtonClicked(false);
    }
  };

  return (
    <div>
      {/* {console.log(auth?.currentUser?.displayName, "hmmmm")} */}
      <form
        className="mt-5 grid grid-cols-2 gap-4"
        onSubmit={onSubmitApplication}
      >
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">First Name</span>
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="First Name..."
            value={studentOtherNames}
            required
            onChange={(e) => setStudentOtherNames(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">Last Name</span>
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Last Name..."
            value={studentLastName}
            required
            onChange={(e) => setStudentLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">Email</span>
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="email..."
            value={studentEmail}
            required
            disabled
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">Phone Number</span>
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="phonenumber..."
            required
            value={studentPhoneNumber}
            onChange={(e) => setStudentPhoneNumber(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">Institution</span>
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="institution...."
            value={studentInstitution}
            onChange={(e) => setStudentInstitution(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">Course of Study</span>
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="course of study..."
            value={studentCourse}
            onChange={(e) => setStudentCourse(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">Student Level</span>
          <select
            className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            value={studentLevel}
            onChange={(e) => setStudentLevel(e.target.value)}
          >
            <option value={"100"}>100 level</option>
            <option value={"200"}>200 level</option>
            <option value={"300"}>300 level</option>
            <option value={"400"}>400 level</option>
            <option value={"500"}>500 level</option>
          </select>
        </div>
        <div className="col-span-2 flex flex-col gap-1">
          <span className="text-sm text-gray-500">
            Tell us about what you would like us to know about you, your skills,
            experience, what you are looking to achieve during your internship
          </span>
          <input
            className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Your message..."
            value={aboutStudent}
            onChange={(e) => setAboutStudent(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <span className="text-sm text-gray-500">Duration of Internship</span>
          <select
            className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            value={durationOfInternship}
            onChange={(e) => setDurationOfInternship(e.target.value)}
          >
            <option value={"3"}>3 months</option>
            <option value={"6"}>6 months</option>
            <option value={"12"}>12 months</option>
          </select>
        </div>
        <div className="col-span-2">
          <hr />
        </div>
        <div className="col-span-2">
          <label>Upload image of your school ID (IMAGE ONLY)</label>
          <input type="file" onChange={handleIDFileChange} required />
        </div>
        <div className="col-span-2">
          <label>Upload image of your Siwes Letter (IMAGE ONLY)</label>
          <input type="file" onChange={handleSiwesFileChange} required />
        </div>
        <div className="col-span-2">
          <button
            type="submit"
            disabled={submitButtonClicked}
            className="border border-gray-300 px-4 py-2 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
