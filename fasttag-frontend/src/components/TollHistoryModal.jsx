import React, { useState } from "react";
import { saveAs } from "file-saver";

// Modal component to display and export toll payment history
const TollHistoryModal = ({ history, onClose }) => {
    // State for filter by date input
    const [filterDate, setFilterDate] = useState("");

    // State to manage current page for pagination
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 5;

    // Get basic vehicle info from the first record (if available)
    const vehicleInfo = history[0] || {};

    // Filter history records based on selected date
    const filteredHistory = filterDate
        ? history.filter((item) => item.paidTime.startsWith(filterDate))
        : history;

    // Calculate pagination details
    const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
    const paginatedHistory = filteredHistory.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    // Function to export filtered data to CSV format
    const exportToCSV = () => {
        const csvRows = [
            ["Vehicle Number", "Vehicle Type", "Date", "Time", "Amount"], // CSV headers
            ...filteredHistory.map((item) => {
                const [date, time] = item.paidTime.split("T");
                return [
                    item.vehicleNumber,
                    item.vehicleType,
                    date,
                    time.split(".")[0], // Remove milliseconds
                    `₹${item.amountPaid}`,
                ];
            }),
        ];

        // Convert rows to CSV string
        const csvString = csvRows.map((row) => row.join(",")).join("\n");

        // Create a Blob and trigger download using file-saver
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "toll_history.csv");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-lg w-full max-w-3xl">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-red-500 font-bold text-xl"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold mb-2">Toll History</h2>

                {/* Display vehicle information */}
                {vehicleInfo.vehicleNumber && (
                    <div className="mb-4">
                        <p className="font-semibold">Vehicle Number: {vehicleInfo.vehicleNumber}</p>
                        <p className="font-semibold">Vehicle Type: {vehicleInfo.vehicleType}</p>
                    </div>
                )}

                {/* Filter by date input and Export button */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 mb-4">
                    <input
                        type="date"
                        className="border border-gray-300 rounded px-2 py-1"
                        value={filterDate}
                        onChange={(e) => setFilterDate(e.target.value)}
                    />

                    <button
                        onClick={exportToCSV}
                        className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700"
                    >
                        Export CSV
                    </button>
                </div>

                {/* Table to show history or fallback if empty */}
                {paginatedHistory.length === 0 ? (
                    <p>No history found.</p>
                ) : (
                    <table className="w-full border-collapse">
                        <thead>
                            <tr className="bg-gray-200">
                                <th className="border p-2">Date</th>
                                <th className="border p-2">Time</th>
                                <th className="border p-2">Amount</th>
                            </tr>
                        </thead>
                        <tbody>
                            {paginatedHistory.map((item, idx) => {
                                const [date, time] = item.paidTime.split("T");
                                return (
                                    <tr key={idx}>
                                        <td className="border p-2 text-center">{date}</td>
                                        <td className="border p-2 text-center">{time?.split(".")[0]}</td>
                                        <td className="border p-2 text-center">₹{item.amountPaid}</td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                )}

                {/* Pagination controls */}
                <div className="flex justify-between items-center mt-4">
                    <button
                        disabled={currentPage === 1}
                        className="px-2 py-1 border rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => prev - 1)}
                    >
                        Previous
                    </button>
                    <span>
                        Page {currentPage} of {totalPages}
                    </span>
                    <button
                        disabled={currentPage === totalPages}
                        className="px-2 py-1 border rounded disabled:opacity-50"
                        onClick={() => setCurrentPage((prev) => prev + 1)}
                    >
                        Next
                    </button>
                </div>
            </div>
        </div>
    );
};

export default TollHistoryModal;