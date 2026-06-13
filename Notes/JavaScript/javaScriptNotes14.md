# JavaScript Notes: While Loops, Do...While Loops, and Loop Control Statements

## 1. `while` vs. `do...while` Loops

### A. The `while` Loop
* **Purpose:** Runs a block of code as long as a specified condition evaluates to `true`. Best used when you **do not know beforehand** how many times a loop needs to run.
* **Mechanics:** The condition is checked **before** the code block executes. If the condition is initially `false`, the code block inside will **not execute at all**.
* **Syntax:**
  ```javascript
  while (condition) {
    // code block to be executed
  }

```

* **Example:**
```javascript
let counter = 0;
while (counter < 5) {
  console.log(counter); // Outputs: 0, 1, 2, 3, 4
  counter++;
}

```



### B. The `do...while` Loop

* **Purpose:** Ensures the loop body is processed when you need a block of code to run **at least once** before checking the condition.
* **Mechanics:** It executes the code block first, then evaluates the condition. If `true`, it repeats; if `false`, it terminates.
* **Usage:** While `while` loops are preferred in most everyday scenarios, `do...while` is critical when an initial execution must happen unconditionally.
* **Syntax:**
```javascript
do {
  // code block to be executed
} while (condition);

```


* **Example:**
```javascript
let counter = 0;
do {
  console.log(counter); // Outputs: 0, 1, 2, 3, 4
  counter++;
} while (counter < 5);

```



---

## 2. Loop Control: `break` and `continue`

### A. The `break` Statement

* **Purpose:** Used to exit/terminate a loop immediately based on a certain condition.
* **Common Use Case:** Exiting early when searching for a specific value in an array once it has been found.
* **Example:**
```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    break; // Aborts the loop entirely
  }
  console.log(i); // Outputs: 0, 1, 2, 3, 4
}

```



### B. The `continue` Statement

* **Purpose:** Skips the remaining code inside the *current iteration* of the loop and instantly jumps to the evaluation of the next iteration.
* **Example:**
```javascript
for (let i = 0; i < 10; i++) {
  if (i === 5) {
    continue; // Skips the rest of this iteration
  }
  console.log(i); // Outputs: 0, 1, 2, 3, 4, 6, 7, 8, 9 (5 is skipped)
}

```



---

## 3. Loop Labels with `break` and `continue`

* **Purpose:** Labels allow you to name loops (`labelName:`) so you can specify exactly which loop to exit or skip when working inside **nested loops**.
* **Utility:** Lets you control the execution flow of an outer loop directly from inside an inner loop. Though rarely used in modern production, it remains an essential tool for complex flow control.
* **Example using Labels with `break`:**
```javascript
outerLoop: for (let i = 0; i < 3; i++) {
  innerLoop: for (let j = 0; j < 3; j++) {
    if (i === 1 && j === 1) {
      break outerLoop; // Exits both innerLoop and outerLoop immediately
    }
    console.log(`i: ${i}, j: ${j}`);
  }
}
/* Console Output:
   "i: 0, j: 0"
   "i: 0, j: 1"
   "i: 0, j: 2"
   "i: 1, j: 0"
*/

```



---

## 4. Quick Summary & Concept Check

* **Core Definitonal Distinction:** A `do...while` loop executes the code block at least once before verification, whereas a `while` loop does not.
* **Condition Fails First:** If the condition is initially `false`, a `while` loop terminates immediately with **zero** executions.
* **Statement Actions:** * `break` $=$ Exit the loop immediately.
* `continue` $=$ Skip current iteration and start the next.
* `labels` $=$ Targeted control over outer loops from inside nested setups.



```