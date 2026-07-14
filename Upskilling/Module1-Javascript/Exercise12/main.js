// AJAX & Fetch API
const ajaxForm = document.getElementById("ajaxForm");
const responseBox = document.getElementById("response");

ajaxForm.addEventListener("submit", function (event) {
  event.preventDefault();

  const payload = {
    name: ajaxForm.elements.name.value,
    email: ajaxForm.elements.email.value
  };

  responseBox.textContent = "Submitting...";

  // setTimeout simulates network delay before the fetch request happens.
  setTimeout(function () {
    fetch("https://jsonplaceholder.typicode.com/posts", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload)
    })
      .then(function (res) {
        if (!res.ok) throw new Error("Request failed");
        return res.json();
      })
      .then(function (data) {
        responseBox.textContent = `Success. Server created record ${data.id}.`;
      })
      .catch(function (error) {
        responseBox.textContent = `Failure: ${error.message}`;
      });
  }, 1000);
});
