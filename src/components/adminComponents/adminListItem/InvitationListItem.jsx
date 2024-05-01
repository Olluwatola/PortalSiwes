import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

const InvitationListItem = ({ index, invite, lastIndex, date, time, color = "bg-primary" }) => {
  const [formattedDate, setDate] = useState("");
  const [formattedDateAlt, setDateAlt] = useState("");

  const formatDate = (date) => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
    });
    return formattedDate;
  };

  const formatDateAlt = (date) => {
    const dateObject = new Date(date);
    const formattedDate = dateObject.toLocaleDateString("en-GB", {
      day: "numeric",
      month: "short",
      year: "numeric",
    });
    return formattedDate;
  };

  useEffect(() => {
    const formattedDate = formatDate(invite?.date);
    setDate(formattedDate);
  }, [invite?.date]);

  useEffect(() => {
    const formattedDate = formatDateAlt(invite?.date);
    setDateAlt(formattedDate);
  }, [invite?.date]);
  return (
    <Link
      className={`
    ${index === lastIndex ? "pb-2" : "border-b border-neutral-200"}
    ${index === 0 ? "pt-2" : "py-5"}
    text-neutral-800 text-sm w-full items-center flex justify-between py-5
    `}
      to={`/admin/screening/${invite?.id}`}
    >
      <div className="flex gap-3 items-center">
        <div className={`w-2.5 h-2.5 rounded-full ${color}`}></div>
        <span className="font-semibold text-xl">{formattedDate}</span>
      </div>
      <span className="flex gap-1.5 text-neutral-500">
        <span> {formattedDateAlt};</span> {time}
      </span>
    </Link>
  );
};

export default InvitationListItem;
