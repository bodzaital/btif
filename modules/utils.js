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
function LoadFile(target, cb = null) {
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

/**
 * Creates an element based on a description.
 * @param {{}} elementDescriptor A description of the element.
 */
function CreateElementByDescriptor(elementDescriptor) {
	// Is it really OO? Well, no, but who cares? Sounds nice.
	let e = document.createElement(elementDescriptor.name);

	e.classList = NullishCoalescingOp(elementDescriptor.classList, [""]);
	e.id = NullishCoalescingOp(elementDescriptor.id, "");
	e.innerHTML = NullishCoalescingOp(elementDescriptor.innerHTML, "");

	elementDescriptor.attributes.forEach(element => {
		for (let o in element) {
			e[o] = element[o];
		}
	});

	elementDescriptor.parent.appendChild(e);
}

/**
 * Resolves a scene path by its name.
 * @param {string} name Name of the scene.
 * @param {string} ext Name of the extension, default "html".
 */
function ResolveSceneByName(name, ext = "html") {
	return `scenes/${name}/${name}.${ext}?c=${CacheBuster()}`;
}

/**
 * 
 * @param {string} name Name of the scene.
 * @param {string} ext Name of th extension, default "html".
 */
function ResolveThemeByName(name, ext = "html") {
	return `themes/${name}/frame.${ext}?c=${CacheBuster()}`;
}

/**
 * Generates a random number to be used for cache busting.
 */
function CacheBuster() {
	return Math.floor(Math.random() * (99999 - 10000)) + 10000;
}

/**
 * Returns a value if its not explicitly null.
 * @param {*} condition The value.
 * @param {*} otherwise A default value if the condition evaluates to null.
 */
function NullConditional(condition, otherwise) {
	return condition !== null ? condition : otherwise;
}

/**
 * returns its right-hand side operand when its left-hand side operand is null or undefined, and otherwise returns its left-hand side operand.
 * @param {*} lhs The left hand side.
 * @param {*} rhs The right hand side.
 */
function NullishCoalescingOp(lhs, rhs) {
	if (lhs == null || lhs == undefined) {
		return rhs;
	}

	return lhs;
}

/**
 * Logs debug information to the console if the
 * debug option is true in configuration.js
 * @param {string?} msg The message to log.
 * @param {bool} clear Clear the console before logging or not.
 */
 function Log(msg, clear = false) {
	if (!conf.log) return;

	if (clear) console.clear();
	
	if (msg == null) return;

	console.log(msg);
}

export { $, $$, LoadFile, ResolveSceneByName, ResolveThemeByName, NullConditional, CreateElementByDescriptor, NullishCoalescingOp, Log };