import { db } from "./../../config/firebase";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  getDocs,
  collection,
  addDoc,
  //deleteDoc,
  //updateDoc,
  //doc,
} from "firebase/firestore";
import avatar from "../../assets/testimonial.jpg";
import { BsArrowRightCircle } from "react-icons/bs";
import "react-loading-skeleton/dist/skeleton.css"; //Don't forget to import the styles
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const testimonialRef = collection(db, "testimonial");

export function Testimonials() {
  const [testifier, setTestifier] = useState("");
  const [quote, setQuote] = useState("");
  const [testifierRole, setTestifierRole] = useState("");
  const [testimonalList, setTestimonialList] = useState([]);
  const [testimonialIndex, setTestimonialIndex] = useState(0);
  const [loading, setLoading] = useState(false);

  const handleIncreaseTestimonialIndex = async (lengthOfArray) => {
    let newIndex;
    newIndex = (testimonialIndex + 1) % lengthOfArray;
    setTestimonialIndex(newIndex);
    console.log(newIndex);
  };

  useEffect(() => {
    const handleGetTestimonials = async () => {
      try {
        setLoading(true);
        const data = await getDocs(testimonialRef);
        const filteredData = data.docs
          .map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }))
          .filter((doc) => doc.hasBeenDisplayApproved);
        setLoading(false);
        setTestimonialList(filteredData);
      } catch (err) {
        console.error(err);
      }
    };

    handleGetTestimonials();
  }, []);

  const handleSubmitTestimonial = async (e) => {
    try {
      e.preventDefault();

      await addDoc(testimonialRef, {
        testifier: testifier,
        quote: quote,
        testifierRole: testifierRole,
        hasBeenDisplayApproved: false,
      }).then((feedback) => {
        console.log(feedback);
      });

      setTestifier("");
      setQuote("");
      setTestifierRole("");

      console.log("done");
    } catch (err) {
      console.error(err);
      console.log("ERRORRRRRR ");
    }
  };

  return (
    <>
      <>
        <div className="flex justify-between md:justify-normal gap-3 md:gap-5 h-auto md:mt-0 mt-7">
          <div className="md:w-[25vw] 2xl:w-fit w-full md:text-base text-sm border border-white rounded-lg p-2 min-h-[9vw] 2xl:min-h-fit md:hover:w-[35vw] transition-all duration-300 ease-in-out cursor-pointer">
            <div className="bg-primaryAlt bg-opacity-10 p-3 h-full rounded-lg flex items-center">
              {loading ? (
                <SkeletonTheme baseColor="#3B37FF" highlightColor="#6361c1">
                  <div className="flex flex-col gap-2 w-full h-full">
                    <Skeleton count={1} />
                    <div className="flex gap-2 items-center">
                      <Skeleton height={50} width={50} />
                      <Skeleton count={2} width={100} />
                    </div>
                  </div>
                </SkeletonTheme>
              ) : (
                <div className="flex flex-col gap-3 justify-center w-full">
                  <span className="overflow-hidden md:truncate md:whitespace-nowrap w-full">
                    "{testimonalList[testimonialIndex]?.quote}"
                  </span>
                  <div className="flex items-center gap-2">
                    <img
                      src={avatar}
                      alt="avatar"
                      className="w-12 h-12 rounded-md"
                    />
                    <div className="flex flex-col ">
                      <span className="font-medium">
                        {testimonalList[testimonialIndex]?.testifier}
                      </span>
                      <span className="font-light text-sm italic">
                        {testimonalList[testimonialIndex]?.testifierRole}
                      </span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          </div>
          <motion.button
            onClick={() =>
              handleIncreaseTestimonialIndex(testimonalList.length)
            }
            whileTap={{
              x: 10,
              transition: { duration: 0.1 },
            }}
          >
            <BsArrowRightCircle className="text-white text-2xl md:text-4xl" />
          </motion.button>
        </div>
        {/* <form onSubmit={handleSubmitTestimonial}>
            <input
              placeholder="name.."
              value={testifier}
              onChange={(e) => setTestifier(e.target.value)}
            />
            <input
              placeholder="tell us about your experience at iTems.."
              value={quote}
              onChange={(e) => setQuote(e.target.value)}
            />
            <input
              placeholder="what position did you hold at iTems.."
              value={testifierRole}
              onChange={(e) => setTestifierRole(e.target.value)}
            />
            <button type="submit"> Submit Testimonial</button>
          </form> */}
      </>
    </>
  );
}
