import { $, NullConditional } from "../../modules/utils.js";

$("#name-input").value = NullConditional(data.Get("player"), "");

$("[href=scene-1]").addEventListener("click", () => {
	data.Set("player", $("#name-input").value);
});

document.addEventListener("file-loaded", (e) => {
	if (e.detail === 200) {
		$("#name-input").value = data.Get("player");
	}
});