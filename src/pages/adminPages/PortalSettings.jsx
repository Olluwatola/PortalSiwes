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
    <div className="flex flex-col gap-8 w-2/3">
      <StatusBar
        conditionGood={conditionGood}
        setStatusBarMessage={setStatusBarMessage}
        statusBarMessage={statusBarMessage}
      />
      <span className="text-3xl font-medium">Portal Settings</span>
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
      <div className="flex flex-col gap-2">
        {" "}
        <ChangePassword />
        {auth.currentFirestoreProfile.role === "superAdmin" ? (
          <GrantAdminAccess />
        ) : null}
      </div>
    </div>
  );
};

export default PortalSettings;
