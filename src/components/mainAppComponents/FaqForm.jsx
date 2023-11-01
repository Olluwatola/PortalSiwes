import { db } from "./../../config/firebase";
import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";

const faqAskedQuestionRef = collection(db, "faqAskedQuestion");

export default function FaqForm() {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      await addDoc(faqAskedQuestionRef, {
        email: email,
        message: message,
      }).then((feedback) => {
        console.log(feedback);
      });

      setEmail("");
      setMessage("");
    } catch (err) {
      console.error(err);
      console.log("ERRORRRRRR ");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <input
          placeholder="email..."
          type="text"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          placeholder="message..."
          type="text"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button type="submit">Submit</button>
      </form>
    </>
  );
}
