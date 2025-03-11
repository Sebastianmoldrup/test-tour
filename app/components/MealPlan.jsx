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
  // console.log(hostAssignments);

  // Assign allergic guests to hostAssignments
  allergicGuests.forEach((g) => {
    // getAllergyFreeMeal(g.allergy);
    console.log(assignAllergicGuestsToMeal(g));
  });

  // @function
  // @parameter guest
  // @return
  // @description allocate meal to guest based on allergy/vegeterian
  function assignAllergicGuestsToMeal(guest) {
    // Assign variables
    let appetizer = null,
      dinner = null,
      dessert = null,
      allergy = guest.allergy.toLowerCase();

    // Iterate over hosts
    hosts.forEach((host) => {
      if (host.appetizer_allergy.includes(allergy) && !appetizer) {
        appetizer = getAvailableHost(allergy, "appetizer_allergy");
      }
      if (host.dinner_allergy.includes(allergy) && !dinner) {
        dinner = getAvailableHost(allergy, "dinner_allergy");
      }
      if (host.dessert_allergy.includes(allergy) && !dessert) {
        dessert = getAvailableHost(allergy, "dessert_allergy");
      }
    });

    // console.log(appetizer, dinner, dessert);

    return { appetizer, dinner, dessert };
  }

  function getAvailableHost(allergy, mealType) {
    let arr = hosts.filter((h) => !h[mealType].includes(allergy));
    return arr.length > 0 ? arr[Math.floor(Math.random() * arr.length)] : null;
  }

  // Assign Vegeterian guests to hostAssignments

  // Func guestHasVisited
}
