import { Link } from "react-router-dom";

const divStyle = {
  display: "inline-block",
  marginRight: "10px", // Optional: Add some spacing between the divs
};

const ElementBox = ({
  children,
  valueOfHeader,
  link,
  openUnit,
  ownUnit,
  setOpenUnit,
  currentUnit,
  setCurrentUnit,
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
    <div style={divStyle}>
      <p>{children}</p>
      <h2>{valueOfHeader}</h2>
      {link ? (
        <Link to={link}>View details</Link>
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
