import React from "react";

function BigButton({ bg, color, hover, shadow, text, img, border }) {
  return (
    <button
      className={`px-8 h-12 rounded-xl cursor-pointer ${bg} ${color} ${hover} ${shadow} flex items-center gap-3 font-medium text-lg shadow-lg transition-colors ${border && "border border-white/20"}`}
    >
      {text} {img}
    </button>
  );
}

export default BigButton;
