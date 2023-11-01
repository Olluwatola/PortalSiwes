import { useState, useEffect } from "react";
import { db } from "./../../config/firebase";
import ContactUsForm from "./../../components/mainAppComponents/ContactUsForm";
import { collection, getDocs } from "firebase/firestore";

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
  }, [contactUsInfo, contactUsInfoRef]);

  return (
    <>
      {contactUsInfo[0]?.contactUsNumber}
      <br />
      {contactUsInfo[0]?.contactUsEmail}
      <br />
      {contactUsInfo[0]?.address}

      <ContactUsForm />
    </>
  );
}
export default ContactUs;
