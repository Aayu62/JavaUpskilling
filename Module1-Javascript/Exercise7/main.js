// DOM Manipulation
const eventData = [
  { name: "Music Night", category: "Music" },
  { name: "Food Fair", category: "Food" }
];

const cardContainer = document.querySelector("#cardContainer");
const message = document.querySelector("#message");

// createElement() builds new cards from JavaScript instead of hardcoding HTML.
function renderEvents(list) {
  cardContainer.innerHTML = "";
  list.forEach(function (event) {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `<strong>${event.name}</strong><br>${event.category}`;

    const registerBtn = document.createElement("button");
    registerBtn.textContent = "Register";
    registerBtn.onclick = function () {
      message.textContent = `Registered for ${event.name}`;
    };

    const cancelBtn = document.createElement("button");
    cancelBtn.textContent = "Cancel";
    cancelBtn.onclick = function () {
      message.textContent = `Registration cancelled for ${event.name}`;
    };

    card.appendChild(registerBtn);
    card.appendChild(cancelBtn);
    cardContainer.appendChild(card);
  });
}

renderEvents(eventData);
