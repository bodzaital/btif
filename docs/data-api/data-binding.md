---
layout: default
title: Data binding
parent: Data API
nav_order: 2
permalink: /data-api/data-binding
---

# Data binding

> [...] **data binding** is a general technique that binds data sources from the provider and consumer together and synchronizes them.
> — Wikipedia

To update/display data stored in the global store, elements and their properties must be subscribed to key value changes. In other environments, data binding can be one way (in either direction) or two way, and may provide extra functionality like conversion, etc. In the engine, data binding is always two way and only serves a single purpose, to keep the values between the global store and HTML elements in sync.

Data binding synchronizes the a value between the global store and all subscribed HTML elements to it when a Set or Subscribe method is called on it.

The subscriptions are stored in an object of arrays; as of yet there's no method of unsubscribing easily.

## See also

* [Set method](set.md)
* [Subscribe method](subscribe.md)