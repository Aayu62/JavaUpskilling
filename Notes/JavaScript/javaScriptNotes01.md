````md id="javascriptnotes01"
# JavaScript Notes 01

# Introduction to JavaScript

## What is JavaScript?
JavaScript is a powerful programming language used to add:
- Interactivity
- Dynamic behavior
- Logic
- Functionality

to web pages and web applications.

---

# Relationship Between HTML, CSS, and JavaScript

| Technology | Purpose |
|---|---|
| HTML | Structure/content |
| CSS | Styling/design |
| JavaScript | Behavior/interactivity |

---

# Example Roles

## HTML
Defines elements like:
- headings
- buttons
- paragraphs

Example:
```html id="5w4t1z"
<h1>Hello</h1>
<button>Click Me</button>
````

---

## CSS

Styles elements.

Example:

```css id="a0h9yz"
h1 {
  color: green;
}
```

---

## JavaScript

Adds behavior.

Example:

```javascript id="vq0b8v"
alert("Button clicked!");
```

---

# What JavaScript Can Do

* Handle button clicks
* Process forms
* Show alerts
* Change webpage content
* Change styles dynamically
* Animate elements
* Build full web apps

---

# Important Concepts

## HTML

Provides webpage structure.

## CSS

Controls appearance.

## JavaScript

Controls behavior.

---

# Data Types in JavaScript

## What is a Data Type?

A data type defines the kind of value stored in a variable.

Examples:

* Number
* String
* Boolean

---

# Variables

## What is a Variable?

A variable is a named container used to store data.

Example:

```javascript id="i6x5wa"
let age = 25;
```

---

# JavaScript Primitive Data Types

| Data Type | Example      |
| --------- | ------------ |
| Number    | `10`, `3.14` |
| String    | `"Hello"`    |
| Boolean   | `true`       |
| undefined | `undefined`  |
| null      | `null`       |
| Symbol    | `Symbol()`   |
| BigInt    | `123n`       |

---

# Number Data Type

## Integers

Whole numbers.

Examples:

```javascript id="1j7r4r"
console.log(3);
console.log(-67);
```

---

## Floating Point Numbers

Numbers with decimals.

Examples:

```javascript id="r6kq3w"
console.log(3.14);
console.log(-14.5);
```

---

# String Data Type

## Definition

A sequence of characters enclosed in quotes.

## Double Quotes

```javascript id="c7h1wv"
console.log("I love to code!");
```

## Single Quotes

```javascript id="e9m0ut"
console.log('I love to code!');
```

---

# Uses of Strings

* Names
* Labels
* Messages
* Text content

---

# Boolean Data Type

## Definition

Represents:

* `true`
* `false`

## Example

```javascript id="8v1ycm"
let isLoggedIn = true;
```

---

# `undefined`

## Meaning

Variable declared but NOT assigned a value.

Example:

```javascript id="rxtccm"
let age;
console.log(age);
```

Output:

```text id="hkpjlwm"
undefined
```

---

# `null`

## Meaning

Variable intentionally set to "nothing".

Example:

```javascript id="bblyl6"
let data = null;
```

---

# Object Data Type

## Definition

Collection of key-value pairs.

Example:

```javascript id="rmbihz"
{
  name: "Alice",
  age: 30
}
```

---

# Symbol

## Definition

Unique immutable identifier.

Example:

```javascript id="pjlwm9"
Symbol('mySymbol');
```

---

# BigInt

## Purpose

Stores very large integers beyond normal Number limits.

Example:

```javascript id="3dyewd"
12345678901234567890n
```

## Note

* Add `n` at end

---

# `console.log()`

## Purpose

Outputs information to browser console.

## Used For

* Debugging
* Testing
* Inspecting values

---

# Example

```javascript id="smlvdu"
console.log("Hello");
```

---

# Logging Variables

```javascript id="jytjlwm"
let num = 5;
console.log(num);
```

---

# Logging Multiple Values

```javascript id="8p8zgp"
let name = "Alice";
let age = 25;

console.log("Name:", name, "Age:", age);
```

---

# Comments in JavaScript

## Purpose

Used for:

* Notes
* Explanations
* Documentation
* Debugging

Comments are ignored by JavaScript engine.

---

# Single-Line Comments

## Syntax

```javascript id="jjv8p0"
// This is a comment
```

---

# Multi-Line Comments

## Syntax

```javascript id="49iyg8"
/*
This is a multiline comment
*/
```

---

# Good Use Cases for Comments

* Explaining complex logic
* Providing context
* Team communication

---

# Avoid Over-Commenting

Bad Example:

```javascript id="iuvr6j"
// Create variable
const price = 10;
```

Reason:

* Code already obvious

---

# Refactor Instead of Over-Explaining

Do NOT use comments to explain poorly written code.

Instead:

* Rewrite/refactor code clearly

---

# Variable Declaration

## Using `let`

Example:

```javascript id="2c3ehu"
let age;
```

---

# Variable Initialization

## Definition

Assigning value to variable.

Example:

```javascript id="b85g7j"
let age = 25;
```

---

# Assignment Operator (`=`)

## Purpose

Assigns value.

Example:

```javascript id="gt7k9t"
let score = 10;
```

## Important

* `=` does NOT check equality
* It assigns value

---

# Variable Reassignment

## Definition

Updating existing variable value.

Example:

```javascript id="cxqlzb"
let age = 25;

age = 30;
```

---

# Why Reassignment is Useful

Examples:

* Updating game score
* Tracking points
* Updating counters

---

# Variable Naming Rules

## Good Variable Names

```javascript id="7g6l9x"
let age = 10;
let userName = "John";
```

---

## Bad Variable Names

```javascript id="ljf8su"
let x = 10;
let y = "John";
```

---

# Valid Variable Names

Variables can start with:

* letter
* `_`
* `$`

Examples:

```javascript id="a5r8op"
let age;
let _score;
let $total;
```

---

# Invalid Variable Names

Cannot start with number.

Example:

```javascript id="vjlwm3"
let 1stPlace;
```

---

# Case Sensitivity

Variables are case-sensitive.

Example:

```javascript id="hnsl1s"
let age = 25;
let Age = 30;
```

These are DIFFERENT variables.

---

# camelCase Naming Convention

## Rule

* First word lowercase
* Next words capitalized

Examples:

```javascript id="sq4j7o"
let thisIsCamelCase;
let freeCodeCampStudents;
```

---

# Reserved Keywords

Cannot use keywords as variable names.

Examples:

* `let`
* `const`
* `function`
* `return`

---

# Allowed Characters in Variable Names

Allowed:

* letters
* numbers
* `_`
* `$`

Avoid:

* `!`
* `@`
* special characters

---

# `let` vs `const`

| Feature                   | `let`     | `const`       |
| ------------------------- | --------- | ------------- |
| Reassignment              | ✅ Allowed | ❌ Not allowed |
| Declaration without value | ✅ Allowed | ❌ Error       |

---

# Using `let`

```javascript id="h0ruyw"
let score = 10;

score = 20;
```

---

# Using `const`

```javascript id="4gfdna"
const maxScore = 100;
```

---

# Error with `const`

```javascript id="s75bvk"
const age;
```

Output:

```text id="jlwmn8"
Error: Missing initializer
```

---

# Reassigning `const`

```javascript id="q4c6al"
const maxScore = 100;

maxScore = 200;
```

Result:

```text id="c5yhrx"
Error
```

---

# When to Use `let`

Use when values change:

* counters
* scores
* updates

---

# When to Use `const`

Use for fixed values:

* settings
* configuration
* constants

---

# `var` Keyword

## Important

Older way to declare variables.

## Problem

* Wider scope
* More bugs possible

## Recommendation

Prefer:

* `let`
* `const`

---

# Strings in JavaScript

## Definition

Sequence of characters.

---

# String Syntax

## Single Quotes

```javascript id="md4jlwm"
'Hello'
```

## Double Quotes

```javascript id="3c29i0"
"Hello"
```

---

# Important Rule

Quotes must match.

❌ Wrong:

```javascript id="jlwm9g"
"Hello'
```

Result:

```text id="uw1c4m"
Syntax Error
```

---

# String Immutability

## Meaning

Strings cannot be changed directly after creation.

---

# Example

```javascript id="k8hrfa"
let developer = "Jessica";

developer = "Quincy";
```

## Important

* Original string not modified
* New string created instead

---

# String Concatenation

## Definition

Combining strings together.

---

# Using `+` Operator

Example:

```javascript id="jjlwm1"
let firstName = "John";
let lastName = "Doe";

let fullName = firstName + " " + lastName;
```

Output:

```text id="lwjlwm"
John Doe
```

---

# Spacing Issues

Example:

```javascript id="h8mjlwm"
let fullName = firstName + lastName;
```

Output:

```text id="jlwmf9"
JohnDoe
```

---

# Using `+=`

## Purpose

Append text to existing string.

Example:

```javascript id="b6q2hm"
let greeting = "Hello";

greeting += ", John!";
```

Output:

```text id="m7s9ld"
Hello, John!
```

---

# `concat()` Method

## Purpose

Joins strings together.

Example:

```javascript id="tjlwm5"
let str1 = "Hello";
let str2 = "World";

let result = str1.concat(" ", str2);
```

---

# Function vs Method

| Term     | Meaning                         |
| -------- | ------------------------------- |
| Function | Reusable block of code          |
| Method   | Function associated with object |

---

# String Concatenation Summary

| Method     | Best Use                 |
| ---------- | ------------------------ |
| `+`        | Simple concatenation     |
| `+=`       | Appending text           |
| `concat()` | Joining multiple strings |

---

# Semicolons (`;`)

## Purpose

Marks end of statement.

Example:

```javascript id="wjlwm0"
let a = 1;
let b = 2;
```

---

# Why Semicolons Matter

* Improve readability
* Prevent ambiguity
* Help parser interpret code

---

# Automatic Semicolon Insertion (ASI)

JavaScript can insert semicolons automatically.

BUT:

* Explicit semicolons recommended

---

# Dynamic Typing

## Definition

Variable types can change during runtime.

Example:

```javascript id="wjlwm7"
let example = "Hello";

example = 42;
```

---

# Benefits of Dynamic Typing

* Flexible
* Faster development

---

# Drawbacks

* Runtime bugs
* Harder debugging in large apps

---

# Static Typing

## Definition

Variable type fixed.

Example in C#:

```csharp id="jlwm65"
int data = 42;
```

Cannot later assign:

```csharp id="jlwm31"
data = "Hello";
```

---

# Dynamic vs Static Typing

| Feature              | Dynamic Typing | Static Typing |
| -------------------- | -------------- | ------------- |
| Flexibility          | High           | Lower         |
| Error Safety         | Lower          | Higher        |
| Type Changes Allowed | ✅              | ❌             |

---

# `typeof` Operator

## Purpose

Returns data type as string.

---

# Example: Number

```javascript id="g0s0l5"
let num = 42;

console.log(typeof num);
```

Output:

```text id="jlwm9t"
"number"
```

---

# Example: Boolean

```javascript id="jlwmg0"
let isUserLoggedIn = true;

console.log(typeof isUserLoggedIn);
```

Output:

```text id="jlwmr8"
"boolean"
```

---

# `typeof null` Bug

Example:

```javascript id="jlwmm3"
let exampleVariable = null;

console.log(typeof exampleVariable);
```

Output:

```text id="jlwm11"
"object"
```

---

# Important Note About `typeof null`

This is a historical JavaScript bug.

Even though:

```javascript id="rjlwm4"
null
```

is NOT an object,

`typeof null` returns:

```text id="ujlwm6"
"object"
```

---

# Key Takeaways

* JavaScript adds interactivity to websites
* Variables store data
* JavaScript is dynamically typed
* Strings are immutable
* `let` allows reassignment
* `const` prevents reassignment
* Use meaningful variable names
* Comments improve readability
* `console.log()` helps debugging
* Semicolons improve clarity
* `typeof` helps identify data types
* `typeof null` returning `"object"` is a known bug

---

```
```
