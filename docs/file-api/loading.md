---
layout: default
title: Loading API
parent: File API
nav_order: 2
permalink: /file-api/loading
---

# Loading API

The static `File.Load(inputEventArgs: object)` method loads the game data object by parsing it as a JSON object. If the file is loaded and parsed, the `file-loaded` event is dispatched with a status code in `EventArgs.detail`:

- 200: loaded and parsed successfully
- 600: version mismatch

The theme must have an `input[type="file"]` element wrapped in another element. The `EventArgs` object raised by the input element is passed to `File.Load(inputEventArgs: object)` method.

## Usage

To use the File API, import the `File` object from `modules/files.js`.

## Example

In this example, the theme has a load button wrapped in a form element (1). When the input is clicked (triggers a change event in the form element), the selected file is loaded (2), parsed, and the global store is updated. Any subscribed elements are then synchronized by the Data API (3).

**frame.html**

```html
<form id="form_load">
	<input type="file" id="input_load" name="input_load"> <!-- (1) -->
</form>
```

**frame.js**

```javascript
import { File } from "../../modules/file.js";

$("#form_load").addEventListener("change", (e) => {
	File.Load(e); // (2).
});
```

**scene-0.html**
```html
<span id="player_name">
```

**scene-0.js**

```javascript
data.Subscribe($("#player_name"), "innerText", "player"); // (3).
```

## Remarks
The `file-loaded` event is still dispatched but the scenes themselves don't listen to it. The frame, however, may show an error message if the status code isn't the eexpected 200.