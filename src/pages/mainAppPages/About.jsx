import { useState, useEffect } from "react";
import {
  collection,
  //addDoc, doc,
  getDocs,
} from "firebase/firestore";
import { db } from "./../../config/firebase";
import { motion } from "framer-motion";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton from "react-loading-skeleton";

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
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.5 }}
      className="md:py-36 py-20 gap-5 md:gap-7 md:px-16 px-6 flex flex-col "
    >
      <div className="flex flex-col gap-2 md:gap-4 text-darkBlue">
        <span className="font-medium text-4xl md:text-6xl -tracking-widest">
          About
        </span>
        <span className="tracking-tighter">Get to know us</span>
      </div>
      <div className="md:w-3/4 text-justify md:text-base text-sm leading-relaxed md:leading-[1.7rem] font-light">
        {about ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.1 }}
          >
            {about}
          </motion.div>
        ) : (
          <Skeleton count={10} />
        )}
      </div>
    </motion.div>
  );
}

export default About;
