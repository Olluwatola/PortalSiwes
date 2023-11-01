import { useState } from "react";


export default function Accordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleAccordionToggle() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <div style={{ border: "red solid 1px" }}>
        <div>
          {question}
          <button onClick={handleAccordionToggle}>🔽</button>
        </div>
        <div>{isOpen ? answer : ""}</div>
      </div>
    </>
  );
}
