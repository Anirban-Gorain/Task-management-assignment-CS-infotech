import React, { useState } from "react";
import * as XLSX from "xlsx";
import api from "../../api";

const UploadTasks = () => {
  const [file, setFile] = useState(null);
  const [excelData, setExcelData] = useState([]);
  const [error, setError] = useState("");

  const requiredColumns = ["first_name", "phone", "notes"];

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setError("");
    setExcelData([]);
  };

  const handleFileParse = () => {
    if (!file) {
      return setError("No file selected");
    }

    const reader = new FileReader();

    reader.onload = (event) => {
      const data = new Uint8Array(event.target.result);
      const workbook = XLSX.read(data, { type: "array" });

      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const jsonData = XLSX.utils.sheet_to_json(worksheet);

      console.log(jsonData, workbook.SheetNames.length);

      const fileColumns = Object.keys(jsonData[0]);

      const isValidCols = requiredColumns.every((col) =>
        fileColumns.includes(col)
      );

      if (!isValidCols) {
        setError(
          `Missing required columns. Required: ${requiredColumns.join(", ")}`
        );
        return;
      }

      const invalidRows = jsonData.filter(
        (row) => !row.first_name || !row.phone || !row.notes
      );

      if (invalidRows.length > 0) {
        setError(`Invalid rows found: ${invalidRows.length}`);
        return;
      }

      setExcelData(jsonData);
      setError("");
    };

    reader.readAsArrayBuffer(file);
  };

  const sendToBackend = async () => {
    if (excelData.length === 0) {
      return alert("No valid data to send.");
    }

    try {
      const response = await api.post("/admin/assign/tasks", {
        tasks: excelData,
      });

      alert(response.data.message);
    } catch (e) {
      alert("Error sending to backend: " + e.message);
    }
  };

  return (
    <div className="max-w-3xl mx-auto mt-12 p-6 bg-white shadow-xl rounded-2xl border border-gray-200">
      <h2 className="text-2xl font-bold mb-6 text-center text-gray-800">
        📄 Upload Excel File
      </h2>

      <div className="flex flex-col md:flex-row gap-4 items-center justify-between mb-6">
        <input
          type="file"
          accept=".xlsx,.xls"
          onChange={handleFileChange}
          className="border border-gray-300 p-2 rounded-md w-full md:w-auto text-sm"
        />
        <button
          onClick={handleFileParse}
          className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-md transition"
        >
          Validate File
        </button>
      </div>

      {error && (
        <div className="bg-red-100 text-red-800 px-4 py-2 rounded-md mb-4 text-sm font-medium">
          ⚠️ {error}
        </div>
      )}

      {excelData.length > 0 && (
        <>
          <h3 className="text-lg font-semibold mb-2 text-gray-700">Tasks</h3>

          <div className="max-h-64 overflow-auto border border-gray-200 rounded-md mb-4">
            <table className="min-w-full table-auto text-sm text-left text-gray-700">
              <thead className="bg-gray-100 sticky top-0">
                <tr>
                  <th className="px-4 py-2 border-b">First Name</th>
                  <th className="px-4 py-2 border-b">Phone</th>
                  <th className="px-4 py-2 border-b">Notes</th>
                </tr>
              </thead>
              <tbody>
                {excelData.map((row, index) => (
                  <tr key={index} className="even:bg-white odd:bg-gray-50">
                    <td className="px-4 py-2 border-b">{row.first_name}</td>
                    <td className="px-4 py-2 border-b">{row.phone}</td>
                    <td className="px-4 py-2 border-b">{row.notes}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <button
            onClick={sendToBackend}
            className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-md transition"
          >
            Send to Backend
          </button>
        </>
      )}
    </div>
  );
};

export default UploadTasks;
