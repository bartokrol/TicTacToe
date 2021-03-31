import { StartGame } from "./modules/startGame.js";
import {
	rulesBtn,
	rules,
	boxes,
	gameContainer,
	markChoice,
	startingBtns,
	newGameBtn,
	bodyOverflow,
} from "./modules/domElems.js";
import { setEventListeners } from "./modules/setEventListeners.js";

// Function that starts the whole game. Player and computer marks are set. Also active player is set, player with "X" mark always starts the game.
const startTheGame = (e) => {
	const newGame = new setEventListeners({
		players: [
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
			},
		],
		activePlayer: null,
		draws: 0,
		isGameEnd: false,
		board: [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		],
		emptyBoxes: boxes.filter((box) => box.textContent == ""),
		winningCombinations: [
			[1, 2, 3],
			[4, 5, 6],
			[7, 8, 9],
			[1, 4, 7],
			[2, 5, 8],
			[3, 6, 9],
			[1, 5, 9],
			[3, 5, 7],
		],
		latestResults: [],
	});
	setBackground();
};

// Function that is called after one of the startingBtns is clicked.
const setBackground = () => {
	gameContainer.classList.remove("hidden");
	bodyOverflow.classList.remove("body-hidden");
	newGameBtn.disabled = true;
	markChoice.classList.add("inactive");
};

// Add click listeners to both of the startingBtns to call startTheGame function after one of the btns is clicked
const addListeners = () => {
	startingBtns.forEach((button) => {
		button.addEventListener("click", startTheGame);
	});
	rulesBtn.addEventListener("click", () => {
		rules.classList.toggle("hidden");
	});
};

// When DOM is loaded, addListeners is called
document.addEventListener("DOMContentLoaded", () => {
	addListeners();
});
