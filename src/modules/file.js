import { $, $$, Load, CreateElement, ResolveScene, ResolveTheme } from "./utils.js";

class File {
	static Save() {
		let save = {
			"version": 0.1,
			"data": {}
		};

		save.data = globals.store;

		let stream = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(save))}`;

		$("#link_save").setAttribute("href", stream);
		$("#link_save").setAttribute("download", "save.json");
		$("#link_save").setAttribute("data-link", "true");
		$("#link_save").click();
	}
}

export { File };