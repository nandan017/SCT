// src/utils/toastConfig.js
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export const notifySuccess = (msg) =>
  toast.success(msg, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
  });

export const notifyError = (msg) =>
  toast.error(msg, {
    position: "top-right",
    autoClose: 3000,
    pauseOnHover: true,
  });