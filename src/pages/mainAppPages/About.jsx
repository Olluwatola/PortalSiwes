import { useState, useEffect } from "react";
import {
  collection,
  //addDoc, doc,
  getDocs,
} from "firebase/firestore";
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
  return (
    <div className="py-36 gap-7 px-16 flex flex-col ">
      <div className="flex flex-col gap-4 text-darkBlue">
        <span className="font-medium text-6xl -tracking-widest">About</span>
        <span className="tracking-tighter">Get to know us</span>
      </div>
      {about ? about : ""}
    </div>
  );
}

export default About;
