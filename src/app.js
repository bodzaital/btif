// ===================================
// The main backbone of the framework.
// ===================================

// Load configuration.
let entryPoint = conf.entryPoint;
let fadeDuration = conf.fadeDuration;
let title = conf.title;
let debugMode = conf.debugMode;

document.title = title;

$("#content").load(ResolveScenePath(conf.entryPoint), (resp, stat, xhr) => {
	if (debugMode) {
		if (stat == "error") {
			alert(`Runtime error 4000\nThe requested resource does not exist or the Cross-Origin Resource Sharing policy forbids loading it.\n\nWhen loading: [${scenePath}]\nattempted at: [${ResolveScenePath(scenePath)}]`);
		}
	}
	SetTitle();
});

$(document).on("click", "a", (e) => {
	e.preventDefault();
	$("#fade").fadeIn(fadeDuration, () => {
		let scenePath = e.target.getAttribute("href");
		$("#content").load(ResolveScenePath(scenePath), (resp, stat, xhr) => {
			if (debugMode) {
				if (stat == "error") {
					alert(`Runtime error 4001\nThe requested resource does not exist or the Cross-Origin Resource Sharing policy forbids loading it.\n\nWhen loading: [${scenePath}]\nattempted at: [${ResolveScenePath(scenePath)}]`);
				}
			}
			SetTitle();
			LoadSceneFiles(scenePath);
			$("#fade").fadeOut(fadeDuration);
		});
	});
});

/**
 * Sets the title of the browser, concatenating the scene and story title.
 */
function SetTitle()
{
	let sceneData = document.querySelector("#sceneData");
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
	$("#content").append(sceneScript);
	
	let sceneStyle = document.createElement("link");
	sceneStyle.setAttribute("rel", "stylesheet");
	sceneStyle.setAttribute("href", ResolveScenePath(scenePath, "css"));
	$("#content").append(sceneStyle);
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