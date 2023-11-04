import { useEffect, useState } from "react";
import { fetchTestimonials } from "../../controllers/testimonialControllers";
import TestimonialsListItem from "./adminListItem/TestimonialsListItem";

const ValidateTestimonials = ({ setConditionGood, setStatusBarMessage }) => {
  const [returnedTestimonials, setReturnedTestimonials] = useState(null);

  useEffect(() => {
    fetchTestimonials(
      setReturnedTestimonials,
      setConditionGood,
      setStatusBarMessage
    );

    //   return () => {
    //     second
    //   }
  }, []);

  return (
    <>
      {
        <>
          {returnedTestimonials?.map((item, index) => (
            <>
              <TestimonialsListItem
                returnedTestimonials={returnedTestimonials}
                setReturnedTestimonials={setReturnedTestimonials}
                index={index}
                testimony={item}
                key={item.id}
                setConditionGood={setConditionGood}
                setStatusBarMessage={setStatusBarMessage}
              />
              <br />
            </>
          ))}
        </>
      }
    </>
  );
};

export default ValidateTestimonials;
