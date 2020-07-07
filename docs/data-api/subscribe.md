---
layout: default
title: Subscribe method
parent: Data API
nav_order: 2
permalink: /data-api/subscribe
---

# Subscribe method

Subscribes an element's property to a key's changes in the global store.

```js
data.Subscribe(element, property, key);
```

## Parameters

`element`: Node

An HTML element in the scene.

`property`: string

A property of this HTML element.

`key`: string

The key to "subscribe" to.

## Example

The example subscribes the `player-display` element's `innerText` property to the `player-name` key:

```js
data.Subscribe($("#player-display"), "innerText", "player-name");
```

## Remarks

When calling Subscribe, an Update also fires for the same key after the subscription is applied.