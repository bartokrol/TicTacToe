import { DomElems } from "./DomElems.js";
import { Box } from "./Box.js";
import { LatestResults } from "./LatestResults.js";
import { WinningBox } from "./WinningBox.js";

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

	winningCombinations = [
		[1, 2, 3],
		[4, 5, 6],
		[7, 8, 9],
		[1, 4, 7],
		[2, 5, 8],
		[3, 6, 9],
		[1, 5, 9],
		[3, 5, 7],
	];

	board = [];
	boardRows = 3;

	startingPageContainer = null;
	startingBtns = null;
	rulesBtn = null;
	rules = null;
	bodyOverflow = null;

	gameContainer = null;
	boardContainer = null;
	resultWins = null;
	resultDraws = null;
	draws = 0;
	resultDefeats = null;
	newGameBtn = null;
	resetBtn = null;

	players = [this.player, this.computer];
	activePlayer = this.player;

	latestResults = new LatestResults();
	winningBox = new WinningBox();

	initializeGame() {
		this.setStartingPage();
		this.generateBoxes();
		this.renderBoard();
	}

	setStartingPage() {
		this.setStartingPageElements();
		this.startingBtns.forEach((button) => {
			button.addEventListener("click", (e) => {
				this.startTheGame(e);
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
		while (this.boardContainer.firstChild) {
			this.boardContainer.removeChild(this.boardContainer.lastChild);
		}
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
		this.boardContainer = this.getElement(this.domElems.boardContainer);
	}

	startTheGame(e) {
		this.setGameElements();
		this.player.mark = e.target.value;
		this.player.active = this.player.mark === "X" ? true : false;
		this.computer.mark = this.player.mark === "X" ? "O" : "X";
		this.computer.active = this.player.mark === "X" ? false : true;
		this.startingPageContainer.classList.add("inactive");
		this.bodyOverflow.classList.remove("body-hidden");
		this.gameContainer.classList.remove("hidden");
		this.newGameBtn.classList.add("disabled");
		this.getActivePlayer();
		this.checkComputerMove();
	}

	setGameElements() {
		this.gameContainer = this.getElement(this.domElems.gameContainer);
		this.resultWins = this.getElement(this.domElems.resultWins);
		this.resultDraws = this.getElement(this.domElems.resultDraws);
		this.resultDefeats = this.getElement(this.domElems.resultDefeats);
		this.newGameBtn = this.getElement(this.domElems.newGameBtn);
		this.resetBtn = this.getElement(this.domElems.resetBtn);

		this.resetBtn.addEventListener(
			"click",
			this.resetGameAfterResetBtnClick
		);
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

	removeBoxesEventListeners() {
		this.board.flat().forEach((box) => {
			box.element.removeEventListener(
				"mouseout",
				this.hideElementOnMouseOut
			);
			box.element.removeEventListener(
				"mouseover",
				this.showElementOnMouseOver
			);
			box.element.removeEventListener("click", this.handleClick);
		});
	}

	resetGameAfterNewGameBtnClick = () => {
		this.renderBoard();
		this.board.flat().forEach((box) => {
			box.element.textContent = "";
			box.element.classList.remove("won");
		});
		this.isGameEnd = false;

		this.computer.winner = false;
		this.player.winner = false;
		this.computer.arr = [];
		this.player.arr = [];
		this.player.active = this.player.mark === "X" ? true : false;
		this.computer.active = this.player.mark === "X" ? false : true;
		this.getActivePlayer();

		this.addBoxesEventListeners();
		this.newGameBtn.classList.add("disabled");
		this.newGameBtn.removeEventListener(
			"click",
			this.resetGameAfterNewGameBtnClick
		);
	};

	resetGameAfterResetBtnClick = () => {
		this.startingPageContainer.classList.remove("inactive");
		this.bodyOverflow.classList.add("body-hidden");
		this.gameContainer.classList.add("hidden");
		this.isGameEnd = false;

		this.computer.winner = false;
		this.player.winner = false;
		this.computer.wins = 0;
		this.player.wins = 0;
		this.draws = 0;
		this.computer.arr = [];
		this.player.arr = [];

		this.resultWins.textContent = "0";
		this.resultDraws.textContent = "0";
		this.resultDefeats.textContent = "0";
		this.latestResults.resetResults();

		this.board.flat().forEach((box) => {
			box.element.textContent = "";
			box.element.classList.remove("won");
		});
		this.addBoxesEventListeners();
	};

	checkComputerMove = () => {
		if (this.computer.active) {
			const emptyBoxes = this.board
				.flat()
				.filter((box) => !box.element.textContent);
			const computerBox =
				emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)]
					.element;
			this.setClick(computerBox, this.activePlayer);
		}
	};

	handleClick = (e) => {
		const playerBox = e.target;
		// const rowIndex = playerBox.getAttribute("data-row");
		// const columnIndex = playerBox.getAttribute("data-column");
		// this.board[rowIndex][columnIndex].mark = this.activePlayer.mark;
		// this.board[rowIndex][columnIndex].element.textContent = this.board[
		// 	rowIndex
		// ][columnIndex].mark;
		this.setClick(playerBox, this.activePlayer);

		if (this.isGameEnd) {
			this.setGameAfterGameIsEnd();
			return;
		}

		const emptyBoxes = this.board
			.flat()
			.filter((box) => !box.element.textContent);
		const computerBox =
			emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)].element;
		this.setClick(computerBox, this.activePlayer);

		if (this.isGameEnd) {
			this.setGameAfterGameIsEnd();
			return;
		}
	};

	setClick = (playerBox, activePlayer) => {
		playerBox.textContent = activePlayer.mark;
		playerBox.classList.remove("board--box--hover");
		this.pushBoxIdIntoActivePlayerArr(playerBox, activePlayer);
		this.findWinningPlayer(activePlayer);
		this.checkForDraw(activePlayer);
		this.removeBoxListeners(playerBox);
		this.setActivePlayer();
	};

	pushBoxIdIntoActivePlayerArr = (box, player) => {
		player.arr.push(Number(box.id));
		box.textContent = `${player.mark}`;
	};

	findWinningPlayer = (player) => {
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				this.isGameEnd = true;
				this.addPlayerWins(player);
				this.showWinningPlayersMarks(combination);
				this.winningBox.showWinningMessage(player);
				this.latestResults.setLatestResults(player);
				return;
			}
		}
	};

	checkForDraw = (player) => {
		if (player.arr.length === 5 && player.winner === false) {
			this.isGameEnd = true;
			this.draws++;
			this.resultDraws.textContent = this.draws;
			this.winningBox.showWinningMessage("");
			this.latestResults.setLatestResults("");
			this.setGameAfterGameIsEnd();
		}
	};

	addPlayerWins = (player) => {
		player.winner = true;
		player.wins++;
		if (player.name == "Computer") {
			this.resultDefeats.textContent = player.wins;
		}
		this.resultWins.textContent = player.wins;
	};

	showWinningPlayersMarks = (combination) => {
		this.board.flat().forEach((box) => {
			if (combination.includes(Number(box.id))) {
				box.element.classList.add("won");
			}
		});
	};

	setGameAfterGameIsEnd() {
		this.removeBoxesEventListeners();
		this.newGameBtn.addEventListener(
			"click",
			this.resetGameAfterNewGameBtnClick
		);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const game = new Game();

	game.initializeGame();
});
