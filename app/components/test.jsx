"use client";
import { useDashboard } from "@/lib/providers/DashboardProvider";
import { useState } from "react";

export default function MealPlan() {
  const { guests, hosts } = useDashboard();
  console.log(assignGuestsToHosts(hosts, guests));

  return <div>mealplan</div>;
}

function assignGuestsToHosts(hosts, guests) {
  // console.log("assign:", hosts);
  // console.log("assign:", guests);
  // Step 1: Sort guests by allergy/vegetarian preference first
  let priorityGuests = guests.filter(
    (g) => g.allergy !== "Nei" || g.vegeterian !== null,
  );
  // console.log("priority", priorityGuests);
  let normalGuests = guests.filter(
    (g) => g.allergy === "Nei" && g.vegeterian === null,
  );
  let sortedGuests = [...priorityGuests, ...normalGuests];
  console.log("sortedguests:", sortedGuests);

  // Step 2: Calculate total available seats (excluding extra seats for now)
  let totalSeats = hosts.reduce((sum, host) => sum + host.seats, 0);
  let avgGuestsPerHost = Math.floor(sortedGuests.length / hosts.length);

  // Step 3: Shuffle guests randomly to ensure randomness
  sortedGuests = sortedGuests.sort(() => Math.random() - 0.5);

  // Step 4: Initialize meal assignment structure
  let hostAssignments = hosts.map((host) => ({
    ...host,
    meal_guests: {
      appetizer: [],
      dinner: [],
      dessert: [],
    },
    used_extra_seats: 0, // Track extra seat usage
  }));

  // Helper function to check if guest already visited host
  function guestHasVisited(guest, hostAssignment) {
    return ["appetizer", "dinner", "dessert"].some((meal) =>
      hostAssignment.meal_guests[meal].some((g) => g.id === guest.id),
    );
  }

  // Step 5: Assign guests to hosts ensuring constraints
  sortedGuests.forEach((guest) => {
    let assignedMeals = [];
    for (let meal of ["appetizer", "dinner", "dessert"]) {
      let availableHosts = hostAssignments.filter(
        (host) =>
          !guestHasVisited(guest, host) &&
          host.meal_guests[meal].length < host.seats + host.used_extra_seats &&
          (!host[`${meal}_allergy`] ||
            host[`${meal}_allergy`].includes(guest.allergy)) &&
          (!host[`${meal}_vegeterian`] ||
            host[`${meal}_vegeterian`] === "ja" ||
            guest.vegeterian === null),
      );

      if (availableHosts.length > 0) {
        let chosenHost =
          availableHosts[Math.floor(Math.random() * availableHosts.length)];
        chosenHost.meal_guests[meal].push(guest);
        assignedMeals.push(meal);
      }

      // If guest has a co-guest, ensure they are seated together
      if (guest.co_guest) {
        let coGuest = guests.find((g) => g.name === guest.co_guest);
        if (coGuest && assignedMeals.includes(meal)) {
          let assignedHost = hostAssignments.find((h) =>
            h.meal_guests[meal].includes(guest),
          );
          if (
            assignedHost &&
            assignedHost.meal_guests[meal].length <
              assignedHost.seats + assignedHost.used_extra_seats - 1
          ) {
            assignedHost.meal_guests[meal].push(coGuest);
          }
        }
      }
    }
  });

  // Step 6: Assign extra seats only if needed
  hostAssignments.forEach((host) => {
    let totalAssigned =
      host.meal_guests.appetizer.length +
      host.meal_guests.dinner.length +
      host.meal_guests.dessert.length;
    if (totalAssigned > host.seats) {
      host.used_extra_seats = Math.min(
        host.extra_seats,
        totalAssigned - host.seats,
      );
    }
  });

  return hostAssignments;
}
