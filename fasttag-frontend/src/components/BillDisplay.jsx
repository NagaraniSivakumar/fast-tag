import React from "react";

/**
 * Displays the toll bill details.
 * @param {Object} props - Component props
 * @param {Object} props.bill - Bill details including fare and vehicle type
 * @param {Function} props.onClose - Function to close/hide the bill display
 */
const BillDisplay = ({ bill, onClose }) => {
  return (
    <div className="mt-6 p-4 border rounded shadow-sm relative bg-white">
      {/* Close (❌) button */}
      <button
        onClick={onClose}
        className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg"
        aria-label="Close bill"
      >
        ❌
      </button>

      <h2 className="text-lg font-semibold mb-2">🧾 Toll Bill</h2>

      {/* Vehicle type */}
      <p>
        Vehicle Type: <strong>{bill.vehicleType}</strong>
      </p>
      {/* Vehicle Number */}
      <p>
        Vehicle Number: <strong>{bill.vehicleNumber}</strong>
      </p>

      {/* Total fare and registration fee note */}
      <p>
        Total Fare: <strong>₹{bill.totalFare}</strong>
        {bill.registrationFeeApplied && (
          <span className="text-sm text-gray-600">
            {" "}
            (includes ₹50 registration fee)
          </span>
        )}
      </p>

      {/* Charged time */}
      <p>
        Charged Time: <strong>{bill.chargedTime}</strong>
      </p>

      {/* Half fare notification */}
      {bill.halfFareApplied && (
        <p className="text-green-600">
          Half fare applied (return within 30 mins)
        </p>
      )}
    </div>
  );
};

export default BillDisplay;
