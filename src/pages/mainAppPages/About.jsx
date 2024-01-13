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
        // console.log(about);
      } catch (error) {}
    };
    getAbout();
  }, [about]);
  return (
    <div className="md:py-36 py-20 gap-5 md:gap-7 md:px-16 px-6 flex flex-col ">
      <div className="flex flex-col gap-2 md:gap-4 text-darkBlue">
        <span className="font-medium text-4xl md:text-6xl -tracking-widest">About</span>
        <span className="tracking-tighter">Get to know us</span>
      </div>
      <div className="md:w-3/4 text-justify md:text-base text-sm leading-relaxed md:leading-[1.7rem] font-light">
        {about ? about : ""}
      </div>
    </div>
  );
}

export default About;
