import {
  grantAdminAccessController,
  revokeAdminAccessController,
} from "./../../../controllers/authControllers";

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

  async function handleRevokeAdminAccess() {
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
    <div className="border border-neutral-300 rounded-lg p-3 flex flex-col gap-3 justify-between">
      <div className="bg-neutral-200 w-fit px-3 py-1 rounded-md">
        {adminProfileDoc.email}
      </div>
      <div className="flex gap-2">
        <button
          className={`px-4 py-2 rounded-lg bg-green-500 text-white text-sm focus:outline-none ${
            adminProfileDoc.role === "admin"
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-green-600"
          }`}
          onClick={handleGrantAdminAccess}
          disabled={adminProfileDoc.role === "admin"}
        >
          Grant Admin Status
        </button>
        <button
          className={`px-4 py-2 rounded-lg bg-red-500 text-white text-sm focus:outline-none ${
            adminProfileDoc.role !== "admin"
              ? "opacity-50 cursor-not-allowed"
              : "hover:bg-red-600"
          }`}
          onClick={handleRevokeAdminAccess}
          disabled={adminProfileDoc.role !== "admin"}
        >
          Revoke Admin Status
        </button>
      </div>
    </div>
  );
};

export default UpdateAdminStatusListItem;
