# JavaScript Notes 04 - Numbers, Operators, and Booleans

---

# 1. Number Type in JavaScript

## Overview
- JavaScript has a single `Number` data type.
- Unlike many languages, JavaScript does **not** separate:
  - Integers
  - Floating-point numbers

All numeric values use the same `number` type.

```js
const wholeNumber = 50;
const decimalNumber = 4.5;
const negativeNumber = -7;

console.log(typeof wholeNumber);    // number
console.log(typeof decimalNumber);  // number
console.log(typeof negativeNumber); // number
```

---

## Integers

Whole numbers without decimal points.

```js
const positiveInteger = 100;
const negativeInteger = -25;
const zero = 0;
```

Examples:
- Positive: `100`
- Negative: `-25`
- Zero: `0`

All are type `number`.

---

## Floating Point Numbers (Floats)

Numbers containing decimal values.

```js
const floatingPointNumber = 4.5;
const anotherFloat = 89.56;
const oneMoreFloat = 16.462;
```

Used when precision is needed:

- Measurements
- Currency
- Scientific calculations

---

## Infinity

Represents values beyond JavaScript's numeric limits.

Most commonly occurs when dividing by zero.

```js
const infiniteNumber = 1 / 0;

console.log(infiniteNumber); // Infinity
console.log(typeof infiniteNumber); // number
```

### Important

```js
10 / 0  // Infinity
```

`Infinity` is still of type `number`.

---

## NaN (Not a Number)

Represents an invalid numeric result.

```js
const notANumber = "hello world" / 2;

console.log(notANumber); // NaN
```

Even though the value means "Not a Number":

```js
console.log(typeof notANumber); // number
```

### Important

- `NaN` means JavaScript failed to create a valid number.
- `NaN` is still a Number type.

---

## Number Systems Supported

### Decimal (Base 10)
Uses digits:

```
0-9
```

Example:

```js
const num = 25;
```

---

### Binary (Base 2)

Uses:

```
0, 1
```

---

### Octal (Base 8)

Uses:

```
0-7
```

---

### Hexadecimal (Base 16)

Uses:

```
0-9
a-f
```

Commonly used in:

- CSS colors
- Low-level programming

Example:

```css
#FF0000
```

---

# 2. Arithmetic Operators

Arithmetic operators perform mathematical calculations.

---

## Addition (+)

Adds numbers together.

```js
const result = 10 + 5;

console.log(result); // 15
```

Order does not matter.

```js
10 + 5 === 5 + 10
```

---

## Subtraction (-)

Finds the difference between numbers.

```js
const result = 10 - 5;

console.log(result); // 5
```

Order matters.

```js
5 - 10 // -5
```

---

## Multiplication (*)

Multiplies numbers.

```js
const result = 10 * 5;

console.log(result); // 50
```

Order does not matter.

```js
10 * 5 === 5 * 10
```

---

## Division (/)

Divides numbers.

```js
const result = 10 / 5;

console.log(result); // 2
```

Order matters.

```js
10 / 5 // 2
5 / 10 // 0.5
```

### Division by Zero

```js
console.log(10 / 0);
```

Output:

```js
Infinity
```

Avoid division by zero.

---

## Remainder (%)

Returns the leftover value after division.

```js
const remainder = 10 % 3;

console.log(remainder); // 1
```

Example:

```js
5 % 2 // 1
8 % 2 // 0
```

Useful for:
- Checking even/odd numbers
- Cyclic calculations

---

## Exponentiation (**)

Raises a number to a power.

```js
const result = 2 ** 3;

console.log(result); // 8
```

Equivalent to:

```text
2 × 2 × 2
```

---

## Mixed Expressions

```js
const result = 10 + 5 * 2 - 8 / 4;

console.log(result); // 18
```

JavaScript follows **operator precedence** when evaluating expressions.

---

# 3. Numbers and Strings (Type Coercion)

## What is Type Coercion?

Automatic conversion of one data type into another.

---

## Addition with Strings

The `+` operator can perform:

1. Addition
2. String concatenation

If one operand is a string, JavaScript converts the other value to a string.

```js
const result = 5 + "10";

console.log(result); // "510"
console.log(typeof result); // string
```

---

```js
const result = "10" + 5;

console.log(result); // "105"
```

---

## Subtraction with Strings

JavaScript attempts to convert strings into numbers.

```js
const result = "10" - 5;

console.log(result); // 5
console.log(typeof result); // number
```

---

## Multiplication with Strings

```js
const result = "10" * 2;

console.log(result); // 20
```

---

## Division with Strings

```js
const result = "20" / 2;

console.log(result); // 10
```

---

## Invalid Numeric Strings

```js
const result = "abc" - 5;

console.log(result); // NaN
```

```js
"abc" * 2 // NaN
"abc" / 2 // NaN
```

Reason:
- JavaScript cannot convert `"abc"` into a valid number.

---

## Booleans in Arithmetic

JavaScript converts:

```js
true  -> 1
false -> 0
```

Example:

```js
console.log(true + 1);  // 2
console.log(false + 1); // 1
```

---

### Boolean + String

```js
console.log("Hello" + true);
```

Output:

```js
"Hellotrue"
```

---

## null in Arithmetic

JavaScript converts:

```js
null -> 0
```

```js
console.log(null + 5);
```

Output:

```js
5
```

---

## undefined in Arithmetic

JavaScript converts:

```js
undefined -> NaN
```

```js
console.log(undefined + 5);
```

Output:

```js
NaN
```

---

# 4. Operator Precedence

## Definition

Operator precedence determines the order in which operations are evaluated.

Higher precedence operators execute before lower precedence operators.

---

## Example

```js
const result = 2 + 3 * 4;

console.log(result); // 14
```

Evaluation:

```text
3 * 4 = 12
2 + 12 = 14
```

Not:

```text
(2 + 3) * 4
```

---

## Using Parentheses

Parentheses override precedence.

```js
const result = (2 + 3) * 4;

console.log(result); // 20
```

Evaluation:

```text
2 + 3 = 5
5 * 4 = 20
```

---

## Division Before Addition

```js
const result = 2 + 6 / 3;

console.log(result); // 4
```

Evaluation:

```text
6 / 3 = 2
2 + 2 = 4
```

---

# 5. Associativity

When operators have the same precedence, JavaScript uses associativity.

Associativity determines evaluation direction.

---

## Left-to-Right Associativity

Most arithmetic operators.

```js
const result = 10 - 2 + 3;

console.log(result); // 11
```

Evaluation:

```text
10 - 2 = 8
8 + 3 = 11
```

---

## Right-to-Left Associativity

### Assignment Operator

```js
let a, b;

a = b = 5;
```

Evaluation:

```text
b = 5
a = b
```

Result:

```js
a === 5
b === 5
```

---

### Exponentiation Operator

```js
const result = 2 ** 3 ** 2;

console.log(result); // 512
```

Evaluation:

```text
3 ** 2 = 9
2 ** 9 = 512
```

Not:

```text
(2 ** 3) ** 2
```

---

# 6. Increment and Decrement Operators

Used to change a variable by exactly 1.

---

## Increment (++)

Adds 1.

```js
x++;
```

Equivalent to:

```js
x = x + 1;
```

---

## Decrement (--)

Subtracts 1.

```js
x--;
```

Equivalent to:

```js
x = x - 1;
```

---

# 7. Prefix vs Postfix

---

## Prefix Increment (++x)

Increment first, then return value.

```js
let x = 5;

console.log(++x); // 6
console.log(x);   // 6
```

---

## Postfix Increment (x++)

Return current value first, then increment.

```js
let y = 5;

console.log(y++); // 5
console.log(y);   // 6
```

---

## Prefix Decrement (--x)

```js
let x = 5;

console.log(--x); // 4
console.log(x);   // 4
```

---

## Postfix Decrement (x--)

```js
let y = 5;

console.log(y--); // 5
console.log(y);   // 4
```

---

## Assignment Difference

### Prefix

```js
let a = 5;
let b = ++a;

console.log(b); // 6
```

---

### Postfix

```js
let c = 5;
let d = c++;

console.log(d); // 5
```

### Rule

Use:

```js
++x
```

when you need the updated value immediately.

Use:

```js
x++
```

when current value is needed first.

---

# 8. Compound Assignment Operators

## Purpose

Combine an operation and assignment.

General form:

```js
x OP= y
```

Equivalent to:

```js
x = x OP y
```

---

## Addition Assignment (+=)

```js
let num = 5;

num += 2;

console.log(num); // 7
```

Equivalent:

```js
num = num + 2;
```

---

## Subtraction Assignment (-=)

```js
let score = 20;

score -= 7;

console.log(score); // 13
```

Equivalent:

```js
score = score - 7;
```

---

## Multiplication Assignment (*=)

```js
let points = 5;

points *= 3;

console.log(points); // 15
```

Equivalent:

```js
points = points * 3;
```

---

## Division Assignment (/=)

```js
let balance = 100;

balance /= 4;

console.log(balance); // 25
```

Equivalent:

```js
balance = balance / 4;
```

---

## Other Compound Operators

### Remainder Assignment

```js
%=
```

```js
x %= y;
```

Equivalent:

```js
x = x % y;
```

---

### Exponent Assignment

```js
**=
```

```js
x **= y;
```

Equivalent:

```js
x = x ** y;
```

---

### Bitwise AND Assignment

```js
&=
```

---

### Bitwise OR Assignment

```js
|=
```

---

# 9. Booleans

## Overview

Boolean values can only be:

```js
true
false
```

Used for:
- Conditions
- Decisions
- Comparisons
- Loops

Example:

```js
let isOldEnoughToDrive = true;
```

---

## Using Booleans in Conditions

```js
if (isOldEnoughToDrive) {
  console.log("You're old enough to drive");
} else {
  console.log("Sorry, you are not old enough to drive");
}
```

---

# 10. Equality Operators

---

## Equality (==)

Performs type coercion before comparison.

```js
console.log(5 == "5");
```

Output:

```js
true
```

Reason:

```text
"5" → 5
```

then:

```text
5 == 5
```

---

## Strict Equality (===)

No type coercion.

Checks:
1. Value
2. Type

```js
console.log(5 === "5");
```

Output:

```js
false
```

Because:

```text
number !== string
```

---

# 11. Inequality Operators

---

## Inequality (!=)

Performs type coercion.

```js
console.log(5 != "5");
```

Output:

```js
false
```

Because:

```text
"5" → 5
5 != 5 → false
```

---

## Strict Inequality (!==)

No type coercion.

```js
console.log(5 !== "5");
```

Output:

```js
true
```

Because types differ.

---

## Best Practice

Prefer:

```js
===
!==
```

Reason:
- No hidden type conversions
- More predictable
- Common in professional codebases

---

# 12. Comparison Operators

Comparison operators return:

```js
true
false
```

---

## Greater Than (>)

```js
console.log(9 > 6); // true
console.log(6 > 9); // false
```

---

## Greater Than or Equal (>=)

```js
console.log(9 >= 6); // true
console.log(6 >= 6); // true
```

Checks:

```text
greater than OR equal
```

---

## Less Than (<)

```js
console.log(6 < 9); // true
console.log(9 < 6); // false
```

---

## Less Than or Equal (<=)

```js
console.log(6 <= 9); // true
console.log(6 <= 6); // true
```

Checks:

```text
less than OR equal
```

---

# Quick Summary

## Number Values

```js
50
4.5
-7
Infinity
NaN
```

---

## Arithmetic Operators

```js
+   Addition
-   Subtraction
*   Multiplication
/   Division
%   Remainder
**  Exponentiation
```

---

## Compound Assignment

```js
+=
-=
*=
/=
%=
**=
&=
|=
```

---

## Increment/Decrement

```js
++x   Prefix Increment
x++   Postfix Increment

--x   Prefix Decrement
x--   Postfix Decrement
```

---

## Equality Operators

```js
==    Equality (type coercion)
===   Strict Equality

!=    Inequality (type coercion)
!==   Strict Inequality
```

---

## Comparison Operators

```js
>    Greater Than
>=   Greater Than or Equal

<    Less Than
<=   Less Than or Equal
```

---

## Best Practices

✅ Use `===` and `!==` instead of `==` and `!=`

✅ Use parentheses when expression order matters

✅ Avoid dividing by zero

✅ Be careful when mixing strings and numbers

✅ Remember:
```js
true  -> 1
false -> 0
null  -> 0
undefined -> NaN
```