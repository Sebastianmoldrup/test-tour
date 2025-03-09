"use client";
import { useEffect, useState } from "react";
import { useDashboard } from "@/lib/providers/DashboardProvider";

export default function DisplayAttendees() {
  const { hosts, guests } = useDashboard();
  // console.log(hosts);
  // console.log(guests);

  return (
    <div className="grid space-y-8 mt-28 mb-8 text-slate-700">
      <div>
        <h2 className="font-semibold text-2xl mb-4 border-b-[1px] pb-1">
          Verter
        </h2>
        {hosts && Object.keys(hosts).length > 0 ? (
          Object.values(hosts).map((host) => {
            return <HostCard host={host} />;
          })
        ) : (
          <div>Ingen verter lagt til</div>
        )}
      </div>

      <div className="flex flex-col space-y-4">
        <h2 className="font-semibold text-2xl mb-4 border-b-[1px] pb-1 sticky top-0 bg-gray-100 z-10">
          Deltagere
        </h2>
        <div className="flex flex-wrap gap-8 justify-between">
          {guests && Object.keys(guests).length > 0 ? (
            Object.values(guests).map((guest) => {
              return <GuestCard guest={guest} />;
            })
          ) : (
            <div>Ingen deltagere lagt til</div>
          )}
        </div>
      </div>
    </div>
  );
}

function GuestCard({ guest }) {
  return (
    <div
      key={guest.id}
      className="bg-white p-4 rounded-lg shadow-lg border border-gray-200"
    >
      <div className="font-semibold text-lg">
        {guest.name} {guest.last_name}
      </div>
      <div className="text-gray-600">
        <div>
          <strong>Allergier:</strong> {guest.allergy}
        </div>
        <div>
          <strong>Medfølgende:</strong> {guest.co_guest ?? "nei"}
        </div>
      </div>
    </div>
  );
}

function HostCard({ host }) {
  // console.log(Object.values(host));
  return (
    <div key={host.id} className="border-b border-gray-300 py-4">
      {/* Host Name */}
      <h3 className="text-xl font-bold">{host.name}</h3>

      {/* Meal Information */}
      <div className="mt-2 grid grid-cols-1 md:grid-cols-3 gap-4">
        {/* Forrett (Starter) */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold">Forrett:</h4>
          <p>{host.appetizer}</p>
          {host.appetizer_allergy && (
            <p className="mt-1 text-sm text-gray-600">
              <strong>Allergi:</strong> {host.appetizer_allergy}
            </p>
          )}
          {host.appetizer_vegeterian && (
            <p className="mt-1 text-sm text-gray-600">
              <strong>Vegetar:</strong>{" "}
              {host.appetizer_vegeterian === "ja" ? "Ja" : "Nei"}
            </p>
          )}
        </div>

        {/* Middag (Main Course) */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold">Middag:</h4>
          <p>{host.dinner}</p>
          {host.dinner_allergy && (
            <p className="mt-1 text-sm text-gray-600">
              <strong>Allergi:</strong> {host.dinner_allergy}
            </p>
          )}
          {host["vegetar middag"] && (
            <p className="mt-1 text-sm text-gray-600">
              <strong>Vegetar:</strong>{" "}
              {host.appetizer_vegeterian === "ja" ? "Ja" : "Nei"}
            </p>
          )}
        </div>

        {/* Dessert */}
        <div className="p-4 border rounded-lg bg-gray-50">
          <h4 className="font-semibold">Dessert:</h4>
          <p>{host.dessert}</p>
          {host.dessert_allergy && (
            <p className="mt-1 text-sm text-gray-600">
              <strong>Allergi:</strong> {host.dessert_allergy}
            </p>
          )}
          {host.dessert_vegeterian && (
            <p className="mt-1 text-sm text-gray-600">
              <strong>Vegetar:</strong>{" "}
              {host.dessert_vegeterian === "ja" ? "Ja" : "Nei"}
            </p>
          )}
        </div>
      </div>

      {/* Additional Information */}
      <div className="mt-4 text-sm text-gray-700">
        <p>
          <strong>Plasser:</strong> {host.seats}
        </p>
      </div>
    </div>
  );
}
