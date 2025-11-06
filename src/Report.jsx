import React, { useState } from "react";
import * as XLSX from "xlsx";
import { saveAs } from "file-saver";

const ReportGenerator = () => {
  const [records, setRecords] = useState([]);

  // Example function to add new data
  const addRecord = () => {
    const newRecord = {
      id: records.length + 1,
      value: Math.floor(Math.random() * 100),
      timestamp: new Date().toLocaleString(),
    };

    let updated = [...records, newRecord];

    // Keep only the last 500 records
    if (updated.length > 500) {
      updated = updated.slice(updated.length - 500);
    }

    setRecords(updated);
  };

  // Export last 500 records to Excel
  const generateReport = () => {
    const dataToExport = records.slice(-500); // last 500

    const worksheet = XLSX.utils.json_to_sheet(dataToExport);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Report");

    const excelBuffer = XLSX.write(workbook, { bookType: "xlsx", type: "array" });
    const blob = new Blob([excelBuffer], { type: "application/octet-stream" });
    saveAs(blob, "Report.xlsx");
  };

  return (
    <div className="p-4 space-y-4">
      <button
        onClick={addRecord}
        className="px-4 py-2 bg-green-600 text-white rounded"
      >
        Add Record
      </button>

      <button
        onClick={generateReport}
        className="px-4 py-2 bg-blue-600 text-white rounded"
      >
        Report
      </button>

      <p>Total Records: {records.length}</p>
    </div>
  );
};

export default ReportGenerator;
