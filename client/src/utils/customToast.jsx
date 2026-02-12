// src/utils/customToast.js
import toast from "react-hot-toast";

export const showToast = (message = "", type = "info", options = {}) => {
  const toastOptions = {
    duration: options.autoClose || 3000,
    position: options.position || "top-center",
    ...options,
  };

  switch (type) {
    case "success":
      toast.success(message, toastOptions);
      break;
    case "error":
      toast.error(message, toastOptions);
      break;
    case "info":
      toast(message, {
        icon: "ℹ️",
        ...toastOptions,
      });
      break;
    case "warn":
    case "warning":
      toast(message, {
        icon: "⚠️",
        ...toastOptions,
      });
      break;
    default:
      toast(message, toastOptions);
      break;
  }
};
