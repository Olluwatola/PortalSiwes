//import React from "react";
import { grantAdminAccessController,revokeAdminAccessController } from "./../../../controllers/authControllers";

const UpdateAdminStatusListItem = ({
  index,
  setConditionGood,
  setStatusBarMessage,
  adminProfileDoc,
  adminsArray,
  setAdminsArray,
}) => {
  async function handleGrantAdminAccess() {
    grantAdminAccessController(
      index,
      adminProfileDoc.id,
      setConditionGood,
      setStatusBarMessage,
      adminsArray,
      setAdminsArray
    );
  }
  async function handleRRevokeAdminAccess() {
    revokeAdminAccessController(
      index,
      adminProfileDoc.id,
      setConditionGood,
      setStatusBarMessage,
      adminsArray,
      setAdminsArray
    );
  }
  return (
    <>
      {adminProfileDoc.email} |{" "}
      <button
        disabled={adminProfileDoc.role === "admin"}
        onClick={handleGrantAdminAccess}
      >
        Grant admin status
      </button>{" "}
      |{" "}
      <button
        disabled={adminProfileDoc.role !== "admin"}
        onClick={handleRRevokeAdminAccess}
      >
        Revoke admin status
      </button>
    </>
  );
};

export default UpdateAdminStatusListItem;
