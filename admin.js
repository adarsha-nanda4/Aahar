const adminpage = document.getElementById("adminpage");
const inputs = document.querySelectorAll('.otp-inputs input');
const verifyButton = document.getElementById('verifyButton');
const backButton = document.getElementById("backButton");
const alertMsg = document.getElementById('alertMsg');
const loginPage = document.getElementById("loginpage");

// Variable to store the correct passcode fetched from JSON
let correctPasscode = '';
fetch('weekpass.json') 
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
})
.then(data => {
    // Extract integer values
    correctPasscode = data.id; // Integer value
})


// Add event listeners to each input field for auto-navigation
inputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    if (input.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });


  // adminpage.style.display = "none";

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
      adminpage.style.display = "flex";
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






