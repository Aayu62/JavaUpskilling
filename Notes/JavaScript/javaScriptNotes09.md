# JavaScript Arrays (Part 2)

# How Do You Get the Index for an Element in an Array Using the `indexOf()` Method?

The `indexOf()` method is used to find the **first occurrence** of an element in an array.

If the element is found, it returns its index.

If the element is not found, it returns:

```javascript
-1
```

---

## Syntax

```javascript
array.indexOf(element, fromIndex)
```

### Parameters

| Parameter | Description |
|------------|------------|
| `element` | Value to search for |
| `fromIndex` | Optional starting index for the search |

If `fromIndex` is omitted, the search starts from index `0`.

---

## Finding an Element

```javascript
let fruits = ["apple", "banana", "orange", "banana"];

let index = fruits.indexOf("banana");

console.log(index);
```

Output:

```javascript
1
```

Even though `"banana"` appears twice, `indexOf()` returns the **first occurrence**.

---

## Element Not Found

```javascript
let fruits = ["apple", "banana", "orange"];

let index = fruits.indexOf("grape");

console.log(index);
```

Output:

```javascript
-1
```

Because `"grape"` does not exist in the array.

---

## Using the `fromIndex` Parameter

```javascript
let colors = ["red", "green", "blue", "yellow", "green"];

let index = colors.indexOf("green", 3);

console.log(index);
```

Output:

```javascript
4
```

Explanation:

- Search starts at index `3`
- Index `3` contains `"yellow"`
- The next `"green"` appears at index `4`

---

## Important Notes

### Returns First Match Only

```javascript
let arr = [1, 2, 3, 2, 4];

console.log(arr.indexOf(2));
```

Output:

```javascript
1
```

Only the first occurrence is returned.

---

### Returns `-1` if Missing

```javascript
console.log(arr.indexOf(100));
```

Output:

```javascript
-1
```

---

## Quick Quiz Answers

### 1. Output?

```javascript
let numbers = [10, 20, 30, 20, 40];

let index = numbers.indexOf(20);

console.log(index);
```

✅

```javascript
1
```

---

### 2. Output?

```javascript
let fruits = ["apple", "banana", "orange", "grape"];

let index = fruits.indexOf("kiwi");

console.log(index);
```

✅

```javascript
-1
```

---

### 3. Output?

```javascript
let colors = ["red", "green", "blue", "yellow", "green"];

let index = colors.indexOf("green", 2);

console.log(index);
```

✅

```javascript
4
```

---

# How Do You Add and Remove Elements from the Middle of an Array?

The `splice()` method allows you to:

- Add elements
- Remove elements
- Replace elements

at **any position** in an array.

---

## Important Characteristics

### Mutates the Original Array

`splice()` modifies the existing array instead of creating a new one.

---

### Return Value

Returns an array containing the removed elements.

If nothing is removed:

```javascript
[]
```

is returned.

---

## Syntax

```javascript
array.splice(startIndex, itemsToRemove, item1, item2, ...)
```

### Parameters

| Parameter | Description |
|------------|------------|
| `startIndex` | Position to start modifying |
| `itemsToRemove` | Number of elements to remove |
| `item1, item2...` | Elements to insert |

---

# Removing Elements

```javascript
let fruits = ["apple", "banana", "orange", "mango", "kiwi"];

let removed = fruits.splice(2, 2);

console.log(fruits);
console.log(removed);
```

Output:

```javascript
["apple", "banana", "kiwi"]
["orange", "mango"]
```

Explanation:

- Start at index `2`
- Remove `2` items

---

# Adding Elements

```javascript
let colors = ["red", "green", "blue"];

colors.splice(1, 0, "yellow", "purple");

console.log(colors);
```

Output:

```javascript
["red", "yellow", "purple", "green", "blue"]
```

Explanation:

- Start at index `1`
- Remove `0` elements
- Insert `"yellow"` and `"purple"`

---

# Removing and Adding Simultaneously

```javascript
let numbers = [1, 2, 3, 4, 5];

numbers.splice(1, 2, 6, 7, 8);

console.log(numbers);
```

Output:

```javascript
[1, 6, 7, 8, 4, 5]
```

Explanation:

- Remove `2` and `3`
- Insert `6`, `7`, `8`

---

# Creating a Copy Before Using `splice()`

Since `splice()` mutates arrays, you may want to create a copy first.

```javascript
let original = [1, 2, 3, 4, 5];

let copy = [...original];

copy.splice(2, 1, 6);

console.log(original);
console.log(copy);
```

Output:

```javascript
[1, 2, 3, 4, 5]
[1, 2, 6, 4, 5]
```

---

## Using `splice()` with `indexOf()`

A common pattern:

```javascript
let fruits = ["apple", "banana", "orange", "mango"];

let indexToRemove = fruits.indexOf("orange");

if (indexToRemove !== -1) {
    fruits.splice(indexToRemove, 1);
}

console.log(fruits);
```

Output:

```javascript
["apple", "banana", "mango"]
```

---

## Clearing an Entire Array

```javascript
let array = [1, 2, 3, 4, 5];

array.splice(0);

console.log(array);
```

Output:

```javascript
[]
```

---

## Performance Consideration

For very large arrays, `splice()` can be slower because elements may need to be shifted.

For operations at the beginning or end, consider:

- `push()`
- `pop()`
- `shift()`
- `unshift()`

---

## Quick Quiz Answers

### 1. Output?

```javascript
let arr = [1, 2, 3, 4, 5];

arr.splice(2, 0, 6, 7);

console.log(arr);
```

✅

```javascript
[1, 2, 6, 7, 3, 4, 5]
```

---

### 2. Which removes the number `3`?

```javascript
let arr = [1, 2, 3, 4, 5];
```

✅

```javascript
arr.splice(2, 1)
```

---

### 3. What does `splice()` return?

✅

```javascript
An array containing the removed elements
```

---

# How Can You Check if an Array Contains a Certain Value?

The `includes()` method checks whether an array contains a specific value.

---

## Return Value

Returns:

```javascript
true
```

if found.

Returns:

```javascript
false
```

if not found.

---

## Syntax

```javascript
array.includes(value, startIndex)
```

### Parameters

| Parameter | Description |
|------------|------------|
| `value` | Value to search for |
| `startIndex` | Optional starting position |

---

## Basic Example

```javascript
let fruits = ["apple", "banana", "orange", "mango"];

console.log(fruits.includes("banana"));
console.log(fruits.includes("grape"));
```

Output:

```javascript
true
false
```

---

# Case Sensitivity

`includes()` is case-sensitive.

```javascript
let fruits = ["apple", "banana", "orange"];

console.log(fruits.includes("banana"));
console.log(fruits.includes("Banana"));
```

Output:

```javascript
true
false
```

---

# Using a Starting Index

```javascript
let numbers = [10, 20, 30, 40, 50, 30, 60];

console.log(numbers.includes(30, 3));
console.log(numbers.includes(30, 4));
```

Output:

```javascript
true
true
```

Explanation:

A `30` exists after both starting positions.

---

# Strict Equality Comparison

`includes()` uses:

```javascript
===
```

This means data types must match.

```javascript
let mixedArray = [1, "2", 3, "4", 5];

console.log(mixedArray.includes(2));
console.log(mixedArray.includes("2"));
```

Output:

```javascript
false
true
```

Number `2` and string `"2"` are different values.

---

## Benefits of `includes()`

- Easy to use
- Returns a boolean
- Works with strings and numbers
- No need for loops

---

## Quick Quiz Answers

### 1. Output?

```javascript
let arr = [1, 2, 3, 4, 5];

console.log(arr.includes(3, 3));
```

✅

```javascript
false
```

Search begins at index `3`, after the value `3`.

---

### 2. Output?

```javascript
let arr = ["a", "b", "c", "d", "e"];

console.log(arr.includes("C"));
```

✅

```javascript
false
```

Case-sensitive comparison.

---

### 3. Output?

```javascript
let arr = [1, "2", 3, "4", 5];

console.log(arr.includes("3"));
```

✅

```javascript
false
```

String `"3"` is not present.

---

# What Is a Shallow Copy of an Array?

A shallow copy is a new array containing the same elements as the original.

---

## Primitive Values

If an array contains only primitive values:

- Numbers
- Strings
- Booleans

The copied array is completely separate.

---

## Nested Arrays and Objects

If an array contains:

- Arrays
- Objects

both arrays reference the same nested data.

Example:

```javascript
const arr1 = [[1, 2], [3, 4]];

const arr2 = [...arr1];
```

The outer arrays are different, but inner arrays are shared.

---

## Why Use Shallow Copies?

Useful when you want to:

- Add elements
- Remove elements
- Reorder items
- Modify array structure

without affecting the original array.

---

# Method 1: `concat()`

```javascript
const originalArray = [1, 2, 3];

const copyArray = [].concat(originalArray);

console.log(copyArray);
console.log(copyArray === originalArray);
```

Output:

```javascript
[1, 2, 3]
false
```

A new array is created.

---

# Method 2: `slice()`

Calling `slice()` without arguments copies the whole array.

```javascript
const originalArray = [1, 2, 3];

const copyArray = originalArray.slice();

console.log(copyArray);
console.log(copyArray === originalArray);
```

Output:

```javascript
[1, 2, 3]
false
```

---

# Method 3: Spread Operator (`...`)

```javascript
const originalArray = [1, 2, 3];

const copyArray = [...originalArray];

console.log(copyArray);
console.log(copyArray === originalArray);
```

Output:

```javascript
[1, 2, 3]
false
```

---

# Modifying the Copy

```javascript
const originalArray = [1, 2, 3];

const copyArray = [...originalArray];

copyArray.push(4);

console.log(originalArray);
console.log(copyArray);
```

Output:

```javascript
[1, 2, 3]
[1, 2, 3, 4]
```

The original array remains unchanged.

---

# Shallow Copy Methods Summary

| Method | Example |
|----------|----------|
| `concat()` | `[].concat(arr)` |
| `slice()` | `arr.slice()` |
| Spread Operator | `[...arr]` |

All create:

- A new array object
- A shallow copy

---

## Quick Quiz Answers

### 1. Output?

```javascript
const arr1 = [1, 2, 3];

const arr2 = arr1.slice();

arr2.push(4);

console.log(arr1, arr2);
```

✅

```javascript
[1, 2, 3] [1, 2, 3, 4]
```

---

### 2. Output?

```javascript
const fruits = ["apple", "banana", "orange"];

const fruitsCopy = [...fruits];

console.log(fruitsCopy.length);
```

✅

```javascript
3
```

---

### 3. Output?

```javascript
const arr1 = [1, 2, 3];

const arr2 = [].concat(arr1);

console.log(arr1 === arr2);
```

✅

```javascript
false
```

---

# Key Takeaways

## `indexOf()`

- Finds the first occurrence of an element.
- Returns index if found.
- Returns `-1` if not found.
- Supports optional `fromIndex`.

## `splice()`

- Adds elements.
- Removes elements.
- Replaces elements.
- Mutates the original array.
- Returns removed elements.

## `includes()`

- Checks if a value exists.
- Returns `true` or `false`.
- Case-sensitive for strings.
- Uses strict equality (`===`).

## Shallow Copies

Can be created using:

```javascript
[].concat(array)
array.slice()
[...array]
```

Benefits:

- Preserve original array.
- Safely modify copies.
- Useful before mutating operations like `splice()`.

## Important: Shallow Copies and Nested Arrays

A shallow copy only copies the **top-level array**. If the array contains nested arrays or objects, the copy and the original will still share references to those nested values.

### Example: Nested Arrays

```javascript
const arr1 = [
    [1, 2],
    [3, 4]
];

const arr2 = [...arr1];
```

At first glance, it may look like everything has been copied, but only the outer array is new.

```javascript
console.log(arr1 === arr2);
```

Output:

```javascript
false
```

The outer arrays are different.

However:

```javascript
console.log(arr1[0] === arr2[0]);
console.log(arr1[1] === arr2[1]);
```

Output:

```javascript
true
true
```

The inner arrays are the exact same arrays in memory.

### Modifying a Shared Inner Array

```javascript
const arr1 = [
    [1, 2],
    [3, 4]
];

const arr2 = [...arr1];

arr2[0].push(99);

console.log(arr1);
console.log(arr2);
```

Output:

```javascript
[
  [1, 2, 99],
  [3, 4]
]

[
  [1, 2, 99],
  [3, 4]
]
```

Both arrays changed because:

```javascript
arr1[0] === arr2[0]
```

is `true`.

Both variables reference the same inner array.

### Visual Representation

Before modification:

```text
arr1[0] ----+
            |
            v
          [1, 2]

arr2[0] ----+
```

After:

```javascript
arr2[0].push(99);
```

The shared array becomes:

```text
[1, 2, 99]
```

Since both arrays reference it, both see the change.

---

### Replacing an Inner Array

Replacing an inner array is different from modifying it.

```javascript
const arr1 = [
    [1, 2],
    [3, 4]
];

const arr2 = [...arr1];

arr2[0] = ["new"];

console.log(arr1);
console.log(arr2);
```

Output:

```javascript
[
  [1, 2],
  [3, 4]
]

[
  ["new"],
  [3, 4]
]
```

In this case, `arr1` is unaffected because we replaced the reference in `arr2` instead of modifying the shared inner array.

---

## Same Behavior with Objects

Objects behave exactly like nested arrays.

```javascript
const person = { name: "John" };

const arr1 = [person];
const arr2 = [...arr1];

arr2[0].name = "Mike";

console.log(arr1);
console.log(arr2);
```

Output:

```javascript
[{ name: "Mike" }]
[{ name: "Mike" }]
```

Both arrays contain a reference to the same object.

---

## Why Is It Called a "Shallow" Copy?

Consider this array:

```javascript
[
    [1, 2],
    [3, 4]
]
```

A shallow copy copies only the first level:

```text
[
   refA,
   refB
]
```

The nested arrays themselves are not copied:

```text
refA ---> [1, 2]
refB ---> [3, 4]
```

Only one layer deep is copied, which is why it is called a **shallow copy**.

---

## Deep Copy Comparison

A deep copy duplicates nested arrays and objects as well.

```javascript
const arr1 = [
    [1, 2],
    [3, 4]
];

const arr2 = structuredClone(arr1);

arr2[0].push(99);

console.log(arr1);
console.log(arr2);
```

Output:

```javascript
[
  [1, 2],
  [3, 4]
]

[
  [1, 2, 99],
  [3, 4]
]
```

Now the original array remains unchanged because every nested array was copied.

---

## Rule to Remember

### Shallow Copy (`slice()`, `concat()`, `[...array]`)

Copies primitive values independently:

```javascript
[1, 2, 3]
```

But shares references to nested arrays and objects:

```javascript
[[1, 2], [3, 4]]

[{ name: "John" }]
```

### Quick Test

```javascript
console.log(arr1[0] === arr2[0]);
```

If the result is:

```javascript
true
```

then both arrays reference the same nested object or array, and modifying it through one array will affect the other.