// Syntax, Data Types, and Operators
// const is used for values that should not change, like the event name and date.
const eventName = "Community Music Night";
const eventDate = "2026-07-18";

// let is used for values that can change, such as available seats after registration.
let availableSeats = 25;

// Template literals make it easy to combine text and variables in a readable way.
const eventInfo = `${eventName} is scheduled for ${eventDate}. Seats available: ${availableSeats}`;
document.getElementById("eventInfo").textContent = eventInfo;

// This simulates one user registering for the event.
// The decrement operator (--), or increment operator (++), is useful when tracking seats.
availableSeats--;
console.log(`After one registration, seats left: ${availableSeats}`);
