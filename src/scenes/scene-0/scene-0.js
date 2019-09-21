import { $ } from "../../modules/utils.js";

$("#name-input").value = globals.Get("player");

$("[href=scene-1]").addEventListener("click", () => {
	globals.Set("player", $("#name-input").value);
});