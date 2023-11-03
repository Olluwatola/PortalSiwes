import { Link } from "react-router-dom";
import { signUserOut } from "./../../controllers/authControllers";

const divStyle = {
  display: "inline-block",
  marginRight: "10px", // Optional: Add some spacing between the divs
};

const AdminNavbar = () => {
  return (
    <nav>
      <ul>
        <li style={divStyle}>
          <Link to="/admin">Dashboard</Link>
        </li>
        <li style={divStyle}>
          <Link to="/admin/applications">Applications</Link>
        </li>
        <li style={divStyle}>
          <Link to="/admin/placement">Placement Posting</Link>
        </li>
        <li style={divStyle}>
          <Link to="/admin/screening">Screening</Link>
        </li>
        <li style={divStyle}>
          <Link to="/admin/portal">Portal Settings</Link>
        </li>
        <li>
          <button onClick={signUserOut}>logout</button>
        </li>
      </ul>
    </nav>
  );
};

export default AdminNavbar;
