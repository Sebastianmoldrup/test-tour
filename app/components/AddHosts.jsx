"use client";
import { useState } from "react";
import { useDashboard } from "@/lib/providers/DashboardProvider";
import Papa from "papaparse";

export default function AddHosts() {
  const { setHosts } = useDashboard();

  const csvToJson = (csv) => {
    return Papa.parse(csv, {
      header: true, // Uses the first row as column names
      skipEmptyLines: true,
      dynamicTyping: true, // Converts numbers automatically
      transformHeader: (header) => header.toLowerCase(),
    }).data.map((row, index) => ({
      ...row,
      id: index + 1, // Assign incremental ID
    }));
  };

  const handleFileUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        const csvData = e.target.result;
        const json = csvToJson(csvData);
        setHosts(json);
      };
      reader.readAsText(file);
    }
  };

  return (
    <li className="">
      <label htmlFor="hosts-file-upload" className="">
        <span className="bg-blue-400 px-4 py-2 rounded-md hover:bg-inherit hover:text-slate-700 shadow-xl hover:cursor-pointer">
          Legg til Verter
        </span>
        <input
          id="hosts-file-upload"
          type="file"
          accept=".csv"
          onChange={handleFileUpload}
          className="hidden"
        />
      </label>
    </li>
  );
}
