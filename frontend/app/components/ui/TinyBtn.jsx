import React from "react";

function TinyBtn({ hover, text, color, rounded }) {
  return (
    <button
      className={`text-sm ${rounded ? rounded : 'rounded-md' } flex justify-center items-center transition-colors font-medium cursor-pointer ${hover} ${color} h-10 w-10`}
    >{text}</button>
  );
}

export default TinyBtn;
