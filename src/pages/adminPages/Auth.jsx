import { useState } from "react";
import LoginForm from "./../../components/adminComponents/LoginForm";
import StatusBar from "../../components/adminComponents/adminStatusBar/AdminStatusBar";
function Admin() {
  const [conditionGood, setConditionGood] = useState(null);
  const [statusBarMessage, setStatusBarMessage] = useState(null);
  return (
    <>
      <StatusBar
        conditionGood={conditionGood}
        statusBarMessage={statusBarMessage}
      />
      <LoginForm
        setConditionGood={setConditionGood}
        setStatusBarMessage={setStatusBarMessage}
      />
    </>
  );
}

export default Admin;
