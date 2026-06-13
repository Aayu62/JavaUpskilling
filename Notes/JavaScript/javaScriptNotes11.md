```markdown
# JavaScript Notes: JSON Fundamentals & Methods

## 1. What is JSON?
* **Definition:** JSON stands for **JavaScript Object Notation**.
* **Purpose:** It is a lightweight, text-based data format commonly used to exchange data between a server and a web application.
* **Characteristics:**
    * **Machine-parseable** and **human-readable**.
    * **Language-independent:** Can seamlessly transfer data between different programming languages (e.g., Java to Python, JavaScript to C#).
* **Syntax Rules:**
    * Uses **key-value pairs** separated by commas.
    * **CRITICAL:** Every key **must** be wrapped in double quotes (`"key"`), otherwise it throws an error.
* **Supported Data Types:** Objects, arrays, strings, booleans, null, and numbers.

### JSON Example
```json
{
  "name": "Alice",
  "age": 30,
  "isStudent": false,
  "list of courses": ["Mathematics", "Physics", "Computer Science"]
}

```

---

## 2. Accessing JSON Values: Dot vs. Bracket Notation

To access data from an imported or parsed JSON object, you can use two notations:

### A. Dot Notation (`object.key`)

* Used for standard, single-word keys.
* *Example (using ES module JSON import syntax):*
```javascript
import data from "./example.json" with { type: "json" };
console.log(data.age); // Output: 30

```



### B. Bracket Notation (`object["key"]`)

* **Mandatory** when the key contains spaces, special characters, or multiple words.
* *Example:*
```javascript
import data from "./example.json" with { type: "json" };
console.log(data["list of courses"]); // Works perfectly
// data.list of courses -> Throws an error

```



---

## 3. JSON Methods: `JSON.stringify()` and `JSON.parse()`

JavaScript provides two powerful native methods to convert data between strings and objects.

### A. `JSON.stringify()`

* **Purpose:** Converts a JavaScript object into a JSON string. Useful for storing or transmitting data.
* **Basic Syntax:**
```javascript
const user = { name: "John", age: 30, isAdmin: true };
const jsonString = JSON.stringify(user);
console.log(jsonString); // '{"name":"John","age":30,"isAdmin":true}'

```



#### Optional Parameters for `JSON.stringify(value, replacer, space)`

1. **Replacer Parameter (2nd argument):** Can be a function or an array. Filters which properties get stringified.
```javascript
const developerObj = { firstName: "Jessica", isAwesome: true, isMusician: true, country: "USA" };
// Only stringifies specified keys
console.log(JSON.stringify(developerObj, ["firstName", "country"])); 
// Result: {"firstName":"Jessica","country":"USA"}

```


2. **Spacer Parameter (3rd argument):** Controls the indentation/spacing of the output string for readability.
```javascript
console.log(JSON.stringify(developerObj, null, 2));
/* Result:
{
  "firstName": "Jessica",
  "isAwesome": true,
  "isMusician": true,
  "country": "USA"
}
*/

```



### B. `JSON.parse()`

* **Purpose:** Converts a JSON string back into a JavaScript object. Useful when retrieving data from a web server or `localStorage` to manipulate it.
* **Syntax:**
```javascript
const jsonString = '{"name":"John","age":30,"isAdmin":true}';
const userObject = JSON.parse(jsonString);
console.log(userObject.age); // Output: 30

```



---

## 4. Concept Check & Key Takeaways

* **JSON Fact:** JSON is a lightweight data format used for data exchange between servers and web applications (it is *not* exclusive to JS, it *does* support arrays, and it *cannot* include functions).
* **Accessing Values:** To get the `"name"` key via dot notation from a `data` object, use `data.name`.
* **Bracket Requirement:** Keys like `"first name"` require bracket notation (`data["first name"]`) because of the space.
* **Method Summary:**
* `JSON.stringify()` $\rightarrow$ Object to String.
* `JSON.parse()` $\rightarrow$ String to Object.
* To parse and access instantly: `JSON.parse(jsonString).age`



```

```