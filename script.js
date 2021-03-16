import { Game } from "./modules/game.js";
import { markChoice, buttons, newGameBtn } from "./modules/dom-elems.js";

const choosePlayer = (e) => {
	const game = new Game(
		{
			name: "Player1",
			mark: e.target.value,
			active: true,
			arr: [],
			wins: 0,
			winner: false,
		},
		{
			name: "Player2",
			mark: e.target.value === "X" ? "O" : "X",
			active: false,
			arr: [],
			wins: 0,
			winner: false,
		}
	);
	newGameBtn.disabled = true;
	markChoice.classList.add("inactive");
	game.startNewGame();
	game.addEventListenersToEachBox();
};

const addListeners = () => {
	buttons.forEach((button) => {
		button.addEventListener("click", choosePlayer);
	});
};

document.addEventListener("DOMContentLoaded", () => {
	addListeners();
});
