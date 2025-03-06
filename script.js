function calculateTotal() {
  let flightCost = parseFloat(document.getElementById("flight-cost").value) || 0;
  let hotelCost = parseFloat(document.getElementById("hotel-cost").value) || 0;
  let foodCost = parseFloat(document.getElementById("food-cost").value) || 0;
  
  let totalCost = flightCost + hotelCost + foodCost;
  
  document.getElementById("total-cost").innerText = "₹" + totalCost.toFixed(2);
}

let itineraryCount = 0;

function addDay() {
    itineraryCount++;
    
    let itineraryList = document.getElementById("itinerary-list");

    let dayContainer = document.createElement("div");
    dayContainer.classList.add("day-container");
    dayContainer.innerHTML = `
        <h3>Day ${itineraryCount}</h3>
        <label>Flight Details:</label>
        <input type="text" placeholder="Flight Info" class="input"><br>
        <label>Hotel Stay:</label>
        <input type="text" placeholder="Hotel Info" class="input"><br>
        <label>Planned Activities:</label>
        <textarea placeholder="List your activities"></textarea><br>
        <label>Transport:</label>
        <input type="text" placeholder="Transport Info" class="input"><br>
        <button class="remove-button" onclick="removeDay(this)">Remove Day</button>
    `;

    itineraryList.appendChild(dayContainer);
}

function removeDay(button) {
    button.parentElement.remove();
}

function saveItinerary() {
    alert("Your itinerary has been saved!");
}

function shareItinerary() {
    alert("Shareable itinerary link generated!");
}
