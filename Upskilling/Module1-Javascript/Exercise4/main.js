// Functions, Scope, Closures, and Higher-Order Functions
const allEvents = [];
const output = document.getElementById("output");

// addEvent() pushes a new event into the shared list.
function addEvent(name, category) {
  const event = { name, category };
  allEvents.push(event);
  return event;
}

// registerUser() is a reusable operation for the portal.
function registerUser(eventName) {
  return `User registered for ${eventName}`;
}

// filterEventsByCategory() accepts a callback for dynamic search behavior.
function filterEventsByCategory(category, callback) {
  return allEvents.filter(function (event) {
    return callback(event, category);
  });
}

// Closure tracks total registrations for one category.
function createCategoryTracker(category) {
  let total = 0;
  return function () {
    total++;
    return `${category} registrations: ${total}`;
  };
}

addEvent("Music Night", "Music");
addEvent("Food Fair", "Food");
addEvent("Coding Workshop", "Workshop");

const trackMusic = createCategoryTracker("Music");
output.textContent = [
  registerUser("Music Night"),
  trackMusic(),
  trackMusic(),
  `Filtered workshops: ${filterEventsByCategory("Workshop", (event, category) => event.category === category).length}`
].join(" | ");
