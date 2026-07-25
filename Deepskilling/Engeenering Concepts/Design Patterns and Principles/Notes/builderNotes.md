# Builder Pattern

## Exercise 3: Implementing the Builder Pattern

---

# What is the Builder Pattern?

Builder Pattern is a **Creational Design Pattern** that allows us to construct **complex objects step by step**.

Instead of passing many parameters into a constructor, we use a Builder to gradually configure the object and then create it.

---

# Why Do We Need Builder?

Imagine we are building a Computer.

A computer can have:

- CPU
- RAM
- Storage
- Graphics Card
- Operating System
- WiFi Card
- Bluetooth
- RGB Keyboard
- Webcam

Some are mandatory, some are optional.

Without Builder, we usually create a constructor.

```java
Computer(String cpu,
         int ram,
         int storage,
         String gpu,
         String os,
         boolean bluetooth,
         boolean wifi)
```

As more fields are added, the constructor becomes larger and harder to understand.

Example:

```java
Computer computer = new Computer(
        "Intel i7",
        16,
        512,
        "RTX 4060",
        "Windows 11",
        true,
        true
);
```

Looking at this code, it's difficult to understand what each value represents.

This is called a **Telescoping Constructor Problem**.

---

# Builder Solution

Instead, we build the object step by step.

```java
Computer computer = new Computer.Builder()
        .setCpu("Intel i7")
        .setRam(16)
        .setStorage(512)
        .build();
```

Read it like English.

```
Create Builder

↓

Set CPU

↓

Set RAM

↓

Set Storage

↓

Build Computer
```

This is much easier to read and maintain.

---

# Real-Life Analogy

Imagine ordering a burger.

The employee asks one question at a time.

```
Bread?

↓

Cheese?

↓

Extra Cheese?

↓

Sauce?

↓

Veg or Non-Veg?

↓

Prepare Burger
```

The burger is prepared only after all options are selected.

Builder Pattern works exactly the same way.

---

# Project Structure

```
BuilderPatternExample
│
└── src
    │
    └── com
        │
        └── builder
            │
            ├── Computer.java
            └── Main.java
```

---

# Architecture

```
                 Computer
              (Product Class)

                     ▲

          private Constructor

                     ▲

              Computer.Builder
             (Static Nested Class)

        ┌──────────────┼──────────────┐
        │              │              │

     setCpu()      setRam()     setStorage()

                     │

                     ▼

                  build()

                     │

                     ▼

                 Computer
```

---

# Step 1 - Product Class

```java
public class Computer {

    private String cpu;
    private int ram;
    private int storage;

}
```

These variables store the computer configuration.

---

# Why are fields private?

```java
private String cpu;
```

Only the Computer class should directly access its data.

This is called **Encapsulation**.

---

# Step 2 - Builder Class

```java
public static class Builder {

}
```

---

# What is a Nested Class?

Normally, Java classes are stored in separate files.

Example

```
Student.java

Teacher.java

Main.java
```

Java also allows us to create a class inside another class.

```
Computer

    |

 Builder
```

Builder belongs only to Computer.

Keeping it inside Computer improves organization.

---

# Why is Builder static?

Remember:

```
static belongs to the class.
```

We create the Builder before the Computer exists.

```java
Computer.Builder builder =
        new Computer.Builder();
```

If Builder were not static, we would first need a Computer object.

But the Builder is responsible for creating the Computer.

That would create a circular dependency.

---

# Builder Fields

Builder stores temporary values.

```java
private String cpu;
private int ram;
private int storage;
```

These are copied into the final Computer object later.

---

# Setter Methods

Example

```java
public Builder setCpu(String cpu){

    this.cpu = cpu;

    return this;

}
```

---

# Why return Builder instead of void?

Suppose we wrote

```java
public void setCpu(...)
```

Then this would not work.

```java
new Builder()
    .setCpu(...)
    .setRam(...);
```

Because setCpu() returns nothing.

Instead,

```java
return this;
```

returns the same Builder object.

This allows the next method to be called immediately.

This is called **Method Chaining**.

---

# Method Chaining

```java
new Builder()

↓

setCpu()

↓

returns Builder

↓

setRam()

↓

returns Builder

↓

setStorage()

↓

returns Builder

↓

build()
```

Each method returns the same Builder object.

---

# Private Constructor

```java
private Computer(Builder builder){

    this.cpu = builder.cpu;
    this.ram = builder.ram;
    this.storage = builder.storage;

}
```

The constructor copies data from the Builder into the Computer.

---

# Why is the constructor private?

We do not want users creating Computer objects directly.

Instead of

```java
new Computer(...)
```

we want

```java
new Computer.Builder()

        ...

        .build();
```

The Builder becomes the only way to create a Computer.

---

# build() Method

```java
public Computer build(){

    return new Computer(this);

}
```

`this` refers to the current Builder object.

The constructor copies the Builder's data into a new Computer.

---

# displayConfiguration()

```java
public void displayConfiguration(){

    System.out.println("CPU : " + cpu);

    System.out.println("RAM : " + ram);

    System.out.println("Storage : " + storage);

}
```

Used only to display the created object.

---

# Main Class

```java
Computer computer =
        new Computer.Builder()

                .setCpu("Intel i7")

                .setRam(16)

                .setStorage(512)

                .build();

computer.displayConfiguration();
```

---

# Dry Run

Program Starts

↓

Create Builder

↓

CPU = Intel i7

↓

RAM = 16

↓

Storage = 512

↓

Call build()

↓

Builder passed to Computer constructor

↓

Computer object created

↓

Display configuration

---

# Memory Flow

Initially

```
Builder

cpu = null

ram = 0

storage = 0
```

After calling setters

```
Builder

cpu = Intel i7

ram = 16

storage = 512
```

After build()

```
Builder
        │
        │ Copies values
        ▼

Computer

cpu = Intel i7

ram = 16

storage = 512
```

Builder is only temporary.

The final object is Computer.

---

# My Doubt (Very Important)

## Question

Why can't we skip the Builder class and write something like this?

```java
Computer computer = new Computer()
        .setCpu("Intel i7")
        .setRam(16)
        .setStorage(512);
```

At first glance, this looks simpler.

---

## Answer

Yes, this works.

But it is **not the Builder Pattern**.

It is called a **Fluent Interface**.

---

# What happens in this approach?

```
new Computer()

↓

Computer object created immediately

↓

Modify CPU

↓

Modify RAM

↓

Modify Storage
```

The Computer object already exists.

The setter methods keep modifying it.

---

# What happens in Builder Pattern?

```
Builder Created

↓

Collect CPU

↓

Collect RAM

↓

Collect Storage

↓

build()

↓

Computer Created
```

Notice the difference.

The Computer object does **not** exist until build() is called.

---

# Why is Builder Better?

Suppose a Computer must always have

- CPU
- RAM
- Storage

In the Fluent Interface approach

```java
Computer computer = new Computer();
```

creates an incomplete object.

```
CPU = null

RAM = 0

Storage = 0
```

Another part of the program might accidentally use this invalid object.

Builder prevents this.

No Computer object exists until it is fully configured.

---

# Another Big Advantage

Builder supports **Immutable Objects**.

Example

```java
private final String cpu;
```

Once created,

the Computer can never be modified.

This is impossible with setter methods because setters change the object after creation.

Builder solves this by storing temporary values first and creating the final object only once.

---

# Builder vs Fluent Interface

| Builder Pattern | Fluent Interface |
|----------------|------------------|
| Builder stores temporary data | Object is created immediately |
| Object created in build() | Object exists from the beginning |
| Can easily create immutable objects | Difficult to make immutable |
| Safer for complex objects | Good for simple mutable objects |

---

# Advantages

- Easy to read
- Avoids telescoping constructors
- Supports optional parameters
- Encourages immutable objects
- Cleaner object creation
- Easier maintenance

---

# Disadvantages

- Requires additional Builder class
- Slightly more code
- Unnecessary for very small classes

---

# Real-World Uses

- Lombok @Builder
- StringBuilder
- Spring Boot APIs
- HTTP Request Builders
- Database Query Builders

---

# Singleton vs Factory vs Builder

| Pattern | Purpose |
|----------|----------|
| Singleton | Only one object exists |
| Factory Method | Factory creates objects |
| Builder | Build complex objects step by step |

---

# Interview Questions

## What problem does Builder solve?

It avoids constructors with many parameters and allows complex objects to be built step by step.

---

## Why is the constructor private?

To force users to create objects through the Builder.

---

## Why is Builder static?

Because we need a Builder before a Computer object exists.

---

## Why return Builder from setter methods?

To support Method Chaining.

---

## Why build()?

It creates the final Computer object after all values have been collected.

---

## Difference between Builder Pattern and Fluent Interface?

Builder delays object creation until build().

Fluent Interface creates the object immediately and modifies it using chained setter methods.

---

# Key Takeaways

✅ Builder is a Creational Design Pattern.

✅ It constructs complex objects step by step.

✅ The Builder collects data first.

✅ build() creates the final object.

✅ Method chaining improves readability.

✅ Builder can create immutable objects.

✅ Fluent Interface and Builder look similar but solve different problems.

---

# Final Definition

> **Builder Pattern is a Creational Design Pattern that separates the construction of a complex object from its representation by collecting configuration step by step and creating the final object only when build() is called.**