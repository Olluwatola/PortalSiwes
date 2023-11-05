import { useEffect, useState } from "react";
import { fetchAllAdminProfiles } from "./../../../controllers/authControllers";
import StatusBar from "../adminStatusBar/adminStatusBar";
import UpdateAdminStatusListItem from "./../adminListItem/UpdateAdminStatusListItem";

const GrantAdminAccessModalContent = () => {
  const [conditionGood, setConditionGood] = useState(null);
  const [statusBarMessage, setStatusBarMessage] = useState(null);
  const [adminsArray, setAdminsArray] = useState(null);

  useEffect(() => {
    fetchAllAdminProfiles(
      setAdminsArray,
      setConditionGood,
      setStatusBarMessage
    );

    //   return () => {
    //     second
    //   }
  }, []);

  return (
    <>
      <StatusBar
        conditionGood={conditionGood}
        statusBarMessage={statusBarMessage}
      />
      {adminsArray?.map((item,index) => (
        <>
          <UpdateAdminStatusListItem
            setConditionGood={setConditionGood}
            setStatusBarMessage={setStatusBarMessage}
            adminProfileDoc={item}
            index={index}
            key={item.id}
            adminsArray={adminsArray}
            setAdminsArray={setAdminsArray}
          />
          <br />
        </>
      ))}
    </>
  );
};

export default GrantAdminAccessModalContent;
