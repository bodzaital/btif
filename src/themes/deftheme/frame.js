import { $ } from "../../modules/utils.js";
import { File } from "../../modules/file.js";

$("#menu_save").addEventListener("click", (e) => {
	File.Save("#link_save");
});

// Runs when the save buttons is clicked.
// Serializes the globals object and downloads the JSON file.
// x("#btn-save").addEventListener("click", e => {
// 	let saveDataJson = {
// 		"version": 0.2,
// 		"data": {

// 		}
// 	};

// 	saveDataJson.data = globals.store;

// 	let serialized = JSON.stringify(saveDataJson);
// 	let dataStream = "data:text/json;charset=utf-8," + encodeURIComponent(serialized);
	
// 	let dlAnchorElem = document.getElementById('downloadAnchorElem');
// 	dlAnchorElem.setAttribute("href", dataStream);
// 	dlAnchorElem.setAttribute("download", "scene.json");
// 	dlAnchorElem.click();
// });

// // Helper function to reveal/hide the file browser button.
// x("#btn-load").addEventListener("click", e => {
// 	if (x(".load-area").style.display == "block") {
// 		x(".load-area").style.display = "none";
// 		x("#btn-load").innerText = "Load";
// 	}
// 	else
// 	{
// 		x(".load-area").style.display = "block";
// 		x("#btn-load").innerText = "X";
// 	}
// });

// // Runs then the file browser button is clicked.
// // "Async" calls OpenFileAsync from app.js.
// // Parses the JSON and sets the global variables, then tells the scenes that the globals are set and ready to use.
// x(".load-area").addEventListener("change", e => {
// 	OpenFileAsync(e).then((v) => {
// 		let saveData = JSON.parse(v);
// 		globals.Set("player", saveData.data["player"]);
// 		SceneLoad();
// 	});
// });
