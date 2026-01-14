---
title: Getting Started with JavaScript
date: '2025-01-10'
excerpt: Learn the basics of JavaScript programming and start building interactive web applications.
---

## Introduction

JavaScript is a versatile programming language that powers the modern web. In this article, we'll cover the fundamentals you need to know to get started.

## Variables and Data Types

JavaScript supports several data types:

- **String**: Text data like `"Hello, World!"`
- **Number**: Numeric values like `42` or `3.14`
- **Boolean**: `true` or `false`
- **Array**: Lists of values like `[1, 2, 3]`
- **Object**: Key-value pairs like `{ name: "John" }`

### Declaring Variables

```javascript
// Using const for constants
const PI = 3.14159;

// Using let for variables that change
let count = 0;
count = count + 1;

// Modern JavaScript prefers const and let over var
const user = {
  name: "Alice",
  age: 30
};
```

## Functions

Functions are reusable blocks of code:

```javascript
// Arrow function syntax
const greet = (name) => {
  return `Hello, ${name}!`;
};

// Calling the function
console.log(greet("World")); // Output: Hello, World!
```

## Control Flow

### Conditional Statements

```javascript
const temperature = 25;

if (temperature > 30) {
  console.log("It's hot outside!");
} else if (temperature > 20) {
  console.log("Nice weather!");
} else {
  console.log("It's a bit cold.");
}
```

### Loops

```javascript
// For loop
for (let i = 0; i < 5; i++) {
  console.log(`Iteration ${i}`);
}

// Array methods
const numbers = [1, 2, 3, 4, 5];
const doubled = numbers.map(n => n * 2);
console.log(doubled); // [2, 4, 6, 8, 10]
```

## Working with Arrays

Arrays are fundamental in JavaScript:

```javascript
const fruits = ["apple", "banana", "orange"];

// Add to array
fruits.push("grape");

// Filter
const longNames = fruits.filter(f => f.length > 5);

// Find
const found = fruits.find(f => f === "banana");

// Reduce
const total = [1, 2, 3, 4].reduce((acc, n) => acc + n, 0);
```

## Conclusion

This is just the beginning of your JavaScript journey. Practice these concepts and you'll be building amazing applications in no time!

> "Any application that can be written in JavaScript, will eventually be written in JavaScript." - Atwood's Law
