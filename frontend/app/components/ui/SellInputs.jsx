import React from "react";

function SellInputs({ img, placeholder, name, type, step }) {
  return (
    <div className="grid space-y-2">
      <label className="text-sm font-medium " htmlFor="">
        {name}
      </label>
      <div className="relative flex-1 h-10">
        {img}
        <input
          className="w-full absolute h-10 px-3 py-2 shrink-0 focus-visible:ring-2 border border-gray-200 focus-visible:ring-orange-500 focus-visible:ring-offset-2 outline-none rounded-md file:border-0 pl-10"
          type={type}
          placeholder={placeholder}
          step={step}
        />
      </div>
    </div>
  );
}

export default SellInputs;
