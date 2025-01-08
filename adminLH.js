const inputs = document.querySelectorAll('.otp-inputs input');
const verifyButton = document.getElementById('verifyButton');
const alertMsg = document.getElementById('alertMsg');
const loginPage = document.getElementById('loginpage');
const adminView = document.getElementById('admin-view');

// URL of the API
const apiURL = "https://aahar-bckd.vercel.app/login/";

// Function to send the request
async function getToken(requestData) {
  try {
    const response = await fetch(apiURL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(requestData)
    });

    if (response.ok) {
      const responseData = await response.json();
      console.log("Token:", responseData.token);

      // Store the token in local storage
      localStorage.setItem("authTokenLH", responseData.token);

      alertMsg.innerText = "Login successful!";
      alertMsg.style.color = "green";

      // Redirect to admin view or perform any additional actions
      loginPage.style.display = "none";
      adminView.style.display = "block";

      return responseData.token;
    } else {
      console.error("Failed to fetch the token:", response.status, response.statusText);
      alertMsg.innerText = "Invalid passcode. Please try again.";
      alertMsg.style.color = "red";
    }
  } catch (error) {
    console.error("Error occurred:", error);
    alertMsg.innerText = "An error occurred. Please try again later.";
    alertMsg.style.color = "red";
  }
}

// Event listener to handle input and passcode verification
inputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    if (input.value.length === 1 && index < inputs.length - 1) {
      inputs[index + 1].focus(); // Move to the next input
    }

    // If all inputs are filled, trigger the verify button automatically
    const enteredPasscode = Array.from(inputs).map(input => input.value).join('');
    if (enteredPasscode.length === inputs.length) {
      verifyButton.click();
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && input.value === '' && index > 0) {
      inputs[index - 1].focus(); // Move to the previous input
    }
  });
});

// Event listener for the verify button
verifyButton.addEventListener('click', () => {
  const enteredPasscode = Array.from(inputs).map(input => input.value).join('');

  if (enteredPasscode.length === inputs.length) {
    const requestData = {
      username: "LH", // Replace this with dynamic username if needed
      password: enteredPasscode // Use the entered passcode as the password
    };

    getToken(requestData); // Send the passcode to generate the token
  } else {
    alertMsg.innerText = "Please fill all the fields.";
    alertMsg.style.color = "red";
  }
});
