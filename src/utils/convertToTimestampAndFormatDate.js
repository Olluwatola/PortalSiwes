export const convertToTimestampAndFormatDate = (selectedDate,selectedTime,setTimestamp,setDate) => {
    const date = selectedDate;
    const time = selectedTime;
    console.log(`what are we looking at ${date.toDateString()}`);
    if (date !== null && time !== null) {
      const datetimeString = `${date.toDateString()} ${time}`;
      const timestampTemp = new Date(datetimeString)?.getTime();
      setTimestamp(timestampTemp);
      //console.log(Timestamp.fromDate(timestamp));
      //console.log(new Timestamp(timestampTemp));
      console.log(timestampTemp / 1000);
      console.log(selectedDate);
      console.log(selectedTime);
    }

    const dateObject = new Date(selectedDate);

    // Extract year, month, and day
    const year = dateObject.getFullYear();
    const month = (dateObject.getMonth() + 1).toString().padStart(2, "0"); // Add 1 to month because it's zero-indexed
    const day = dateObject.getDate().toString().padStart(2, "0");

    const formattedDateString = `${year}-${month}-${day}`;
    console.log(formattedDateString);
    setDate(formattedDateString);
  };
