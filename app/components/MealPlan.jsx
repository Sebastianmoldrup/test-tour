"use client";
import { useDashboard } from "@/lib/providers/DashboardProvider";
import { useState } from "react";

export default function MealPlan() {
  const { guests, hosts } = useDashboard();
  console.log(guests);
  console.log(hosts);
  return <div>mealplan</div>;
}
