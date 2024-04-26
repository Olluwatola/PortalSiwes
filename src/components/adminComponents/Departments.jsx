import ElementBox from "./ElementBox";

const Departments = () => {
  return (
    <div className="grid grid-cols-4 gap-4">
      <ElementBox
        placement={true}
        valueOfHeader={"ITEMS, MIS"}
        link={"/admin/placement/mis"}
      ></ElementBox>
      <ElementBox
        placement={true}
        valueOfHeader={"ITEMS, TRD"}
        link={"/admin/placement/trd"}
      ></ElementBox>
      <ElementBox
        placement={true}
        valueOfHeader={"ITEMS, SDU"}
        link={"/admin/placement/sdu"}
      ></ElementBox>
      <ElementBox
        placement={true}
        valueOfHeader={"ITEMS, ITNH"}
        link={"/admin/placement/itnh"}
      ></ElementBox>
      <ElementBox
        placement={true}
        valueOfHeader={"ITEMS, UMC"}
        link={"/admin/placement/umc"}
      ></ElementBox>
      <ElementBox
        placement={true}
        valueOfHeader={"ITEMS, ITU"}
        link={"/admin/placement/itu"}
      ></ElementBox>
    </div>
  );
};

export default Departments;
