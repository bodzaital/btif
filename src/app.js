// ===================================
// The main backbone of the framework.
// ===================================
// Configuration is loaded to the conf variable.

let content;
let scene;

// Loads the theme and the entry point scene.
AjaxGet(`themes/${conf.theme}/frame.html`, (e) => {
	x("#target").innerHTML = e.responseText;
	content = x("#content");

	x("#target").appendChild(ScriptElement(`themes/${conf.theme}/frame.js`));
	x("#target").appendChild(LinkElement(`themes/${conf.theme}/frame.css`));

	LoadNextScene(conf.entryPoint);
});

// Scene changed click event.
document.addEventListener("click", e => {	
	let sender = e.target;
	if (sender.tagName !== "A") {
		return;
	}

	if (sender.getAttribute("data-link") === null) {
		return;
	}

	e.preventDefault();

	let scenePath = sender.getAttribute("href");
	BeforeSceneChange(LoadNextScene(scenePath, () => {
		AfterSceneChange();
	}));
});

function BeforeSceneChange(callback = null) {
	if (callback !== null) {
		callback();
	}
}

function AfterSceneChange(callback = null) {
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
	AjaxGet(ResolveScenePath(scenePath), (e) => {
		content.innerHTML = e.responseText;
		SetTitle();
		LoadSceneFiles(scenePath);
		scene = scenePath;
		if (callback !== null) {
			callback();
		}	
	});
}

/**
 * Handles debug messages when a scene load is blocked by CORS.
 * @param {string} stat Status code of the ajax call
 * @param {string} scenePath The scene name which was attempted to load
 */
function DebugCors(scenePath) {
	if (!conf.debugMode) {
		return;
	}

	let msg = `Runtime error 4000\nThe requested scene does not exist or the Cross-Origin Resource Sharing policy forbids loading it.\n\nWhen loading: [${scenePath}]\nattempted at: [${ResolveScenePath(scenePath)}]`

	alert(msg);
	console.log(msg);
}

/**
 * Sets the title of the browser, concatenating the scene and story title if needed.
 */
function SetTitle() {
	let sceneData = x("#sceneData")
	if (sceneData) {
		let sceneTitle = sceneData.getAttribute("data-title");
		document.title = `${sceneTitle} | ${conf.title}`;
	} else {
		document.title = conf.title;
	}
}

/**
 * Adds the corresponding script and style files to the master scene file.
 * @param {string} scenePath The name of the scene that will be translated to its canonical path.
 */
function LoadSceneFiles(scenePath)
{
	content.appendChild(ScriptElement(ResolveScenePath(scenePath, "js")));
	content.appendChild(LinkElement(ResolveScenePath(scenePath, "css")));
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
 * Asynchronously returns the contents of the file.
 * @param {Event} c The event object raised by the input field.
 */
function OpenFileAsync(c) {
	return new Promise(resolve => {
		let f = c.target.files[0];
	
		let r = new FileReader();
		r.addEventListener("load", (e) => {
			resolve(e.target.result);
		});
	
		r.readAsText(f);
	});
}