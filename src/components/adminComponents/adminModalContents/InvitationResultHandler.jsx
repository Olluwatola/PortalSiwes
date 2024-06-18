import { useState } from "react";
import { convertStringToPercentage } from "./../../../utils/convertStringToPercentage";
import { removeQuotes } from "../../../utils/removeQuotes";
import { updateTestResults } from "./../../../controllers/ScreeningControllers";
import { filterObjectsById } from "../../../utils/filterObjectsById";

function InvitationResultHandler({
  participantsIdArray,
  invitationId,
  onRequestClose,
  returnedInviteDocument,
  setReturnedInviteDocument,
}) {
  const [csvData, setCsvData] = useState();
  const [loading, setLoading] = useState(false);

  async function handleUpdateTestResults() {
    setLoading(true);
    const filteredArray = filterObjectsById(participantsIdArray, csvData);
    await updateTestResults(
      filteredArray,
      invitationId,
      returnedInviteDocument,
      setReturnedInviteDocument
    );
    setLoading(false);
    onRequestClose();
  }

  const handleFileUpload = (e) => {
    const file = e.target.files[0];

    if (file) {
      const reader = new FileReader();

      reader.onload = (e) => {
        const content = e.target.result;
        const lines = content.split("\n");
        const data = [];

        for (let i = 1; i < lines.length; i++) {
          const values = lines[i].split(",");
          if (values.length >= 4) {
            const id = removeQuotes(values[3].trim());
            const totalScore = parseInt(values[2].trim(), 10); // Ensure parsing as an integer
            if (!isNaN(totalScore)) {
              data.push({ id: id, totalScore: totalScore });
            }
          }
        }
        setCsvData(data);
      };

      reader.readAsText(file);
    }
  };

  const handleClick = () => {
    document.getElementById("fileUpload").click();
  };

  return (
    <div>
      <div
        className="mb-4 p-4 w-full border-2 border-neutral-300 rounded-lg cursor-pointer flex flex-col gap-3 items-center justify-center"
        onClick={handleClick}
      >
        <svg
          className="w-14"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g id="SVGRepo_bgCarrier" strokeWidth="0"></g>
          <g
            id="SVGRepo_tracerCarrier"
            strokeLinecap="round"
            strokeLinejoin="round"
          ></g>
          <g id="SVGRepo_iconCarrier">
            <path
              d="M12 15L12 2M12 2L15 5.5M12 2L9 5.5"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            ></path>
            <path
              d="M8 22.0002H16C18.8284 22.0002 20.2426 22.0002 21.1213 21.1215C22 20.2429 22 18.8286 22 16.0002V15.0002C22 12.1718 22 10.7576 21.1213 9.8789C20.3529 9.11051 19.175 9.01406 17 9.00195M7 9.00195C4.82497 9.01406 3.64706 9.11051 2.87868 9.87889C2 10.7576 2 12.1718 2 15.0002L2 16.0002C2 18.8286 2 20.2429 2.87868 21.1215C3.17848 21.4213 3.54062 21.6188 4 21.749"
              stroke="#1C274C"
              strokeWidth="1.5"
              strokeLinecap="round"
            ></path>
          </g>
        </svg>
        <span className="text-sm text-neutral-500">
          Upload CSV file containing result(s)
        </span>
        <input
          id="fileUpload"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
        {csvData && <span className="ml-4 text-gray-700">{csvData[0].id}</span>}
      </div>
      <button
        className={`py-2 px-4 w-full rounded-lg text-white text-sm ${
          loading ? "bg-gray-400 cursor-wait" : "bg-primary"
        } ${loading || !csvData ? "opacity-50 cursor-not-allowed" : ""}`}
        onClick={handleUpdateTestResults}
        disabled={loading || !csvData}
      >
        {loading ? "Updating..." : "Confirm Result Update"}
      </button>

      <div className="mt-4 flex flex-col gap-2">
        {csvData?.map((item, index) => (
          <div key={index} className="flex gap-4 items-center">
            <div className="bg-neutral-300 text-neutral-800 rounded-lg min-w-16 flex items-center justify-center py-1 text-xs">
              {item.id}
            </div>
            <span className="text-neutral-700">{item.totalScore}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default InvitationResultHandler;
