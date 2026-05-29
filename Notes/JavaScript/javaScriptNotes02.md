# JavaScript Notes 02

## Working with Strings in JavaScript

---

# 1. Bracket Notation in Strings

## What is Bracket Notation?

* Strings are sequences of characters.
* Each character has an **index (position)**.
* Indexing is **zero-based**:

  * First character → index `0`
  * Second character → index `1`
  * and so on.

Example:

```js
let greeting = "hello";
```

| Character | h | e | l | l | o |
| --------- | - | - | - | - | - |
| Index     | 0 | 1 | 2 | 3 | 4 |

---

## Syntax

```js
string[index]
```

Example:

```js
let greeting = "hello";
console.log(greeting[1]); // "e"
```

---

## Access Last Character

Use:

```js
string[string.length - 1]
```

Example:

```js
let greeting = "hello";
console.log(greeting[greeting.length - 1]); // "o"
```

Explanation:

* `"hello".length` → `5`
* Last index → `5 - 1 = 4`

---

## Access Multiple Characters

```js
let greeting = "hello";

let firstTwo = greeting[0] + greeting[1];

console.log(firstTwo); // "he"
```

---

## Important Points

* Bracket notation accesses characters using indexes.
* Useful for:

  * validation
  * extracting initials
  * checking letters
  * manipulating text

---

# 2. Newlines and Escaping Strings

## Escape Sequences

Escape sequences are special character combinations beginning with `\`.

---

## New Line (`\n`)

Used to create line breaks inside strings.

Example:

```js
let poem = "Roses are red,\nViolets are blue,\nJavaScript is fun.";

console.log(poem);
```

Output:

```txt
Roses are red,
Violets are blue,
JavaScript is fun.
```

---

## Escaping Quotes

### Problem

This causes an error:

```js
let statement = "She said, "Hello!"";
```

Reason:

* JavaScript thinks the string ends before `Hello!`

---

## Solution: Escape Quotes

Use backslash `\`.

```js
let statement = "She said, \"Hello!\"";

console.log(statement);
```

Output:

```txt
She said, "Hello!"
```

---

## Escaping Single Quotes

```js
let quote = 'It\'s a beautiful day!';

console.log(quote);
```

Output:

```txt
It's a beautiful day!
```

---

## Common Escape Sequences

| Escape Sequence | Meaning      |
| --------------- | ------------ |
| `\n`            | New line     |
| `\"`            | Double quote |
| `\'`            | Single quote |
| `\\`            | Backslash    |

---

## Important Points

* Escape characters prevent syntax errors.
* Used when including special characters inside strings.
* Essential for formatting text properly.

---

# 3. Template Literals & String Interpolation

## What are Template Literals?

Template literals are strings written using **backticks**:

```js
` `
```

They allow:

* multiline strings
* string interpolation
* embedded expressions

---

## Basic Example

```js
const name = "Alice";

const greeting = `Hello, ${name}!`;

console.log(greeting);
```

Output:

```txt
Hello, Alice!
```

---

## String Interpolation

### Syntax

```js
${expression}
```

Used to insert:

* variables
* calculations
* expressions

inside strings.

---

## Old Way: Concatenation

```js
const name = "Alice";
const age = 25;

const message =
  "My name is " + name + " and I am " + age + " years old.";

console.log(message);
```

---

## Modern Way: Template Literals

```js
const name = "Alice";
const age = 25;

const message =
  `My name is ${name} and I am ${age} years old.`;

console.log(message);
```

Advantages:

* cleaner
* easier to read
* easier to maintain

---

## Multiline Strings

### Without Template Literals

Need `\n`.

### With Template Literals

```js
let poem = `Roses are red,
Violets are blue,
JavaScript is fun,
And so are you.`;

console.log(poem);
```

Line breaks are preserved automatically.

---

## Expressions Inside Template Literals

```js
const song = "Bohemian Rhapsody";
const score = 9.5;
const highestScore = 10;

const output =
  `One of my favorite songs is "${song}".
I rated it ${(score / highestScore) * 100}%.`;

console.log(output);
```

---

## Important Points

* Template literals use backticks `` ` ``
* `${}` is used for interpolation.
* Supports multiline strings.
* Can embed JavaScript expressions directly.

---

# 4. Finding Substrings with `indexOf()`

## What is a Substring?

A substring is a smaller sequence of characters inside another string.

Example:

```txt
"hello world"
```

Substrings:

* `"hello"`
* `"world"`

---

## `indexOf()` Method

Used to find the position of a substring.

### Syntax

```js
string.indexOf(substring)
```

Returns:

* index of first occurrence
* `-1` if not found

---

## Example

```js
let sentence = "JavaScript is awesome!";

let position = sentence.indexOf("awesome!");

console.log(position); // 14
```

---

## Substring Not Found

```js
let sentence = "JavaScript is awesome!";

let position = sentence.indexOf("fantastic");

console.log(position); // -1
```

---

## Starting Search from Specific Position

### Syntax

```js
string.indexOf(substring, startPosition)
```

Example:

```js
let sentence =
  "JavaScript is awesome, and JavaScript is powerful!";

let position =
  sentence.indexOf("JavaScript", 10);

console.log(position); // 27
```

---

## Case Sensitive

```js
console.log("freeCodeCamp".indexOf("F")); // -1
```

Reason:

* `"F"` ≠ `"f"`

---

## Important Points

* Returns first matching index.
* Returns `-1` if not found.
* Supports optional starting index.
* Case-sensitive.

---

# 5. `prompt()` Method

## What is `prompt()`?

* Displays a popup dialog box.
* Takes user input.
* Returns entered text as a string.

---

## Syntax

```js
prompt(message, defaultValue)
```

### Parameters

| Parameter      | Description            |
| -------------- | ---------------------- |
| `message`      | Text shown in popup    |
| `defaultValue` | Optional default input |

---

## Example

```js
const userName = prompt("What is your name?", "Guest");

console.log(userName);
```

---

## Real Example

```html
<button id="prompt-btn">Show Prompt</button>
<p id="output"></p>
```

```js
const btn = document.getElementById("prompt-btn");
const output = document.getElementById("output");

btn.addEventListener("click", () => {
  const userName = prompt("What is your name?", "Guest");

  output.textContent = "Hello, " + userName + "!";
});
```

---

## If User Clicks Cancel

```js
prompt() → null
```

Meaning:

* no input provided

---

## Important Behavior

`prompt()` pauses script execution until:

* user clicks **OK**
* or clicks **Cancel**

---

## Limitations

Modern web apps avoid heavy use of `prompt()` because:

* intrusive
* blocks execution
* inconsistent browser behavior

---

## Important Points

* Returns string input.
* Returns `null` if canceled.
* Useful for quick testing/simple interaction.

---

# Quick Summary

| Concept               | Purpose                      |
| --------------------- | ---------------------------- |
| Bracket notation      | Access string characters     |
| `\n`                  | Create newline               |
| Escaping (`\"`, `\'`) | Include special characters   |
| Template literals     | Easier string creation       |
| String interpolation  | Insert variables/expressions |
| `indexOf()`           | Find substring position      |
| `prompt()`            | Get user input               |
