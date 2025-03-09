"use client";
import FileInput from "@/components/FileInput";
import AddHosts from "@/components/AddHosts";
import AddGuests from "@/components/AddGuests";
import {
  DashboardProvider,
  useDashboard,
} from "@/lib/providers/DashboardProvider";
import DisplayAttendees from "@/components/DisplayAttendees";
import { useState } from "react";
import MealPlan from "@/components/MealPlan";

export default function Dashboard() {
  const [generatePlan, setGeneratePlan] = useState(false);
  const { hosts, guests } = useDashboard();

  return (
    <DashboardProvider>
      <div className="min-h-screen bg-gray-100 p-6">
        <ul className="flex gap-16 justify-center items-center">
          <AddHosts />
          <AddGuests />
          {/* TODO: Add sorting algorithm */}
          <li
            onClick={() => setGeneratePlan(true)}
            className="bg-blue-400 px-4 py-2 rounded-md hover:bg-inherit hover:text-slate-700 shadow-xl hover:cursor-pointer"
          >
            Generer 3-retters middag
          </li>
        </ul>

        {generatePlan && (
          <div className="text-slate-700">
            <MealPlan />
          </div>
        )}

        <div className="">
          <DisplayAttendees />
        </div>
      </div>
    </DashboardProvider>
  );
}
