import { Link, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const PublicNavbar = ({ applyModal, setapplyModal }) => {
  const [home, setHome] = useState(null);
  const [active, setActive] = useState();
  const location = useLocation();

  const handleHome = () => {
    if (location.pathname === "/") {
      setHome(true);
    } else {
      setHome(false);
    }
  };

  const handleActive = () => {
    if (location.pathname === "/about") {
      setActive("about");
    } else if (location.pathname === "/faqs") {
      setActive("faqs");
    } else if (location.pathname === "/contactus") {
      setActive("contactus");
    } else {
      setActive("");
    }
  };

  useEffect(() => {
    handleHome();
    handleActive();
  }, [location.pathname]);

  return (
    <nav
      className={`${
        home ? "bg-transparent" : "bg-white backdrop-blur-md bg-opacity-30"
      }
      fixed h-fit inset-0 md:px-16 px-6 pt-5 md:pt-8`}
    >
      <ul
        className={`
      ${home ? "text-white" : "text-slate-500"}
      text-sm md:text-base flex items-center justify-between md:justify-start md:w-fit gap-3
      transition-all ease-in-out duration-300 font-medium
      `}
      >
        <li
          className={`
        ${home ? "text-white" : "text-primary"}
        transition-all ease-in-out duration-300`}
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
        <li
          className={`
        ${active === "about" ? "text-black" : ""}
        hidden md:flex transition-all ease-in-out duration-200 items-center flex-col`}
        >
          <Link to="/about">About</Link>
          <div
            className={`${
              active === "about"
                ? "bg-darkBlue translate-y-0"
                : "bg-transparent translate-y-1"
            } 
            w-[5px] h-[5px] rounded-full absolute bottom-0 transition-all ease-in-out duration-200`}
          ></div>
        </li>
        <li
          className={`${active === "faqs" ? "text-black" : ""}
          hidden md:flex transition-all ease-in-out duration-200 items-center flex-col`}
        >
          <Link to="/faqs">FAQs</Link>
          <div
            className={`${
              active === "faqs"
                ? "bg-darkBlue translate-y-0"
                : "bg-transparent translate-y-1"
            } 
            w-[5px] h-[5px] rounded-full absolute bottom-0 transition-all ease-in-out duration-200`}
          ></div>
        </li>
        <li
          className={`${active === "contactus" ? "text-black" : ""}
          hidden md:flex transition-all ease-in-out duration-200 items-center flex-col`}
        >
          <Link to="/contactus">Contact Us</Link>
          <div
            className={`${
              active === "contactus"
                ? "bg-darkBlue translate-y-0"
                : "bg-transparent translate-y-1"
            } 
            w-[5px] h-[5px] rounded-full absolute bottom-0 transition-all ease-in-out duration-200`}
          ></div>
        </li>

        {/* For mobile */}
        <div className="flex gap-4 md:hidden">
          <li
            className={`
          ${active === "about" ? "text-black" : ""}
          transition-all ease-in-out duration-200 items-center flex flex-col`}
          >
            <Link to="/about">About</Link>
            <div
              className={`${
                active === "about"
                  ? "bg-darkBlue translate-y-0"
                  : "bg-transparent translate-y-1"
              }
            w-[5px] h-[5px] rounded-full absolute bottom-0 transition-all ease-in-out duration-200`}
            ></div>
          </li>
          <li
            className={`${active === "faqs" ? "text-black" : ""}
          transition-all ease-in-out duration-200 items-center flex flex-col`}
          >
            <Link to="/faqs">FAQs</Link>
            <div
              className={`${
                active === "faqs"
                  ? "bg-darkBlue translate-y-0"
                  : "bg-transparent translate-y-1"
              }
            w-[5px] h-[5px] rounded-full absolute bottom-0 transition-all ease-in-out duration-200`}
            ></div>
          </li>
          <li
            className={`${active === "contactus" ? "text-black" : ""}
          transition-all ease-in-out duration-200 items-center flex flex-col`}
          >
            <Link to="/contactus">Contact Us</Link>
            <div
              className={`${
                active === "contactus"
                  ? "bg-darkBlue translate-y-0"
                  : "bg-transparent translate-y-1"
              }
            w-[5px] h-[5px] rounded-full absolute bottom-0 transition-all ease-in-out duration-200`}
            ></div>
          </li>
        </div>
      </ul>
    </nav>
  );
};

export default PublicNavbar;
