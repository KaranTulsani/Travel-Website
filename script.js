// Toggle hamburger menu for mobile
function toggleMenu() {
    const navLinks = document.querySelector('.nav-links');
    navLinks.classList.toggle('active');
}

// Toggle account dropdown
function toggleDropdown(event) {
    event.preventDefault();
    const dropdown = document.getElementById('dropdownMenu');
    dropdown.classList.toggle('show');
}

// Close dropdown if clicked outside
window.onclick = function (event) {
    const dropdown = document.getElementById('dropdownMenu');
    if (!event.target.matches('.auth-btn')) {
        if (dropdown && dropdown.classList.contains('show')) {
            dropdown.classList.remove('show');
        }
    }
};

// Handle Get Suggestions Button
const suggestionBtn = document.querySelector('.button');
suggestionBtn.addEventListener('click', () => {
    const source = document.querySelector('.source-input').value;
    const destination = document.querySelector('.destination-input').value;
    const startDate = document.getElementById('start-date').value;
    const endDate = document.getElementById('end-date').value;
    const style = document.querySelector('select[name="travelStyle"]').value;

    if (!source || !destination || !startDate || !endDate || !style) {
        alert('Please fill in all fields to get suggestions!');
        return;
    }

    alert(`AI Suggestion Coming Soon!\nFrom: ${source}\nTo: ${destination}\nTravel Style: ${style}`);
});

// --------- SIGN IN / SIGN UP Functionality --------- //

// Store user (Sign Up)
function signupUser() {
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;

    if (!email || !password) {
        alert('Please fill all fields');
        return;
    }

    // Store user in localStorage (Simple)
    localStorage.setItem(email, password);
    alert('Account created successfully!');
    window.location.href = 'signin.html'; // Redirect to Sign In
}

// Sign in user
function signinUser() {
    const email = document.getElementById('signin-email').value;
    const password = document.getElementById('signin-password').value;

    const storedPassword = localStorage.getItem(email);

    if (storedPassword && storedPassword === password) {
        alert('Sign in successful!');
        window.location.href = '../index.html'; // Redirect to Home after login
    } else {
        alert('Invalid email or password');
    }
}

// Example: Attach these if your signin.html & signup.html files have buttons with IDs
document.addEventListener('DOMContentLoaded', () => {
    const signupBtn = document.getElementById('signup-btn');
    if (signupBtn) signupBtn.addEventListener('click', signupUser);

    const signinBtn = document.getElementById('signin-btn');
    if (signinBtn) signinBtn.addEventListener('click', signinUser);
});
