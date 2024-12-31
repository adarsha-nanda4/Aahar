
const adminpage = document.getElementById("adminpage");
const inputs = document.querySelectorAll('.otp-inputs input');
const verifyButton = document.getElementById('verifyButton');
const backButton = document.getElementById("backButton");
const alertMsg = document.getElementById('alertMsg');
const loginPage = document.getElementById("loginpage");

let Passcode;

adminpage.style.display="none"
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

});



// script.js

// Get references to the DOM elements
const imageInput = document.getElementById('image-input');
const previewImg = document.getElementById('preview-img');
const previewText = document.getElementById('preview-text');
const uploadBtn = document.getElementById('upload-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Handle the file input change event
imageInput.addEventListener('change', function () {
    const file = imageInput.files[0];

    if (file) {
        // Check if the file is an image
        const reader = new FileReader();
        reader.onload = function (e) {
            // Display the image preview
            previewImg.src = e.target.result;
            previewImg.style.display = 'block';
            previewText.style.display = 'none';

            // Enable the upload button
            uploadBtn.disabled = false;

            // Show the cancel button
            cancelBtn.style.display = 'block';
        };
        reader.readAsDataURL(file);
    } else {
        // Reset if no file is selected
        previewImg.style.display = 'none';
        previewText.style.display = 'block';
        uploadBtn.disabled = true;
        cancelBtn.style.display = 'none';
    }
});

// Handle the cancel button click event
cancelBtn.addEventListener('click', function () {
    // Clear the file input
    imageInput.value = '';
    
    // Hide the preview image and reset the text
    previewImg.style.display = 'none';
    previewText.style.display = 'block';
    
    // Disable the upload button
    uploadBtn.disabled = true;
    
    // Hide the cancel button
    cancelBtn.style.display = 'none';
});

// Handle the upload button click event
uploadBtn.addEventListener('click', function () {
    alert('Image uploaded successfully!');
    // You can integrate real upload functionality here
});

