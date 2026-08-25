import React from "react";

function Button({ text, bg, hover, hoverClr, color }) {
  return (
    <button className={`text-sm rounded-lg  flex justify-center items-center transition-colors font-medium ${bg} ${hover} ${color} ${hoverClr} h-9 px-3`}>{text}</button>
  );
}

export default Button;
