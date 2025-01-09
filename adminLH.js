// Element references
const inputs = document.querySelectorAll('.otp-inputs input');
const verifyButton = document.getElementById('verifyButton');
const backButton = document.getElementById('backButton');
const alertMsg = document.getElementById('alertMsg');
const loginPage = document.getElementById('loginpage');
const adminView = document.getElementById('admin-view');

let authToken; // Variable to store the token

// Event listener for verify button
verifyButton.addEventListener('click', () => {
    let enteredPasscode = '';
    inputs.forEach(input => {
        enteredPasscode += input.value;
    });
    enteredPasscode = enteredPasscode.trim();

    // Prepare data for POST request
    const username = "LH";
    const payload = {
        username: username,
        password: enteredPasscode
    };

    fetch('https://aahar-bckd.vercel.app/login/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Failed to log in: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        if (data.token) {
            authToken = data.token; // Store the token
            alertMsg.textContent = 'Login successful!';
            alertMsg.style.color = 'green';

            setTimeout(() => {
                loginPage.style.display = "none";
                adminView.style.display = "block";
            }, 2000);
        } else {
            throw new Error('Token not received');
        }
    })
    .catch(error => {
        console.error('Login error:', error);
        alertMsg.textContent = 'Incorrect passcode or login failed. Please try again.';
        alertMsg.style.color = 'red';

        // Clear inputs and refocus
        inputs.forEach(input => (input.value = ''));
        inputs[0].focus();
    });
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
