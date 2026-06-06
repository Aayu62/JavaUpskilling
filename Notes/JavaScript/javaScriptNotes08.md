# Working with Arrays

## What Are the Key Characteristics of JavaScript Arrays?

### What Is an Array?
An **array** in JavaScript is an **ordered collection of values**, where each value is identified by a **numeric index**.

Arrays can store different types of data, including:

- Numbers
- Strings
- Booleans
- Objects
- Other arrays

### Creating an Array

```javascript
let fruits = ["apple", "banana", "orange"];
```

Here:

- `fruits` is an array.
- It contains three string values:
  - `"apple"`
  - `"banana"`
  - `"orange"`

---

### Arrays Are Zero-Indexed

JavaScript arrays start counting from **0**.

| Element | Index |
|----------|--------|
| apple | 0 |
| banana | 1 |
| orange | 2 |

Example:

```javascript
let fruits = ["apple", "banana", "orange"];

console.log(fruits[0]); // "apple"
console.log(fruits[2]); // "orange"
```

---

### Accessing Array Length

Arrays have a special `length` property that returns the total number of elements.

```javascript
let fruits = ["apple", "banana", "orange"];

console.log(fruits.length); // 3
```

---

### Arrays Are Dynamic

JavaScript arrays can grow or shrink after creation.

You can add or remove elements using methods such as:

- `push()`
- `pop()`
- `shift()`
- `unshift()`
- `splice()`

These methods modify the array size dynamically.

---

### Why Arrays Are Useful

Arrays help efficiently:

- Store collections of data
- Organize information
- Manipulate groups of values
- Process large datasets

---

### Quick Quiz Answers

#### 1. Which statement is NOT true about JavaScript arrays?

✅ **They are an unordered collection of values.**

Arrays are ordered collections.

---

#### 2. Output?

```javascript
let numbers = [1, 2, 3, 4, 5];

console.log(numbers[2]);
```

✅ **3**

---

#### 3. Output?

```javascript
let colors = ["red", "green", "blue"];

console.log(colors.length);
```

✅ **3**

---

# How Do You Access and Update Elements in an Array?

## Accessing Elements

```javascript
const fruits = ["apple", "banana", "cherry"];

console.log(fruits[1]);
```

Output:

```javascript
"banana"
```

Remember:

- First element → index `0`
- Second element → index `1`
- Third element → index `2`

---

## Accessing Non-Existent Indices

If an index doesn't exist, JavaScript returns `undefined`.

```javascript
let fruits = ["apple", "banana", "cherry"];

console.log(fruits[3]);
```

Output:

```javascript
undefined
```

---

## Updating Existing Elements

Assign a new value to a specific index.

```javascript
let fruits = ["apple", "banana", "cherry"];

fruits[1] = "blueberry";

console.log(fruits);
```

Output:

```javascript
["apple", "blueberry", "cherry"]
```

---

## Adding Elements Using an Index

You can assign a value to a new index.

```javascript
let fruits = ["apple", "banana", "cherry"];

fruits[3] = "date";

console.log(fruits);
```

Output:

```javascript
["apple", "banana", "cherry", "date"]
```

---

## Important Warning

Assigning a value to an index far beyond the array length creates empty slots (`undefined`) between indices.

Example:

```javascript
let arr = ["a"];

arr[5] = "b";
```

Result:

```javascript
["a", undefined, undefined, undefined, undefined, "b"]
```

This can lead to unexpected behavior.

---

### Quick Quiz Answers

#### 1. What does this return?

```javascript
let numbers = [10, 20, 30, 40, 50];

numbers[2];
```

✅ **30**

---

#### 2. What happens when an index doesn't exist?

✅ **It returns `undefined`.**

---

#### 3. What is the index of the first element?

✅ **0**

---

# How Do You Add and Remove Elements from the Beginning and End of an Array?

JavaScript provides four main methods:

| Method | Purpose |
|----------|----------|
| `push()` | Add to end |
| `pop()` | Remove from end |
| `unshift()` | Add to beginning |
| `shift()` | Remove from beginning |

---

## push()

Adds one or more elements to the end.

### Returns:
The new array length.

```javascript
const fruits = ["apple", "banana"];

const newLength = fruits.push("orange");

console.log(newLength); // 3
console.log(fruits);
```

Output:

```javascript
["apple", "banana", "orange"]
```

---

### Using push() with const Arrays

```javascript
const fruits = ["apple", "banana"];

fruits.push("orange");
```

Works because:

- `const` prevents reassignment.
- It does NOT prevent modifying array contents.

This is invalid:

```javascript
const fruits = ["apple", "banana"];

fruits = ["This", "will", "not", "work"];
```

Output:

```javascript
Uncaught TypeError: Assignment to constant variable.
```

---

## pop()

Removes the last element.

### Returns:
The removed element.

```javascript
let fruits = ["apple", "banana", "orange"];

let lastFruit = fruits.pop();

console.log(fruits);
console.log(lastFruit);
```

Output:

```javascript
["apple", "banana"]
"orange"
```

---

## unshift()

Adds one or more elements to the beginning.

### Returns:
New array length.

```javascript
let numbers = [2, 3];

let newLength = numbers.unshift(1);

console.log(numbers);
console.log(newLength);
```

Output:

```javascript
[1, 2, 3]
3
```

---

## shift()

Removes the first element.

### Returns:
Removed element.

```javascript
let colors = ["red", "green", "blue"];

let firstColor = colors.shift();

console.log(colors);
console.log(firstColor);
```

Output:

```javascript
["green", "blue"]
"red"
```

---

## Important Note

- `push()` and `unshift()` can add multiple elements.
- `pop()` and `shift()` remove only one element at a time.

---

### Quick Quiz Answers

#### 1. Output?

```javascript
let arr = [1, 2, 3];

arr.push(4);
arr.unshift(0);

console.log(arr);
```

✅

```javascript
[0, 1, 2, 3, 4]
```

---

#### 2. Output?

```javascript
let arr = ["a", "b", "c", "d"];

let first = arr.shift();
let last = arr.pop();

console.log(first, last, arr);
```

✅

```javascript
"a" "d" ["b", "c"]
```

---

#### 3. Output?

```javascript
let arr = ["a", "b", "c"];

arr.unshift("x", "y");
arr.pop();

console.log(arr);
```

✅

```javascript
["x", "y", "a", "b"]
```

---

# What Is the Difference Between One-Dimensional and Two-Dimensional Arrays?

## One-Dimensional Arrays

A one-dimensional array is a simple list of values.

Think of it as:

> A single row of lockers.

Example:

```javascript
let fruits = ["apple", "banana", "cherry", "date"];

console.log(fruits[2]);
```

Output:

```javascript
"cherry"
```

Only **one index** is needed.

---

## Two-Dimensional Arrays

A two-dimensional array is an **array of arrays**.

Think of it as:

> A grid with rows and columns.

Used for:

- Chessboards
- Tables
- Spreadsheets
- Images
- Grids

---

### Example

```javascript
let chessboard = [
    ["R", "N", "B", "Q", "K", "B", "N", "R"],
    ["P", "P", "P", "P", "P", "P", "P", "P"],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    [" ", " ", " ", " ", " ", " ", " ", " "],
    ["p", "p", "p", "p", "p", "p", "p", "p"],
    ["r", "n", "b", "q", "k", "b", "n", "r"]
];

console.log(chessboard[0][3]);
```

Output:

```javascript
"Q"
```

Explanation:

- `chessboard[0]` → first row
- `chessboard[0][3]` → fourth column in first row

---

## Key Difference

| One-Dimensional | Two-Dimensional |
|---------------|----------------|
| Uses one index | Uses two indices |
| Represents lists | Represents grids |
| Simpler structure | Nested arrays |

---

### Important Note

In JavaScript, a 2D array is simply:

```javascript
Array<Array>
```

or

```javascript
An array of arrays
```

---

### Quick Quiz Answers

#### 1. How many indices are needed for a 2D array element?

✅ **Two**

---

#### 2. Best represented by a 1D array?

✅ **A list of items**

---

#### 3. What is a 2D array in JavaScript?

✅ **An array of arrays**

---

# What Is Array Destructuring, and How Does It Work?

Array destructuring allows you to extract array values into variables more easily.

---

## Basic Destructuring

```javascript
let fruits = ["apple", "banana", "orange"];

let [first, second, third] = fruits;

console.log(first);
console.log(second);
console.log(third);
```

Output:

```javascript
apple
banana
orange
```

---

## Equivalent Without Destructuring

```javascript
const fruits = ["apple", "banana", "orange"];

const first = fruits[0];
const second = fruits[1];
const third = fruits[2];
```

---

## Skipping Elements

Use commas to skip values.

```javascript
let colors = ["red", "green", "blue", "yellow"];

let [firstColor, , thirdColor] = colors;

console.log(firstColor);
console.log(thirdColor);
```

Output:

```javascript
red
blue
```

---

## Default Values

```javascript
let numbers = [1, 2];

let [a, b, c = 3] = numbers;

console.log(c);
```

Output:

```javascript
3
```

Default value is used because no third element exists.

---

## Rest Syntax (...)

Collects remaining elements into a new array.

```javascript
let fruits = ["apple", "banana", "orange", "mango", "kiwi"];

let [first, second, ...rest] = fruits;

console.log(rest);
```

Output:

```javascript
["orange", "mango", "kiwi"]
```

### Rule

The rest element:

```javascript
...rest
```

must be the **last element** in the destructuring pattern.

---

### Quick Quiz Answers

#### 1. Output?

```javascript
let numbers = [1, 2, 3, 4, 5];

let [a, , b, ...rest] = numbers;

console.log(a, b, rest);
```

✅

```javascript
1 3 [4, 5]
```

---

#### 2. Output?

```javascript
let colors = ["red", "green", "blue"];

let [primary, secondary, tertiary, quaternary = "yellow"] = colors;

console.log(quaternary);
```

✅

```javascript
"yellow"
```

---

#### 3. Output?

```javascript
let fruits = ["apple", "banana", "orange", "grape"];

let [first, ...rest, last] = fruits;
```

✅ **SyntaxError**

Reason:

```javascript
...rest
```

must be the last element.

---

# How Can You Use String and Array Methods to Reverse a String?

Reversing a string requires three steps:

1. Split the string into characters.
2. Reverse the array.
3. Join the array back into a string.

---

## Step 1: split()

Converts a string into an array.

### Common Separators

| Separator | Result |
|------------|----------|
| `""` | Individual characters |
| `" "` | Words separated by spaces |
| `"-"` | Split at dashes |

Example:

```javascript
let str = "hello";

let charArray = str.split("");

console.log(charArray);
```

Output:

```javascript
["h", "e", "l", "l", "o"]
```

---

## Step 2: reverse()

Reverses an array in place.

```javascript
let charArray = ["h", "e", "l", "l", "o"];

charArray.reverse();

console.log(charArray);
```

Output:

```javascript
["o", "l", "l", "e", "h"]
```

Important:

- Modifies the original array.
- Does not create a new array.

---

## Step 3: join()

Combines array elements into a string.

```javascript
let reversedArray = ["o", "l", "l", "e", "h"];

let reversedString = reversedArray.join("");

console.log(reversedString);
```

Output:

```javascript
"olleh"
```

---

## Complete String Reversal

```javascript
let str = "hello";

let reversed = str
    .split("")
    .reverse()
    .join("");

console.log(reversed);
```

Output:

```javascript
olleh
```

---

## Why Not Reverse a String Directly?

Strings are **immutable** in JavaScript.

This means:

- Strings cannot be modified directly.
- You must convert them into arrays first.

---

## String Reversal Formula

```javascript
str.split("").reverse().join("")
```

This is the most common JavaScript pattern for reversing a string.

---

### Quick Quiz Answers

#### 1. Output?

```javascript
let str = "coding";

let reversed = str.split("").reverse().join("");

console.log(reversed);
```

✅

```javascript
gnidoc
```

---

#### 2. Result of:

```javascript
"hello".split("")
```

✅

```javascript
["h", "e", "l", "l", "o"]
```

---

#### 3. Output?

```javascript
let word = "hello";

let chars = word.split("");

chars.reverse();

console.log(chars.join("-"));
```

✅

```javascript
o-l-l-e-h
```

---

# Key Takeaways

- Arrays are ordered, zero-indexed, and dynamic collections.
- Access elements using `array[index]`.
- Non-existent indices return `undefined`.
- Use:
  - `push()` → add to end
  - `pop()` → remove from end
  - `unshift()` → add to beginning
  - `shift()` → remove from beginning
- One-dimensional arrays use one index.
- Two-dimensional arrays are arrays of arrays and use two indices.
- Array destructuring extracts array values into variables.
- Rest syntax (`...rest`) collects remaining elements and must appear last.
- Strings can be reversed using:
  ```javascript
  str.split("").reverse().join("")
  ```
- `split()` creates arrays from strings.
- `reverse()` reverses arrays in place.
- `join()` converts arrays back into strings.