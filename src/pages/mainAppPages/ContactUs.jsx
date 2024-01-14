import { useState, useEffect } from "react";
import { db } from "./../../config/firebase";
// import ContactUsForm from "./../../components/mainAppComponents/ContactUsForm";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";
import { CiLocationOn, CiMail, CiPhone } from "react-icons/ci";

function ContactUs() {
  const [contactUsInfo, setContactUsInfo] = useState([]);
  const contactUsInfoRef = collection(db, "contactUsInfo");

  useEffect(() => {
    const getContactUsInfo = async () => {
      try {
        const data = await getDocs(contactUsInfoRef);
        const mappedContactUsInfo = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));
        setContactUsInfo(mappedContactUsInfo);
        console.log(contactUsInfo);
      } catch (error) {}
    };
    getContactUsInfo();
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="md:py-36 pt-20 pb-5 gap-5 bg md:gap-7 md:px-16 px-6 flex flex-col "
    >
      <div className="flex flex-col gap-2 md:gap-4 text-darkBlue">
        <span className="font-medium text-4xl md:text-6xl -tracking-widest">
          Contact Us
        </span>
        <span className="tracking-tighter">
          Feel free to get in touch using any of the following methods
        </span>
      </div>
      <div className="flex md:flex-row flex-col md:gap-14 gap-7 items-center md:mt-8 mt-4">
        <div className="flex gap-4 items-center w-full md:w-1/3">
          <CiLocationOn className="md:h-7 h-5 w-auto" />
          <div className="flex flex-col">
            <span className="font-medium md:text-base text-sm">Visit Us</span>
            <span className="md:text-sm text-xs">
              {contactUsInfo[0]?.address ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  {contactUsInfo[0]?.address}
                </motion.div>
              ) : (
                <Skeleton count={1} />
              )}
            </span>
          </div>
        </div>{" "}
        <div className="flex gap-4 items-center w-full md:w-1/3">
          <CiPhone className="md:h-7 h-5 w-auto" />
          <div className="flex flex-col">
            <span className="font-medium md:text-base text-sm">Call Us</span>
            <a
              href={`tel:${contactUsInfo[0]?.contactUsNumber}`}
              className="md:text-sm text-xs"
            >
              {contactUsInfo[0]?.contactUsNumber ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  {contactUsInfo[0]?.contactUsNumber}
                </motion.div>
              ) : (
                <Skeleton count={1} />
              )}
            </a>
          </div>
        </div>{" "}
        <div className="flex gap-4 items-center w-full md:w-1/3">
          <CiMail className="md:h-7 h-5 w-auto" />
          <div className="flex flex-col">
            <span className="font-medium md:text-base text-sm">Message Us</span>
            <a
              target="_blank"
              href={`mailto:${contactUsInfo[0]?.contactUsEmail}`}
              className="md:text-sm text-xs"
            >
              {" "}
              {contactUsInfo[0]?.contactUsEmail ? (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.1 }}
                >
                  {contactUsInfo[0]?.contactUsEmail}
                </motion.div>
              ) : (
                <Skeleton count={1} />
              )}
            </a>
          </div>
        </div>
      </div>
      {/* <ContactUsForm /> */}
    </motion.div>
  );
}
export default ContactUs;
