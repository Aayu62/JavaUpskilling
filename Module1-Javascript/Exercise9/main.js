// Async JS, Promises, and Async/Await
const loadBtn = document.getElementById("loadBtn");
const loading = document.getElementById("loading");
const output = document.getElementById("output");

// Mock JSON endpoint behavior using a Promise and setTimeout.
function fetchMockEvents() {
  return new Promise(function (resolve) {
    setTimeout(function () {
      resolve([
        { name: "Music Night" },
        { name: "Food Fair" }
      ]);
    }, 1200);
  });
}

loadBtn.addEventListener("click", function () {
  loading.style.display = "inline";
  fetchMockEvents()
    .then(function (events) {
      output.textContent = "Loaded with .then():\n" + events.map(event => event.name).join("\n");
      loading.style.display = "none";
    })
    .catch(function () {
      output.textContent = "Error loading events.";
      loading.style.display = "none";
    });
});

// Async/await is a clearer way to write the same asynchronous flow.
async function loadWithAwait() {
  loading.style.display = "inline";
  try {
    const events = await fetchMockEvents();
    output.textContent += "\n\nLoaded with async/await:\n" + events.map(event => event.name).join("\n");
  } catch (error) {
    output.textContent = `Error: ${error.message}`;
  } finally {
    loading.style.display = "none";
  }
}

loadWithAwait();
