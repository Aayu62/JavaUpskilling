# Singleton Pattern

## Exercise 1: Implementing the Singleton Pattern

---

# What is the Singleton Pattern?

The Singleton Pattern is a **Creational Design Pattern** that ensures **only one object** of a class is created throughout the application's lifecycle and provides a global way to access that object.

In simple words,

> "No matter how many times different parts of the application ask for the object, they all receive the same object."

---

# Why Do We Need Singleton?

Imagine a large application with many classes.

```
UserService
OrderService
PaymentService
InventoryService
```

If every class creates its own Logger:

```java
Logger logger = new Logger();
```

Then multiple Logger objects are created.

```
UserService ------> Logger #1

OrderService -----> Logger #2

PaymentService ---> Logger #3

Inventory --------> Logger #4
```

Problems:

- Wasted memory
- Duplicate resources
- Inconsistent logging
- Difficult to manage configuration

Instead, we create only **one Logger object** and allow everyone to use it.

```
UserService ------\
OrderService ------> Logger
PaymentService ----/
Inventory --------/
```

---

# Real-Life Analogy

## Printer in an Office

Imagine an office.

Many employees want to print documents.

Do they each buy their own printer?

No.

Everyone uses the same printer.

```
Employee A ----\
Employee B -----> Printer
Employee C ----/
```

Singleton works exactly the same way.

---

# Characteristics of Singleton

A Singleton class has four important characteristics:

1. Only one object exists.
2. Constructor is private.
3. A static variable stores the object.
4. A public static method returns the object.

---

# Project Structure

```
SingletonPatternExample
│
└── src
    │
    └── com
        │
        └── singleton
            │
            ├── Logger.java
            └── Main.java
```

---

# Step 1 - Private Constructor

```java
private Logger() {
    System.out.println("Logger Object created");
}
```

## Why?

Normally,

```java
new Logger();
```

creates a new object.

Making the constructor private prevents other classes from creating Logger objects.

Without this, Singleton is impossible.

---

# Step 2 - Static Instance Variable

```java
private static Logger instance;
```

Let's understand this line.

## Logger

```java
Logger instance;
```

means

> A variable capable of storing a Logger object.

Initially,

```java
instance == null
```

No object has been created yet.

---

## Why static?

Static members belong to the class.

Non-static members belong to an object.

Example:

```java
class Student{

    int age;

    static String college;

}
```

Memory:

```
Student Class
--------------
college = KIIT

Student Object 1
--------------
age = 20

Student Object 2
--------------
age = 21
```

Only one copy of `college` exists.

Every object has its own `age`.

---

## Why must instance be static?

Suppose it wasn't.

```java
private Logger instance;
```

How would we access it?

We would first need a Logger object.

But we cannot create one because the constructor is private.

Therefore,

`instance` must belong to the class.

---

# Step 3 - getInstance()

```java
public static Logger getInstance(){

    if(instance == null){
        instance = new Logger();
    }

    return instance;
}
```

---

## Why public?

Other classes need access to Logger.

---

## Why static?

Because we cannot create a Logger object.

So we call

```java
Logger.getInstance();
```

instead of

```java
logger.getInstance();
```

---

# How getInstance() Works

Initially

```
instance = null
```

First call

```java
Logger logger1 = Logger.getInstance();
```

Execution

```
instance == null ?

YES

↓

Create Logger Object

↓

Store inside instance

↓

Return instance
```

Memory

```
Logger Class

instance
   |
   |
   V

Logger Object
```

Second call

```java
Logger logger2 = Logger.getInstance();
```

Execution

```
instance == null ?

NO

↓

Return existing object
```

No new object is created.

---

# Complete Logger Class

```java
package com.singleton;

public class Logger {

    private static Logger instance;

    private Logger() {
        System.out.println("Logger Object created");
    }

    public static Logger getInstance() {

        if(instance == null){
            instance = new Logger();
        }

        return instance;
    }

}
```

---

# Testing Singleton

```java
package com.singleton;

public class Main {

    public static void main(String[] args) {

        Logger logger1 = Logger.getInstance();

        Logger logger2 = Logger.getInstance();

        System.out.println(logger1);

        System.out.println(logger2);

        System.out.println(logger1 == logger2);

    }

}
```

---

# Expected Output

```
Logger Object created

com.singleton.Logger@28a418fc

com.singleton.Logger@28a418fc

true
```

---

# Understanding the Output

## Why "Logger Object created" printed only once?

Because

```java
if(instance == null)
```

is true only during the first call.

Later,

```
instance != null
```

so the constructor never runs again.

---

## Why are both references identical?

```
logger1 ---------\
                  \
                   ---> Logger Object

logger2 ---------/
```

Both variables point to the same object.

---

## Why does

```java
logger1 == logger2
```

return true?

Because `==` compares object references.

Both references point to the same object.

---

# Memory Visualization

Initially

```
Logger Class

instance = null
```

After first call

```
Logger Class

instance
    |
    V

Logger Object
```

After second call

```
logger1 ----------\
                   \
                    ---> Logger Object
                   /
logger2 ----------/
```

Only one object exists.

---

# Advantages

- Saves memory
- Only one shared object
- Centralized resource management
- Consistent behavior
- Easy global access

---

# Disadvantages

- Harder to test in some situations
- Introduces global state
- Can increase coupling if overused

---

# Real-World Uses

- Logger
- Configuration Manager
- Cache Manager
- Application Settings
- Database Connection Manager (in some designs)

---

# Interview Questions

## Why is the constructor private?

To prevent other classes from creating objects.

---

## Why is instance static?

Because we need access before any object exists.

---

## Why is getInstance() static?

Because we cannot create a Logger object to call it.

---

## What happens if we remove private from the constructor?

Anyone can create multiple Logger objects.

Singleton breaks.

---

## What happens if instance is not static?

We would need a Logger object to access instance.

But creating a Logger object is impossible because the constructor is private.

---

## What happens if getInstance() is not static?

We would need an object to call it.

But we cannot create one.

Singleton breaks.

---

# Key Takeaways

✅ Singleton is a Creational Design Pattern.

✅ Only one object of the class exists.

✅ Constructor is private.

✅ Object is stored in a private static variable.

✅ Public static getInstance() returns the object.

✅ The object is created only when needed.

---

# Exercise Checklist

- [x] Created Java project
- [x] Created Logger class
- [x] Made constructor private
- [x] Added private static instance
- [x] Added public static getInstance()
- [x] Tested using Main.java
- [x] Verified only one object is created
- [x] Verified logger1 == logger2 returns true

---

# Final Definition

> **Singleton Pattern is a Creational Design Pattern that ensures a class has only one instance throughout the application and provides a global access point to that instance.**