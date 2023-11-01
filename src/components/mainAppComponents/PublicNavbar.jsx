import { Link } from "react-router-dom";

const divStyle = {
  display: "inline-block",
  marginRight: "10px", // Optional: Add some spacing between the divs
};

const PublicNavbar = () => {
  return (
    <nav>
      <ul
      //   className="navbar"
      >
        <li
          style={divStyle}
          // className="nav-item"
        >
          <Link
            to="/"
            //   className="nav-link"
          >
            Home
          </Link>
        </li>
        <li
          style={divStyle}
          // className="nav-item"
        >
          <Link
            to="/faqs"
            //   className="nav-link"
          >
            FAQ
          </Link>
        </li>
        <li
          style={divStyle}
          //  className="nav-item"
        >
          <Link
            to="/contactus"
            //   className="nav-link"
          >
            Contact Us
          </Link>
        </li>
        <li
          style={divStyle}
          //  className="nav-item"
        >
          <Link
            to="/about"
            //   className="nav-link"
          >
            About
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default PublicNavbar;
