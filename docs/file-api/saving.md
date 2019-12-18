---
layout: default
title: Saving API
parent: File API
nav_order: 2
permalink: /file-api/saving
---

# Saving API

The static `File.Save()` method saves the game data object by (1) serializing it as a JSON string and (2) downloading the file. The theme must have a hidden `a#hidden-link-save` element.

## Usage

To use the File API, import the `File` object from `modules/files.js`.

## Example

In this example, the theme has a save button, which when clicked, serializes the game data object and offers it as a download.

**frame.html**

```html
<div class="menu">
	<a id="hidden-link-save" style="display:none"></a>
	<button id="menu_save">Save</button>
</div>

<div id="content"></div>
```

**frame.js**

```javascript
import { File } from "../../modules/file.js";

$("#menu_save").addEventListener("click", (e) => {
	File.Save();
});

```