import { NewGame } from "./modules/new-game.js";
import { Reset } from "./modules/reset.js";
import { Game } from "./modules/game.js";
import {
	boxes,
	markChoice,
	buttons,
	resultPlayer1,
	resultPlayer2,
	latest,
	resetBtn,
	newGameBtn,
} from "./modules/dom-elems.js";

const choosePlayer = (e) => {
	const game = new Game(
		{
			name: "player1",
			mark: e.target.value,
			active: true,
			arr: [],
			wins: 0,
			winner: false,
		},
		{
			name: "player2",
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
	newGameBtn.addEventListener("click", () => {
		const newGame = new NewGame(
			{
				name: "player1",
				mark: game.player1.mark,
				active: true,
				arr: [],
				wins: game.player1.wins,
				winner: false,
			},
			{
				name: "player2",
				mark: game.player2.mark,
				active: false,
				arr: [],
				wins: game.player2.wins,
				winner: false,
			},
			game.latestResults
		);
	});
};

const addListeners = () => {
	buttons.forEach((button) => {
		button.addEventListener("click", choosePlayer);
	});
	resetBtn.addEventListener("click", () => {
		const reset = new Reset(
			{
				name: "player1",
				mark: null,
				active: true,
				arr: [],
				wins: 0,
				winner: false,
			},
			{
				name: "player2",
				mark: null,
				active: false,
				arr: [],
				wins: 0,
				winner: false,
			}
		);
	});
};

document.addEventListener("DOMContentLoaded", () => {
	addListeners();
});
