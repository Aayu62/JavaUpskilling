# JavaScript Notes 03

---

# 1. ASCII, `charCodeAt()` and `fromCharCode()`

## What is ASCII?

ASCII (**American Standard Code for Information Interchange**) is a character encoding system that assigns a numeric value to characters.

Examples:

| Character | ASCII Value |
| --------- | ----------- |
| A         | 65          |
| a         | 97          |
| 0         | 48          |
| !         | 33          |

ASCII contains:

* Uppercase letters (A-Z)
* Lowercase letters (a-z)
* Numbers (0-9)
* Symbols (!, @, #, etc.)
* Control characters (newline, tab, etc.)

> JavaScript internally uses Unicode (UTF-16), but the first 128 Unicode characters match ASCII values.

---

## `charCodeAt()`

Returns the numeric code of a character at a specified index.

### Syntax

```javascript
string.charCodeAt(index)
```

### Example

```javascript
let letter = "A";

console.log(letter.charCodeAt(0));
```

Output:

```javascript
65
```

---

### More Examples

```javascript
console.log("a".charCodeAt(0));
```

Output:

```javascript
97
```

```javascript
console.log("!".charCodeAt(0));
```

Output:

```javascript
33
```

---

## `String.fromCharCode()`

Converts a numeric code back into a character.

### Syntax

```javascript
String.fromCharCode(code)
```

### Example

```javascript
console.log(String.fromCharCode(65));
```

Output:

```javascript
A
```

---

### More Examples

```javascript
console.log(String.fromCharCode(97));
```

Output:

```javascript
a
```

```javascript
console.log(String.fromCharCode(33));
```

Output:

```javascript
!
```

---

## Common Uses

### Check if a character is uppercase

```javascript
let ch = "G";

let code = ch.charCodeAt(0);

if(code >= 65 && code <= 90){
    console.log("Uppercase");
}
```

---

### Generate letters dynamically

```javascript
for(let i = 65; i <= 90; i++){
    console.log(String.fromCharCode(i));
}
```

Output:

```javascript
A
B
C
...
Z
```

---

## Key Points

* ASCII assigns numbers to characters.
* `charCodeAt()` → Character → Number
* `String.fromCharCode()` → Number → Character
* Useful for character comparisons and manipulations.

---

# 2. `includes()` Method

## What is `includes()`?

Checks whether a string contains a specific substring.

Returns:

* `true` → Found
* `false` → Not found

---

## Syntax

```javascript
string.includes(searchValue)
```

---

## Example

```javascript
let phrase = "JavaScript is awesome!";

console.log(
    phrase.includes("awesome")
);
```

Output:

```javascript
true
```

---

## Case Sensitivity

```javascript
let phrase = "JavaScript is awesome!";

console.log(
    phrase.includes("Awesome")
);
```

Output:

```javascript
false
```

Because:

```text
Awesome ≠ awesome
```

---

## Starting Search from Specific Position

### Syntax

```javascript
string.includes(searchValue, startIndex)
```

### Example

```javascript
let text = "Hello, JavaScript world!";

console.log(
    text.includes("JavaScript", 7)
);
```

Output:

```javascript
true
```

---

## Common Uses

### Check if email contains "@"

```javascript
let email = "user@gmail.com";

console.log(
    email.includes("@")
);
```

Output:

```javascript
true
```

---

### Validate input

```javascript
let password = "abc123";

if(password.includes("123")){
    console.log("Weak pattern found");
}
```

---

## Key Points

* Returns only `true` or `false`.
* Case-sensitive.
* Can start searching from a specified index.
* Does not return the position.

---

# 3. `slice()` Method

## What is `slice()`?

Extracts a portion of a string and returns a new string.

Original string remains unchanged.

---

## Syntax

```javascript
string.slice(startIndex, endIndex)
```

* Start index → Included
* End index → Excluded

---

## Example

```javascript
let text = "Hello, world!";

console.log(
    text.slice(0, 5)
);
```

Output:

```javascript
Hello
```

---

## Omitting End Index

```javascript
let text = "Hello, world!";

console.log(
    text.slice(7)
);
```

Output:

```javascript
world!
```

---

## Using Negative Indexes

Negative indexes count from the end.

```javascript
let text = "JavaScript is fun!";

console.log(
    text.slice(-4)
);
```

Output:

```javascript
fun!
```

---

## Extracting Middle Portion

```javascript
let text = "I love JavaScript!";

console.log(
    text.slice(7, 17)
);
```

Output:

```javascript
JavaScript
```

---

## Visual Representation

```text
J a v a S c r i p t
0 1 2 3 4 5 6 7 8 9
```

```javascript
text.slice(0,4)
```

Returns:

```javascript
Java
```

---

## Key Points

* Extracts part of a string.
* Original string remains unchanged.
* End index is not included.
* Supports negative indexes.

---

# 4. Changing String Case

## `toUpperCase()`

Converts all letters to uppercase.

### Syntax

```javascript
string.toUpperCase()
```

### Example

```javascript
let greeting = "Hello World";

console.log(
    greeting.toUpperCase()
);
```

Output:

```javascript
HELLO WORLD
```

---

## `toLowerCase()`

Converts all letters to lowercase.

### Syntax

```javascript
string.toLowerCase()
```

### Example

```javascript
let text = "I AM LEARNING JAVASCRIPT";

console.log(
    text.toLowerCase()
);
```

Output:

```javascript
i am learning javascript
```

---

## Common Use Case

### Case-insensitive comparison

```javascript
let userInput = "JAVA";

if(userInput.toLowerCase() === "java"){
    console.log("Match");
}
```

Output:

```javascript
Match
```

---

## Key Points

* `toUpperCase()` → Uppercase version
* `toLowerCase()` → Lowercase version
* Original string is unchanged.
* Useful for comparisons and formatting.

---

# 5. Trimming Whitespace

## What is Whitespace?

Whitespace includes:

* Spaces
* Tabs
* Newlines

Example:

```javascript
"   Hello World   "
```

---

## `trim()`

Removes whitespace from both ends.

### Example

```javascript
let text = "   Hello!   ";

console.log(text.trim());
```

Output:

```javascript
Hello!
```

---

## `trimStart()`

Removes whitespace only from the beginning.

### Example

```javascript
let text = "   Hello!   ";

console.log(text.trimStart());
```

Output:

```javascript
Hello!
```

(with trailing spaces still present)

---

## `trimEnd()`

Removes whitespace only from the end.

### Example

```javascript
let text = "   Hello!   ";

console.log(text.trimEnd());
```

Output:

```javascript
   Hello!
```

---

## Common Use Case

```javascript
let username = "   Ayush   ";

username = username.trim();

console.log(username);
```

Output:

```javascript
Ayush
```

---

## Key Points

| Method      | Removes        |
| ----------- | -------------- |
| trim()      | Both sides     |
| trimStart() | Beginning only |
| trimEnd()   | End only       |

---

# 6. `replace()` Method

## What is `replace()`?

Replaces a specified part of a string with another value.

Returns a new string.

---

## Syntax

```javascript
string.replace(searchValue, newValue)
```

---

## Example

```javascript
let text = "I love JavaScript";

let updated =
    text.replace(
        "JavaScript",
        "coding"
    );

console.log(updated);
```

Output:

```javascript
I love coding
```

---

## Case Sensitive

```javascript
let text = "JavaScript";

console.log(
    text.replace(
        "javascript",
        "coding"
    )
);
```

Output:

```javascript
JavaScript
```

No replacement occurs.

---

## Only First Match Replaced

```javascript
let text =
"world world world";

console.log(
    text.replace(
        "world",
        "planet"
    )
);
```

Output:

```javascript
planet world world
```

Only first occurrence is replaced.

---

## Key Points

* Returns a new string.
* Original string remains unchanged.
* Case-sensitive.
* Replaces only first occurrence by default.

---

# 7. `repeat()` Method

## What is `repeat()`?

Repeats a string a specified number of times.

---

## Syntax

```javascript
string.repeat(count)
```

---

## Example

```javascript
let word = "Hello!";

console.log(
    word.repeat(3)
);
```

Output:

```javascript
Hello!Hello!Hello!
```

---

## Using Variables

```javascript
let count = 4;

console.log(
    "Test".repeat(count)
);
```

Output:

```javascript
TestTestTestTest
```

---

## Repeat Zero Times

```javascript
console.log(
    "Test".repeat(0)
);
```

Output:

```javascript
""
```

Empty string returned.

---

## Decimal Values

Decimals are rounded down.

```javascript
console.log(
    "Test".repeat(2.5)
);
```

Output:

```javascript
TestTest
```

---

## Errors

### Negative Number

```javascript
"Test".repeat(-1);
```

Output:

```javascript
RangeError
```

---

### Infinity

```javascript
"Test".repeat(Infinity);
```

Output:

```javascript
RangeError
```

---

## Common Uses

### Print separator line

```javascript
console.log(
    "-".repeat(30)
);
```

Output:

```javascript
------------------------------
```

---

### Generate stars

```javascript
console.log(
    "*".repeat(5)
);
```

Output:

```javascript
*****
```

---

## Key Points

* Repeats a string multiple times.
* Returns a new string.
* `count` must be non-negative.
* Decimals are rounded down.
* Negative numbers and Infinity cause errors.

---

# Quick Revision Table

| Method                  | Purpose                          |
| ----------------------- | -------------------------------- |
| `charCodeAt()`          | Character → Numeric code         |
| `String.fromCharCode()` | Numeric code → Character         |
| `includes()`            | Check if substring exists        |
| `slice()`               | Extract part of string           |
| `toUpperCase()`         | Convert to uppercase             |
| `toLowerCase()`         | Convert to lowercase             |
| `trim()`                | Remove whitespace from both ends |
| `trimStart()`           | Remove leading whitespace        |
| `trimEnd()`             | Remove trailing whitespace       |
| `replace()`             | Replace text                     |
| `repeat()`              | Repeat string multiple times     |

---

# Interview & Exam Questions

### Q1. Difference between `includes()` and `indexOf()`?

```javascript
"JavaScript".includes("Script");
```

Returns:

```javascript
true
```

```javascript
"JavaScript".indexOf("Script");
```

Returns:

```javascript
4
```

* `includes()` → true/false
* `indexOf()` → position or -1

---

### Q2. Does `slice()` modify original string?

No.

```javascript
let str = "Hello";

str.slice(0, 2);

console.log(str);
```

Output:

```javascript
Hello
```

---

### Q3. Is `replace()` case-sensitive?

Yes.

```javascript
"JavaScript".replace(
    "javascript",
    "JS"
);
```

No replacement occurs.

---

### Q4. What happens with `"*".repeat(0)`?

Returns:

```javascript
""
```

(an empty string)

---

### Q5. Why are `trim()` methods useful?

They help clean user input before:

* Validation
* Comparison
* Storage in databases
* Display on screen
