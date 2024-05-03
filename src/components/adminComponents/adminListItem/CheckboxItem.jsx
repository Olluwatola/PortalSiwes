import React from "react";

const CheckboxItem = ({ label, checked, onChange, size = 5 }) => {
  return (
    <div
      className={`flex items-center gap-3 border-b border-neutral-200 pb-3 cursor-pointer ${
        checked ? "text-black" : "text-neutral-500"
      }`}
      onClick={onChange}
    >
      <div
        className={`w-${size} h-${size} flex items-center justify-center border rounded-full p-[0.21rem] cursor-pointer
        ${checked ? "border-primary/40" : "border-neutral-300"}
        `}
      >
        {checked && (
          <div className="w-full h-full bg-primary rounded-full"></div>
        )}
      </div>
      <span>{label}</span>
    </div>
  );
};

export default CheckboxItem;
