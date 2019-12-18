import { $ } from "../../modules/utils.js";

$("#name").innerText = data.Get("player");

document.addEventListener("file-loaded", (e) => {
	if (e.detail === 200) {
		$("#name").innerText = data.Get("player");
	}
});