const filterStyle = {
  display: "inline-block",
  margin: "10px", // Optional: Add some spacing between the divs
  border: "none",
  outline: "none",
  backgroundColor: "transparent",
};

const FilterTabs = ({
  name,
  filter,
  onClickFunction,
  setsetLoadPlacedApplicants,
  loadPlacedApplicants,
}) => {
  return (
    <button
      // onClick={filter}
      style={filterStyle}
      onClick={onClickFunction}
    >
      {name}
    </button>
  );
};

export default FilterTabs;
