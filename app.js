import { $, $$, LoadFile, ResolveSceneByName, ResolveThemeByName, NullConditional, CreateElementByDescriptor, NullishCoalescingOp, Log } from "./modules/utils.js";
import { data } from "./modules/globals.js";

/**
 * Where the frame is drawn.
 * Contained within the index.
 */
let target;

/**
 * Where the scene is drawn.
 * Contained within the frame.
 */
let content;

/**
 * Sets up and loads the first scene.
 */
function Initialize() {
	target = $("#target");
	
	LoadFile(ResolveThemeByName(conf.theme), (e) => {
		target.innerHTML = e.responseText;
		
		content = $("#content");

		CreateElementByDescriptor({
			parent: target,
			name: "script",
			attributes: [
				{src: ResolveThemeByName(conf.theme, "js")},
				{type: "module"},
			],
		});

		CreateElementByDescriptor({
			parent: target,
			name: "link",
			attributes: [
				{rel: "stylesheet"},
				{href: ResolveThemeByName(conf.theme, "css")}
			],
		});

		if (data.currentScene === null) {
			data.currentScene = conf.entryPoint;
		}

		// Load the first scene.
		Scene(data.currentScene);
	});

	document.addEventListener("click", (e) => {
		let sender = e.target;

		// If it's not an anchor tag...
		if (sender.tagName !== "A") {
			return;
		}

		// And it's not a navigation link...
		if (sender.getAttribute("data-link") !== null) {
			return
		}

		let allowSwitch = true;
		let required = $$(":required");
		if (required.length > 0) {
			required.forEach((e) => {
				if (e.value === "") {
					allowSwitch = false;
				}
			});
		}

		// Then navigate to that scene.
		e.preventDefault();
		if (allowSwitch) {
			Scene(sender.getAttribute("href"));
		}
	});

	document.addEventListener("file-loaded", (e) => {
		if (e.detail === 200) {
			Scene(data.currentScene);
		}
	});
}

/**
 * Loads a scene by its name.
 * @param {string} name Name of the scene to load.
 * @param {Function} cb Callback when the scene loaded.
 */
function Scene(name, cb = null) {
	LoadFile(ResolveSceneByName(name), (e) => {
		Log(null, true);
		
		content.innerHTML = e.responseText;

		CreateElementByDescriptor({
			parent: content,
			name: "script",
			attributes: [
				{src: ResolveSceneByName(name, "js")},
				{type: "module"}
			]
		});

		CreateElementByDescriptor({
			parent: content,
			name: "link",
			attributes: [
				{rel: "stylesheet"},
				{href: ResolveSceneByName(name, "css")}
			]
		});

		if ($("#sceneData") !== null) {
			document.title = `${$("#sceneData").getAttribute("data-title")} | ${conf.title}`;
		} else {
			document.title = conf.title;
		}

		// Set the scene as the current scene.
		data.currentScene = name;

		data.subscribers = {};

		if (cb !== null) {
			cb();
		}
	});
}

Initialize();