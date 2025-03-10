"use client";
import { useDashboard } from "@/lib/providers/DashboardProvider";
import { useState } from "react";

export default function MealPlan() {
  const { guests, hosts } = useDashboard();
  assignGuestsToHosts(hosts, guests);

  return <div>mealplan</div>;
}

function assignGuestsToHosts(hosts, guests) {
  // console.log(guests);
  // Sort guests
  let allergicGuests = guests.filter(
    (g) =>
      (g.allergy && g.allergy.toLowerCase() !== "nei") || g.allergy === null,
  );
  // console.log(allergicGuests);
  let vegeterianGuests = guests.filter(
    (g) => g.vegeterian && g.vegeterian.toLowerCase() === "ja",
  );
  let normalGuests = guests.filter(
    (g) =>
      (g.allergy && g.allergy.toLowerCase() === "nei") || g.allergy === null,
  );

  // Find total seats
  let totalSeats = hosts.reduce((sum, host) => sum + host.seats, 0);

  // Find avgGuestPerHost & remainingGuestPerHost
  let avgGuestPerHost = Math.floor(guests.length / hosts.length);
  let remainingGuestPerHost = guests.length % hosts.length;

  // Add hostAssigments to all hosts
  let hostAssignments = hosts.map((host) => ({
    ...host,
    meal_guests: {
      appetizer: [],
      dinner: [],
      dessert: [],
    },
  }));
  console.log(hostAssignments);

  // Assign allergic guests to hostAssignments
  allergicGuests.forEach((g) => {
    // getAllergyFreeMeal(g.allergy);
    assignAllergicGuestsToMeal(g);
  });

  function assignAllergicGuestsToMeal(guest) {
    let visited = []; // hosts visited
    let plan = {
      appetizer: null,
      dinner: [],
      dessert: [],
    };

    hosts.map((h) => {
      // Find appetizer without allergy
      if (!h.appetizer_allergy.includes(guest.allergy.toLowerCase())) {
        let hostArr = hosts.filter((h) => {
          return !h.appetizer_allergy.includes(guest.allergy.toLowerCase());
        });
        plan.appetizer = hostArr[Math.random() * hostArr.length];
        console.log("hostarr", hostArr);
      }
      console.log("plan", plan);

      // Find dinner without allergy
      if (!h.dinner_allergy.includes(guest.allergy.toLowerCase())) {
      }

      // Find dessert without allergy
      if (!h.dessert_allergy.includes(guest.allergy.toLowerCase())) {
      }
    });
  }

  // Func find all meals without allergy contained
  function getAllergyFreeMeal(allergy) {
    let meals = hosts.map((host) => {
      let appetizer = [],
        dinner = [],
        dessert = [],
        visited = [];

      // console.log(host.appetizer_allergy.split(","));

      // console.log(allergy);
      // console.log(host.appetizer_allergy.includes("melk"));

      // Find host for appetizer
      if (!host.appetizer_allergy.includes(allergy.toLowerCase())) {
        console.log("contains", allergy);
        let appetizerAllergyFree = host.appetizer_allergy.map(() => {});
      }
      // console.log("host: ", host.appetizer_allergy, "guest: ", allergy);

      // Find host for dinner

      // Find host for dessert

      return;
    });

    return;
  }

  // Assign Vegeterian guests to hostAssignments

  // Func guestHasVisited
}
