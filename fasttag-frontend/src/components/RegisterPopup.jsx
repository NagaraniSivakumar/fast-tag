import React from "react";

/**
 * Modal popup shown when the entered vehicle is not registered.
 * Offers options to register or exit.
 *
 * @param {Object} props
 * @param {string} props.vehicleNumber - The vehicle number entered by the user
 * @param {Function} props.onClose - Callback to close the popup
 * @param {Function} props.onRegisterClick - Callback to open the registration form
 */
const RegisterPopup = ({ vehicleNumber, onClose, onRegisterClick }) => {
  return (
    // Fullscreen semi-transparent overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-10">
      {/* Centered white box with message and actions */}
      <div className="bg-white p-6 rounded-lg w-96 shadow-lg text-center">
        <p className="mb-4 text-lg font-medium">
          Vehicle Number You Entered Does Not Have Fast Tag
        </p>
        <p className="mb-4">Choose 1 to Register Or Choose 2 to Exit</p>

        {/* Action buttons */}
        <div className="flex justify-around">
          <button
            onClick={onRegisterClick}
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            1
          </button>
          <button
            onClick={onClose}
            className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
          >
            2
          </button>
        </div>
      </div>
    </div>
  );
};

export default RegisterPopup;
