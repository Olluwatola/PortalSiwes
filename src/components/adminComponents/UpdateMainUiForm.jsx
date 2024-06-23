import { useState, useEffect } from "react";
import {
  loadUiDetails,
  updateUiDetails,
} from "./../../controllers/UIUpdateControllers";

const UpdateMainUiForm = ({ setConditionGood, setStatusBarMessage }) => {
  const [loadUiDetailsLoading, setLoadUiDetailsLoading] = useState(false);
  const [aboutUs, setAboutUs] = useState("");
  const [address, setAddress] = useState("");
  const [contactUsEmail, setContactUsEmail] = useState("");
  const [contactUsNumber, setContactUsNumber] = useState("");

  async function onUpdateContactUsInfo(e) {
    e.preventDefault();
    updateUiDetails(
      aboutUs,
      address,
      contactUsEmail,
      contactUsNumber,
      setConditionGood,
      setStatusBarMessage
    );
  }

  useEffect(() => {
    loadUiDetails(
      setLoadUiDetailsLoading,
      setAboutUs,
      setAddress,
      setContactUsEmail,
      setContactUsNumber,
      setConditionGood,
      setStatusBarMessage
    );

    //   return () => {
    //     second
    //   }
  }, []);

  return (
    <form className="flex flex-col gap-3" onSubmit={onUpdateContactUsInfo}>
      <div className="flex flex-col gap-1 text-sm">
        <label className="text-xs text-gray-500">Contact Us Number</label>
        <input
          className="border border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary outline-none"
          value={contactUsNumber}
          onChange={(e) => {
            setContactUsNumber(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500"> Contact Us Email</label>
        <input
          className="border border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary outline-none"
          value={contactUsEmail}
          onChange={(e) => {
            setContactUsEmail(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500"> Address</label>
        <input
          className="border border-gray-300 md:px-4 px-2 py-3 rounded-lg md:text-sm text-xs flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary outline-none"
          value={address}
          onChange={(e) => {
            setAddress(e.target.value);
          }}
        />
      </div>
      <div className="flex flex-col gap-1">
        <label className="text-xs text-gray-500">About Us</label>
        <textarea
          className="resize-none border md:text-sm text-xs border-gray-300 md:px-4 px-2 py-1 md:py-3 rounded-lg flex items-center gap-3 transition-all duration-300 ease-in-out active:outline-none focus:outline-none focus:ring-1 focus:ring-primary outline-none leading-6"
          rows={10}
          cols={50}
          value={aboutUs}
          onChange={(e) => {
            setAboutUs(e.target.value);
          }}
        />
      </div>
      <button
        className="bg-primary  text-white  hover:bg-white hover:text-primary hover:border-primary border border-primary w-full py-3 rounded-lg text-sm transition-all duration-300 ease-in-out mt-5"
        type="submit"
      >
        Update
      </button>
    </form>
  );
};

export default UpdateMainUiForm;
