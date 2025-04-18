import React, { useState } from "react";
import axios from "axios";

/**
 * Registration form for unregistered vehicles.
 * Sends details to backend API and updates parent once successful.
 *
 * @param {Object} props
 * @param {string} props.vehicleNumber - Vehicle number to register
 * @param {Function} props.onRegistered - Callback after successful registration
 * @param {Function} props.onClose - Callback to close the form
 */
const RegistrationForm = ({ vehicleNumber, onRegistered, onClose }) => {
  const [ownerName, setOwnerName] = useState("");
  const [vehicleType, setVehicleType] = useState("");

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // POST registration details to API
      await axios.post("/api/vehicle/register", {
        vehicleNumber,
        ownerName,
        vehicleType,
      });

      alert("Registered successfully.");
      onRegistered(vehicleType); // Pass vehicleType to parent to trigger fare generation
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed");
    }
  };

  return (
    // Fullscreen dimmed background overlay
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative p-6 max-w-md w-full bg-white rounded shadow">
        {/* Close button to exit form */}
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg"
          aria-label="Close form"
        >
          ❌
        </button>

        <h2 className="text-xl font-semibold mb-4">📝 Fast Tag Registration</h2>

        <form onSubmit={handleSubmit}>
          {/* Vehicle number (readonly) */}
          <input
            type="text"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            disabled
            className="border p-2 w-full mb-3 rounded bg-gray-100"
          />

          {/* Owner name input */}
          <input
            type="text"
            placeholder="Owner Name"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
            required
          />

          {/* Vehicle type input */}
          <input
            type="text"
            placeholder="Vehicle Type"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
            required
          />

          {/* Submit button */}
          <button
            type="submit"
            className="text-red-600 font-semibold py-2 px-4 rounded transition duration-300 border-2 border-red-600"
            style={{
              backgroundColor: "white",
              color: "#d22128", // Zoho red text color
              borderColor: "#d22128", // Zoho red border
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#d22128"; // Solid red background
              e.target.style.color = "white"; // White text
              e.target.style.borderColor = "#d22128"; // Maintain the red border
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "white"; // White background on mouse out
              e.target.style.color = "#d22128"; // Red text on mouse out
              e.target.style.borderColor = "#d22128"; // Red border on mouse out
            }}
          >
            Register
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
