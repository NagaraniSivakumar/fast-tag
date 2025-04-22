import React, { useState } from "react";
import axios from "axios";

const validTypes = [
  "CAR",
  "JEEP",
  "VAN",
  "LCV",
  "BUS",
  "TRUCK",
  "UPTO 3 AXLE VEHICLE",
  "4 TO 6 AXLE",
  "HCM",
  "EME",
  "7 OR MORE AXLE"
];

const RegistrationForm = ({ vehicleNumber, onRegistered, onClose }) => {
  const [ownerName, setOwnerName] = useState("");
  const [vehicleType, setVehicleType] = useState("");
  const [error, setError] = useState("");
  const [ownerNameError, setOwnerNameError] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setOwnerNameError("");

    const nameRegex = /^[A-Za-z ]+$/;
    const formattedType = vehicleType.trim().toUpperCase();

    if (ownerName.length > 30) {
      setOwnerNameError("Owner name should not exceed 30 characters.");
      return;
    }

    if (!nameRegex.test(ownerName)) {
      setOwnerNameError("Owner name can contain only letters and spaces.");
      return;
    }

    if (!validTypes.includes(formattedType)) {
      setError("Enter vehicle type from the below list.");
      return;
    }

    try {
      await axios.post("/api/vehicle/register", {
        vehicleNumber,
        ownerName,
        vehicleType: formattedType,
      });

      alert("Registered successfully.");
      onRegistered(formattedType);
    } catch (error) {
      console.error("Registration failed:", error);
      alert("Registration failed");
    }
  };


  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="relative p-6 max-w-md w-full bg-white rounded shadow">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-red-600 text-lg"
          aria-label="Close form"
        >
          ❌
        </button>

        <h2 className="text-xl font-semibold mb-4">📝 Fast Tag Registration</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Vehicle Number"
            value={vehicleNumber}
            disabled
            className="border p-2 w-full mb-3 rounded bg-gray-100"
          />

          <input
            type="text"
            placeholder="Owner Name"
            value={ownerName}
            onChange={(e) => setOwnerName(e.target.value)}
            className="border p-2 w-full mb-3 rounded"
            required
          />
          {ownerNameError && (
            <p className="text-red-600 text-sm mb-2">{ownerNameError}</p>
          )}
          <input
            type="text"
            placeholder="Vehicle Type (e.g., CAR, TRUCK)"
            value={vehicleType}
            onChange={(e) => setVehicleType(e.target.value)}
            className="border p-2 w-full mb-1 rounded"
            required
          />

          {/* Error message for invalid vehicle type */}
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}

          {/* Helper text: allowed types */}
          <p className="text-xs text-gray-600 mb-3">
            Vehicles: {validTypes.join(", ")}
          </p>

          <button
            type="submit"
            className="text-red-600 font-semibold py-2 px-4 rounded transition duration-300 border-2 border-red-600"
            style={{
              backgroundColor: "white",
              color: "#d22128",
              borderColor: "#d22128",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#d22128";
              e.target.style.color = "white";
              e.target.style.borderColor = "#d22128";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "white";
              e.target.style.color = "#d22128";
              e.target.style.borderColor = "#d22128";
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
