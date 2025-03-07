"use client";
import { useState } from "react";
import { useDashboard } from "@/lib/providers/DashboardProvider";

export default function FileInput() {
  const { setHosts, setGuests } = useDashboard();
  const [jsonData, setJsonData] = useState(null);
  const [fileName, setFileName] = useState("");

  const csvToJson = (csv) => {
    const rows = csv.split("\n").filter((row) => row.trim() !== "");
    const headers = rows[0].split(",");
    return rows.slice(1).map((row) => {
      const values = row.split(",");
      return headers.reduce((obj, header, index) => {
        obj[header.trim()] = values[index] ? values[index].trim() : "";
        return obj;
      }, {});
    });
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      setFileName(file.name); // Show file name
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        const json = csvToJson(csvData);
        setJsonData(json); // Store JSON in state
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 w-full p-6">
      <label htmlFor="file-upload" className="">
        <span className="mt-1 px-4 py-2 bg-blue-500 text-white rounded-md text-sm font-medium hover:bg-blue-600 transition">
          Browse files
        </span>
        <input
          id="file-upload"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>

      {fileName && (
        <p className="mt-4 text-gray-700 text-sm">
          Selected file: <span className="font-medium">{fileName}</span>
        </p>
      )}

      <div className="flex flex-wrap gap-4 justify-between mt-6 w-full max-w-md">
        {jsonData &&
          jsonData.map((obj, index) => (
            <div
              key={index}
              className="p-2 bg-white rounded-md shadow-md mt-2 text-gray-700"
            >
              {obj.Fornavn}
            </div>
          ))}
      </div>
    </div>
  );
}
