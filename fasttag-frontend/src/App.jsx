import React, { useState } from "react";
import axios from "axios";
import BillDisplay from "./components/BillDisplay";
import RegisterPopup from "./components/RegisterPopup";
import RegistrationForm from "./components/RegistrationForm";

function App() {
  // State management
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [bill, setBill] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);

  // Toll fare by vehicle type
  const vehicleRates = {
    "CAR": 85,
    "JEEP": 85,
    "VAN": 85,
    "LCV": 135,
    "BUS": 285,
    "TRUCK": 285,
    "UPTO 3 AXLE VEHICLE": 315,
    "4 TO 6 AXLE": 450,
    "HCM": 450,
    "EME": 450,
    "7 OR MORE AXLE": 550,
  };

  /**
   * Calculates fare based on vehicle type and last paid time
   */
  const calculateFare = (vehicleType, lastPaidTime) => {
    const baseFare = vehicleRates[vehicleType?.toUpperCase()] || 0;
    const now = new Date();
    const lastPaid = lastPaidTime ? new Date(lastPaidTime) : null;
    const diffMins = lastPaid ? Math.abs((now - lastPaid) / (1000 * 60)) : null;

    let fare = baseFare;
    let halfFareApplied = false;
    let registrationFeeApplied = false;

    if (lastPaid && diffMins <= 30) {
      fare = fare / 2;
      halfFareApplied = true;
    } else if (!lastPaid) {
      fare += 50; // First-time registration fee
      registrationFeeApplied = true;
    }

    return {
      vehicleType,
      totalFare: fare.toFixed(2),
      chargedTime: now.toLocaleString(),
      halfFareApplied,
      registrationFeeApplied
    };
  };

  /**
   * Handles submission of vehicle number
   */
  const handleSubmit = async () => {
    setBill(null); // Clear previous bill
    try {
      const res = await axios.get(`/api/vehicle/check?vehicleNumber=${vehicleNumber}`);
      if (res.data.registered) {
        const billData = calculateFare(res.data.vehicle_type, res.data.last_paid_time);
        setBill(billData);
        setVehicleNumber("");

        // Update paid time after fare calculation
        await axios.post("/api/vehicle/updatePaidTime", null, {
          params: { vehicleNumber }
        });
      } else {
        // If not registered, show popup
        setShowPopup(true);
      }
    } catch (err) {
      console.error("Error checking vehicle:", err);
    }
  };

  /**
   * Trigger registration form after popup
   */
  const handleRegisterClick = () => {
    setShowPopup(false);
    setShowRegisterForm(true);
  };

  /**
   * Callback after successful registration
   */
  const handleRegistered = (vehicleType) => {
    setShowRegisterForm(false);
    const billData = calculateFare(vehicleType, null); // No last paid time
    setBill(billData);
    setVehicleNumber("");
  };

  return (
    <div
      className="min-h-screen bg-cover bg-center flex items-center justify-center"
      style={{ backgroundImage: 'url(/toll-bg.jpeg)' }}
    >
      <div className="bg-white bg-opacity-80 p-6 rounded-lg shadow-md w-full max-w-xl">
        <div className="p-6 font-sans">
          <h1 className="text-2xl font-semibold mb-4">🚗 Fast Tag Portal</h1>

          {/* Vehicle number input */}
          <input
            type="text"
            placeholder="Enter vehicle number"
            className="border p-2 rounded w-full mb-4"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
          />

          {/* Submit button */}
          <button
            onClick={handleSubmit}
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
            Submit
          </button>

          {/* Display bill if available */}
          {bill && <BillDisplay bill={bill} onClose={() => setBill(null)} />}

          {/* Show registration popup */}
          {showPopup && (
            <RegisterPopup
              vehicleNumber={vehicleNumber}
              onClose={() => setShowPopup(false)}
              onRegisterClick={handleRegisterClick}
            />
          )}

          {/* Show registration form */}
          {showRegisterForm && (
            <div className="mt-4">
              <div className="bg-white border border-gray-300 shadow-md rounded-xl p-6 w-full max-w-md">
                <RegistrationForm
                  vehicleNumber={vehicleNumber}
                  onRegistered={handleRegistered}
                  onClose={() => setShowRegisterForm(false)}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default App;
