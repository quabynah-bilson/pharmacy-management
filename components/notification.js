/*
 * File: notification.js                                                       *
 * Project: pharmacy-management                                                *
 * Created Date: Saturday, July 3rd 2021, 7:56:01 am                           *
 * -----                                                                       *
 * Last Modified: Saturday, July 3rd 2021 7:56:01 am                           *
 */

// icons
import { IoMdCloseCircle } from "react-icons/io";

// {title: "",subtitle: "",show: false,}

// notification banner
function Notification({ message, onClose }) {
  return (
    <div className="absolute top-8 right-8 bg-gray-100">
      <div className="px-4 py-3 flex flex-col space-y-1 w-full mx-auto max-w-md pr-8 relative">
        {/* close */}
        <div
          className="absolute top-2 right-2 text-xl cursor-pointer"
          onClick={onClose}
        >
          <IoMdCloseCircle />
        </div>

        {/* title */}
        <h6
          className={
            (message.isError ? "text-red-400" : "text-green-400") +
            `font-semibold`
          }
        >
          {message.title}
        </h6>

        {/* subtitle */}
        <p className="text-xs text-dark text-opacity-75">{message.subtitle}</p>
      </div>
    </div>
  );
}

export default Notification;
