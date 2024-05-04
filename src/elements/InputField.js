// InputField.js
import React from "react";

const InputField = ({ label, value, onChange, type = "text", required = false }) => {
  return (
    <div className="my-4 sm:col-span-12 lg:col-span-4">
      <label className="block text-sm font-medium text-gray-700">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="mt-1 focus:ring-indigo-500 focus:border-indigo-500 block w-full sm:text-sm rounded-md border border-gray-300 px-3 py-2"
        required={required}
      />
    </div>
  );
};

export default InputField;
