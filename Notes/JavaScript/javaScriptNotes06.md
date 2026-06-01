# JavaScript06.md

# Working with Numbers and Common Number Methods

---

# 1. NaN, isNaN() and Number.isNaN()

## What is NaN?

**NaN (Not a Number)** is a special JavaScript value representing an invalid or undefined numeric result.

```javascript
let result = 0 / 0;

console.log(result); // NaN
```

Although it means "Not a Number", its type is still:

```javascript
console.log(typeof NaN); // "number"
```

---

## Strange Behavior of NaN

NaN is unique because it is not equal to anything, including itself.

```javascript
console.log(NaN === NaN); // false
```

Because of this, normal comparison cannot reliably detect NaN.

---

## Global isNaN()

`isNaN()` checks whether a value becomes NaN after type conversion.

### Examples

```javascript
console.log(isNaN(NaN));        // true
console.log(isNaN(undefined));  // true
console.log(isNaN({}));         // true

console.log(isNaN(true));       // false
console.log(isNaN(null));       // false
console.log(isNaN(37));         // false

console.log(isNaN("37"));       // false
console.log(isNaN("37.37"));    // false
console.log(isNaN(""));         // false
console.log(isNaN(" "));        // false

console.log(isNaN("hello"));    // true
```

### Why?

Because JavaScript first converts values to numbers.

```javascript
Number("37")   // 37
Number("")     // 0
Number(" ")    // 0
```

---

## Number.isNaN()

Introduced in ES6.

Unlike `isNaN()`, it does **not perform type conversion**.

```javascript
console.log(Number.isNaN(NaN));       // true
console.log(Number.isNaN(0 / 0));     // true

console.log(Number.isNaN("NaN"));     // false
console.log(Number.isNaN(undefined)); // false
console.log(Number.isNaN({}));        // false
```

### Recommended Usage

```javascript
let result = 0 / 0;

if (Number.isNaN(result)) {
    result = "Calculation Error";
}

console.log(result);
```

---

## Difference Between isNaN() and Number.isNaN()

| Method         | Converts Value First? | Recommended? |
| -------------- | --------------------- | ------------ |
| isNaN()        | Yes                   | No           |
| Number.isNaN() | No                    | Yes          |

```javascript
isNaN("abc");          // true
Number.isNaN("abc");   // false
```

---

## Exam Questions

### Output?

```javascript
console.log(isNaN("123"));
```

✅ **false**

---

### Best way to check actual NaN?

```javascript
Number.isNaN(value)
```

✅ Correct Answer

---

### Output?

```javascript
NaN === NaN
```

✅ **false**

---

# 2. parseFloat() and parseInt()

These methods convert strings into numbers.

---

## parseFloat()

Converts a string into a floating-point number.

```javascript
console.log(parseFloat("3.14"));      // 3.14
console.log(parseFloat("3.14 abc"));  // 3.14
console.log(parseFloat("3.14.5"));    // 3.14
console.log(parseFloat("abc 3.14"));  // NaN
```

### Rule

* Starts reading from beginning.
* Stops at first invalid character.
* Returns decimal number.

---

## parseInt()

Converts a string into an integer.

```javascript
console.log(parseInt("42"));      // 42
console.log(parseInt("42px"));    // 42
console.log(parseInt("3.14"));    // 3
console.log(parseInt("abc123"));  // NaN
```

### Rule

* Starts from beginning.
* Stops at first non-digit.
* Returns only integer part.

---

## Leading Spaces

Both methods ignore leading spaces.

```javascript
console.log(parseFloat("  3.14")); // 3.14
console.log(parseInt("  42"));     // 42
```

---

## Positive and Negative Signs

```javascript
console.log(parseFloat("+3.14")); // 3.14
console.log(parseInt("-42"));     // -42
```

---

## parseFloat vs parseInt

| Function           | Result |
| ------------------ | ------ |
| parseFloat("3.14") | 3.14   |
| parseInt("3.14")   | 3      |
| parseFloat("42px") | 42     |
| parseInt("42px")   | 42     |

---

## Exam Questions

### Output?

```javascript
console.log(parseInt("10.99"));
```

✅ **10**

---

### Output?

```javascript
console.log(parseInt(" -42abc"));
```

✅ **-42**

---

### Output?

```javascript
console.log(parseFloat("3.14.15"));
```

✅ **3.14**

---

# 3. toFixed()

## What is toFixed()?

Formats a number with a fixed number of decimal places.

```javascript
let num = 3.14159;

console.log(num.toFixed(2));
```

Output:

```javascript
"3.14"
```

---

## Important

`toFixed()` returns a **string**, not a number.

```javascript
let value = 5.67;

console.log(typeof value.toFixed(2));
```

Output:

```javascript
string
```

---

## Rounding Behavior

```javascript
console.log((3.14159).toFixed(3)); // "3.142"
console.log((3.14449).toFixed(3)); // "3.144"
console.log((3.14550).toFixed(3)); // "3.146"
```

### Rule

* Next digit < 5 → round down
* Next digit ≥ 5 → round up

---

## No Argument

```javascript
let num = 3.14159;

console.log(num.toFixed());
```

Output:

```javascript
"3"
```

Rounds to nearest integer and returns string.

---

## Currency Example

```javascript
let price = 19.99;
let tax = 0.08;

let total = price + price * tax;

console.log(total.toFixed(2));
```

Output:

```javascript
"21.59"
```

---

## Exam Questions

### Output?

```javascript
let num = 5.678;
console.log(num.toFixed(1));
```

✅ **"5.7"**

---

### Output?

```javascript
let num1 = 12.345;
let num2 = 67.891;

console.log((num1 + num2).toFixed(2));
```

Sum = 80.236

✅ **"80.24"**

---

### toFixed() without argument?

✅ Returns a string with **0 decimal places**.

---

# 4. Comparisons with null and undefined

## undefined

A variable declared but not assigned a value.

```javascript
let x;

console.log(x); // undefined
```

---

## null

Represents an intentional absence of value.

```javascript
let user = null;
```

---

## Equality Comparison

### Loose Equality (==)

```javascript
console.log(null == undefined);
```

Output:

```javascript
true
```

JavaScript performs type coercion.

---

### Strict Equality (===)

```javascript
console.log(null === undefined);
```

Output:

```javascript
false
```

Different types.

---

## Comparisons with Other Values

```javascript
console.log(null == 0);       // false
console.log(null == "");      // false

console.log(undefined == 0);  // false
console.log(undefined == ""); // false
```

---

## Weird null Behavior

```javascript
console.log(null > 0);   // false
console.log(null == 0);  // false
console.log(null >= 0);  // true
```

This happens because JavaScript handles comparison and equality differently.

---

## undefined in Numeric Comparisons

```javascript
console.log(undefined > 0);  // false
console.log(undefined < 0);  // false
console.log(undefined == 0); // false
```

Reason:

```javascript
Number(undefined) // NaN
```

Comparisons involving NaN are false.

---

## Best Practice

Use strict equality:

```javascript
if (value === null) {
    // ...
}

if (value === undefined) {
    // ...
}
```

Avoid surprises from type coercion.

---

## Exam Questions

### Output?

```javascript
null === undefined
```

✅ **false**

---

### Output?

```javascript
null >= 0
```

✅ **true**

---

### Correct Statement?

```javascript
undefined == 0
```

✅ **false**

---

# 5. Switch Statements

## What is a switch Statement?

Used when one variable can have many possible values.

### Syntax

```javascript
switch (expression) {
    case value1:
        // code
        break;

    case value2:
        // code
        break;

    default:
        // code
}
```

---

## Example

```javascript
let day = 3;

switch(day) {
    case 1:
        console.log("Monday");
        break;

    case 2:
        console.log("Tuesday");
        break;

    case 3:
        console.log("Wednesday");
        break;

    default:
        console.log("Invalid Day");
}
```

Output:

```javascript
Wednesday
```

---

## break Statement

Stops execution after a match.

```javascript
switch(1) {
    case 1:
        console.log("One");

    case 2:
        console.log("Two");
}
```

Output:

```javascript
One
Two
```

Without `break`, execution continues.

This is called **fall-through**.

---

## When to Use switch?

### Good Choice

```javascript
switch(color) {
    case "red":
    case "blue":
    case "green":
}
```

When comparing one variable against many values.

---

## When to Use if/else?

When conditions are complex.

```javascript
if (score >= 90) {
    ...
}
else if (score >= 80) {
    ...
}
```

Or when multiple variables are involved.

```javascript
if (creditScore >= 700 && income >= 50000) {
    ...
}
```

---

## switch Uses Strict Equality

```javascript
switch("5") {
    case 5:
        console.log("Matched");
}
```

No output.

Because switch uses:

```javascript
===
```

not

```javascript
==
```

---

## switch vs if/else

| switch                    | if/else                |
| ------------------------- | ---------------------- |
| One variable, many values | Complex conditions     |
| Cleaner for menus         | More flexible          |
| Uses ===                  | Can use any comparison |

---

## Exam Questions

### What happens without break?

✅ Execution continues into next case (**fall-through**).

---

### Main advantage of switch?

✅ Cleaner when comparing one variable against many values.

---

### What comparison does switch use?

✅ **Strict Equality (===)**

---

# Quick Revision

### NaN

```javascript
Number.isNaN(value)
```

Best way to check NaN.

---

### parseFloat()

```javascript
parseFloat("3.14abc") // 3.14
```

---

### parseInt()

```javascript
parseInt("42px") // 42
```

---

### toFixed()

```javascript
(5.678).toFixed(2) // "5.68"
```

---

### null vs undefined

```javascript
null == undefined   // true
null === undefined  // false
```

---

### switch

```javascript
switch(value) {
    case 1:
        break;
    default:
}
```

Uses strict equality (`===`) and usually requires `break`.
