import {
	markChoice,
	buttons,
	newGameBtn,
	bodyOverflow,
} from "./modules/dom-elems.js";
import { ComputerClick } from "./modules/computer-click.js";
import { Click } from "./modules/player-click.js";
import { BoxClick } from "./modules/box-click.js";
import { Events } from "./modules/event-listeners.js";
import { Game } from "./modules/game.js";
const choosePlayer = (e) => {
	const game = new Game(
		{
			name: "Player",
			mark: e.target.value,
			active: e.target.value === "X" ? true : false,
			arr: [],
			wins: 0,
			winner: false,
		},
		{
			name: "Computer",
			mark: e.target.value === "X" ? "O" : "X",
			active: e.target.value === "O" ? true : false,
			arr: [],
			wins: 0,
			winner: false,
		}
	);
	bodyOverflow.classList.remove("body-hidden");
	newGameBtn.disabled = true;
	markChoice.classList.add("inactive");
	game.startNewGame();
};

const addListeners = () => {
	buttons.forEach((button) => {
		button.addEventListener("click", choosePlayer);
	});
};

document.addEventListener("DOMContentLoaded", () => {
	addListeners();
});
