import { Link } from "react-router-dom";

const ElementBox = ({
  children,
  valueOfHeader,
  link,
  openUnit,
  ownUnit,
  setOpenUnit,
  currentUnit,
  setCurrentUnit,
  placement,
}) => {
  function handleSetOpenUnit(
    ownUnit,
    openUnit,
    setOpenUnit,
    setCurrentUnit,
    currentUnit
  ) {
    console.log(openUnit);
    console.log(currentUnit);
    setOpenUnit(!openUnit);
    setCurrentUnit(ownUnit);
    console.log(`switching unit`);
  }
  return (
    <div
      className={`bg-white shadow-lg shadow-slate-100 border border-neutral-100 rounded-xl p-4 flex flex-col justify-between ${
        placement ? "gap-10" : "gap-5"
      }`}
    >
      {placement ? "" : <span className="text-sm">{children}</span>}
      <span
        className={placement ? "text-2xl font-medium" : "text-4xl font-medium"}
      >
        {valueOfHeader}
      </span>
      {link ? (
        <Link
          className="border border-primary rounded-md py-2.5 transition-all hover:bg-white hover:text-primary text-center text-sm duration-300 ease-in-out bg-primary text-white"
          to={link}
        >
          View details
        </Link>
      ) : (
        <button
          onClick={() => {
            handleSetOpenUnit(
              ownUnit,
              openUnit,
              setOpenUnit,
              setCurrentUnit,
              currentUnit
            );
          }}
        >
          View details
        </button>
      )}
    </div>
  );
};

export default ElementBox;
