const adminpage = document.getElementById("adminpage");
const inputs = document.querySelectorAll('.otp-inputs input');
const verifyButton = document.getElementById('verifyButton');
const backButton = document.getElementById("backButton");
const alertMsg = document.getElementById('alertMsg');
const loginPage = document.getElementById("loginpage");

// Variable to store the correct passcode fetched from JSON
let correctPasscode = '4450';

// Fetch the passcode from the JSON file
fetch('./weekpass.json')
  .then((response) => {
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    return response.json();
  })
  .then((data) => {
    correctPasscode = data.idpass.pass; // Extract the passcode
    console.log('Passcode fetched:', correctPasscode);
  })
// Add event listeners to each input field for auto-navigation
inputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    if (input.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });


  adminpage.style.display = "none";

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !input.value && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

// Add event listener to the verify button
verifyButton.addEventListener('click', () => {
  // Collect the input values into a passcode
  let enteredPasscode = '';
  inputs.forEach((input) => {
    enteredPasscode += input.value;
  });

  // Check if the entered passcode matches the correct passcode
  if (enteredPasscode === correctPasscode) {
    alertMsg.textContent = 'Passcode verified successfully!';
    alertMsg.style.color = 'green';

    // Transition to the admin page after 2 seconds
    setTimeout(() => {
      loginPage.style.display = "none";
      adminPage.style.display = "flex";
    }, 2000);
  } else {
    alertMsg.textContent = 'Incorrect passcode. Please try again.';
    alertMsg.style.color = 'red';

    // Clear all input fields and reset focus to the first input
    inputs.forEach((input) => (input.value = ''));
    inputs[0].focus();
  }
});

// Add event listener to the back button
backButton.addEventListener("click", function () {
  // Clear all input fields and reset focus to the first input
  inputs.forEach((input) => (input.value = ''));
  inputs[0].focus();
});






const dragArea = document.getElementById('dragArea');
const fileInput = document.getElementById('fileInput');
const fileButton = document.getElementById('fileButton');
const fileDetails = document.getElementById('fileDetails');

// Open file dialog when button is clicked
fileButton.addEventListener('click', () => fileInput.click());

// Handle file selection via input
fileInput.addEventListener('change', handleFiles);

// Drag and drop functionality
dragArea.addEventListener('dragover', (e) => {
  e.preventDefault();
  dragArea.style.backgroundColor = '#f9f9f9';
});

dragArea.addEventListener('dragleave', () => {
  dragArea.style.backgroundColor = 'transparent';
});

dragArea.addEventListener('drop', (e) => {
  e.preventDefault();
  dragArea.style.backgroundColor = 'transparent';
  handleFiles(e.dataTransfer.files);
});

// Display selected files
function handleFiles(files) {
  if (!files.length) {
    files = fileInput.files;
  }

  fileDetails.innerHTML = '<h3>Uploaded Files:</h3><ul>';
  for (let file of files) {
    fileDetails.innerHTML += `<li><strong>${file.name}</strong> - ${(file.size / 1024).toFixed(2)} KB</li>`;
  }
  fileDetails.innerHTML += '</ul>';
}