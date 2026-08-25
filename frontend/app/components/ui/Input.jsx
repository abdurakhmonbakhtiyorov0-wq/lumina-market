import React from "react";

function Input({ text, placeholder, name, val, onchange, length }) {
  const handleChange = (event) => {
    onchange(event.target.value);
  };

  return (
    <div className="space-y-2 grid">
      <label htmlFor="" className="text-sm font-medium">
        {text}
      </label>
      <input
        name=""
        minLength={length}
        value={val}
        onChange={handleChange}
        type="text"
        required
        placeholder={placeholder}
        className="border border-gray-200 outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 py-2 px-3 h-10 w-full rounded-lg"
        autoComplete="off"
      />
    </div>
  );
}

export default Input;
