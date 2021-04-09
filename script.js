import {
	rulesBtn,
	rules,
	boxes,
	gameContainer,
	markChoice,
	startingBtns,
	newGameBtn,
	resetBtn,
	bodyOverflow,
} from "./modules/domElems.js";
import { Game } from "./modules/Game.js";
import { Click } from "./modules/click.js";
import { Board } from "./modules/board.js";
import { ResultMessage } from "./modules/resultMessage.js";
import { LatestResults } from "./modules/latestResults.js";
import {
	resetPageAfterResetBtn,
	resetPageAfterNewGameBtn,
} from "./modules/reset.js";

// Function that starts the whole game. Player and computer marks are set. Also active player is set, player with "X" mark always starts the game.
const startTheGame = (e) => {
	const game = new Game({
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

	let {
		players,
		player,
		computer,
		activePlayer,
		draws,
		isGameEnd,
		board,
		emptyBoxes,
		winningCombinations,
		latestResults,
	} = game;

	const newBoard = new Board();
	const results = new LatestResults(latestResults);
	const playerClick = new Click();

	// Function is called to find if computer is an active player. If true the computerClick class is called. After this the box events are removed.
	const checkComputerMove = () => {
		if (computer.active) {
			const computerBox =
				emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
			click(computerBox, game);
		}
	};
	// Function that add mouseout, mouseover, click events to all of the boxes on the board and click event to newGameBtn, resetBtn after new game is started.
	const addEventListeners = (game) => {
		addListenersToBoxes(game);
		newGameBtn.addEventListener("click", newGameListener);
		resetBtn.addEventListener("click", resetListener);
	};

	// Function that resets the game after newGameBtn is clicked
	// const newGameListener = () => {
	// 	// resetPageAfterNewGameBtn is set inside "reset.js".
	// 	const newGameReset = resetPageAfterNewGameBtn(
	// 		player,
	// 		computer,
	// 		players,
	// 		isGameEnd
	// 	);
	// 	board = newBoard.resetBoard(board);
	// 	isGameEnd = newGameReset;
	// 	emptyBoxes = boxes;
	// 	activePlayer = game.getActivePlayer();
	// 	addListenersToBoxes();
	// 	checkComputerMove();
	// 	newGameBtn.removeEventListener("click", newGameListener);
	// };

	const resetListener = () => {
		gameContainer.classList.add("hidden");
		newGameBtn.classList.add("disabled");
		bodyOverflow.classList.add("body-hidden");
		// resetPageAfterResetBtn is set inside "reset.js".
		resetPageAfterResetBtn(
			player,
			computer,
			draws,
			players,
			board,
			isGameEnd
		);
		results.resetResults(player, computer, draws);
		removeListenersForEachBox();
		newGameBtn.removeEventListener("click", newGameListener);
	};

	// Function that adds event listeners to every box
	const addListenersToBoxes = () => {
		boxes.forEach((box) => {
			box.addEventListener("mouseout", mouseOutEvent);
			box.addEventListener("mouseover", mouseOverEvent);
			box.addEventListener("click", clickEvent);
		});
	};

	const mouseOverEvent = (e) => {
		showElementOnMouseOver(e, activePlayer);
	};

	const mouseOutEvent = (e) => {
		hideElementOnMouseOut(e);
	};

	const clickEvent = (e) => {
		handleClick(e, game);
	};

	// Function is called after one of the box on board is clicked. The player click is set on the board and after that computer click also lands on the board.
	const handleClick = (e, game) => {
		// Player click
		const playerBox = e.target;
		click(playerBox, game);
		// Check if game is end
		if (isGameEnd) {
			removeListenersForEachBox();
			newGameBtn.addEventListener("click", newGameListener);
			return;
		} else {
			// Computer click
			const computerBox =
				emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
			click(computerBox, game);
		}

		// Another check if game is end to remove listeners if this condition is true
		if (isGameEnd) {
			removeListenersForEachBox();
			newGameBtn.addEventListener("click", newGameListener);
			return;
		}
	};

	// Function that calls new Click depends on which playerBox is set (could be e.target/playerBox or computerBox)
	// After each click the event listener to specific box is removed
	const click = (playerBox, game) => {
		isGameEnd = playerClick.click(
			playerBox,
			activePlayer,
			winningCombinations
		);
		isGameEnd = game.drawCheck(activePlayer, draws, isGameEnd)
			? (game.drawCheck(activePlayer, draws, isGameEnd),
			  new ResultMessage(),
			  results.setLatestResults(""))
			: isGameEnd;
		if (activePlayer.winner) {
			new ResultMessage(activePlayer);
			results.setLatestResults(activePlayer);
		}

		board = newBoard.addBoxToBoard(playerBox, board);
		removeBoxListeners(playerBox);
		emptyBoxes = boxes.filter((box) => box.textContent === "");
		activePlayer = game.setActivePlayer();
	};

	// Function that remove boxes event listeners
	const removeListenersForEachBox = () => {
		boxes.forEach((box) => {
			removeBoxListeners(box);
		});
	};

	// Function that remove event listeners for specific box
	const removeBoxListeners = (box) => {
		box.removeEventListener("click", clickEvent);
		box.removeEventListener("mouseout", mouseOutEvent);
		box.removeEventListener("mouseover", mouseOverEvent);
	};

	// Function that shows player.mark after specific box is hovered
	const showElementOnMouseOver = (e, activePlayer) => {
		e.target.textContent = `${activePlayer.mark}`;
		e.target.classList.add("board--box--hover");
	};

	// Function that hides player.mark after mouse is out of the box area
	const hideElementOnMouseOut = (e) => {
		e.target.textContent = "";
		e.target.classList.remove("board--box--hover");
	};

	setBackground();
	addEventListeners(game);
	checkComputerMove();
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
