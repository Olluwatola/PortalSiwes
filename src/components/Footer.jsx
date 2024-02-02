import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const [year, setYear] = useState();
  const [show, setShow] = useState(null);
  const location = useLocation();

  const handleshow = () => {
    if (location.pathname === "/") {
      setShow(true);
    } else if (location.pathname.startsWith("/admin")) {
      setShow(true);
    } else {
      setShow(false);
    }
  };

  const getYear = () => {
    setYear(new Date().getFullYear());
  };

  useEffect(() => {
    getYear();
  }, []);

  useEffect(() => {
    handleshow();
  }, [location.pathname]);

  return (
    <>
      {show ? null : (
        <div className="md:px-16 px-6 text-sm py-10 2xl:mx-auto 2xl:container">
          <span className="flex items-center gap-2">
            <span>©️ {year}</span>
            <span>
              <span className="font-semibold">ITeMS</span>, University of
              Ibadan.
            </span>
          </span>
        </div>
      )}
    </>
  );
};

export default Footer;
