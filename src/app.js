import { $, $$, Load, CreateElement, ResolveScene, ResolveTheme } from "./modules/utils.js";

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
	
	Load(ResolveTheme(conf.theme), (e) => {
		target.innerHTML = e.responseText;
		
		content = $("#content");
		
		// Add the script of the frame.
		target.appendChild(CreateElement({
			type: "script",
			src: ResolveTheme(conf.theme, "js")
		}));

		// Add the stylesheet of the frame.
		target.appendChild(CreateElement({
			type: "stylesheet",
			href: ResolveTheme(conf.theme, "css")
		}));

		// Load the first scene.
		Scene(conf.entryPoint);
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
}

/**
 * Loads a scene by its name.
 * @param {string} name Name of the scene to load.
 * @param {Function} cb Callback when the scene loaded.
 */
function Scene(name, cb = null) {
	Load(ResolveScene(name), (e) => {
		content.innerHTML = e.responseText;

		// Add the script file of the scene.
		content.appendChild(CreateElement({
			type: "script",
			src: ResolveScene(name, "js")
		}));

		// Add the stylesheet of the scene.
		content.appendChild(CreateElement({
			type: "stylesheet",
			href: ResolveScene(name, "css")
		}));

		if ($("#sceneData") !== null) {
			document.title = `${$("#sceneData").getAttribute("data-title")} | ${conf.title}`;
		} else {
			document.title = conf.title;
		}

		if (cb !== null) {
			cb();
		}
	});
}

Initialize();