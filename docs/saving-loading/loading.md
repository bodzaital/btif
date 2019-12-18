---
layout: default
title: Loading API
parent: File API
nav_order: 2
permalink: /file-api/loading
---

# Loading API

The static `File.Load(inputEventArgs: object)` method loads the game data object by (1) parsing it as a JSON object. If the file is loaded and parsed, the `file-loaded` event is dispatched with a status code in `EventArgs.detail`:

- 200: loaded and parsed successfully
- 600: version mismatch

The theme must have an `input[type="file"]` element wrapped in another element. The `EventArgs` object raised by the input element is passed to `File.Load(inputEventArgs: object)` method.

## Usage

To use the File API, import the `File` object from `modules/files.js`.

## Example

In this example, the theme has a load button (an `input[type="file"]`), wrapped in a `form` element. When the input is clicked, the selected file is loaded and parsed, then a scene (`scene-0`) updates with the stored data.

**frame.html**

```html
<form id="form_load">
	<input type="file" id="input_load" name="input_load">
</form>
```

**frame.js**

```javascript
import { File } from "../../modules/file.js";

$("#form_load").addEventListener("change", (e) => {
	File.Load(e);
});
```

**scene-0.js**

```javascript
document.addEventListener("file-loaded", (e) => {
	if (e.detail === 200) {
		$("#name-input").value = data.Get("player");
	}
});
```

## Remarks

On status codes other than `200`, the theme should display some error message to the player; the scenes should only update on status code `200`.