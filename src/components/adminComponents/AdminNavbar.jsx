import { Link } from "react-router-dom";
import { signUserOut } from "./../../controllers/authControllers";
import { RxDashboard, RxExit } from "react-icons/rx";
import { FaWpforms } from "react-icons/fa";
import { PiTentLight } from "react-icons/pi";
import { VscOpenPreview } from "react-icons/vsc";
import { IoSettingsOutline } from "react-icons/io5";
import { useLocation } from "react-router-dom";
import { useEffect, useState } from "react";

const AdminNavbar = () => {
  const location = useLocation();
  const [active, setActive] = useState("");

  const handleActive = () => {
    const path = location.pathname;

    if (path.includes("/admin/applications")) {
      setActive("applications");
    } else if (path.includes("/admin/placement")) {
      setActive("placement");
    } else if (path.includes("/admin/screening")) {
      setActive("screening");
    } else if (path.includes("/admin/portal")) {
      setActive("portal");
    } else {
      setActive("");
    }
  };

  useEffect(() => {
    handleActive();
  }, [location.pathname]);

  return (
    <nav className="2xl:container 2xl:mx-auto w-72 bg-white border-r-2 border-neutral-200 flex flex-col justify-between h-screen pb-10">
      <div className="flex flex-col gap-2">
        <span className="font-secondary flex items-center text-primary pt-10 text-3xl tracking-tight">
          IT<div className="font-primary -rotate-45 font-semibold">e</div>
          Ms
        </span>
        <div className="bg-neutral-400 h-[0.05rem] rounded-full w-12 mt-2"></div>
        <span className="text-neutral-500 font-light leading-snug">
          SIWES Portal <br /> Management System
        </span>
      </div>
      <div className="flex flex-col gap-3 text-dashBlue">
        <Link to="/admin">
          <div
            className={`${
              active === ""
                ? "text-primary before:translate-x-[2.2rem] bg-neutral-100 rounded-s-none"
                : "before:translate-x-14"
            }
            flex gap-2 items-center h-12 hover:bg-neutral-100  before:bg-primary transition-all duration-200 ease-in-out rounded-s-xl px-3 before:h-12 before:rounded-s-xl before:w-24 before:absolute before:-z-10 before:left-0  before:transition-all before:duration-300 before:ease-in-out`}
          >
            <RxDashboard className="text-xl" />
            Dashboard
          </div>
        </Link>
        <Link to="/admin/applications">
          <div
            className={`${
              active === "applications"
                ? "text-primary before:translate-x-[2.2rem] bg-neutral-100"
                : "before:translate-x-14"
            }
            flex gap-2 items-center h-12 hover:bg-neutral-100 before:bg-primary transition-all duration-200 ease-in-out rounded-s-xl px-3 before:h-12 before:rounded-s-xl before:w-8 before:absolute before:-z-10 before:left-0 before:transition-all before:duration-300 before:ease-in-out`}
          >
            <FaWpforms className="text-xl" />
            Applications
          </div>
        </Link>
        <Link to="/admin/placement">
          <div
            className={`${
              active === "placement"
                ? "text-primary before:translate-x-[2.2rem] bg-neutral-100"
                : "before:translate-x-14"
            }
            flex gap-2 items-center h-12 hover:bg-neutral-100 before:bg-primary transition-all duration-200 ease-in-out rounded-s-xl px-3 before:h-12 before:rounded-s-xl before:w-8 before:absolute before:-z-10 before:left-0 before:transition-all before:duration-300 before:ease-in-out`}
          >
            <PiTentLight className="text-2xl" />
            Placement Posting
          </div>
        </Link>
        <Link to="/admin/screening">
          <div
            className={`${
              active === "screening"
                ? "text-primary before:translate-x-[2.2rem] bg-neutral-100"
                : "before:translate-x-14"
            }
            flex gap-2 items-center h-12 hover:bg-neutral-100 before:bg-primary transition-all duration-200 ease-in-out rounded-s-xl px-3 before:h-12 before:rounded-s-xl before:w-8 before:absolute before:-z-10 before:left-0 before:transition-all before:duration-300 before:ease-in-out`}
          >
            <VscOpenPreview className="text-xl" />
            Screening
          </div>
        </Link>
        <Link to="/admin/portal">
          <div
            className={`${
              active === "portal"
                ? "text-primary before:translate-x-[2.2rem] bg-neutral-100"
                : "before:translate-x-14"
            }
            flex gap-2 items-center h-12 hover:bg-neutral-100 before:bg-primary transition-all duration-200 ease-in-out rounded-s-xl px-3 before:h-12 before:rounded-s-xl before:w-8 before:absolute before:-z-10 before:left-0 before:transition-all before:duration-300 before:ease-in-out`}
          >
            <IoSettingsOutline className="text-xl" />
            Portal Settings
          </div>
        </Link>
      </div>
      <button
        className="w-full text-left text-dashBlue flex gap-2 items-center h-12 hover:bg-neutral-100 transition-all duration-200 ease-in-out rounded-s-xl px-3"
        onClick={signUserOut}
      >
        <RxExit className="text-xl" />
        Logout
      </button>
    </nav>
  );
};

export default AdminNavbar;
