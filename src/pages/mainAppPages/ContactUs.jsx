import { useState, useEffect } from "react";
import { db } from "./../../config/firebase";
// import ContactUsForm from "./../../components/mainAppComponents/ContactUsForm";
import { collection, getDocs } from "firebase/firestore";
import { motion } from "framer-motion";
import { SlLocationPin } from "react-icons/sl";


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
      <div className="flex flex-col gap-4 text-darkBlue">
        <span className="font-medium text-6xl -tracking-widest">
          Contact Us
        </span>
        <span className="tracking-tighter">
          Feel free to get in touch using any of the following methods
        </span>
      </div>
      <div className="flex gap-10 items-center">
        <div className="flex items-center h-8">
        <SlLocationPin className="h-full w-auto" />
          <div></div>
        </div>
      </div>
      {contactUsInfo[0]?.contactUsEmail}
      <br />
      {contactUsInfo[0]?.contactUsNumber}
      <br />
      {contactUsInfo[0]?.address}
      {/* <ContactUsForm /> */}
    </motion.div>
  );
}
export default ContactUs;
