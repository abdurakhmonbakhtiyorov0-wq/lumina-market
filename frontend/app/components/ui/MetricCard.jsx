import React from "react";

function MetricCard({ label, value, colorClass = "text-gray-900", className = "" }) {
  return (
    <div className={`bg-white border border-gray-200/80 rounded-2xl px-5 py-3 shadow-sm ${className}`}>
      <span className="text-xs font-medium text-gray-400 block">{label}</span>
      <span className={`text-xl font-black ${colorClass}`}>{value}</span>
    </div>
  );
}

export default MetricCard;
