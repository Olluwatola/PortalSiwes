import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";

const Footer = () => {
  const [year, setYear] = useState();
  const [home, setHome] = useState(null);
  const location = useLocation();

  const handleHome = () => {
    if (location.pathname === "/") {
      setHome(true);
    } else {
      setHome(false);
    }
  };

  const getYear = () => {
    setYear(new Date().getFullYear());
  };

  useEffect(() => {
    getYear();
  }, []);

  useEffect(() => {
    handleHome();
  }, [location.pathname]);

  return (
    <>
      {home ? null : (
        <div className="md:px-16 px-6 text-sm py-10">
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
