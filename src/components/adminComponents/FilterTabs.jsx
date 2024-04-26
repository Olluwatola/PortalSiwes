import React, { useState } from "react";

const FilterTabs = ({
  name,
  active,
  filter,
  onClickFunction,
  setsetLoadPlacedApplicants,
  loadPlacedApplicants,
  variant
}) => {
  const [loading, setLoading] = useState(false);

  const handleClick = async () => {
    setLoading(true); // Set loading to true when button is clicked
    await onClickFunction(); // Call the onClickFunction
    setLoading(false); // Reset loading state after onClickFunction completes
  };

  return (
    variant ? (
      <div className="flex flex-col items-center">
        <button
          className={`bg-primary h-11 flex justify-center items-center w-80 rounded-lg text-white
            hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/15 transition-all duration-200 ease-in-out
            ${loading ? "opacity-50 cursor-not-allowed" : ""}`}
          onClick={handleClick} // Use the handleClick function
          disabled={loading} // Disable the button while loading
        >
          {loading ? "Loading..." : name} {/* Show "Loading..." text when loading */}
        </button>
      </div>
    ) : (
      <div
        className={`
          ${
            active === name
              ? "after:h-1.5 after:w-full after:bg-primary after:rounded-t-md after:translate-y-1"
              : "after:bg-primary after:h-1.5 after:w-full after:rounded-t-md after:translate-y-2 after:opacity-0"
          } flex flex-col items-center w-fit after:transition-all after:duration-150 after:ease-in-out`}
      >
        <button
          className={`
            ${active === name ? "text-primary" : "text-dashBlue"}`}
          onClick={onClickFunction}
        >
          {name}
        </button>
      </div>
    )
  );
};

export default FilterTabs;
