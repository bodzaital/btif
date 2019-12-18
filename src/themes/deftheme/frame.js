import { $ } from "../../modules/utils.js";
import { File } from "../../modules/file.js";

$("#menu_save").addEventListener("click", () => {
	File.Save("#link_save");
});

$("#form_load").addEventListener("change", (e) => {
	File.Load(e);
});