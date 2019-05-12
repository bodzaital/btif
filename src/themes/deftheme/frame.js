x("#btn-save").addEventListener("click", e => {
	let saveDataJson = {
		"version": 0.2,
		"data": {

		}
	};

	saveDataJson.data = globals;

	let serialized = JSON.stringify(saveDataJson);
	let dataStream = "data:text/json;charset=utf-8," + encodeURIComponent(serialized);
	
	let dlAnchorElem = document.getElementById('downloadAnchorElem');
	dlAnchorElem.setAttribute("href",     dataStream     );
	dlAnchorElem.setAttribute("download", "scene.json");
	dlAnchorElem.click();
});

x("#btn-load").addEventListener("click", e => {
	if (x(".load-area").style.display == "block") {
		x(".load-area").style.display = "none";
		x("#btn-load").innerText = "Load";
	}
	else
	{
		x(".load-area").style.display = "block";
		x("#btn-load").innerText = "X";
	}
});

x(".load-area").addEventListener("change", e => {
	HandleOpenFile(e).then((v) => {
		let saveData = JSON.parse(v);
		globals._player = saveData.data._player;
		if (scene == "scene-0") {
			x("#name-input").value = globals._player;
		}
	});
});

async function HandleOpenFile(e) {
	return await OpenFileAsync(e);
}