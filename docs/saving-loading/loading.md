---
layout: default
title: Loading API
parent: saving-loading
nav_order: 2
permalink: /saving-loading/loading
---

# Loading API

The Loading API provides a method to asynchronously load an already saved JSON file. The actual parsing is left to the frame.

## Usage

In your frame, add an event listener to the file browser button, and pass the event object to the `OpenFileAsync()` function. The function returns a `Promise`, which contains the file's contents. As of version 0.2, the Loading API only loads the file but doesn't set any variables, nor notifies the scenes. These functions will be implemented into the Loading API.

```js
x(".browse-file").addEventListener("change", e => {
	OpenFileAsync(e).then((v) => {
		let saveData = JSON.parse(v);
		globals.Set("player", saveData.data["player"]);
		SceneLoad();
	});
});
```

The above excerpt calls the `OpenFileAsync()` function, then once the Promise is recieved, parses the file contents, then sets the `player` global, and notifies the scenes that the globals are set and ready to use.

## Notifying a scene

The frame can also notify the scenes that the saved data is loaded and the globals are ready to be used.

```js
SceneLoad();
```

```js
function SceneLoad() {
	x("#name-input").value = globals.Get("player");
}
```

The scenes may define a `SceneLoad()` function that is called by the frame after loading a file. In this function, a scene should set up its visuals to match the contents of the variables in the globals object.