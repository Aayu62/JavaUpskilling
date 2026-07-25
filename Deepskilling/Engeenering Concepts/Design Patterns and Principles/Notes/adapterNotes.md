# Adapter Pattern

## Exercise 4: Implementing the Adapter Pattern

---

# What is the Adapter Pattern?

Adapter Pattern is a **Structural Design Pattern** that allows two incompatible interfaces to work together.

It acts as a **translator** between two classes.

Instead of changing existing classes, we create an Adapter that translates one interface into another.

---

# Why Do We Need Adapter?

Imagine we are building an E-Commerce application.

Our application expects every payment gateway to have this method.

```java
processPayment(double amount)
```

However, different payment gateways provide different methods.

### Razorpay

```java
makePayment(double amount)
```

### PayPal

```java
sendPayment(double amount)
```

### Stripe

```java
pay(double amount)
```

Although all of them perform the same task, their interfaces are different.

This creates incompatibility.

---

# Solution

Instead of modifying third-party classes, we create an Adapter.

```
Application

      |

processPayment()

      |

Adapter

      |

Gateway Specific Method

      |

Payment Gateway
```

The Adapter translates the request into the format expected by the payment gateway.

---

# Real-Life Analogy

Suppose you bought a laptop from the USA.

Its charger has a US plug.

Your house has an Indian socket.

```
Indian Socket

      X

US Plug
```

They cannot connect directly.

You use a Power Adapter.

```
Indian Socket

      |

Power Adapter

      |

US Plug
```

The adapter does not change either device.

It simply makes them compatible.

Adapter Pattern works exactly the same way.

---

# Project Structure

```
AdapterPatternExample
│
└── src
    │
    └── com
        │
        └── adapter
            │
            ├── Main.java
            ├── PaymentProcessor.java
            ├── RazorpayGateway.java
            ├── PayPalGateway.java
            ├── RazorpayAdapter.java
            └── PayPalAdapter.java
```

---

# Architecture

```
                  PaymentProcessor
                     (Target)

                         ▲

          ┌──────────────┴──────────────┐
          │                             │

   RazorpayAdapter               PayPalAdapter

          │                             │

          ▼                             ▼

 RazorpayGateway                 PayPalGateway
```

---

# Components of Adapter Pattern

| Component | Our Example |
|-----------|-------------|
| Target | PaymentProcessor |
| Adaptee | RazorpayGateway, PayPalGateway |
| Adapter | RazorpayAdapter, PayPalAdapter |
| Client | Main |

---

# Step 1 - Target Interface

```java
public interface PaymentProcessor {

    void processPayment(double amount);

}
```

This is the interface expected by our application.

Every payment processor should implement this method.

---

# Step 2 - Adaptee Classes

### Razorpay

```java
public class RazorpayGateway {

    public void makePayment(double amount){

        System.out.println(...);

    }

}
```

### PayPal

```java
public class PayPalGateway {

    public void sendPayment(double amount){

        System.out.println(...);

    }

}
```

Notice the method names.

```
makePayment()

sendPayment()
```

These do not match our interface.

---

# What is an Adaptee?

An Adaptee is an **existing class with an incompatible interface**.

Usually it comes from a third-party library.

We cannot (or should not) modify it.

---

# Step 3 - Adapter

Example

```java
public class RazorpayAdapter
        implements PaymentProcessor {

    private RazorpayGateway razorpayGateway;

}
```

The Adapter implements the Target interface.

Internally, it stores the actual payment gateway.

---

# Why Composition?

```
Adapter

      |

Has a

      ▼

Gateway
```

The Adapter contains a gateway object.

This relationship is called **Composition**.

---

# Constructor

```java
public RazorpayAdapter(){

    razorpayGateway = new RazorpayGateway();

}
```

Whenever we create an Adapter,

it automatically creates the gateway.

---

# Translation Method

```java
@Override
public void processPayment(double amount){

    razorpayGateway.makePayment(amount);

}
```

This is the heart of the Adapter Pattern.

```
processPayment()

↓

makePayment()
```

The Adapter translates the method call.

---

# PayPal Adapter

```java
@Override
public void processPayment(double amount){

    payPalGateway.sendPayment(amount);

}
```

Again,

```
processPayment()

↓

sendPayment()
```

The Adapter hides this difference from the application.

---

# Main Class

```java
PaymentProcessor razorpay =
        new RazorpayAdapter();

razorpay.processPayment(1000);

PaymentProcessor paypal =
        new PayPalAdapter();

paypal.processPayment(2000);
```

Notice that Main never calls

```
makePayment()

or

sendPayment()
```

It always calls

```
processPayment()
```

---

# Complete Execution Flow

### Razorpay

```
Main

↓

PaymentProcessor

↓

RazorpayAdapter

↓

makePayment()

↓

RazorpayGateway
```

---

### PayPal

```
Main

↓

PaymentProcessor

↓

PayPalAdapter

↓

sendPayment()

↓

PayPalGateway
```

---

# Memory Flow

```
Main

↓

Creates RazorpayAdapter

↓

Adapter creates RazorpayGateway

↓

processPayment()

↓

Adapter forwards call

↓

makePayment()
```

---

# Common Beginner Doubts

---

## Doubt 1

### Why not modify RazorpayGateway and rename

```
makePayment()
```

to

```
processPayment()
```

### Answer

Because RazorpayGateway belongs to a third-party library.

We do not own that code.

Updating the SDK would overwrite our changes.

Instead, we wrap it using an Adapter.

---

## Doubt 2

### Why not make RazorpayGateway implement PaymentProcessor?

Example

```java
public class RazorpayGateway
        implements PaymentProcessor
```

### Answer

Again,

we do not own the third-party library.

We should never modify external SDKs.

The Adapter allows us to keep third-party code unchanged.

---

## Doubt 3

### Why does the Adapter implement PaymentProcessor instead of extending RazorpayGateway?

Instead of

```java
extends RazorpayGateway
```

we wrote

```java
implements PaymentProcessor
```

and

```java
private RazorpayGateway gateway;
```

This follows an important software engineering principle.

> Favor Composition over Inheritance.

The Adapter is **not** a payment gateway.

It simply **uses** one internally.

---

## Doubt 4

### Why create the gateway inside the Adapter constructor?

Example

```java
new RazorpayGateway();
```

inside

```java
RazorpayAdapter()
```

### Answer

For this exercise, it keeps the code simple.

In larger applications, we often pass the gateway through the constructor.

Example

```java
public RazorpayAdapter(RazorpayGateway gateway){

    this.gateway = gateway;

}
```

This technique is called **Dependency Injection**.

---

## Doubt 5

### Why write

```java
PaymentProcessor processor =
        new RazorpayAdapter();
```

instead of

```java
RazorpayAdapter processor =
        new RazorpayAdapter();
```

### Answer

Programming to the interface makes the code flexible.

Tomorrow we can replace

```java
new RazorpayAdapter()
```

with

```java
new PayPalAdapter()
```

without changing the rest of the application.

---

# Advantages

- Integrates incompatible interfaces.
- Reuses existing classes.
- No need to modify third-party libraries.
- Promotes loose coupling.
- Improves maintainability.

---

# Disadvantages

- Adds additional classes.
- Slightly increases complexity.
- Too many adapters can make the project harder to navigate.

---

# Real-World Uses

- Payment Gateway Integration
- JDBC Drivers
- Legacy System Integration
- XML to JSON Converters
- Mobile Charger Adapters
- Spring Framework

---

# Comparison

| Pattern | Purpose |
|----------|----------|
| Singleton | Only one object exists |
| Factory Method | Factory creates objects |
| Builder | Build complex objects step by step |
| Adapter | Make incompatible interfaces work together |

---

# Interview Questions

## What problem does Adapter solve?

It allows incompatible interfaces to communicate without modifying existing classes.

---

## What is the Target?

The interface expected by the client.

Example

```
PaymentProcessor
```

---

## What is the Adaptee?

The existing incompatible class.

Example

```
RazorpayGateway
```

---

## What is the Adapter?

The class that translates between the Target and the Adaptee.

Example

```
RazorpayAdapter
```

---

## Why use Composition?

Because the Adapter uses the gateway instead of becoming the gateway.

This follows

> Favor Composition over Inheritance.

---

## Can Adapter work with third-party libraries?

Yes.

In fact,

that is one of its biggest real-world applications.

---

# Key Takeaways

✅ Adapter is a Structural Design Pattern.

✅ It acts as a translator.

✅ It allows incompatible interfaces to work together.

✅ It is commonly used with third-party libraries.

✅ It follows "Favor Composition over Inheritance."

✅ The client only knows the Target interface.

---

# Final Definition

> **Adapter Pattern is a Structural Design Pattern that converts the interface of an existing class into another interface expected by the client, allowing incompatible classes to work together without modifying their source code.**