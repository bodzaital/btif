x("#name-input").value = globals._player;

x("[data-link]").addEventListener("click", () => {
	globals._player = x("#name-input").value
});