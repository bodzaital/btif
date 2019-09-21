/**
 * Queries the document about an element and returns the first occurence.
 * @param {string} s Selector string
 * @param {Element} d Parent element
 */
function $(s, d = document) {
	return d.querySelector(s);
}

/**
 * Queries the document about an element and returns a collection.
 * @param {string} s Selector string
 * @param {Element} d Parent element
 */
function $$(s, d = document) {
	return d.querySelectorAll(s);
}

/**
 * Loads a file.
 * @param {string} target Name of the file to load.
 * @param {Function} cb Called when the loading is done.
 */
function Load(target, cb = null) {
	let a = new XMLHttpRequest();
	a.responseType = "text";
	a.open("GET", target, true);
	a.setRequestHeader("Cache-Control", "no-cache, no-store, must-revalidate")
	a.send();

	a.addEventListener("load", () => {
		if (cb !== null) {
			cb(a);
		}
	});
}

function CreateElement(e) {
	let n;
	switch (e.type) {
		case "stylesheet":
			n = document.createElement("link");
			n.setAttribute("rel", "stylesheet");
			n.setAttribute("href", e.href);
			return n;

		case "script":
			n = document.createElement("script");
			n.setAttribute("src", e.src);
			return n;
	
		default:
			alert("Invalid object.");
			break;
	}
}

/**
 * Resolves a scene path by its name.
 * @param {string} name Name of the scene.
 * @param {string} ext name of the extension.
 */
function ResolveScene(name, ext = "html") {
	return `scenes/${name}/${name}.${ext}`;
}

function ResolveTheme(name, ext = "html") {
	return `themes/${name}/frame.${ext}`;
}

export { $, $$, Load, CreateElement, ResolveScene, ResolveTheme };