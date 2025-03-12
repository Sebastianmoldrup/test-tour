"use client";
import { useDashboard } from "@/lib/providers/DashboardProvider";
import { useState } from "react";

export default function MealPlan() {
  const { guests, hosts } = useDashboard();

  new MealPlanner(hosts, guests);

  return <div>mealplan</div>;
}

class MealPlanner {
  constructor(hosts, guests) {
    this.hosts = hosts.map((host) => {
      return new Host(host);
    });
    this.guests = guests.map((guest) => {
      return new Guest(guest);
    });

    // console.log("hosts", this.hosts);
    // console.log("guests", this.guests);

    const sort = new Sort(this.hosts, this.guests);
    sort.getVegetarianOptions();
    // sort.log();
  }

  print() {}
}

class Sort {
  constructor(hosts, guests) {
    this.hosts = hosts;
    this.guests = guests;
    this.group = [];

    // console.log(this.hosts);

    // console.log(this.getVegetarianOptions());
  }

  getVegetarianOptions() {
    return this.hosts.reduce(
      (vegMeals, host) => {
        let { veg } = host.dietary;
        // console.log(veg);

        if (veg.app) {
          vegMeals.appetizer.push(host.name);
        }
        if (veg.dinner) {
          vegMeals.dinner.push(host.name);
        }
        if (veg.dessert) {
          vegMeals.dessert.push(host.name);
        }

        return vegMeals;
      },
      { appetizer: [], dinner: [], dessert: [] },
    );
  }

  log() {
    console.log(this.group);
  }
}

class Guest {
  constructor(guest) {
    this.guest = guest;
    this.allergy = guest.allergy;
    this.vegeterian = guest.vegeterian;
    this.name = guest.name;
    this.last_name = guest.last_name;
    this.phone = guest.phone;
    this.co_guest = guest.co_guest;
  }
}

class Host {
  constructor(host) {
    this.name = host.name;
    this.seats = host.seats;

    this.menu = {
      appetizer: host.appetizer,
      dinner: host.dinner,
      dessert: host.dessert,
    };

    // console.log(this);
    console.log(host.appetizer_allergy);
    console.log("vegetar");
    console.log(
      host.appetizer_allergy &&
        host.appetizer_allergy
          .split(",")
          .map((s) => s.trim())
          .includes("vegetar"),
    );

    this.dietary = {
      allergy: {
        app: host.appetizer_allergy,
        dinner: host.dinner_allergy,
        dessert: host.dessert_allergy,
      },
      veg: {
        app:
          host.appetizer_allergy &&
          host.appetizer_allergy.split(",").includes("vegetar"),
        dinner:
          host.dinner_allergy &&
          host.dinner_allergy.split(",").includes("vegetar"),
        dessert:
          host.dessert_allergy &&
          host.dessert_allergy.split(",").includes("vegetar"),
      },
    };

    this.guests = {
      appetizer: [],
      dinner: [],
      dessert: [],
    };
  }

  addAppetizerGuest(guest) {
    this.guests.appetizer.push(guest);
  }

  addDinnerGuest(guest) {
    this.guests.dinner.push(guest);
  }

  addDessertGuest(guest) {
    this.guests.dessert.push(guest);
  }
}
