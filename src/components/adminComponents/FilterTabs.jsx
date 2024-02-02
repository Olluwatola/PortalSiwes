const FilterTabs = ({
  name,
  active,
  filter,
  onClickFunction,
  setsetLoadPlacedApplicants,
  loadPlacedApplicants,
}) => {
  return (
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
  );
};

export default FilterTabs;
