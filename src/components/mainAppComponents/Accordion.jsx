import { useState } from "react";

export default function Accordion({ question, answer }) {
  const [isOpen, setIsOpen] = useState(false);

  function handleAccordionToggle() {
    setIsOpen(!isOpen);
  }
  return (
    <>
      <div className="bg-yellow-300">
        <div>
          {question}
          <button onClick={handleAccordionToggle}>🔽</button>
        </div>
        <div>{isOpen ? answer : ""}</div>
      </div>
    </>
  );
}
