$("#content").load("scene-0.html");

var letChangeScene = true;

$(document).on("click", "a", (e) => {
	e.preventDefault();
	if (letChangeScene) {
		letChangeScene = false;
		$("#fade").fadeIn(200, () => {
			$("#content").load(e.target.getAttribute("href") + ".html", () => {
				$("#fade").fadeOut(200, () => {
					letChangeScene = true;
				});
			});
		});
	}
});