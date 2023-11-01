import { Link } from "react-router-dom";

const InvitationListItem = ({ invite, date, time }) => {
  return (
    <>
      <li>
        <Link to={`/admin/screening/${invite?.id}`}>
          <span>
            <b>{date}</b> <small>{time}</small>
          </span>
        </Link>
      </li>
      <hr />
    </>
  );
};

export default InvitationListItem;
