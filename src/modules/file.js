import { $, $$, LoadFile, ResolveSceneByName, ResolveThemeByName, NullConditional, CreateElementByDescriptor, NullishCoalescingOp } from "./utils.js";

class File {
	static Version() {
		return 0.1;
	}

	/**
	 * Saves the game data by serializing it as a JSON file and downloading it.
	 */
	static Save() {
		let save = {
			"version": File.Version(),
			"currentScene": data.currentScene,
			"data": {}
		};

		save.data = data.store;

		let stream = `data:text/json;charset=utf-8,${encodeURIComponent(JSON.stringify(save))}`;
		let element = "#hidden-save-link";

		$(element).setAttribute("href", stream);
		$(element).setAttribute("download", "save.json");
		$(element).setAttribute("data-link", "true");
		$(element).click();
	}

	/**
	 * Loads the contents of a file and dispatches a "file-loaded" event once done.
	 * 
	 * Event status codes (EventArgs.detail):
	 * 
	 * - 200: save file successfully parsed and loaded.
	 * - 600: version mismatch.
	 * @param {{}} inputEventArgs The EventArgs by the file input element.
	 */
	static Load(inputEventArgs) {
		let fileReader = new FileReader();

		fileReader.addEventListener("load", (fileObject) => {
			let json = JSON.parse(fileObject.target.result);

			if (json.version !== File.Version()) {
				document.dispatchEvent(new CustomEvent("file-loaded", { detail: 600 }));
			} else {
				data.store = json.data;
				data.currentScene = json.currentScene;
				document.dispatchEvent(new CustomEvent("file-loaded", { detail: 200 }));
			}
		});

		fileReader.readAsText(inputEventArgs.target.files[0]);
	}
}

export { File };