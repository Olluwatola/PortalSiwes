import { useState, useEffect } from "react";
import DatePicker from "react-datepicker";
import TimePicker from "react-time-picker";
import "react-datepicker/dist/react-datepicker.css";
import "react-time-picker/dist/TimePicker.css";
import { db } from "./../../../config/firebase";
import { convertToTimestampAndFormatDate } from "./../../../utils/convertToTimestampAndFormatDate";
import SelectInvitees from "./../SelectInvitee";
import nameCropper from "./../../../utils/nameCropper";
import idCropper from "./../../../utils/idCropper";
import {
  //getDocs,
  collection,
  addDoc,
  //deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";

function CreateInvitation({
  userObjectArray,
  onRequestClose,
  addParticipantToggle,
  handleAddParticipantToggle,
}) {
  const [invitees, setInvitees] = useState([]);

  const [date, setDate] = useState("");
  // const [time, setTime] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState("12:00");
  const [timestamp, setTimestamp] = useState(null);
  const [venue, setVenue] = useState("TRD Building");
  const [invitationError, setInvitationError] = useState(null);
  const [creatingInvitationLoading, setCreatingInvitationLoading] =
    useState(false);
  const [invitationSuccessful, setInvitationSuccessful] = useState(false);
  const invitationsRef = collection(db, "invitations");
  const [formInvitees, setFormInvitees] = useState(null);
  const [arrayOfInviteeNames, setArrayOfInviteeNames] = useState([]);
  const arrayOfIds = idCropper(formInvitees);

  const handleDateChange = (date) => {
    setSelectedDate(date);
  };

  const handleTimeChange = (time) => {
    setSelectedTime(time);
  };

  useEffect(() => {
    // const convertToTimestampAndFormatDate = () => {
    //   const date = selectedDate;
    //   const time = selectedTime;
    //   console.log(`what are we looking at ${date.toDateString()}`);
    //   if (date !== null && time !== null) {
    //     const datetimeString = `${date.toDateString()} ${time}`;
    //     const timestampTemp = new Date(datetimeString)?.getTime();
    //     setTimestamp(timestampTemp);
    //     //console.log(Timestamp.fromDate(timestamp));
    //     //console.log(new Timestamp(timestampTemp));
    //     console.log(timestampTemp / 1000);
    //     console.log(selectedDate);
    //     console.log(selectedTime);
    //   }

    //   const dateObject = new Date(selectedDate);

    //   // Extract year, month, and day
    //   const year = dateObject.getFullYear();
    //   const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to month because it's zero-indexed
    //   const day = dateObject.getDate().toString().padStart(2, "0");

    //   const formattedDateString = `${year}-${month}-${day}`;
    //   console.log(formattedDateString);
    //   setDate(formattedDateString);
    // };

    convertToTimestampAndFormatDate(
      selectedDate,
      selectedTime,
      setTimestamp,
      setDate
    );

    // return () => {
    //   second
    // }
  }, [selectedDate, selectedTime]);

  useEffect(() => {
    setArrayOfInviteeNames(nameCropper(invitees));
  }, [invitees]);

  useEffect(() => {
    if (userObjectArray) {
      setInvitees(userObjectArray);
      setFormInvitees(userObjectArray);
      console.log(invitees);
    }
    // return () => {
    //   second
    // }
  }, []);

  const handleSubmit = async (e) => {
    setCreatingInvitationLoading(true);
    e.preventDefault();
    try {
      // You can handle form submission here, e.g., send data to a server.

      //console.log({ date, time, venue, arrayOfIds });
      arrayOfIds.forEach(async (element) => {
        let applicationToBeUpdated = doc(db, "studentApplication", element);

        await updateDoc(applicationToBeUpdated, {
          hasBeenInvitedForTest: true,
        })
          .then((feedback) => {
            console.log(feedback);
          })
          .catch((error) => {
            console.log(error);
            setInvitationError(error.message);
            throw error;
          });
      });
      await addDoc(invitationsRef, {
        date: date,
        time: selectedTime,
        timestamp,
        venue,
        toNotHold: false,
        participantsIdArray: arrayOfIds,
        hasHeld: false,
      })
        .then((feedback) => {
          console.log(`successfullyupdate`);
          console.log(feedback);
        })
        .catch((error) => {
          console.log(error);
          setInvitationError(error.message);
          throw error;
        });
      setCreatingInvitationLoading(false);
      setInvitationSuccessful(true);
    } catch (error) {
      console.log(error);
      setInvitationError(error.message);
    } finally {
      setCreatingInvitationLoading(false);
    }
  };
  return (
    <>
      {invitationSuccessful === true ? (
        <>
          You have succcessfully invited {arrayOfIds.length} particpants!
          <button onClick={onRequestClose}>OK</button>
        </>
      ) : addParticipantToggle === false && invitationSuccessful === false ? (
        <>
          <h2>Create Invitation</h2>
          <h3>Fill the fields below</h3>
          <form onSubmit={handleSubmit}>
            <DatePicker
              selected={selectedDate}
              onChange={handleDateChange}
              dateFormat="yyyy-MM-dd"
            />

            <TimePicker value={selectedTime} onChange={handleTimeChange} />

            <div>
              <label htmlFor="venue">Venue:</label>
              <select
                id="venue"
                name="venue"
                value={venue}
                onChange={(e) => setVenue(e.target.value)}
              >
                <option value="TRD Building">TRD Building</option>
                <option value="Sha sha DLC">Shasha DLC</option>
                <option value="CBT centre Tech Road">
                  CBT centre Tech Road
                </option>
              </select>
              <button onClick={handleAddParticipantToggle}>
                Add Participant
              </button>
            </div>

            {arrayOfInviteeNames?.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
            <button type="submit">Create invitation</button>
          </form>
          {creatingInvitationLoading
            ? "invitation is being created , hold on...."
            : null}
          {invitationError ? invitationError : null}
        </>
      ) : addParticipantToggle === true && invitationSuccessful === false ? (
        //<><button onClick={handleAddParticipantToggle}>go back</button></>
        <SelectInvitees
          invitees={invitees}
          setInvitees={setInvitees}
          key={null}
          handleAddParticipantToggle={handleAddParticipantToggle}
          setFormInvitees={setFormInvitees}
        />
      ) : (
        "error"
      )}
    </>
  );
}

export default CreateInvitation;
