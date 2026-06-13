# JavaScript Objects and Their Properties — Study Notes

---

## 1. Introduction to JavaScript Objects

An **object** is a fundamental, non-primitive data structure in JavaScript designed to store and organize related data and functionality using **key-value pairs** (called **properties**).

* **The Backbone of JS:** Almost everything in JavaScript is an object or can behave like one (including arrays, functions, and primitive wrappers).
* **Structure:** Consists of a property name (or key) and a value, separated by a colon (`:`).

```javascript
const person = {
  name: "Alice",
  age: 30,
  city: "New York"
};

```

---

## 2. Accessing Object Properties

There are two primary methods for accessing properties within an object: **Dot Notation** and **Bracket Notation**.

### Dot Notation

* **Syntax:** `objectName.propertyName`
* **Use Case:** Best when the property name is a valid JavaScript identifier (no spaces, cannot start with a number, no special characters).
* **Example:** `person.name` $\rightarrow$ `"Alice"`

### Bracket Notation

* **Syntax:** `objectName["propertyName"]`
* **Use Case:** Required when property names are dynamic (stored in variables) or are invalid identifiers.
* **Example:** ```javascript
const oddObject = {
"1stProperty": "Hello",
"property with spaces": "World"
};
console.log(oddObject["1stProperty"]); // "Hello"
// Dynamic property access via variable
let key = "property with spaces";
console.log(oddObject[key]); // "World"
```


```



---

## 3. Modifying and Removing Properties

### The `delete` Operator

Removes a property entirely from an object. Accessing it afterward returns `undefined`.

```javascript
const person = { name: "Alice", job: "Engineer" };
delete person.job;
console.log(person.job); // undefined

```

### Rest Deletion (Destructuring)

Creates a new object *without* the specified properties, keeping the original object intact.

```javascript
const person = { name: "Bob", age: 25, job: "Designer" };
const { job, ...remainingProperties } = person; 
console.log(remainingProperties); // { name: "Bob", age: 25 }

```

---

## 4. Checking Property Existence

| Method | Behavior / Description | Falsy Value Safe? | Inherited Properties Checked? |
| --- | --- | --- | --- |
| **`Object.hasOwn(obj, prop)`** | **Modern standard.** Checks direct properties only. | Yes | No |
| **`obj.hasOwnProperty(prop)`** | Older method. Checks direct properties only. | Yes | No |
| **`prop in obj`** | Checks if property exists anywhere on the object or its prototype chain. | Yes | **Yes** |
| **`obj.prop !== undefined`** | Checks value directly. Fails if property exists but is explicitly set to `undefined`. | **No** | Yes |

> ⚠️ **Danger Zone:** Avoid validating property existence using direct conditional statements like `if (user.score)` because falsy values (e.g., `0`, `false`, `null`) will incorrectly evaluate to `false` even if the property exists.

---

## 5. Complex Data Structures (Nested Objects & Arrays)

Objects can nesting other objects and arrays to create complex data layouts. You can chain dot and bracket accessors sequentially to dig down into these data hierarchies.

```javascript
const person = {
  name: "Alice",
  addresses: [
    { type: "home", city: "Anytown" },
    { type: "work", city: "Workville" }
  ]
};

// Chaining to access the work city
console.log(person.addresses[1].city); // "Workville"

```

---

## 6. Primitive vs. Non-Primitive Data Types

```
Memory Allocation Profiles:

[Primitive Type]      --> Stored by VALUE     --> [ Variable holds the actual value (Immutable) ]
[Non-Primitive Type]  --> Stored by REFERENCE --> [ Variable holds a pointer to a memory address ]

```

### Primitive Types

* **Types:** `number`, `bigint`, `string`, `boolean`, `null`, `undefined`, `symbol`.
* **Behavior:** Stored directly by **value**. Immutable (the value itself cannot be altered, though variables can be reassigned). Copying a primitive creates an completely independent copy.

### Non-Primitive Types

* **Types:** `object`, `array`, `function`.
* **Behavior:** Stored by **reference**. The variable contains a memory address pointer instead of the literal data. Assigning an object to a new variable creates a shallow copy by reference; both variables point to the same object in memory.

```javascript
const original = { age: 30 };
const copy = original;
original.age = 31;
console.log(copy.age); // 31 (Both variables point to the same memory slot)

```

---

## 7. Functions vs. Object Methods

* **Functions:** Standalone, reusable blocks of code. They operate inside their own scope block and have no inherent ties to an object.
* **Methods:** Functions that are stored as a property inside an object. They represent object behaviors and can access internal properties of that object using the `this` keyword.

```javascript
const person = {
  name: "Bob",
  sayHello: function() {
    return "Hello, my name is " + this.name; // 'this' points to the person object
  }
};
console.log(person.sayHello()); // Invoked via dot notation

```

---

## 8. The `Object()` Constructor

The `Object()` constructor creates a fresh object wrapper.

* **Syntax:** `new Object()` or `Object()`
* **Behavior with Primitives:** Converted without `new`, it transforms primitive values into their respective object wrappers (e.g., `Object(42)` changes a standard primitive number to an object type). Passing `null` or `undefined` yields a blank object `{}`.
* **Best Practice:** Use the cleaner object literal syntax `{}` for general object creation instead of `new Object()`. Use the constructor primarily when converting unknown dynamic input types into guaranteed objects.