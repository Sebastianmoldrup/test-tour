"use client";
import { createContext, useContext, useState } from "react";

// Create Context
const DashboardContext = createContext(null);

// Provider Component
export function DashboardProvider({ children }) {
  const [hosts, setHosts] = useState(null);
  const [guests, setGuests] = useState(null);

  return (
    <DashboardContext.Provider value={{ hosts, setHosts, guests, setGuests }}>
      {children}
    </DashboardContext.Provider>
  );
}

// Custom Hook for easier access
export function useDashboard() {
  return useContext(DashboardContext);
}
