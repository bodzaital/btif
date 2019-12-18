import { $, $$, Load, CreateElement, ResolveScene, ResolveTheme } from "./utils.js";

class File {
	/**
	 * Saves the game data by serializing it as a JSON file and downloading it.
	 * @param {string} element Selector of the hidden <a> element.
	 */
	static Save(element) {
		let save = {
			"version": 0.1,
			"data": {}
		};

		save.data = data.store;

		let stream = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(save))}`;

		$(element).setAttribute("href", stream);
		$(element).setAttribute("download", "save.json");
		$(element).setAttribute("data-link", "true");
		$(element).click();
	}
}

export { File };