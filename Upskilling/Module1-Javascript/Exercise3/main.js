// Conditionals, Loops, and Error Handling
// The portal should only show events that are upcoming and still have seats.
const events = [
  { name: "Music Night", date: "2026-07-18", seats: 5 },
  { name: "Food Fair", date: "2026-05-10", seats: 0 },
  { name: "Art Show", date: "2026-08-02", seats: 10 }
];

const eventList = document.getElementById("eventList");
const status = document.getElementById("status");
const today = new Date("2026-06-04");

events.forEach(function (event) {
  const eventDate = new Date(event.date);
  const card = document.createElement("div");
  card.className = "event";

  // if-else hides events that are already past or sold out.
  if (eventDate > today && event.seats > 0) {
    card.textContent = `${event.name} on ${event.date} - seats left: ${event.seats}`;
  } else {
    card.classList.add("hidden");
    card.textContent = `${event.name} is not available.`;
  }

  eventList.appendChild(card);
});

// Registration logic is wrapped in try-catch so invalid data does not crash the page.
function registerUser(selectedEvent) {
  try {
    if (!selectedEvent || selectedEvent.seats <= 0) {
      throw new Error("This event cannot be registered for.");
    }
    selectedEvent.seats--;
    status.textContent = `Registered for ${selectedEvent.name}. Seats now: ${selectedEvent.seats}`;
  } catch (error) {
    status.textContent = `Registration error: ${error.message}`;
  }
}

registerUser(events[0]);
