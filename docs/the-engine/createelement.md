---
layout: default
title: CreateElement
parent: The Engine
nav_order: 2
permalink: /the-engine/createelement
---

# CreateElement method

Creates an element based on the provided elementDescriptor object. In the engine, it is used to dynamically add the frame's stylesheet and script file.

```js
CreateElement(elementDescriptor);
```

## Parameters

`elementDescriptor`: object

The description of the element:

```
{
	name: string,
	parent?: DOMElement,
	classList?: string[],
	id?: string,
	innerHTML?: string,
	attributes?: object[],
}
```

## Examples

The example creates a script element to load in the theme's script file as a module:

```js
CreateElement({
	parent: $("body"),
	name: "script",
	attributes: [
		{src: "frame.js"},
		{type: "module"},
	],
});
```

**Result**

```html
<script class="" id="" src="frame.js" type="module"></script>
```