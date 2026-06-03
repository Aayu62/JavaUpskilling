// Debugging and Testing
const debugForm = document.getElementById("debugForm");
const debugOutput = document.getElementById("debugOutput");

debugForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const payload = {
    name: debugForm.elements.name.value,
    email: debugForm.elements.email.value
  };

  // These logs help you follow the request step by step in the Console.
  console.log("Submitting form...");
  console.log("Payload:", payload);
  debugOutput.textContent = "Form submitted. Check the console and Network tab.";

  fetch("https://jsonplaceholder.typicode.com/posts", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  })
    .then(function (response) {
      console.log("Response status:", response.status);
      return response.json();
    })
    .then(function (data) {
      console.log("Response payload:", data);
    });
});
