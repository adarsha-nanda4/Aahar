// Days of the week
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];

// Calculate the current day
const myDate = new Date();
const dayName = days[myDate.getDay()];
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





  
  const imgurl = "https://res.cloudinary.com/sanskaricoders/";
  const apiEndpoint = 'https://aahar-bckd.vercel.app/api/bhp/';
  let imgerror = document.getElementById("imgerror");
  
  // Add a loader to indicate loading
  const loader = document.createElement('div');
  loader.id = 'loader';
  loader.style.textAlign = 'center';
  loader.style.padding = '20px';
  loader.style.fontSize = '18px';
  loader.style.marginTop = '30%';
  document.getElementById('image-container').appendChild(loader);
  
  // Fetch image data first and store it in localStorage
  fetch(apiEndpoint)
    .then(response => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .then(data => {
      // Check if the response is "Image expired"
      if (data.message === "Image expired") {
        // Remove old data from local storage
        localStorage.removeItem('backgroundImage');
        
        // Display the error message in the imgerror element
        if (imgerror) {
          showError("The Photo Will Be Updated Shortly...😕");
          imgerror.style.textAlign = 'center'; // Ensure proper alignment
        }
  
        // Remove the loader after handling expired image
        const loaderElement = document.getElementById('loader');
        if (loaderElement) loaderElement.remove();
      } else if (data.img) {
        // Store the image data in localStorage first
        const imgPath = data.img;
        const imageUrl = imgurl + imgPath;
  
        // Store in localStorage
        localStorage.setItem('backgroundImage', JSON.stringify({ imgUrl: imageUrl }));
  
        // Once data is stored, proceed with updating the background and other logic
        setBackgroundImage(imageUrl);
      }
    })
    .catch(error => {
      console.error('Error fetching the API:', error);
      showError("The Photo Will Be Updated Shortly...😕");
      removeLoader(); // Remove the loader if there's an error
    });
  
  // Function to set the background image
  function setBackgroundImage(imageUrl) {
    const imageContainer = document.getElementById('image-container');
    imageContainer.style.backgroundImage = `url(${imageUrl})`;
  
    // Remove the loader once the background is set
    removeLoader();
  }
  
  // Function to display error messages
  function showError(message) {
    if (imgerror) {
      imgerror.textContent = message;
      imgerror.style.textAlign = 'center'; // Ensure proper alignment
    }
  }
  
  // Function to remove the loader
  function removeLoader() {
    const loaderElement = document.getElementById('loader');
    if (loaderElement) {
      loaderElement.remove();
    }
  }
  