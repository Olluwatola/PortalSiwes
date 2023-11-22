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
import { AnimatePresence, motion } from "framer-motion";
import MoonLoader from "react-spinners/MoonLoader";
import { FiChevronDown } from "react-icons/fi";
import { PiUploadSimpleThin } from "react-icons/pi";
import { CiFileOn } from "react-icons/ci";

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
  const [aboutStudent, setAboutStudent] = useState("");
  const [IDFile, setIDFile] = useState({
    file: null,
    uploading: false,
    uploaded: false,
  });

  const [siwesFile, setSiwesFile] = useState({
    file: null,
    uploading: false,
    uploaded: false,
  });

  // Dropdown State
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [studentLevel, setstudentLevel] = useState("Select your level");

  const [isDurationDropdownOpen, setIsDurationDropdownOpen] = useState(false);
  const [durationOfInternship, setdurationOfInternship] = useState(
    "Select number of months"
  );

  const durationOptions = [
    { name: "3 months", value: "3" },
    { name: "6 months", value: "6" },
    { name: "9 months", value: "9" },
    { name: "12 months", value: "12" },
  ];

  const handleDurationOptionSelect = (option) => {
    setdurationOfInternship(option);
    handleDurationDropdownToggle();
  };

  const handleDurationDropdownToggle = () => {
    setIsDurationDropdownOpen((prev) => !prev);
  };

  const level_options = [
    { name: "100 level", value: "100" },
    { name: "200 level", value: "200" },
    { name: "300 level", value: "300" },
    { name: "400 level", value: "400" },
    { name: "500 level", value: "500" },
  ];

  const handlelevel_optionselect = (option) => {
    setstudentLevel(option);
    handleDropdownToggle();
  };

  const handleDropdownToggle = () => {
    setIsDropdownOpen((prev) => !prev);
  };

  const handleIDFileChange = async (e) => {
    console.log(IDFile.file.type);
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setIDFile({ file: selectedFile, uploading: true });
      try {
        // Perform file upload logic here
        // For example, using Firebase storage
        // Replace the timeout with your actual file upload logic
        setTimeout(() => {
          // Simulating successful upload after 2 seconds
          setIDFile({ file: selectedFile, uploading: false, uploaded: true });
        }, 2000);
      } catch (error) {
        console.error("File upload error:", error);
        setIDFile({ file: selectedFile, uploading: false, uploaded: false });
      }
    }
  };
  const handleSiwesFileChange = async (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setSiwesFile({ file: selectedFile, uploading: true });
      try {
        // Perform file upload logic here
        // For example, using Firebase storage
        // Replace the timeout with your actual file upload logic
        setTimeout(() => {
          // Simulating successful upload after 2 seconds
          setSiwesFile({
            file: selectedFile,
            uploading: false,
            uploaded: true,
          });
        }, 2000);
      } catch (error) {
        console.error("File upload error:", error);
        setSiwesFile({ file: selectedFile, uploading: false, uploaded: false });
      }
    }
  };

  const handleIDFileUploadClick = () => {
    const fileInput = document.getElementById("idFileInput");
    fileInput?.click();
  };

  const handleSiwesFileUploadClick = () => {
    const fileInput = document.getElementById("siwesFileInput");
    fileInput?.click();
  };

  const MAX_WORD_COUNT = 100; // Set the max number of words for textarea

  const handleAboutStudentChange = (e) => {
    const text = e.target.value;
    setAboutStudent(text);
  };

  const onSubmitApplication = async (e) => {
    try {
      e.preventDefault();

      if (studentEmail.length < 1) {
        setConditionGood("error");
        setStatusBarMessage("You must be signed in to apply");
        return;
      } else if (
        studentLastName.length < 1 ||
        studentOtherNames.length < 1 ||
        studentPhoneNumber.length < 1 ||
        studentInstitution.length < 1 ||
        studentCourse.length < 1 ||
        aboutStudent.length < 1 ||
        durationOfInternship.length < 1 ||
        IDFile.file === null ||
        siwesFile.file === null
      ) {
        setConditionGood("error");
        setStatusBarMessage("Ensure you fill all fields");
        return;
      } else {
        setsubmitButtonClicked(true);

        const res = await createApplication(
          setsubmitButtonClicked,
          setConditionGood,
          setStatusBarMessage,
          IDFile,
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

        if (res instanceof Error) {
          // Handle error scenario
          setConditionGood("error");
          setStatusBarMessage("An error occurred. Please try again.");
        } else {
          // Clear form fields and do other necessary actions on success
          setStudentLastName("");
          setStudentOtherNames("");
          setStudentPhoneNumber("");
          setStudentInstitution("");
          setStudentCourse("");
          setAboutStudent("");
          setIDFile(null);
          setSiwesFile(null);

          console.log(auth?.currentUser);
          console.log("done");
        }
      }
    } catch (err) {
      // Handle unexpected errors
      console.error(err);
      setConditionGood("error");
      setStatusBarMessage("An unexpected error occurred. Please try again.");
    } finally {
      setsubmitButtonClicked(false);
    }
  };

  return (
    <div>
      {/* {console.log(auth?.currentUser?.displayName, "hmmmm")} */}
      <form
        className="mt-8 grid grid-cols-2 gap-x-8 gap-y-9 text-sm"
        onSubmit={onSubmitApplication}
      >
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">First Name</label>
          <input
            className="border border-gray-300 px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g John"
            value={studentOtherNames}
            // required
            onChange={(e) => setStudentOtherNames(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Last Name</label>
          <input
            className="border border-gray-300 px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g Doe"
            value={studentLastName}
            // required
            onChange={(e) => setStudentLastName(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Email Address</label>
          <input
            className="border border-gray-300 px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g thatemail@mail.com"
            value={studentEmail}
            // required
            disabled
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Phone Number</label>
          <input
            className="border border-gray-300 px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g 08012345678"
            // required
            value={studentPhoneNumber}
            onChange={(e) => setStudentPhoneNumber(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Institution of Study</label>
          <input
            className="border border-gray-300 px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="e.g University of Computer"
            value={studentInstitution}
            onChange={(e) => setStudentInstitution(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">Course of Study</label>
          <input
            className="border border-gray-300 px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary"
            placeholder="Computer Science"
            value={studentCourse}
            onChange={(e) => setStudentCourse(e.target.value)}
          />
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">
            Level (The one you just completed)
          </label>
          <div className="relative">
            <button
              type="button"
              className={`
              ${
                studentLevel === "Select your level"
                  ? "text-neutral-400"
                  : "text-black"
              }
              w-full border border-gray-300 justify-between px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary
              `}
              onClick={handleDropdownToggle}
            >
              {studentLevel}
              <FiChevronDown
                className={
                  isDropdownOpen
                    ? "transform rotate-180 transition-all duration-300 ease-in-out"
                    : "transform rotate-0 transition-all duration-300 ease-in-out"
                }
              />
            </button>
            {isDropdownOpen && (
              <div className="absolute z-30 top-full left-0 mt-1 bg-white shadow-md border border-gray-300 rounded-lg w-full">
                {level_options.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handlelevel_optionselect(option.name)}
                    className="cursor-pointer px-4 py-3 hover:bg-gray-100 border-b-2 border-gray-300 border-opacity-30"
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="flex flex-col gap-1">
          <label className="text-xs text-gray-500">
            Number of Months for IT
          </label>
          <div className="relative">
            <button
              type="button"
              className={`
              ${
                durationOfInternship === "Select number of months"
                  ? "text-neutral-400"
                  : "text-black"
              }
              w-full border border-gray-300 justify-between px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary
              `}
              onClick={handleDurationDropdownToggle}
            >
              {durationOfInternship}
              <FiChevronDown
                className={
                  isDurationDropdownOpen
                    ? "transform rotate-180 transition-all duration-300 ease-in-out"
                    : "transform rotate-0 transition-all duration-300 ease-in-out"
                }
              />
            </button>
            {isDurationDropdownOpen && (
              <div className="absolute z-30 top-full left-0 mt-1 bg-white shadow-md border border-gray-300 rounded-lg w-full">
                {durationOptions.map((option, index) => (
                  <div
                    key={index}
                    onClick={() => handleDurationOptionSelect(option.value)}
                    className="cursor-pointer px-4 py-3 hover:bg-gray-100 border-b-2 border-gray-300 border-opacity-30"
                  >
                    {option.name}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
        <div className="col-span-2 flex flex-col gap-1">
          <label className="text-xs text-gray-500">
            Tell us about yourself (in not more than 100 words)
          </label>
          <textarea
            className={`
            ${
              aboutStudent.split(/\s+/).length > MAX_WORD_COUNT
                ? "text-red-500"
                : ""
            }
            resize-none border border-gray-300 px-4 py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary leading-6
            `}
            placeholder="Impress us!"
            value={aboutStudent}
            onChange={handleAboutStudentChange}
            rows={7}
          />
          <p
            className={`
          ${
            aboutStudent.split(/\s+/).length > MAX_WORD_COUNT
              ? "text-red-500"
              : "text-gray-500"
          }
          transition-all duration-300 ease-in-out
          `}
          >
            {aboutStudent.split(/\s+/).length}/{MAX_WORD_COUNT} words
          </p>
        </div>

        <span className="col-span-2">
          Upload your Documents
          <span className="text-xs">(School ID card, SIWES letter)</span>
        </span>
        {/* ID File upload section */}
        <div className="col-span-1 gap-5 flex flex-col">
          <label>• School ID card</label>
          <div className="custom_border p-6 flex flex-col gap-7 justify-center items-center h-60">
            <input
              type="file"
              id="idFileInput"
              onChange={handleIDFileChange}
              // required
              style={{ display: "none" }}
            />
            <button
              type="button"
              className="flex justify-center items-center w-fit outline-none focus:outline-none"
              onClick={handleIDFileUploadClick}
            >
              {IDFile && IDFile.uploading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <MoonLoader color="#3B37FF" size={20} />
                  <span>Uploading...</span>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {IDFile && IDFile.uploaded ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center justify-center bg-gray-200 rounded-full w-20 h-20"
                    >
                      <CiFileOn className="text-3xl text-black" />
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-full w-20 h-20">
                      <PiUploadSimpleThin className="text-3xl text-black" />
                    </div>
                  )}
                </AnimatePresence>
              )}
            </button>
            <span className="text-center flex flex-col justify-center items-center gap-4 text-base">
              <AnimatePresence>
                {" "}
                {IDFile && IDFile.uploaded ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center flex flex-col justify-center items-center gap-4 text-base"
                  >
                    Made an error? Click to reupload
                    <span className="text-primary text-xs">
                      File Uploaded Successfully*
                    </span>
                  </motion.div>
                ) : (
                  <>
                    Click here to add your file or, Drag and Drop your file
                    <span className="text-gray-500 text-xs">
                      Image file Format*
                    </span>
                  </>
                )}
              </AnimatePresence>
            </span>
          </div>
        </div>

        {/* Siwes File upload section */}
        <div className="col-span-1 gap-5 flex flex-col">
          <label>• Siwes letter</label>
          <div className="custom_border p-6 flex flex-col gap-7 justify-center items-center h-60">
            <input
              type="file"
              id="siwesFileInput"
              onChange={handleSiwesFileChange}
              // required
              style={{ display: "none" }}
            />
            <button
              type="button"
              className="flex justify-center items-center w-fit outline-none focus:outline-none"
              onClick={handleSiwesFileUploadClick}
            >
              {siwesFile && siwesFile.uploading ? (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="flex items-center gap-3"
                >
                  <MoonLoader color="#3B37FF" size={20} />
                  <span>Uploading...</span>
                </motion.div>
              ) : (
                <AnimatePresence>
                  {siwesFile && siwesFile.uploaded ? (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      transition={{ duration: 0.5 }}
                      className="flex flex-col items-center justify-center bg-gray-200 rounded-full w-20 h-20"
                    >
                      <CiFileOn className="text-3xl text-black" />
                    </motion.div>
                  ) : (
                    <div className="flex flex-col items-center justify-center bg-gray-200 rounded-full w-20 h-20">
                      <PiUploadSimpleThin className="text-3xl text-black" />
                    </div>
                  )}
                </AnimatePresence>
              )}
            </button>

            <span className="text-center flex flex-col justify-center items-center gap-4 text-base">
              <AnimatePresence>
                {siwesFile && siwesFile.uploaded ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 0 }}
                    transition={{ duration: 0.5 }}
                    className="text-center flex flex-col justify-center items-center gap-4 text-base"
                  >
                    Made an error? Click to reupload
                    <span className="text-primary text-xs">
                      File Uploaded Successfully*
                    </span>
                  </motion.div>
                ) : (
                  <>
                    Click here to add your file or, Drag and Drop your file
                    <span className="text-gray-500 text-xs">
                      Image file Format*
                    </span>
                  </>
                )}
              </AnimatePresence>
            </span>
          </div>
        </div>

        <div className="col-span-2">
          <button
            type="submit"
            className="bg-primary w-full py-3 rounded-lg text-white text-sm transition-all duration-300 ease-in-out hover:bg-white hover:text-primary hover:border-primary border border-primary"
          >
            Submit Application
          </button>
        </div>
      </form>
    </div>
  );
}
