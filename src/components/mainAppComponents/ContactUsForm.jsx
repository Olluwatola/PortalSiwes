import { useState } from "react";
import { db } from "./../../config/firebase";
import { collection, addDoc} from "firebase/firestore";

const contactUsFormRef = collection(db, "contactUsForm");

function ContactUsForm() {
  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await addDoc(contactUsFormRef, {
        firstName: firstName,
        lastName: lastName,
        phone: phone,
        email: email,
        message: message,
      }).then((feedback) => {
        console.log(feedback);
      });

      setFirstName("");
      setLastName("");
      setEmail("");
      setMessage("");
      setPhone("");
    } catch (err) {
      console.error(err);
      console.log("ERRORRRRRR ");
    }
  };

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="firstName"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
        />
        <input
          placeholder="lastname"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <input
          placeholder="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="phone number"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
        />
        <br />
        <textarea
          placeholder="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
export default ContactUsForm;
