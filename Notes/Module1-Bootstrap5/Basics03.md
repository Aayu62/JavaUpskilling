🧱 What is the Bootstrap Grid?
The grid system is a way to arrange content in rows and columns.

It’s based on 12 columns per row.

You can decide how many columns each element should take depending on screen size.

Bootstrap automatically adjusts layouts for mobile, tablet, and desktop.

👉 Think of it like Lego blocks: you have 12 slots in a row, and you decide how to split them up.

📐 Key Classes
.container → wraps your content neatly with padding.

.row → creates a horizontal group of columns.

.col-* → defines how wide each column is.

col-12 → full width (mobile).

col-md-6 → half width (tablet).

col-lg-4 → one‑third width (desktop).

🧩 Exercise 3.1 – Three Columns Responsive
Requirement:

Mobile → stack vertically (one per row).

Tablet → two per row.

Desktop → three per row.

Code:

html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Responsive Grid Example</title>
  <link rel="stylesheet" href="../../node_modules/bootstrap/dist/css/bootstrap.min.css">
</head>
<body>
  <div class="container mt-5">
    <div class="row">
      <div class="col-12 col-md-6 col-lg-4 bg-light border p-3">Column 1</div>
      <div class="col-12 col-md-6 col-lg-4 bg-secondary text-white border p-3">Column 2</div>
      <div class="col-12 col-md-6 col-lg-4 bg-warning border p-3">Column 3</div>
    </div>
  </div>
  <script src="../../node_modules/bootstrap/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>
🔎 Line‑by‑Line Explanation
.col-12 → on mobile, each column takes full width (stacked).

.col-md-6 → on tablet, each column takes half width (two per row).

.col-lg-4 → on desktop, each column takes one‑third width (three per row).

bg-light, bg-secondary, bg-warning → background colors to distinguish columns.

border p-3 → adds border and padding for clarity.

🧩 Exercise 3.2 – Using .container, .row, .col-*
This exercise is about practicing the basic structure:

html
<div class="container">
  <div class="row">
    <div class="col">Column A</div>
    <div class="col">Column B</div>
    <div class="col">Column C</div>
  </div>
</div>
Explanation:
.container → wraps everything neatly.

.row → defines a horizontal row.

.col → automatically divides space equally (3 equal columns here).

👉 If you add 4 .col inside a row, Bootstrap will automatically make them 25% each.