x("#name-input").value = globals.Get("player");

x("[data-link]").addEventListener("click", () => {
	globals.Set("player", x("#name-input").value);
});

/**
 * Called by frame.js when a saved game is loaded. Instructs the scene that the globals are loaded and can be used.
 */
function SceneLoad() {
	x("#name-input").value = globals.Get("player");
}