import React, { useState, useEffect } from "react";
import { saveAs } from "file-saver";

const TollHistoryModal = ({ history, onClose }) => {
    const [filterDate, setFilterDate] = useState("");
    const [currentPage, setCurrentPage] = useState(1);

    const itemsPerPage = 5;
    const vehicleInfo = history[0] || {};
    const isUnregistered = history.length === 0;

    const filteredHistory = filterDate
        ? history.filter((item) => item.paidTime.startsWith(filterDate))
        : history;

    const totalPages = Math.ceil(filteredHistory.length / itemsPerPage);
    const paginatedHistory = filteredHistory.slice(
        (currentPage - 1) * itemsPerPage,
        currentPage * itemsPerPage
    );

    useEffect(() => {
        if (currentPage > totalPages) {
            setCurrentPage(1);
        }
    }, [filterDate, totalPages]);

    const exportToCSV = () => {
        const csvRows = [
            ["Vehicle Number", "Vehicle Type", "Date", "Time", "Amount"],
            ...filteredHistory.map((item) => {
                const [date, time] = item.paidTime.split("T");
                return [
                    item.vehicleNumber,
                    item.vehicleType,
                    date,
                    time.split(".")[0],
                    `₹${item.amountPaid}`,
                ];
            }),
        ];
        const csvString = csvRows.map((row) => row.join(",")).join("\n");
        const blob = new Blob([csvString], { type: "text/csv;charset=utf-8;" });
        saveAs(blob, "toll_history.csv");
    };

    return (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
            <div className="relative bg-white p-6 rounded-lg w-full max-w-3xl">
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 text-red-500 font-bold text-xl"
                >
                    ✕
                </button>

                <h2 className="text-xl font-bold mb-2">Toll History</h2>

                {/* Show message if vehicle not registered */}
                {isUnregistered ? (
                    <p className="text-red-600 font-semibold text-center mt-4">
                        Vehicle number not registered. Please Register by click on submit.
                    </p>
                ) : (
                    <>
                        {/* Vehicle Info */}
                        {vehicleInfo.vehicleNumber && (
                            <div className="mb-4">
                                <p className="font-semibold">Vehicle Number: {vehicleInfo.vehicleNumber}</p>
                                <p className="font-semibold">Vehicle Type: {vehicleInfo.vehicleType}</p>
                            </div>
                        )}

                        {/* Filter + Export */}
                        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
                            <div className="flex items-center gap-2">
                                <label className="text-sm font-medium whitespace-nowrap">Filter by date:</label>
                                <input
                                    type="date"
                                    className="border border-gray-300 rounded px-2 py-1"
                                    value={filterDate}
                                    onChange={(e) => {
                                        setFilterDate(e.target.value);
                                        setCurrentPage(1);
                                    }}
                                />
                            </div>

                            <button
                                onClick={exportToCSV}
                                disabled={filteredHistory.length === 0}
                                className="text-sm bg-green-600 text-white px-3 py-1 rounded hover:bg-green-700 disabled:opacity-50"
                            >
                                Export CSV
                            </button>
                        </div>

                        {/* History Table */}
                        {paginatedHistory.length === 0 ? (
                            <p className="text-gray-600 italic">No history found for the selected date.</p>
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

                        {/* Pagination */}
                        <div className="flex justify-between items-center mt-4">
                            <button
                                disabled={currentPage <= 1 || totalPages === 0}
                                className="px-2 py-1 border rounded disabled:opacity-50"
                                onClick={() => setCurrentPage((prev) => prev - 1)}
                            >
                                Previous
                            </button>
                            <span>
                                Page {totalPages === 0 ? 0 : currentPage} of {totalPages}
                            </span>
                            <button
                                disabled={currentPage >= totalPages || totalPages === 0}
                                className="px-2 py-1 border rounded disabled:opacity-50"
                                onClick={() => setCurrentPage((prev) => prev + 1)}
                            >
                                Next
                            </button>
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default TollHistoryModal;
