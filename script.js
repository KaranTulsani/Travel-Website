document.addEventListener("DOMContentLoaded", function () {
    loadItinerary();
    setupAuthHandlers();
    updateAuthUI();
    setupDarkMode();
    setupMenuHandlers();
});

// ** Itinerary Functions **
function addDay() {
    const itineraryList = document.getElementById("itinerary-list");
    const dayDiv = document.createElement("div");
    dayDiv.classList.add("itinerary-day");
    const dayCount = document.querySelectorAll(".itinerary-day").length + 1;
    dayDiv.innerHTML = `
        <h3>Day ${dayCount}</h3>
        <textarea placeholder="Add your activities here"></textarea>
        <button class="remove-button" onclick="removeDay(this)">Remove</button>
    `;
    itineraryList.appendChild(dayDiv);
    saveItinerary();
}

function removeDay(button) {
    button.parentElement.remove();
    saveItinerary();
}

function saveItinerary() {
    const itineraryData = [];
    document.querySelectorAll(".itinerary-day textarea").forEach((textarea, index) => {
        itineraryData.push({ day: index + 1, activities: textarea.value });
    });
    localStorage.setItem("itinerary", JSON.stringify(itineraryData));
}

function loadItinerary() {
    const savedItinerary = JSON.parse(localStorage.getItem("itinerary") || "[]");
    if (savedItinerary.length > 0) {
        const itineraryList = document.getElementById("itinerary-list");
        itineraryList.innerHTML = "";
        savedItinerary.forEach((day) => {
            const dayDiv = document.createElement("div");
            dayDiv.classList.add("itinerary-day");
            dayDiv.innerHTML = `
                <h3>Day ${day.day}</h3>
                <textarea>${day.activities}</textarea>
                <button class="remove-button" onclick="removeDay(this)">Remove</button>
            `;
            itineraryList.appendChild(dayDiv);
        });
    }
}

function shareItinerary() {
    const itineraryData = JSON.parse(localStorage.getItem("itinerary") || "[]");
    if (!itineraryData.length) {
        alert("Your itinerary is empty. Add some details before sharing!");
        return;
    }
    let itineraryText = itineraryData.map((day) => `Day ${day.day}: ${day.activities}`).join("\n");
    navigator.clipboard.writeText(itineraryText).then(() => {
        alert("Itinerary copied to clipboard! Share it with your friends.");
    });
}

// ** Authentication Functions **
function setupAuthHandlers() {
    document.addEventListener("DOMContentLoaded", () => {
        const signupForm = document.getElementById("signup-form");
        const signinForm = document.getElementById("signin-form");

        if (signupForm) signupForm.addEventListener("submit", handleSignup);
        if (signinForm) signinForm.addEventListener("submit", handleSignin);
    });
}

function handleSignup(event) {
    event.preventDefault();
    
    let username = document.getElementById("signup-username").value.trim().toLowerCase();
    let password = document.getElementById("signup-password").value;

    if (!username || !password) {
        alert("Username and Password cannot be empty!");
        return;
    }

    if (localStorage.getItem(username)) {
        alert("Username already exists! Try another.");
        return;
    }

    localStorage.setItem(username, JSON.stringify({ password }));
    alert("Account created successfully! Please sign in.");

    setTimeout(() => {
        window.location.href = "auth/signup.html"; // Adjust path if needed
    }, 500);
}

function handleSignin(event) {
    event.preventDefault();
    
    let username = document.getElementById("signin-username").value.trim().toLowerCase();
    let password = document.getElementById("signin-password").value;

    if (!username || !password) {
        alert("Username and Password cannot be empty!");
        return;
    }

    let storedData = localStorage.getItem(username);
    
    if (storedData) {
        let userData = JSON.parse(storedData);
        if (userData.password === password) {
            alert("Login successful!");
            localStorage.setItem("loggedInUser", username);

            console.log("Redirecting to index.html..."); // Debugging
            setTimeout(() => {
                window.location.href = "./index.html"; // Adjust path if needed
            }, 500);
        } else {
            alert("Invalid credentials! Try again.");
        }
    } else {
        alert("User not found! Sign up first.");
    }
}

function updateAuthUI() {
    let username = localStorage.getItem("loggedInUser");
    let authSection = document.querySelector(".auth");

    if (!authSection) return;

    if (username) {
        authSection.innerHTML = `
            <div class="dropdown">
                <button class="auth-btn" onclick="toggleDropdown(event)">Welcome, ${username} ▼</button>
                <div id="dropdownMenu" class="dropdown-content">
                    <a href="#" onclick="logout()">Logout</a>
                </div>
            </div>
        `;
    } else {
        authSection.innerHTML = `
            <div class="dropdown">
                <button class="auth-btn" onclick="toggleDropdown(event)">Sign In ▼</button>
                <div id="dropdownMenu" class="dropdown-content">
                    <a href="./signin.html">Sign In</a>
                    <a href="./signup.html">Sign Up</a>
                </div>
            </div>
        `;
    }
}

function logout() {
    localStorage.removeItem("loggedInUser");
    alert("Logged out successfully!");
    console.log("Redirecting to signin.html..."); // Debugging
    setTimeout(() => {
        window.location.href = "./signin.html"; // Adjust path if needed
    }, 500);
}

// Ensure event listeners are set up properly
setupAuthHandlers();

// ** Dark Mode Toggle **
function setupDarkMode() {
    const themeToggle = document.querySelector(".theme-checkbox");
    if (!themeToggle) return;

    function enableDarkMode() {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
    }

    function disableDarkMode() {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
    }

    // Apply saved theme on page load
    if (localStorage.getItem("theme") === "dark") {
        themeToggle.checked = true;
        enableDarkMode();
    } else {
        disableDarkMode();
    }

    // Toggle theme on checkbox change
    themeToggle.addEventListener("change", () => {
        themeToggle.checked ? enableDarkMode() : disableDarkMode();
    });
}

// ** Navigation Menu **
function setupMenuHandlers() {
    const navToggle = document.querySelector(".nav-toggle");
    if (navToggle) {
        navToggle.addEventListener("click", function () {
            document.querySelector(".nav-links").classList.toggle("active");
        });
    }

    const dropdown = document.querySelector(".dropdown");
    if (dropdown) {
        dropdown.addEventListener("click", function (event) {
            event.preventDefault();
            document.getElementById("dropdownMenu").classList.toggle("active");
        });

        document.addEventListener("click", function (event) {
            const dropdownMenu = document.getElementById("dropdownMenu");
            if (dropdownMenu && !event.target.closest(".dropdown")) {
                dropdownMenu.classList.remove("active");
            }
        });
    }
}

// ** Dropdown Handling **
function toggleDropdown(event) {
    event.stopPropagation();
    const dropdownMenu = document.getElementById("dropdownMenu");
    if (dropdownMenu) {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    }
}
