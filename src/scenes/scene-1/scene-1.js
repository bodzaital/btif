import { $ } from "../../modules/utils.js";

$("#name").innerText = data.Get("player");

data.Subscribe($("#name"), "innerText", "player");