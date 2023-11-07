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

  async function handleUpdateTestResults() {
    const filterdArray = filterObjectsById(participantsIdArray, csvData);
    updateTestResults(
      filterdArray,
      invitationId,
      returnedInviteDocument,
      setReturnedInviteDocument
    );
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
          console.log(lines);
          if (values.length >= 2) {
            const id = removeQuotes(values[3].trim());
            const totalScore = parseInt(
              convertStringToPercentage(values[2].trim())
            );
            data.push({ id: id, totalScore: totalScore });
          }
        }
        console.log(data);
        setCsvData(data);
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <input type="file" accept=".csv" onChange={handleFileUpload} />
      <button
        onClick={handleUpdateTestResults}
        disabled={csvData === undefined}
      >
        update results
      </button>
      <table>
        <thead>
          <tr>
            <th>id</th>
            <th>Total Score</th>
          </tr>
        </thead>
        <tbody>
          {csvData?.map((item, index) => (
            <tr key={index}>
              <td>{item.id}</td>
              <td>{item.totalScore}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={onRequestClose}>Finished</button>
    </div>
  );
}

export default InvitationResultHandler;
