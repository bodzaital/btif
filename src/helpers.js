/**
 * Wrapper for document.querySelector().
 * @param {string} s CSS selector for the DOM object.
 */
function x(s) {
	return document.querySelector(s);
}

/**
 * Wrapper for document.querySelectorAll().
 * @param {string} s CSS selector for the DOM objects.
 */
function xs(s) {
	return document.querySelectorAll(s);
}

/**
 * Loads a file using a GET ajax call.
 * @param {string} target The file to load.
 * @param {Function} callback A function to call once the ajax call is successfully done.
 */
function AjaxGet(target, callback = null) {
	let ajx = new XMLHttpRequest();
	ajx.responseType = "text";
	ajx.open("GET", target, true);
	ajx.send();

	ajx.addEventListener("load", () => {
		if (callback !== null) {
			callback(ajx);
		}
	})
}

/**
 * Creates a link element to the requested stylesheet.
 * @param {string} href A link to the style sheet
 */
function LinkElement(href) {
	let nde = document.createElement("link");
	nde.setAttribute("rel", "stylesheet");
	nde.setAttribute("href", href);
	return nde;
}

/**
 * Creates a script element to the requested javascript file.
 * @param {string} src A link to the script.
 */
function ScriptElement(src) {
	let nde = document.createElement("script");
	nde.setAttribute("src", src);
	return nde;
}