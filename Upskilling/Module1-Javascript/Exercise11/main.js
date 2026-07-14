// Working with Forms
const form = document.getElementById("registerForm");

form.addEventListener("submit", function (event) {
  // preventDefault stops the browser from reloading the page.
  event.preventDefault();

  const elements = form.elements;
  const errors = document.querySelectorAll(".error");
  errors.forEach(error => error.textContent = "");

  let valid = true;

  if (!elements.name.value.trim()) {
    document.querySelector('[data-error="name"]').textContent = "Name is required.";
    valid = false;
  }
  if (!elements.email.value.trim() || !elements.email.checkValidity()) {
    document.querySelector('[data-error="email"]').textContent = "Enter a valid email.";
    valid = false;
  }
  if (!elements.event.value) {
    document.querySelector('[data-error="event"]').textContent = "Choose an event.";
    valid = false;
  }

  if (valid) {
    alert(`Thanks, ${elements.name.value}. Registration captured.`);
  }
});
