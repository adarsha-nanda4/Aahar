
const adminpage = document.getElementById("adminpage");
const inputs = document.querySelectorAll('.otp-inputs input');
const verifyButton = document.getElementById('verifyButton');
const backButton = document.getElementById("backButton");
const alertMsg = document.getElementById('alertMsg');
const loginPage = document.getElementById("loginpage");

let Passcode; // Variable to store the correct passcode fetched from JSON


fetch('weekpass.json')
  .then(response => {
    if (!response.ok) {
      throw new Error('Network response was not ok ' + response.statusText);
    }
    return response.json();
  })
  .then(data => {

    Passcode = String(data.id).trim();

    verifyButton.addEventListener('click', () => {
      let enteredPasscode = '';
      inputs.forEach((input) => {
        enteredPasscode += input.value;
      });
      enteredPasscode = enteredPasscode.trim();  
      if (enteredPasscode === Passcode) {
        alertMsg.textContent = 'Passcode verified successfully!';
        alertMsg.style.color = 'green';

    
        setTimeout(() => {
          loginPage.style.display = "none";
          adminpage.style.display = "flex";
        }, 2000);
      } else {
        alertMsg.textContent = 'Incorrect passcode. Please try again.';
        alertMsg.style.color = 'red';


        inputs.forEach((input) => (input.value = ''));
        inputs[0].focus();
      }
    });
  })
  .catch(error => {
    console.error('Fetch error:', error); // Log any errors in fetching the JSON
  });

// Add event listeners to each input field for auto-navigation
inputs.forEach((input, index) => {
  // Move focus to the next input when typing
  input.addEventListener('input', () => {
    if (input.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  // Move focus to the previous input when pressing backspace
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !input.value && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

// Add event listener to the back button
backButton.addEventListener("click", () => {
  // Clear all input fields and reset focus to the first input
  inputs.forEach((input) => (input.value = ''));
  inputs[0].focus();

  // Optionally, you can transition back to the login page
  adminpage.style.display = "none";
  loginPage.style.display = "flex";
});
