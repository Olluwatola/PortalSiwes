import { useState, useEffect } from "react";
import { collection, 
  //addDoc, doc,
   getDocs } from "firebase/firestore";
import { db } from "./../../config/firebase";

function About() {
  const [about, setAbout] = useState();

  useEffect(() => {
    const getAbout = async () => {
      const contactUsInfoRef = collection(db, "contactUsInfo");
      try {
        const data = await getDocs(contactUsInfoRef);
        const mappedAbout = data.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }))[0].aboutUs;
        setAbout(mappedAbout);
        console.log(about);
      } catch (error) {}
    };
    getAbout();
  }, [about]);
  return <>{about ? about : ""}</>;
}

export default About;
