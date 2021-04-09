import { DomElems } from "./DomElems.js";
import { Box } from "./Box.js";

class Game extends DomElems {
	player = {
		name: "Player",
		mark: null,
		active: null,
		arr: [],
		wins: 0,
		winner: false,
	};
	computer = {
		name: "Computer",
		mark: null,
		active: null,
		arr: [],
		wins: 0,
		winner: false,
	};

	boardContainer = null;
	board = [];
	boardRows = 3;

	startingPageContainer = null;
	startingBtns = null;
	rulesBtn = null;
	rules = null;
	bodyOverflow = null;
	gameContainer = null;

	players = [this.player, this.computer];
	activePlayer = this.player;

	initializeGame() {
		this.setStartingBtnsEventListeners();
		this.generateBoxes();
		this.renderBoard();
	}

	setStartingBtnsEventListeners() {
		this.setStartingPageElements();
		this.startingBtns.forEach((button) => {
			button.addEventListener("click", (e) => {
				this.player.mark = e.target.value;
				this.player.active = this.player.mark === "X" ? true : false;
				this.computer.mark = this.player.mark === "X" ? "O" : "X";
				this.computer.active = this.player.mark === "X" ? false : true;
				this.startingPageContainer.classList.add("inactive");
				this.bodyOverflow.classList.remove("body-hidden");
				this.gameContainer.classList.remove("hidden");
				this.getActivePlayer();
			});
		});
		this.rulesBtn.addEventListener("click", () => {
			this.rules.classList.toggle("hidden");
		});
	}

	generateBoxes() {
		let id = 0;
		for (let row = 0; row < this.boardRows; row++) {
			this.board[row] = [];
			for (let col = 0; col < 3; col++) {
				id++;
				this.board[row].push(new Box(row, col, id));
			}
		}
	}

	renderBoard() {
		this.board.flat().forEach((box) => {
			this.boardContainer.insertAdjacentHTML(
				"beforeend",
				box.createBox()
			);
			box.element = box.getElement(box.selector);
		});
		this.addBoxesEventListeners();
	}

	setStartingPageElements() {
		this.startingPageContainer = this.getElement(
			this.domElems.startingPageContainer
		);
		this.startingBtns = this.getElements(this.domElems.startingBtns);
		this.rulesBtn = this.getElement(this.domElems.rulesBtn);
		this.rules = this.getElement(this.domElems.rules);
		this.bodyOverflow = this.getElement(this.domElems.bodyOverflow);
		this.gameContainer = this.getElement(this.domElems.gameContainer);
		this.boardContainer = this.getElement(this.domElems.boardContainer);
	}

	getActivePlayer = () => {
		this.activePlayer = this.players.find((el) => el.active);
	};

	setActivePlayer = () => {
		this.player.active = !this.player.active;
		this.computer.active = !this.computer.active;
		this.getActivePlayer();
	};

	addBoxesEventListeners() {
		this.board.flat().forEach((box) => {
			box.element.addEventListener(
				"mouseout",
				this.hideElementOnMouseOut
			);
			box.element.addEventListener(
				"mouseover",
				this.showElementOnMouseOver
			);
			box.element.addEventListener("click", this.handleClick);
		});
	}

	showElementOnMouseOver = (e) => {
		e.target.textContent = `${this.activePlayer.mark}`;
		e.target.classList.add("board--box--hover");
	};

	hideElementOnMouseOut = (e) => {
		e.target.textContent = "";
		e.target.classList.remove("board--box--hover");
	};

	removeBoxListeners = (box) => {
		box.removeEventListener("mouseout", this.hideElementOnMouseOut);
		box.removeEventListener("click", this.handleClick);
		box.removeEventListener("mouseover", this.showElementOnMouseOver);
	};

	handleClick = (e) => {
		const playerBox = e.target;
		this.click(playerBox, this.activePlayer);
		// Check if game is end
		// if (isGameEnd) {
		// 	removeListenersForEachBox();
		// 	newGameBtn.addEventListener("click", newGameListener);
		// 	return;
		// } else {

		const emptyBoxes = this.board
			.flat()
			.filter((box) => !box.element.textContent);
		const computerBox =
			emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)].element;
		this.click(computerBox, this.activePlayer);

		// // Another check if game is end to remove listeners if this condition is true
		// if (isGameEnd) {
		// 	removeListenersForEachBox();
		// 	newGameBtn.addEventListener("click", newGameListener);
		// 	return;
		// }
	};

	// Function that calls new Click depends on which playerBox is set (could be e.target/playerBox or computerBox)
	// After each click the event listener to specific box is removed
	click = (playerBox, activePlayer) => {
		console.log(playerBox);
		playerBox.textContent = activePlayer.mark;
		playerBox.classList.remove("board--box--hover");
		this.pushBoxIdIntoActivePlayerArr(playerBox, activePlayer);
		// isGameEnd = playerClick.click(
		// 	playerBox,
		// 	activePlayer,
		// 	winningCombinations
		// );
		// isGameEnd = game.drawCheck(activePlayer, draws, isGameEnd)
		// 	? (game.drawCheck(activePlayer, draws, isGameEnd),
		// 	  new ResultMessage(),
		// 	  results.setLatestResults(""))
		// 	: isGameEnd;
		// if (activePlayer.winner) {
		// 	new ResultMessage(activePlayer);
		// 	results.setLatestResults(activePlayer);
		// }
		// board = newBoard.addBoxToBoard(playerBox, board);
		this.removeBoxListeners(playerBox);
		this.setActivePlayer();
	};

	pushBoxIdIntoActivePlayerArr = (box, player) => {
		player.arr.push(Number(box.id));
		box.textContent = `${player.mark}`;
	};
}

document.addEventListener("DOMContentLoaded", () => {
	const game = new Game();

	game.initializeGame();
});
