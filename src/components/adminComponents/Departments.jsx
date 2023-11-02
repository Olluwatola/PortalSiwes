import ElementBox from "./ElementBox";

const Departments = () => {
  return (
    <>
      <h3>Departments</h3>
      <ElementBox
        // openUnit={openUnit}
        // currentUnit={currentUnit}
        // ownUnit="MIS"
        // setCurrentUnit={setCurrentUnit}
        // setOpenUnit={setOpenUnit}
        valueOfHeader={"ITEMS, MIS"}
        link={"/admin/placement/mis"}
      ></ElementBox>
      <ElementBox
        // openUnit={openUnit}
        // currentUnit={currentUnit}
        // ownUnit="TRD"
        // setCurrentUnit={setCurrentUnit}
        // setOpenUnit={setOpenUnit}
        valueOfHeader={"ITEMS, TRD"}
        link={"/admin/placement/trd"}
      ></ElementBox>
      <ElementBox
        // openUnit={openUnit}
        // currentUnit={currentUnit}
        // ownUnit="SDU"
        // setCurrentUnit={setCurrentUnit}
        // setOpenUnit={setOpenUnit}
        valueOfHeader={"ITEMS, SDU"}
        link={"/admin/placement/sdu"}
      ></ElementBox>
      <ElementBox
        // openUnit={openUnit}
        // currentUnit={currentUnit}
        // ownUnit="ITNH"
        // setCurrentUnit={setCurrentUnit}
        // setOpenUnit={setOpenUnit}
        valueOfHeader={"ITEMS, ITNH"}
        link={"/admin/placement/itnh"}
      ></ElementBox>
      <ElementBox
        // openUnit={openUnit}
        // currentUnit={currentUnit}
        // ownUnit="UMC"
        // setCurrentUnit={setCurrentUnit}
        // setOpenUnit={setOpenUnit}
        valueOfHeader={"ITEMS, UMC"}
        link={"/admin/placement/umc"}
      ></ElementBox>
      <ElementBox
        // openUnit={openUnit}
        // currentUnit={currentUnit}
        // ownUnit="ITU"
        // setCurrentUnit={setCurrentUnit}
        // setOpenUnit={setOpenUnit}
        valueOfHeader={"ITEMS, ITU"}
        link={"/admin/placement/itu"}
      ></ElementBox>
    </>
  );
};

export default Departments;
