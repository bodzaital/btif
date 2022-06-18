---
layout: default
title: Add method
parent: Data API
nav_order: 2
permalink: /data-api/add
---

# Add method

Adds a new key to the store without updating subscribed elements.

```js
data.Add(key, value);
```

## Parameters

`key`: string

The key to add to the store.

`value`: object

The key's new value.

## Example

To create a global variable to use across scenes, call Add in scene-0 and Get in scene-1:

```js
// scene-0.js
data.Add("points", 1);

// scene-1.js
data.Get("points"); // Returns 1.
```