import { $, $$, LoadFile, ResolveSceneByName, ResolveThemeByName, NullConditional, CreateElementByDescriptor, NullishCoalescingOp } from "../../modules/utils.js";

$("#name-input").value = NullConditional(data.Get("player"), "");

$("#name-input").addEventListener("input", () => {
	data.Set("player", $("#name-input").value);
});

data.Subscribe($("#name-input"), "value", "player");
data.Subscribe($("#databinding-test"), "innerText", "player");


data.Subscribe($("#test-test-test"), "innerText", "test-test");
data.Set("test-test", "value");