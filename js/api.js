let brekitem = document.getElementById("brekitem");
let lunchitem = document.getElementById("lunchitem");
let snaksitem = document.getElementById("snaksitem");
let dinneritem = document.getElementById("dinneritem");
let Today = document.getElementById("Today");

// Days of the week
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Calculate the current day
const myDate = new Date();
const dayName = days[myDate.getDay()];

// Function to get the current week number dynamically (resets after 4 weeks)
function getCurrentWeek() {
  const startDate = new Date("2024-11-24"); // Start date
  const currentDate = new Date(); // Today's date
  
  // Calculate days since the start date
  const daysSinceStart = Math.floor((currentDate - startDate) / (1000 * 60 * 60 * 24));

  // Calculate the week number with reset after 4 weeks
  const currentWeek = ((Math.ceil((daysSinceStart + 1) / 7) - 1) % 4) + 1;

  return currentWeek; // Week number between 1 and 4

}

// Dynamically determine the JSON file for the current week
const currentWeek = getCurrentWeek();
const jsonFileName = `week${currentWeek}.json`; // e.g., week1.json, week2.json

// Fetch today's meals from the corresponding JSON file
fetch(jsonFileName)
  .then(response => {
    if (!response.ok) {
      throw new Error("Failed to load the JSON file");
    }
    return response.json();
  })
  .then(data => {
    // Get today's food data
    let todymenu = data[dayName];
    console.log(todymenu.Breakfast)
    console.log(todymenu.Snacks)
    console.log(todymenu.Lunch)
    console.log(todymenu.Dinner)

    if (todymenu) {
      // Populate food items into the HTML
      brekitem.innerHTML = todymenu.Breakfast || "No data";
      snaksitem.innerHTML = todymenu.Snacks || "No data";
      lunchitem.innerHTML = todymenu.Lunch || "No data";
      dinneritem.innerHTML = todymenu.Dinner || "No data";
    } else {
      // If no data for the current day
      brekitem.innerHTML = lunchitem.innerHTML = snaksitem.innerHTML = dinneritem.innerHTML = "No meal data available.";
    }
  })


// Display today's day and current week
Today.innerHTML = ` <strong>${dayName} Week-${currentWeek}</strong>`;


console.log(currentWeek)