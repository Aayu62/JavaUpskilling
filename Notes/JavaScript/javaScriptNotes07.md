# Functions in JavaScript

## What Are Functions?

A **function** is a reusable block of code that performs a specific task or calculates a value.

Think of a function as a machine:

* Takes input (parameters)
* Performs operations
* Produces output (return value)

---

## Function Declaration

```javascript
function greet() {
  console.log("Hello, Jessica!");
}
```

This only **declares** the function. The code inside does not run until the function is called.

---

## Function Invocation (Calling a Function)

```javascript
function greet() {
  console.log("Hello, Jessica!");
}

greet();
```

Output:

```javascript
Hello, Jessica!
```

A function executes when its name is followed by parentheses.

---

# Parameters and Arguments

Functions become reusable through parameters and arguments.

## Parameter

A placeholder variable defined in the function.

```javascript
function greet(name) {
  console.log("Hello, " + name + "!");
}
```

`name` is a parameter.

---

## Argument

The actual value passed during the function call.

```javascript
greet("Alice");
greet("Nick");
```

Output:

```javascript
Hello, Alice!
Hello, Nick!
```

Here:

* `name` → parameter
* `"Alice"` and `"Nick"` → arguments

---

# Return Values

Every function returns a value.

If no return statement exists, JavaScript returns `undefined`.

```javascript
function doSomething() {
  console.log("Doing something...");
}

let result = doSomething();

console.log(result);
```

Output:

```javascript
Doing something...
undefined
```

---

## Using return

```javascript
function calculateSum(num1, num2) {
  return num1 + num2;
}

console.log(calculateSum(3, 4));
```

Output:

```javascript
7
```

The `return` statement:

* Ends function execution
* Sends a value back to the caller

---

# Anonymous Functions

An **anonymous function** is a function without a name.

```javascript
const sum = function (num1, num2) {
  return num1 + num2;
};

console.log(sum(3, 4));
```

Output:

```javascript
7
```

The function is stored inside the variable `sum`.

---

# Default Parameters

Default parameters provide fallback values.

```javascript
function greetings(name = "Guest") {
  console.log("Hello, " + name + "!");
}

greetings();
greetings("Anna");
```

Output:

```javascript
Hello, Guest!
Hello, Anna!
```

If no argument is supplied, `"Guest"` is used.

---

# Functions Summary

Functions allow you to:

* Reuse code
* Organize logic
* Accept input through parameters
* Return output through return statements
* Create flexible and maintainable programs

---

# Arrow Functions

Arrow functions are a shorter syntax for writing function expressions.

---

## Traditional Function

```javascript
function greetings(name) {
  console.log("Hello, " + name + "!");
}
```

---

## Arrow Function

```javascript
const greetings = (name) => {
  console.log("Hello, " + name + "!");
};
```

Differences:

* No `function` keyword
* Uses `=>` (arrow operator)

---

## Single Parameter

Parentheses can be omitted.

```javascript
const greetings = name => {
  console.log("Hello, " + name + "!");
};
```

---

## No Parameters

Parentheses are required.

```javascript
const greetings = () => {
  console.log("Hello");
};
```

---

## One-Line Arrow Functions

If the function body contains only one statement:

```javascript
const greetings = name => console.log("Hello, " + name + "!");
```

Curly braces can be omitted.

---

## Implicit Return

Traditional version:

```javascript
const calculateArea = (width, height) => {
  return width * height;
};
```

Shorter arrow version:

```javascript
const calculateArea = (width, height) => width * height;
```

Output:

```javascript
15
```

JavaScript automatically returns the expression.

---

## Incorrect Syntax

```javascript
const calculateArea = (width, height) => return width * height;
```

This causes:

```javascript
SyntaxError
```

If braces are removed, `return` must also be removed.

---

## Arrow Functions with Default Parameters

```javascript
let multiply = (a, b = 1) => a * b;

console.log(multiply(5));
console.log(multiply(5, 2));
```

Output:

```javascript
5
10
```

---

# When to Use Arrow Functions

Useful for:

* Short functions
* Callback functions
* Cleaner syntax

In team projects, follow the style already used in the codebase.

---

# Scope in JavaScript

**Scope** determines where variables can be accessed in a program.

JavaScript has three primary scopes:

1. Global Scope
2. Local (Function) Scope
3. Block Scope

---

# Global Scope

Variables declared outside functions and blocks belong to the global scope.

```javascript
let globalVar = "I'm a global variable";

function printGlobalVar() {
  console.log(globalVar);
}

printGlobalVar();
```

Output:

```javascript
I'm a global variable
```

Global variables are accessible throughout the program.

### Drawbacks

* Naming conflicts
* Harder maintenance
* Unexpected modifications

Use global variables sparingly.

---

# Local (Function) Scope

Variables declared inside a function only exist inside that function.

```javascript
function greet() {
  let message = "Hello, local scope!";
  console.log(message);
}

greet();
```

Output:

```javascript
Hello, local scope!
```

Trying to access `message` outside the function:

```javascript
console.log(message);
```

Results in:

```javascript
ReferenceError
```

---

# Block Scope

Introduced with `let` and `const`.

A block is any code enclosed in `{}`.

Examples:

* if statements
* loops
* while blocks
* function blocks

---

## Example

```javascript
if (true) {
  let blockVar = "I'm in a block";
  console.log(blockVar);
}

console.log(blockVar);
```

Output:

```javascript
I'm in a block
ReferenceError
```

`blockVar` only exists inside the block.

---

# Scope Example

```javascript
let x = 10;

function printX() {
  let x = 20;
  console.log(x);
}

printX();
console.log(x);
```

Output:

```javascript
20
10
```

Explanation:

* Local variable `x = 20` shadows global `x`.
* Global `x` remains unchanged.

---

# Scope Best Practices

### Prefer Local Variables

```javascript
function calculate() {
  let total = 100;
}
```

Keeps code isolated.

---

### Use Block Scope

```javascript
if (true) {
  const message = "Hello";
}
```

Prevents accidental access outside the block.

---

### Minimize Global Variables

Avoid:

```javascript
let data = [];
```

unless the variable genuinely needs global access.

---

# Quick Revision

## Functions

* Reusable blocks of code.
* Called using parentheses.
* Can accept parameters.
* Arguments provide actual values.
* Return values using `return`.
* Default return value is `undefined`.

---

## Anonymous Functions

```javascript
const fn = function() {};
```

Functions without names assigned to variables.

---

## Arrow Functions

```javascript
const add = (a, b) => a + b;
```

* Shorter syntax
* Supports implicit return
* Supports default parameters

---

## Scope Types

### Global Scope

Accessible everywhere.

```javascript
let globalVar = "value";
```

### Local Scope

Accessible only inside a function.

```javascript
function test() {
  let localVar = 10;
}
```

### Block Scope

Accessible only inside `{}`.

```javascript
if (true) {
  let blockVar = 20;
}
```

---

# Key Takeaways

* Functions improve code reuse and organization.
* Parameters receive input; arguments supply values.
* `return` sends values back to the caller.
* Arrow functions provide concise syntax and implicit returns.
* Scope controls variable accessibility.
* JavaScript supports global, local, and block scope.
* `let` and `const` create block-scoped variables.
* Avoid excessive global variables to reduce bugs and improve maintainability.
