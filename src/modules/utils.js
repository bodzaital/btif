/**
 * Gets the first occurence of the given element.
 * @param {string} s Selector string.
 * @param {Element} d Parent element (default: document).
 */
function $(s, d = document) {
	return d.querySelector(s);
}

/**
 * Gets all occurences of the given element.
 * @param {string} s Selector string.
 * @param {Element} d Parent element (default: document).
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
			n.setAttribute("type", "module");
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
	return `scenes/${name}/${name}.${ext}?c=${NoCache()}`;
}

function ResolveTheme(name, ext = "html") {
	return `themes/${name}/frame.${ext}?c=${NoCache()}`;
}

function NoCache() {
	return Math.floor(Math.random() * (99999 - 10000)) + 10000; //The maximum is exclusive and the minimum is inclusive
}

/**
 * Returns the value of the condition only if it evaluates to non-null.
 * @param {*} condition The condition to evaluate.
 * @param {*} otherwise A default value if the condition evaluates to null.
 */
function NullConditional(condition, otherwise) {
	return condition !== null ? condition : otherwise;
}

export { $, $$, Load, CreateElement, ResolveScene, ResolveTheme, NullConditional };