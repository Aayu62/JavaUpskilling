// Modern JavaScript Features
const events = [
  { name: "Music Night", category: "Music", seats: 12 },
  { name: "Food Fair", category: "Food", seats: 8 }
];

// Default parameters make functions safer when optional values are missing.
function formatEvent(event = { name: "Unknown", category: "General" }) {
  const { name, category } = event;
  return `${name} - ${category}`;
}

// Spread operator clones the array so filtering does not mutate the original list.
const clonedEvents = [...events];
const filtered = clonedEvents.filter(event => event.seats > 10);

document.getElementById("output").textContent =
  formatEvent(events[0]) + "\n" + filtered.map(event => event.name).join("\n");
