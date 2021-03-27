import { StartGame } from "./modules/startGame.js";
import {
	markChoice,
	startingBtns,
	newGameBtn,
	bodyOverflow,
} from "./modules/domElems.js";

// Function that starts the whole game. Player and computer marks are set. Also active player is set, player with "X" mark always starts the game.
const choosePlayer = (e) => {
	const game = new StartGame(
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
	setBackground();
	game.startNewGame();
};

// Function that is called after one of the startingBtns is clicked.
const setBackground = () => {
	bodyOverflow.classList.remove("body-hidden");
	newGameBtn.disabled = true;
	markChoice.classList.add("inactive");
};

// Add click listeners to both of the startingBtns to call choosePlayer function after one of the btns is clicked
const addListeners = () => {
	startingBtns.forEach((button) => {
		button.addEventListener("click", choosePlayer);
	});
};

// When DOM is loaded, addListeners is called
document.addEventListener("DOMContentLoaded", () => {
	addListeners();
});
