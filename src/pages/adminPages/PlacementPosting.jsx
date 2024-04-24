import { useEffect } from "react";
import Departments from "./../../components/adminComponents/Departments";
import PlacementApplicationContainer from "./../../components/adminComponents/PlacementApplicationsContainer";

const PlacementPosting = () => {
  useEffect(() => {
    // Apply unscrollableBodyStyles to the body element
    document.body.style.overflow = "hidden";

    // Clean up the style when the component unmounts
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  return (
    <div className="flex flex-col gap-5">
      <span className="text-3xl font-medium">Placement Posting</span>
      <span className="text-neutral-500 text-sm tracking-widest">
        DEPARTMENTS
      </span>

      <Departments />
      <div className="flex flex-col gap-1 mt-16 pt-10 border-t border-neutral-200">
        {" "}
        <span className="text-2xl font-medium">
          Place Applications to units
        </span>
        <span className="text-neutral-500 text-sm tracking-widest">
          Unplaced approved applications.
        </span>
      </div>
      <div>
        <PlacementApplicationContainer />
      </div>
    </div>
  );
};

export default PlacementPosting;
