# JavaScript05.md

# Working with Unary and Bitwise Operators

## What Are Unary Operators, and How Do They Work?

Unary operators work on **one operand (value)** and are used for type conversion, value manipulation, and condition checking.

### Unary Plus (`+`)

Converts a value into a number.

```js
const str = "42";
console.log(+str); // 42
console.log(typeof +str); // number
```

### Unary Negation (`-`)

Converts a value into a number and changes its sign.

```js
const str = "42";
console.log(-str); // -42
```

### Logical NOT (`!`)

Reverses a boolean value.

```js
console.log(!true);  // false
console.log(!false); // true
```

### Bitwise NOT (`~`)

Flips every bit (0 → 1, 1 → 0).

```js
console.log(~5); // -6
```

For integers:

```text
~n = -(n + 1)
```

Example:

```text
~5 = -(5 + 1) = -6
```

### void Operator

Evaluates an expression and always returns `undefined`.

```js
console.log(void(2 + 2)); // undefined
```

Common use:

```html
<a href="javascript:void(0)">Click Me</a>
```

### typeof Operator

Returns the data type as a string.

```js
console.log(typeof "Hello"); // string
console.log(typeof 10);      // number
console.log(typeof true);    // boolean
```

### Key Points

* Unary operators work on a single operand.
* `+` converts to number.
* `-` converts and negates.
* `!` flips boolean values.
* `~` flips binary bits.
* `void` returns `undefined`.
* `typeof` returns the operand's type.

---

# What Are Bitwise Operators, and How Do They Work?

Bitwise operators work directly on the **binary representation** of numbers.

## Binary Basics

Decimal 10:

```text
1010

1×2³ + 0×2² + 1×2¹ + 0×2⁰
= 8 + 0 + 2 + 0
= 10
```

## Bitwise AND (`&`)

Returns 1 only when both bits are 1.

```js
let a = 5; // 101
let b = 3; // 011

console.log(a & b); // 1
```

```text
101
011
---
001
```

---

## Bitwise OR (`|`)

Returns 1 if either bit is 1.

```js
console.log(5 | 3); // 7
```

```text
101
011
---
111
```

---

## Bitwise XOR (`^`)

Returns 1 when bits are different.

```js
console.log(5 ^ 3); // 6
```

```text
101
011
---
110
```

---

## Bitwise NOT (`~`)

Flips all bits.

```js
console.log(~5); // -6
```

---

## Left Shift (`<<`)

Moves bits left.

```js
console.log(5 << 1); // 10
```

```text
101 -> 1010
```

Effectively multiplies by 2 for each shift.

```text
x << n ≈ x × 2ⁿ
```

---

## Right Shift (`>>`)

Moves bits right.

```js
console.log(5 >> 1); // 2
```

```text
101 -> 10
```

Effectively divides by 2 and rounds down.

```text
x >> n ≈ floor(x / 2ⁿ)
```

### Key Points

| Operator | Meaning     |    |
| -------- | ----------- | -- |
| `&`      | AND         |    |
| `        | `           | OR |
| `^`      | XOR         |    |
| `~`      | NOT         |    |
| `<<`     | Left Shift  |    |
| `>>`     | Right Shift |    |

---

# Working with Conditional Logic and Math Methods

## What Are Conditional Statements?

Conditional statements allow code to make decisions based on conditions.

---

## Truthy and Falsy Values

### Truthy Values

* Non-empty strings
* Non-zero numbers
* Arrays
* Objects
* `true`

Examples:

```js
if ("hello") {}
if (5) {}
if ([]) {}
if ({}) {}
```

### Falsy Values

```js
false
0
""
null
undefined
NaN
```

---

## if Statement

Runs code only when the condition is true.

```js
const age = 22;

if (age >= 18) {
  console.log("Eligible to vote");
}
```

---

## if...else

Choose between two paths.

```js
const age = 15;

if (age >= 18) {
  console.log("Eligible");
} else {
  console.log("Not eligible");
}
```

---

## else if

Checks multiple conditions.

```js
const score = 87;

if (score >= 90) {
  console.log("A");
}
else if (score >= 80) {
  console.log("B");
}
else if (score >= 70) {
  console.log("C");
}
else {
  console.log("Fail");
}
```

Output:

```text
B
```

---

## Ternary Operator

Short form of if/else.

Syntax:

```js
condition ? valueIfTrue : valueIfFalse
```

Example:

```js
const temperature = 30;

const weather =
  temperature > 25 ? "sunny" : "cool";

console.log(weather);
```

Output:

```text
sunny
```

### When to Use

**Use ternary:**

* Simple conditions
* Single expressions

**Use if/else:**

* Multiple conditions
* Complex logic

---

# What Are Binary Logical Operators, and How Do They Work?

Binary logical operators evaluate two expressions.

## Logical AND (`&&`)

Returns the first falsy value, or the last value if all are truthy.

```js
console.log(true && "hello");
// hello
```

```js
console.log(0 && 3);
// 0
```

```js
console.log(false && 0);
// false
```

Example:

```js
if (2 < 3 && 3 < 4) {
  console.log("Runs");
}
```

Output:

```text
Runs
```

---

## Logical OR (`||`)

Returns the first truthy value.

```js
console.log("Hello" || false);
// Hello
```

```js
console.log(0 || "Hello");
// Hello
```

Common default value pattern:

```js
let userInput;

console.log(userInput || "Guest");
```

Output:

```text
Guest
```

---

## Nullish Coalescing (`??`)

Returns the right value only when the left value is:

* `null`
* `undefined`

```js
console.log(null ?? "default");
// default
```

```js
console.log(undefined ?? "default");
// default
```

```js
console.log(0 ?? "default");
// 0
```

Unlike `||`, it does **not** treat `0`, `false`, or `""` as missing values.

Example:

```js
const settings = {
  theme: null
};

console.log(settings.theme ?? "light");
```

Output:

```text
light
```

### Key Difference

```js
0 || "default"   // default
0 ?? "default"   // 0
```

---

# What Is the Math Object in JavaScript?

The `Math` object provides built-in methods for advanced mathematical operations.

---

## Math.random()

Returns a random number:

```js
console.log(Math.random());
```

Range:

```text
0 ≤ number < 1
```

---

## Math.min() and Math.max()

```js
console.log(Math.min(1,5,3,9)); // 1
console.log(Math.max(1,5,3,9)); // 9
```

---

## Math.ceil()

Rounds up.

```js
console.log(Math.ceil(4.3));
// 5
```

---

## Math.floor()

Rounds down.

```js
console.log(Math.floor(4.7));
// 4
```

---

## Math.round()

Rounds to nearest integer.

```js
console.log(Math.round(2.3)); // 2
console.log(Math.round(4.5)); // 5
console.log(Math.round(4.8)); // 5
```

Rule:

```text
Decimal < 0.5 → Down
Decimal ≥ 0.5 → Up
```

---

## Random Integer in Range

Between 1 and 20:

```js
const randomNum =
  Math.floor(Math.random() * 20) + 1;
```

General formula:

```js
Math.floor(
  Math.random() * (max - min + 1)
) + min;
```

---

## Math.trunc()

Removes decimal part.

```js
console.log(Math.trunc(2.9)); // 2
console.log(Math.trunc(9.1)); // 9
```

---

## Math.sqrt()

Square root.

```js
console.log(Math.sqrt(81));
// 9
```

---

## Math.cbrt()

Cube root.

```js
console.log(Math.cbrt(27));
// 3
```

---

## Math.abs()

Absolute value.

```js
console.log(Math.abs(-5)); // 5
console.log(Math.abs(5));  // 5
```

---

## Math.pow()

Raises a number to a power.

```js
console.log(Math.pow(2,3));
// 8

console.log(Math.pow(8,2));
// 64
```

Equivalent modern syntax:

```js
console.log(2 ** 3);
```

### Key Math Methods

| Method          | Purpose         |
| --------------- | --------------- |
| `Math.random()` | Random number   |
| `Math.min()`    | Smallest value  |
| `Math.max()`    | Largest value   |
| `Math.ceil()`   | Round up        |
| `Math.floor()`  | Round down      |
| `Math.round()`  | Nearest integer |
| `Math.trunc()`  | Remove decimals |
| `Math.sqrt()`   | Square root     |
| `Math.cbrt()`   | Cube root       |
| `Math.abs()`    | Absolute value  |
| `Math.pow()`    | Exponentiation  |

---

## Quick Revision

### Unary Operators

```js
+x   // convert to number
-x   // negate
!x   // logical NOT
~x   // bitwise NOT
typeof x
void x
```

### Conditional Statements

```js
if
else
else if
ternary (? :)
```

### Logical Operators

```js
&&  // AND
||  // OR
??  // Nullish Coalescing
```

### Important Math Methods

```js
Math.random()
Math.floor()
Math.ceil()
Math.round()
Math.min()
Math.max()
Math.sqrt()
Math.abs()
Math.pow()
```
