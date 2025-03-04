import { useState } from "react";
import { auth } from "./../../config/firebase";
import UpdateMainUiForm from "./../../components/adminComponents/UpdateMainUiForm";
import StatusBar from "./../../components/adminComponents/adminStatusBar/AdminStatusBar";
import UpdateFAQ from "./../../components/adminComponents/UpdateFAQ";
import ValidateTestimonials from "./../../components/adminComponents/ValidateTestimonials";
import ChangePassword from "./../../components/adminComponents/ChangePassword";
import GrantAdminAccess from "./../../components/adminComponents/GrantAdminAccess";

const PortalSettings = () => {
  const [conditionGood, setConditionGood] = useState(null);
  const [statusBarMessage, setStatusBarMessage] = useState(null);
  return (
    <>
      <StatusBar
        conditionGood={conditionGood}
        statusBarMessage={statusBarMessage}
      />
      <h1>Portal Settings</h1>
      <UpdateMainUiForm
        setConditionGood={setConditionGood}
        setStatusBarMessage={setStatusBarMessage}
      />
      <hr />
      <UpdateFAQ
        setConditionGood={setConditionGood}
        setStatusBarMessage={setStatusBarMessage}
      />
      <hr />
      <ValidateTestimonials
        setConditionGood={setConditionGood}
        setStatusBarMessage={setStatusBarMessage}
      />
      <hr />
      <ChangePassword />
      {auth.currentFirestoreProfile.role === "superAdmin" ? (
        <GrantAdminAccess />
      ) : null}
    </>
  );
};

export default PortalSettings;
