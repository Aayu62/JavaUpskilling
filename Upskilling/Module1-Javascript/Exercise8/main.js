// Event Handling
const events = [
  { name: "Music Night", category: "Music" },
  { name: "Food Fair", category: "Food" },
  { name: "Art Show", category: "Art" }
];

const categoryFilter = document.getElementById("categoryFilter");
const searchBox = document.getElementById("searchBox");
const eventCards = document.getElementById("eventCards");

function render(list) {
  eventCards.innerHTML = list.map(event => `<div class="card">${event.name} - ${event.category} <button onclick="alert('Registering for ${event.name}')">Register</button></div>`).join("");
}

// onchange filters events by category.
categoryFilter.onchange = function () {
  const filtered = categoryFilter.value === "all"
    ? events
    : events.filter(event => event.category === categoryFilter.value);
  render(filtered);
};

// keydown enables quick search by name as the user types.
searchBox.onkeydown = function () {
  setTimeout(function () {
    const term = searchBox.value.toLowerCase();
    render(events.filter(event => event.name.toLowerCase().includes(term)));
  }, 0);
};

render(events);
