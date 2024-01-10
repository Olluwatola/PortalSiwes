import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const PublicNavbar = ({ applyModal, setapplyModal }) => {
  const [home, setHome] = useState(null);
  const location = useLocation();

  const handleHome = () => {
    if (location.pathname === "/") {
      setHome(true);
    } else {
      setHome(false);
    }
  };

  useEffect(() => {
    handleHome();
  }, [location.pathname]);

  return (
    <nav className="fixed h-fit inset-0 md:px-16 px-6 pt-5 md:pt-8">
      <ul
        className={`
      ${home ? "text-white" : "text-slate-500"}
      text-sm md:text-base flex items-center justify-between md:justify-start md:w-fit gap-3
      `}
      >
        <li
        className={`
        ${home ? "text-white" : "text-primary"}`}
        >
          {applyModal == true ? (
            <button onClick={() => setapplyModal(false)}>
              <span className="font-secondary flex items-center justify-center text-xl">
                IT
                <div className="font-primary -rotate-45 font-semibold">e</div>
                Ms
              </span>
            </button>
          ) : (
            <Link
              to="/"
              className="text-xl"
              onClick={() => setapplyModal(false)}
            >
              <span className="font-secondary flex items-center justify-center">
                IT<div className="font-primary -rotate-45 font-semibold">e</div>
                Ms
              </span>
            </Link>
          )}
        </li>
        <span className="text-2xl font-light md:flex hidden">|</span>
        <li className="hidden md:flex">
          <Link to="/about">About</Link>
        </li>
        <li className="hidden md:flex">
          <Link to="/faqs">FAQs</Link>
        </li>
        <li className="hidden md:flex">
          <Link to="/contactus">Contact Us</Link>
        </li>

        {/* For mobile */}
        <div className="flex gap-4 md:hidden">
          <li>
            <Link to="/about">About</Link>
          </li>
          <li>
            <Link to="/faqs">FAQs</Link>
          </li>
          <li>
            <Link to="/contactus">Contact Us</Link>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default PublicNavbar;
