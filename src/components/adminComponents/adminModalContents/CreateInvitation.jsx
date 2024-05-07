import { useState, useEffect } from "react";
import DatePicker from "react-tailwindcss-datepicker";
import { db } from "./../../../config/firebase";
import { convertToTimestampAndFormatDate } from "./../../../utils/convertToTimestampAndFormatDate";
import SelectInvitees from "./../SelectInvitee";
import nameCropper from "./../../../utils/nameCropper";
import idCropper from "./../../../utils/idCropper";
import { LuClock3 } from "react-icons/lu";
import { Dropdown } from "../../mainAppComponents/Dropdown";
import { GoPlus } from "react-icons/go";

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
  const [selectedDate, setSelectedDate] = useState({
    startDate: null,
    endDate: null,
  });

  const [selectedTime, setSelectedTime] = useState("");
  const [timestamp, setTimestamp] = useState(null);
  const [venue, setVenue] = useState(
    "e.g. Training and Research Development Building"
  );
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

  const handleTimeChange = (e) => {
    const { value } = e.target;
    setSelectedTime(value);
  };

  // useEffect(() => {
  //   // const convertToTimestampAndFormatDate = () => {
  //   //   const date = selectedDate;
  //   //   const time = selectedTime;
  //   //   console.log(`what are we looking at ${date.toDateString()}`);
  //   //   if (date !== null && time !== null) {
  //   //     const datetimeString = `${date.toDateString()} ${time}`;
  //   //     const timestampTemp = new Date(datetimeString)?.getTime();
  //   //     setTimestamp(timestampTemp);
  //   //     //console.log(Timestamp.fromDate(timestamp));
  //   //     //console.log(new Timestamp(timestampTemp));
  //   //     console.log(timestampTemp / 1000);
  //   //     console.log(selectedDate);
  //   //     console.log(selectedTime);
  //   //   }

  //   //   const dateObject = new Date(selectedDate);

  //   //   // Extract year, month, and day
  //   //   const year = dateObject.getFullYear();
  //   //   const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to month because it's zero-indexed
  //   //   const day = dateObject.getDate().toString().padStart(2, "0");

  //   //   const formattedDateString = `${year}-${month}-${day}`;
  //   //   console.log(formattedDateString);
  //   //   setDate(formattedDateString);
  //   // };

  //   convertToTimestampAndFormatDate(
  //     selectedDate,
  //     selectedTime,
  //     setTimestamp,
  //     setDate
  //   );

  //   // return () => {
  //   //   second
  //   // }
  // }, [selectedDate, selectedTime]);

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
        hasResultUploaded: false,
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
        <div className="flex flex-col gap-5">
          <div className="flex flex-col">
            <span className="text-primary font-semibold text-2xl tracking-tighter">
              Create Invitation
            </span>
            <span className="text-neutral-500 text-sm">
              Fill the fields below
            </span>
          </div>
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-1">
                <span className="text-sm text-neutral-400">Select date</span>
                <DatePicker
                  containerClassName="relative border border-neutral-300 rounded-lg focus:outline-none w-fit"
                  inputClassName="focus:outline-none p-2 rounded-lg w-full text-sm"
                  popoverDirection="down"
                  placeholder={"dd-mm-yyyy"}
                  displayFormat={"DD-MM-YYYY"}
                  useRange={false}
                  asSingle={true}
                  readOnly={true}
                  value={selectedDate}
                  onChange={handleDateChange}
                />
              </div>
              <div className="flex flex-col gap-1">
                <span className="text-sm text-neutral-400">Select time</span>
                <div className="border overflow-hidden border-neutral-300 text-sm rounded-lg h-full flex justify-between items-center  cursor-pointer focus:outline-none  w-full relative">
                  <input
                    type="time"
                    id="time"
                    value={selectedTime}
                    onChange={handleTimeChange}
                    className="leading-none text-sm rounded-lg focus:outline-none p-2 w-full  cursor-pointer"
                    min="07:00"
                    max="18:00"
                    required
                  />
                  <div className="absolute text-lg pr-2.5 text-neutral-400 bg-white h-full inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                    <LuClock3 />
                  </div>
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1">
              <span className="text-sm text-neutral-400">Venue</span>
              <Dropdown
                id="venue"
                initialValue={venue}
                options={[
                  { name: "TRD Building", value: "TRD Building" },
                  { name: "Sha sha DLC", value: "Sha sha DLC" },
                  {
                    name: "CBT centre Tech Road",
                    value: "CBT centre Tech Road",
                  },
                ]}
                onSelect={(value) => setVenue(value)}
              />
            </div>

            <button
              type="button"
              className="text-xs flex gap-2 items-center text-primary w-fit"
              onClick={handleAddParticipantToggle}
            >
              <GoPlus className="text-2xl" />
              Add Participant
            </button>

            {arrayOfInviteeNames?.map((name, index) => (
              <li key={index}>{name}</li>
            ))}
            <button
              className="bg-primary text-white rounded-lg h-11 flex justify-center items-center w-full text-sm hover:-translate-y-1 hover:shadow-xl hover:shadow-primary/15 transition-all duration-200 ease-in-out"
              type="submit"
            >
              Create invitation
            </button>
          </form>
          {creatingInvitationLoading
            ? "invitation is being created , hold on...."
            : null}
          {invitationError ? invitationError : null}
        </div>
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
