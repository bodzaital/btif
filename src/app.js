// ===================================
// The main backbone of the framework.
// ===================================

// Load configuration. See configuration.js for descriptions.
let entryPoint = conf.entryPoint;
let title = conf.title;
let debugMode = conf.debugMode;
let theme = conf.theme;

// Set up variables used.
let content = x("#content");

// Load the first scene.
LoadNextScene(conf.entryPoint);

// Scene changed click event.
document.addEventListener("click", e => {
	e.preventDefault();
	
	let sender = e.target;
	if (sender.tagName !== "A") {
		return;
	}
	if (sender.getAttribute("data-link") === null) {
		return;
	}

	let scenePath = sender.getAttribute("href");
	BeforeSceneChange(LoadNextScene(scenePath, () => {
		AfterSceneChange();
	}));
});

function BeforeSceneChange(callback = null) {
	console.log("TODO: Implement something before the scene changes.");
	if (callback !== null) {
		callback();
	}
}

function AfterSceneChange(callback = null) {
	console.log("TODO: Implement something after the scene changes.");
	if (callback !== null) {
		callback();
	}
}

/**
 * Loads the next scene along with its associated files.
 * @param {string} scenePath The name of the scene that will be translated to its canonical path.
 * @param {Function} callback A function to call once the loading is done.
 */
function LoadNextScene(scenePath, callback = null) {
	let ajax = new XMLHttpRequest();
	ajax.open("GET", ResolveScenePath(scenePath), true);
	ajax.send();

	ajax.addEventListener("load", () => {
		content.innerHTML = ajax.responseText;
		SetTitle();
		LoadSceneFiles(scenePath);
		if (callback !== null) {
			callback();
		}
	});

	ajax.addEventListener("error", () => {
		DebugCors(scenePath);
	});
}

/**
 * Handles debug messages when a scene load is blocked by CORS.
 * @param {string} stat Status code of the ajax call
 * @param {string} scenePath The scene name which was attempted to load
 */
function DebugCors(scenePath)
{
	if (!debugMode) {
		return;
	}

	let msg = `Runtime error 4000\nThe requested resource does not exist or the Cross-Origin Resource Sharing policy forbids loading it.\n\nWhen loading: [${scenePath}]\nattempted at: [${ResolveScenePath(scenePath)}]`

	alert(msg);
	console.log(msg);
}

/**
 * Sets the title of the browser, concatenating the scene and story title if needed.
 */
function SetTitle()
{
	let sceneData = x("#sceneData")
	if (sceneData) {
		let sceneTitle = sceneData.getAttribute("data-title");
		document.title = `${sceneTitle} | ${title}`;
	} else {
		document.title = title;
	}
}

/**
 * Adds the corresponding script and style files to the master scene file.
 * @param {string} scenePath The name of the scene that will be translated to its canonical path.
 */
function LoadSceneFiles(scenePath)
{
	let sceneScript = document.createElement("script");
	sceneScript.setAttribute("src", ResolveScenePath(scenePath, "js"));
	content.appendChild(sceneScript);
	
	let sceneStyle = document.createElement("link");
	sceneStyle.setAttribute("rel", "stylesheet");
	sceneStyle.setAttribute("href", ResolveScenePath(scenePath, "css"));
	content.appendChild(sceneStyle);
}

/**
 * Resolves the scene's canonical directory path.
 * @param {string} scenePath The name of the scene that's translated to its canonical path.
 * @param {string} file A file type (default: html, js, or css).
 * @returns {string} The full canonical directory.
 */
function ResolveScenePath(scenePath, file = "html") {
	return `scenes/${scenePath}/${scenePath}.${file}`;
}

/**
 * Wrapper for document.queryselector().
 * @param {string} s CSS selector for the DOM object.
 */
function x(s) {
	return document.querySelector(s);
}