# Factory Method Pattern

## Exercise 2: Implementing the Factory Method Pattern

---

# What is Factory Method Pattern?

Factory Method is a **Creational Design Pattern** that provides a way to create objects **without exposing the object creation logic to the client**.

Instead of creating objects directly using `new`, the client asks a **Factory** to create them.

---

# Why Do We Need Factory Method?

Imagine we are building a Document Management System.

The application supports:

- Word Documents
- PDF Documents
- Excel Documents

Without Factory Method, we might write:

```java
WordDocument word = new WordDocument();
PdfDocument pdf = new PdfDocument();
ExcelDocument excel = new ExcelDocument();
```

Here, the client knows every concrete class.

If a new document type is added, we must modify the client code.

This makes the application difficult to maintain.

---

# Solution

Instead of creating objects directly,

The client simply asks a factory.

```
Client

     |

     V

Factory

     |

     V

Creates Required Document
```

The client doesn't know how the object is created.

---

# Real-Life Analogy

Imagine you're in a restaurant.

You don't enter the kitchen and cook your food.

You simply tell the waiter:

> "I want a Pizza."

The waiter passes the request to the kitchen.

The kitchen prepares the food.

The customer only receives the finished product.

```
Customer

    |

Waiter

    |

Kitchen

    |

Pizza
```

Customer = Client

Kitchen = Factory

Pizza = Product

---

# Project Structure

```
FactoryMethodPatternExample
│
└── src
    │
    └── com
        │
        └── factory
            │
            ├── Main.java
            ├── Document.java
            ├── WordDocument.java
            ├── PdfDocument.java
            ├── ExcelDocument.java
            ├── DocumentFactory.java
            ├── WordDocumentFactory.java
            ├── PdfDocumentFactory.java
            └── ExcelDocumentFactory.java
```

---

# Architecture

```
                    Document
                    (Interface)
                         ▲
        ┌────────────────┼────────────────┐
        │                │                │
 WordDocument     PdfDocument     ExcelDocument



                 DocumentFactory
                (Abstract Class)
                        ▲
        ┌───────────────┼───────────────┐
        │               │               │
WordDocumentFactory PdfDocumentFactory ExcelDocumentFactory



                      Main
                        │
                        ▼
              factory.createDocument()
```

---

# Step 1 - Product Interface

```java
public interface Document {

    void open();

}
```

## Why Interface?

Every document can be opened.

Different documents open differently.

The interface defines the common behavior.

---

# Step 2 - Concrete Products

## WordDocument

```java
public class WordDocument implements Document {

    @Override
    public void open() {
        System.out.println("Opening Word Document...");
    }

}
```

## PdfDocument

```java
public class PdfDocument implements Document {

    @Override
    public void open() {
        System.out.println("Opening PDF Document...");
    }

}
```

## ExcelDocument

```java
public class ExcelDocument implements Document {

    @Override
    public void open() {
        System.out.println("Opening Excel Document...");
    }

}
```

Each class provides its own implementation of `open()`.

---

# What does implements mean?

```
implements
```

means

> The class agrees to follow the contract defined by the interface.

If the interface has

```java
void open();
```

then every implementing class must provide that method.

---

# What is @Override?

```java
@Override
```

tells Java that we are implementing a method from the interface.

It helps the compiler detect spelling mistakes and method signature errors.

---

# Step 3 - Abstract Factory

```java
public abstract class DocumentFactory {

    public abstract Document createDocument();

}
```

---

# Why Abstract Class?

We never create a generic factory.

Instead, we create

- WordDocumentFactory
- PdfDocumentFactory
- ExcelDocumentFactory

The abstract class simply defines a common blueprint.

---

# Why createDocument() is abstract?

The parent class doesn't know which document should be created.

Each child factory decides that.

---

# Step 4 - Concrete Factories

## WordDocumentFactory

```java
public class WordDocumentFactory extends DocumentFactory {

    @Override
    public Document createDocument() {
        return new WordDocument();
    }

}
```

## PdfDocumentFactory

```java
public class PdfDocumentFactory extends DocumentFactory {

    @Override
    public Document createDocument() {
        return new PdfDocument();
    }

}
```

## ExcelDocumentFactory

```java
public class ExcelDocumentFactory extends DocumentFactory {

    @Override
    public Document createDocument() {
        return new ExcelDocument();
    }

}
```

Each factory creates only one type of document.

---

# Step 5 - Testing

```java
public class Main {

    public static void main(String[] args) {

        DocumentFactory wordFactory = new WordDocumentFactory();
        Document word = wordFactory.createDocument();
        word.open();

        DocumentFactory pdfFactory = new PdfDocumentFactory();
        Document pdf = pdfFactory.createDocument();
        pdf.open();

        DocumentFactory excelFactory = new ExcelDocumentFactory();
        Document excel = excelFactory.createDocument();
        excel.open();

    }

}
```

---

# Dry Run

Program starts

↓

Create WordDocumentFactory

↓

Call

```java
createDocument()
```

↓

Factory creates

```
WordDocument
```

↓

Call

```java
open()
```

↓

Output

```
Opening Word Document...
```

The same flow repeats for PDF and Excel.

---

# Why are we using the parent type?

Instead of

```java
WordDocumentFactory factory
```

we write

```java
DocumentFactory factory
```

because a parent reference can point to different child objects.

Example

```java
Animal animal = new Dog();
```

Similarly,

```java
DocumentFactory factory = new PdfDocumentFactory();
```

This gives flexibility.

---

# Memory Flow

```
Main

   |

DocumentFactory

   |

Concrete Factory

   |

Concrete Document

   |

open()
```

The client never creates the document directly.

---

# Advantages

- Object creation is centralized.
- Client is independent of concrete classes.
- Easy to add new document types.
- Cleaner and maintainable code.
- Supports Open/Closed Principle.

---

# Disadvantages

- More classes are required.
- Slightly increases project complexity.

---

# Real-World Uses

- Document Editors
- Database Drivers
- UI Component Libraries
- Spring Framework
- Logging Libraries

---

# Singleton vs Factory Method

| Singleton | Factory Method |
|------------|----------------|
| Ensures only one object | Creates objects |
| Uses getInstance() | Uses createDocument() |
| One shared object | Multiple objects can be created |
| Controls number of objects | Controls object creation |

---

# Interview Questions

## What problem does Factory Method solve?

It separates object creation from object usage.

---

## Why use an interface?

To provide a common type for all document classes.

---

## Why use an abstract factory?

Because the parent factory doesn't know which document should be created.

---

## Difference between extends and implements?

**extends**

Used with classes.

```java
class Dog extends Animal
```

**implements**

Used with interfaces.

```java
class Dog implements Animal
```

---

## Why return Document instead of WordDocument?

Returning the interface makes the client independent of the concrete implementation.

---

# Exercise Checklist

- [x] Created project
- [x] Created Document interface
- [x] Implemented WordDocument
- [x] Implemented PdfDocument
- [x] Implemented ExcelDocument
- [x] Created abstract DocumentFactory
- [x] Created WordDocumentFactory
- [x] Created PdfDocumentFactory
- [x] Created ExcelDocumentFactory
- [x] Tested using Main.java

---

# Key Takeaways

✅ Factory Method is a Creational Design Pattern.

✅ The client does not create objects directly.

✅ A Factory is responsible for object creation.

✅ Interfaces provide a common contract.

✅ Abstract classes define the blueprint for factories.

✅ Concrete factories create concrete products.

---

# Final Definition

> **Factory Method Pattern is a Creational Design Pattern that defines an interface (or abstract class) for creating objects, while allowing subclasses to decide which concrete object to instantiate. This separates object creation from object usage, making the code more flexible, maintainable, and extensible.**