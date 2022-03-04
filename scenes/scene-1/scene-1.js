import { $ } from "../../modules/utils.js";
import { data } from "../../modules/globals.js";

$("#name").innerText = data.Get("player");

data.Subscribe($("#name"), "innerText", "player");