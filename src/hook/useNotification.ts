import { toast } from "react-toastify";
import type { TypeOptions, ToastOptions } from "react-toastify";

/**
 *
 * @param msg 
 * @param type 
 * @param options 
 */
const useNotification = (
  msg: string, 
  type: TypeOptions = "info",
  options?: ToastOptions<unknown>
) => {
  const defaultOptions: ToastOptions<unknown> = {
    position: "top-right" as const,
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    className: "font-roobert text-sm",
    ...options
  };

  switch (type) {
    case "success":
      return toast.success(msg, defaultOptions);
    case "error":
      return toast.error(msg, defaultOptions);
    case "warning":
      return toast.warn(msg, defaultOptions);
    case "info":
      return toast.info(msg, defaultOptions);
    default:
      return toast(msg, defaultOptions);
  }
};

export default useNotification;