import { $ } from "../../modules/utils.js";
import { File } from "../../modules/file.js";

$("#menu_save").addEventListener("click", () => {
	File.Save("#link_save");
});

$("#form_load").addEventListener("change", (e) => {
	File.Load(e);
	document.addEventListener("file-loaded", (f) => {
		if (f.detail === 200) {
			console.log("Save file successfully loaded.");	
		} else if (f.detail === 600) {
			console.log("Version mismatch.");
		} else {
			console.log("Unknown error.")
		}
	});
});