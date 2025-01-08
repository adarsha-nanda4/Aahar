// Element references
const inputs = document.querySelectorAll('.otp-inputs input');
const verifyButton = document.getElementById('verifyButton');
const backButton = document.getElementById('backButton');
const alertMsg = document.getElementById('alertMsg');
const loginPage = document.getElementById('loginpage');
const adminView = document.getElementById('admin-view');

let Passcode;

// Fetch passcode from JSON
fetch('weekpass.json')
    .then(response => {
        if (!response.ok) {
            throw new Error('Network response was not ok ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.pass) {
            Passcode = String(data.pass).trim();

            // Event listener for verify button
            verifyButton.addEventListener('click', () => {
                let enteredPasscode = '';
                inputs.forEach(input => {
                    enteredPasscode += input.value;
                });
                enteredPasscode = enteredPasscode.trim();

                if (enteredPasscode === Passcode) {
                    alertMsg.textContent = 'Passcode verified successfully!';
                    alertMsg.style.color = 'green';

                    setTimeout(() => {
                        loginPage.style.display = "none";
                        adminView.style.display = "block";
                    }, 2000);
                } else {
                    alertMsg.textContent = 'Incorrect passcode. Please try again.';
                    alertMsg.style.color = 'red';

                    // Clear inputs and refocus
                    inputs.forEach(input => (input.value = ''));
                    inputs[0].focus();
                }
            });
        } else {
            throw new Error('Invalid JSON format: Missing "id"');
        }
    })
    .catch(error => {
        console.error('Fetch error:', error);
        alertMsg.textContent = 'Failed to load passcode. Please try again later.';
        alertMsg.style.color = 'red';
    });

// Input navigation
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

// Back button behavior
backButton.addEventListener('click', () => {
    inputs.forEach(input => (input.value = ''));
    inputs[0].focus();
});
