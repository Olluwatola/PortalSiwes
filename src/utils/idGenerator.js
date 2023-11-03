export function generateTimestampId() {
    const date = new Date();
    const year = date.getFullYear() % 100; // Get the last two digits of the year
    const month = String(date.getMonth() + 1).padStart(2, '0'); // Month is 0-based
    const day = String(date.getDate()).padStart(2, '0');
    const hours = String(date.getHours()).padStart(2, '0');
    const minutes = String(date.getMinutes()).padStart(2, '0');
    const seconds = String(date.getSeconds()).padStart(2, '0');
    const milliseconds = String(date.getMilliseconds()).padStart(3, '0');
  
    const id = `${year}${month}${day}${hours}${minutes}${seconds}${milliseconds}`;
    return id;
  }
  