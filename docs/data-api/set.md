---
layout: default
title: Set method
parent: Data API
nav_order: 2
permalink: /data-api/set
---

# Set method

Sets the key to a new value and updates all subscribed elements.

```js
data.Set(key, value);
```

## Parameters

`key`: string

The key identifying an object within the global store.

`value`: object

The payload of to save.

## Example

The example saves the value of an input field to the `player-field` key whenever its value changes:

```js
$("#input-field").addEventListener("input", () => {
    data.Set("player-name", $("#input-field").value);
});
```