const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Calculate the current day
const myDate = new Date();
const dayNamee = days[myDate.getDay()+6];
console.log(dayNamee)
let dayName=dayNamee;

if(dayNamee==="Saturday" ){
  dayName="Sunday";
}


console.log(dayName)




// Function to get the current week number dynamically (resets after 4 weeks)
function getCurrentWeek() {
    const startDate = new Date("2024-12-23T00:00:00Z"); // Start date in UTC
    const currentDate = new Date(); // Current date
    
    // Convert both to UTC for accurate day difference
    const utcStartDate = Date.UTC(startDate.getFullYear(), startDate.getMonth(), startDate.getDate());
    const utcCurrentDate = Date.UTC(currentDate.getFullYear(), currentDate.getMonth(), currentDate.getDate());
    
    // Calculate days since the start date
    const daysSinceStart = Math.floor((utcCurrentDate - utcStartDate) / (1000 * 60 * 60 * 24));
    console.log(`Days since start: ${daysSinceStart}`);
    
    // Calculate the week number with reset after 4 weeks
    const currentWeek = ((Math.ceil((daysSinceStart + 1) / 7) - 1) % 4 + 4) % 4 + 1;
    
    return currentWeek; // Week number between 1 and 4
  }

// Dynamically determine the JSON file for the current week
const currentWeek = getCurrentWeek();
const jsonFileName = `week${currentWeek}.json`; // e.g., week1.json, week2.json, etc.
console.log(`Current Week: ${currentWeek}`);

let Today = document.getElementById("Today")
Today.innerHTML=(`${dayName} - Week ${currentWeek}`)



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
    const todymenu = data[dayName];
    console.log(`Today's Menu:`, todymenu);

    if (todymenu) {
      // Populate food items into the HTML
      document.getElementById("brekitem").innerHTML = todymenu.Breakfast || "No data";
      document.getElementById("snaksitem").innerHTML = todymenu.Snacks || "No data";
      document.getElementById("lunchitem").innerHTML = todymenu.Lunch || "No data";
      document.getElementById("dinneritem").innerHTML = todymenu.Dinner || "No data";
    } else {
      // If no data for the current day
      document.getElementById("brekitem").innerHTML = "No meal data available.";
      document.getElementById("snaksitem").innerHTML = "No meal data available.";
      document.getElementById("lunchitem").innerHTML = "No meal data available.";
      document.getElementById("dinneritem").innerHTML = "No meal data available.";
    }
  })


