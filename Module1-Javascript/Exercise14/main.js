// jQuery and JS Frameworks
// jQuery makes common DOM tasks shorter and easier to write for beginners.
$("#registerBtn").click(function () {
  alert("Register button clicked.");
});

$("#showBtn").click(function () {
  $(".card").fadeIn();
});

$("#hideBtn").click(function () {
  $(".card").fadeOut();
});

$("#frameworkNote").text(
  "One benefit of React or Vue is that they help build larger apps with reusable components and structured state management."
);
