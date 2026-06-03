// Objects and Prototypes
// Event is modeled as a class to represent a real event in the portal.
class Event {
  constructor(name, date, seats) {
    this.name = name;
    this.date = date;
    this.seats = seats;
  }
}

// Methods added to the prototype are shared by all Event objects.
Event.prototype.checkAvailability = function () {
  return this.seats > 0 ? `${this.name} has seats available.` : `${this.name} is full.`;
};

const communityEvent = new Event("Art Show", "2026-08-02", 12);
const output = document.getElementById("objectOutput");

// Object.entries() lists keys and values, which is helpful for debugging and display.
output.textContent = Object.entries(communityEvent)
  .map(([key, value]) => `${key}: ${value}`)
  .join("\n") + "\n" + communityEvent.checkAvailability();
