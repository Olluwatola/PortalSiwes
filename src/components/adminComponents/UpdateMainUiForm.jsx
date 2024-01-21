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
    <form onSubmit={onUpdateContactUsInfo}>
      Contact Us Number:
      <input
        value={contactUsNumber}
        onChange={(e) => {
          setContactUsNumber(e.target.value);
        }}
      />
      <br />
      Contact Us Email:
      <input
        value={contactUsEmail}
        onChange={(e) => {
          setContactUsEmail(e.target.value);
        }}
      />
      <br />
      Address:
      <input
        value={address}
        onChange={(e) => {
          setAddress(e.target.value);
        }}
      />
      <br />
      About Us:
      <br />
      <textarea
        rows={10}
        cols={50}
        value={aboutUs}
        onChange={(e) => {
          setAboutUs(e.target.value);
        }}
      />
      <button type="submit">Update</button>
    </form>
  );
};

export default UpdateMainUiForm;
