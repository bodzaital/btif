import { $, NullConditional } from "../../modules/utils.js";

$("#name-input").value = NullConditional(globals.Get("player"), "");

$("[href=scene-1]").addEventListener("click", () => {
	globals.Set("player", $("#name-input").value);
});