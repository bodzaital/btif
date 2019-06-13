---
layout: default
title: Saving API
parent: Page
nav_order: 2
permalink: /saving-loading/saving
---

# Saving API

As of version 0.2, there is a planned Saving API. The current implementation is provided by the current frame:

```js
x("#btn-save").addEventListener("click", e => {
	let saveDataJson = {
		"version": 0.2,
		"data": {

		}
	};

	saveDataJson.data = globals.store;

	let serialized = JSON.stringify(saveDataJson);
	let dataStream = "data:text/json;charset=utf-8," + encodeURIComponent(serialized);
	
	let dlAnchorElem = document.getElementById('downloadAnchorElem');
	dlAnchorElem.setAttribute("href", dataStream);
	dlAnchorElem.setAttribute("download", "scene.json");
	dlAnchorElem.click();
});
```

This excerpt waits for the save button to be pressed, then serializes the globals object and encodes it into an URI, which is then invoked and downloaded as a JSON file. A similar implementation will be provided in the Saving API.