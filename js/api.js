// Days of the week
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Calculate the current day
const myDate = new Date();
const dayName = days[myDate.getDay()];

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
console.log(`JSON File: ${jsonFileName}`);

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


// Display today's day and current week
document.getElementById("Today").innerHTML = `<strong>${dayName} - Week ${currentWeek}</strong>`;






const imgurl = "https://res.cloudinary.com/sanskaricoders/";
const apiEndpoint = 'https://aahar-bckd.vercel.app/api/bhp/';

// Add a loader to indicate loading
const loader = document.createElement('div');
loader.id = 'loader';
loader.textContent = ''; // You can replace this with a spinner icon or animation
loader.style.textAlign = 'center';
loader.style.padding = '20px';
loader.style.fontSize = '18px';
loader.style.marginTop = '30%';
document.getElementById('image-container').appendChild(loader);

// Check if the image URL is already stored in local storage
const storedImage = localStorage.getItem('imageUrl');

if (storedImage) {
  // If the image is already in local storage, display it
  displayImage(storedImage);
} else {
  // Fetch the API
  fetch(apiEndpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      const imgPath = data.img; // Store the 'img' value in a variable
      console.log(imgPath); // Log it to verify

      // Create the full image URL
      const imageUrl = imgurl + imgPath;

      // Save the image URL to local storage
      localStorage.setItem('imageUrl', imageUrl);

      // Display the image
      displayImage(imageUrl);
    })
    .catch(error => {
      console.error('Error:', error);
      showError('Failed to fetch the image. Please try again later.');
    });
}

// Function to create and display the image
function displayImage(imageUrl) {
  const imgElement = document.createElement('img');
  imgElement.src = imageUrl;
  imgElement.alt = "Cloudinary Image";
  imgElement.style.maxWidth = "100%"; // Makes the image responsive
  imgElement.style.height = "auto";

  // Remove the loader once the image is loaded
  imgElement.onload = () => {
    document.getElementById('loader').remove();
  };

  // Handle image load failure
  imgElement.onerror = () => {
    showError('Failed to load the image. Please try again later.');
  };

  // Append the img element to the container
  document.getElementById('image-container').appendChild(imgElement);
}

// Function to display error messages
function showError(message) {
  const errorDiv = document.getElementById('loader');
  errorDiv.textContent = message;
  errorDiv.style.color = 'red';
  errorDiv.style.fontWeight = 'bold';
}
