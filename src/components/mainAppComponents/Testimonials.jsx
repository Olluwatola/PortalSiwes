import {
    db,
  } from "./../../config/firebase";
  import { useState, useEffect } from "react";
  import {
    getDocs,
    collection,
    addDoc,
    //deleteDoc,
    //updateDoc,
    //doc,
  } from "firebase/firestore";
  
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
      <>{loading===true?<>loading testimonials....</>:<>
        <div>
          {testimonalList[testimonialIndex]?.quote}
          <br />
          {testimonalList[testimonialIndex]?.testifier}
  
          {console.log(testimonalList)}
          <button
            onClick={() => handleIncreaseTestimonialIndex(testimonalList.length)}
          >
            +
          </button>
          {/*the testimonials go in here */}
        </div>
        <form onSubmit={handleSubmitTestimonial}>
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
        </form></>}
      </>
    );
  }
  