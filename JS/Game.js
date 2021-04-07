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

	addBoxesEventListeners() {
		this.board.flat().forEach((box) => {
			box.element.addEventListener("mouseout", this.mouseOutEvent);
			box.element.addEventListener("mouseover", this.mouseOverEvent);
			// box.addEventListener("click", clickEvent);
		});
	}

	mouseOverEvent = (e) => {
		this.showElementOnMouseOver(e, this.activePlayer);
	};

	mouseOutEvent = (e) => {
		this.hideElementOnMouseOut(e);
	};

	// Function that shows player.mark after specific box is hovered
	showElementOnMouseOver = (e, activePlayer) => {
		e.target.textContent = `${activePlayer.mark}`;
		e.target.classList.add("board--box--hover");
	};

	// Function that hides player.mark after mouse is out of the box area
	hideElementOnMouseOut = (e) => {
		e.target.textContent = "";
		e.target.classList.remove("board--box--hover");
	};
}

document.addEventListener("DOMContentLoaded", () => {
	const game = new Game();

	game.initializeGame();
});
