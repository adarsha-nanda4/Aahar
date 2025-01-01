const adminpage = document.getElementById("adminpage");
const inputs = document.querySelectorAll('.otp-inputs input');
const verifyButton = document.getElementById('verifyButton');
const backButton = document.getElementById("backButton");
const alertMsg = document.getElementById('alertMsg');
const loginPage = document.getElementById("loginpage");

let Passcode;

// Hide admin page initially
adminpage.style.display = "none";

// Fetch passcode from JSON file
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
          adminpage.style.display = "block";
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
    console.error('Fetch error:', error);
  });

// OTP input field navigation
inputs.forEach((input, index) => {
  input.addEventListener('input', () => {
    if (input.value && index < inputs.length - 1) {
      inputs[index + 1].focus();
    }
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'Backspace' && !input.value && index > 0) {
      inputs[index - 1].focus();
    }
  });
});

// Go back to login page
backButton.addEventListener("click", () => {
  inputs.forEach((input) => (input.value = ''));
  inputs[0].focus();
  adminpage.style.display = "none";
  loginPage.style.display = "block";
});

// Image upload logic
const imageInput = document.getElementById('image-input');
const previewImg = document.getElementById('preview-img');
const previewText = document.getElementById('preview-text');
const uploadBtn = document.getElementById('upload-btn');
const cancelBtn = document.getElementById('cancel-btn');

// Handle the file input change event
imageInput.addEventListener('change', function () {
  const file = imageInput.files[0];

  if (file) {
    const reader = new FileReader();
    reader.onload = function (e) {
      previewImg.src = e.target.result;
      previewImg.style.display = 'block';
      previewText.style.display = 'none';

      uploadBtn.disabled = false;
      cancelBtn.style.display = 'block';
    };
    reader.readAsDataURL(file);
  } else {
    previewImg.style.display = 'none';
    previewText.style.display = 'block';
    uploadBtn.disabled = true;
    cancelBtn.style.display = 'none';
  }
});

// Handle the upload button click event
uploadBtn.addEventListener('click', function () {
  const file = imageInput.files[0];
  if (!file) {
    alert('No image selected!');
    return;
  }

  const formData = new FormData();
  formData.append('image', file);

  fetch('https://aahar-bckd.vercel.app/api/bhp/', {
    method: 'POST',
    body: formData
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`Server error: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      alert('Image uploaded successfully!');
      console.log('Upload response:', data);

      // Reset the UI
      imageInput.value = '';
      previewImg.style.display = 'none';
      previewText.style.display = 'block';
      uploadBtn.disabled = true;
      cancelBtn.style.display = 'none';
    })
    .catch(error => {
      alert('Failed to upload the image. Please try again.');
      console.error('Upload error:', error);
    });
});

// Handle the cancel button click event
cancelBtn.addEventListener('click', function () {
  imageInput.value = '';
  previewImg.style.display = 'none';
  previewText.style.display = 'block';
  uploadBtn.disabled = true;
  cancelBtn.style.display = 'none';
});