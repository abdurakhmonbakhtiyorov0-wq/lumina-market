import React from "react";
import { CheckCircle2, Truck, Clock, XCircle } from "lucide-react";

const STATUS_CONFIGS = {
  delivered: {
    label: "Delivered",
    icon: CheckCircle2,
    className: "bg-emerald-50 text-emerald-700 border-emerald-200",
  },
  processing: {
    label: "Processing",
    icon: Truck,
    className: "bg-amber-50 text-amber-700 border-amber-200",
  },
  shipped: {
    label: "Shipped",
    icon: Truck,
    className: "bg-blue-50 text-blue-700 border-blue-200",
  },
  cancelled: {
    label: "Cancelled",
    icon: XCircle,
    className: "bg-red-50 text-red-700 border-red-200",
  },
};

function OrderStatusBadge({ status }) {
  const key = status?.toLowerCase() || "processing";
  const config = STATUS_CONFIGS[key] || {
    label: status,
    icon: Clock,
    className: "bg-gray-50 text-gray-700 border-gray-200",
  };

  const IconComponent = config.icon;

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold border ${config.className}`}
    >
      <IconComponent size={14} />
      {config.label}
    </span>
  );
}

export default OrderStatusBadge;
