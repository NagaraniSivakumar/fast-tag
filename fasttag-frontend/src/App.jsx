import React, { useState } from "react";
import axios from "axios";
import BillDisplay from "./components/BillDisplay";
import RegisterPopup from "./components/RegisterPopup";
import RegistrationForm from "./components/RegistrationForm";
import TollHistoryModal from "./components/TollHistoryModal";


function App() {
  // State management
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [bill, setBill] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [showRegisterForm, setShowRegisterForm] = useState(false);
  const [error, setError] = useState("");
  const [tollHistory, setTollHistory] = useState([]);
  const [showHistoryModal, setShowHistoryModal] = useState(false);


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
      registrationFeeApplied,
      vehicleNumber,
      lastPaidTime
    };
  };

  const saveTollHistory = async (billData) => {
    try {
      await axios.post("/api/history/save", {
        vehicleNumber: billData.vehicleNumber,
        amountPaid: billData.totalFare,
        vehicleType: billData.vehicleType
      });
    } catch (err) {
      console.error("Failed to save toll history:", err);
    }
  };


  /**
   * Handles submission of vehicle number
   */

  const validateVehicleNumber = (number) => {
    // Basic Indian vehicle number format: TN01AB1234 or TN-01-AB-1234
    const regex = /^[A-Z]{2}\d{2}[A-Z]{1,2}\d{4}$/i;
    return regex.test(number.replace(/[-\s]/g, "").toUpperCase());
  };

  const handleSubmit = async () => {
    setBill(null); // Clear previous bill
    setError("");  // Clear previous error

    // Empty check
    if (!vehicleNumber.trim()) {
      setError("Enter vehicle number here.");
      return;
    }

    // Format check
    if (!validateVehicleNumber(vehicleNumber)) {
      setError("Incorrect! vehicle number format should be : TN01AB1234");
      return;
    }

    try {
      const res = await axios.get(`/api/vehicle/check?vehicleNumber=${vehicleNumber}`);
      if (res.data.registered) {
        const billData = calculateFare(res.data.vehicle_type, res.data.last_paid_time);
        setBill(billData);
        setVehicleNumber("");
        await saveTollHistory(billData);


        await axios.post("/api/vehicle/updatePaidTime", null, {
          params: { vehicleNumber }
        });
      } else {
        setShowPopup(true);
      }
    } catch (err) {
      console.error("Error checking vehicle:", err);
      setError("Something went wrong. Please try again.");
    }
  };

  const handleViewHistory = async () => {
    setError("");
    if (!vehicleNumber.trim()) {
      setError("Enter vehicle number to view history.");
      return;
    }

    if (!validateVehicleNumber(vehicleNumber)) {
      setError("Incorrect vehicle number format. Format: TN01AB1234");
      return;
    }

    try {
      const response = await axios.get(`/api/history/byVehicle?vehicleNumber=${vehicleNumber}`);
      setTollHistory(response.data);
      setShowHistoryModal(true);
    } catch (err) {
      console.error("Error fetching history:", err);
      setError("Unable to fetch history. Try again.");
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
  const handleRegistered = async (vehicleType) => {
    setShowRegisterForm(false);
    const billData = calculateFare(vehicleType, null); // No last paid time
    setBill(billData);
    setVehicleNumber("");
    await saveTollHistory(billData);
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
          {error && <p className="text-red-600 text-sm mb-2">{error}</p>}
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

          {/* View History button */}
          <button
            onClick={handleViewHistory}
            className="mt-2 text-blue-600 font-semibold py-2 px-4 rounded transition duration-300 border-2 border-blue-600 ml-2"
            style={{
              backgroundColor: "white",
              color: "#1e40af", // blue text
              borderColor: "#1e40af",
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = "#1e40af"; // Solid blue
              e.target.style.color = "white";
              e.target.style.borderColor = "#1e40af";
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = "white";
              e.target.style.color = "#1e40af";
              e.target.style.borderColor = "#1e40af";
            }}
          >
            View History
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
          {showHistoryModal && (
            <TollHistoryModal
              history={tollHistory}
              onClose={() => setShowHistoryModal(false)}
            />
          )}

        </div>
      </div>
    </div>
  );
}

export default App;
