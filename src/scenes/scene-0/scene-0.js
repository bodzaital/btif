x("#name-input").value = globals.Get("player");

x("[data-link]").addEventListener("click", () => {
	globals.Set("player", x("#name-input").value);
});