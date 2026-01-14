---
title: Essential React Hooks Every Developer Should Know
date: '2025-01-05'
excerpt: A practical guide to the most important React Hooks including useState, useEffect, useCallback, and useMemo.
---

## Introduction

React Hooks revolutionized how we write React components. Let's explore the essential hooks you'll use in every project.

## useState - Managing State

The most fundamental hook for managing component state:

```typescript
import { useState } from 'react';

function Counter() {
  const [count, setCount] = useState(0);
  const [user, setUser] = useState({ name: '', email: '' });

  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={() => setCount(prev => prev + 1)}>
        Increment
      </button>
    </div>
  );
}
```

## useEffect - Side Effects

Handle side effects like data fetching, subscriptions, and DOM manipulation:

```typescript
import { useEffect, useState } from 'react';

function UserProfile({ userId }: { userId: string }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const response = await fetch(`/api/users/${userId}`);
      const data = await response.json();
      setUser(data);
      setLoading(false);
    }

    fetchUser();
  }, [userId]); // Re-run when userId changes

  if (loading) return <p>Loading...</p>;
  return <div>{user?.name}</div>;
}
```

## useCallback - Memoizing Functions

Prevent unnecessary re-renders by memoizing callback functions:

```typescript
import { useCallback, useState } from 'react';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const addTodo = useCallback((text: string) => {
    setTodos(prev => [...prev, { id: Date.now(), text }]);
  }, []);

  const removeTodo = useCallback((id: number) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  }, []);

  return (
    <div>
      <TodoInput onAdd={addTodo} />
      <TodoItems items={todos} onRemove={removeTodo} />
    </div>
  );
}
```

## useMemo - Memoizing Values

Optimize expensive calculations:

```typescript
import { useMemo, useState } from 'react';

function FilteredList({ items, filter }) {
  const filteredItems = useMemo(() => {
    console.log('Filtering items...');
    return items.filter(item =>
      item.name.toLowerCase().includes(filter.toLowerCase())
    );
  }, [items, filter]);

  return (
    <ul>
      {filteredItems.map(item => (
        <li key={item.id}>{item.name}</li>
      ))}
    </ul>
  );
}
```

## useRef - Persistent References

Access DOM elements or store mutable values:

```typescript
import { useRef, useEffect } from 'react';

function FocusInput() {
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    // Focus the input on mount
    inputRef.current?.focus();
  }, []);

  return <input ref={inputRef} placeholder="I'll be focused" />;
}
```

## Custom Hooks

Create reusable logic with custom hooks:

```typescript
function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch {
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    const valueToStore = value instanceof Function
      ? value(storedValue)
      : value;
    setStoredValue(valueToStore);
    window.localStorage.setItem(key, JSON.stringify(valueToStore));
  };

  return [storedValue, setValue] as const;
}

// Usage
function App() {
  const [theme, setTheme] = useLocalStorage('theme', 'light');
}
```

## Conclusion

These hooks form the foundation of modern React development. Master them, and you'll be able to build complex, performant applications with ease.

| Hook | Purpose |
|------|---------|
| useState | Manage component state |
| useEffect | Handle side effects |
| useCallback | Memoize functions |
| useMemo | Memoize values |
| useRef | DOM refs and mutable values |
