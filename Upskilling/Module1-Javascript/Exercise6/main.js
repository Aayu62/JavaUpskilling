// Arrays and Methods
const events = [
  { title: "Music Night", category: "Music" },
  { title: "Food Fair", category: "Food" }
];

// push() adds a new event to the end of the array.
events.push({ title: "Workshop on Baking", category: "Workshop" });

// filter() helps show only the events we want.
const musicEvents = events.filter(function (event) {
  return event.category === "Music";
});

// map() transforms the array into display text for the portal UI.
const cards = events.map(function (event) {
  return `${event.title} (${event.category})`;
});

document.getElementById("listOutput").textContent =
  `Music events: ${musicEvents.length}\n` + cards.join("\n");
