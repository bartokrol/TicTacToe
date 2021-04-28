import { DomElems } from "./DomElems.js";
import { Box } from "./Box.js";
import { Results } from "./Results.js";
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
	boardCols = 3;

	scores = {
		X: 10,
		O: -10,
		tie: 0,
	};

	startingPageContainer = null;
	startingBtns = null;
	rulesBtn = null;
	rules = null;
	bodyOverflow = null;

	gameContainer = null;
	boardContainer = null;

	draws = 0;
	newGameBtn = null;
	resetBtn = null;

	players = [this.player, this.computer];
	activePlayer = this.player;

	results = new Results();
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
			for (let col = 0; col < this.boardCols; col++) {
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
		this.setPlayers(e);
		this.startingPageContainer.classList.add("inactive");
		this.bodyOverflow.classList.remove("body-hidden");
		this.gameContainer.classList.remove("hidden");
		this.newGameBtn.classList.add("disabled");
		this.getActivePlayer();
		this.checkComputerMove();
	}

	setGameElements() {
		this.gameContainer = this.getElement(this.domElems.gameContainer);
		this.newGameBtn = this.getElement(this.domElems.newGameBtn);
		this.resetBtn = this.getElement(this.domElems.resetBtn);

		this.resetBtn.addEventListener(
			"click",
			this.resetGameAfterResetBtnClick
		);
	}

	setPlayers(e) {
		this.player.mark = e.target.value;
		this.player.active = this.player.mark === "X" ? true : false;
		this.computer.mark = this.player.mark === "X" ? "O" : "X";
		this.computer.active = this.player.mark === "X" ? false : true;
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
		this.resetGameWinnerAndPlayersArr();

		this.isGameEnd = false;

		this.player.active = this.player.mark === "X" ? true : false;
		this.computer.active = this.player.mark === "X" ? false : true;
		this.getActivePlayer();

		this.addBoxesEventListeners();
		this.newGameBtn.classList.add("disabled");
		this.newGameBtn.removeEventListener(
			"click",
			this.resetGameAfterNewGameBtnClick
		);
		this.board.flat().forEach((box) => (box.mark = null));
		this.checkComputerMove();
	};

	resetGameAfterResetBtnClick = () => {
		this.renderBoard();
		this.resetGameWinnerAndPlayersArr();
		this.resetPlayersWins();
		this.startingPageContainer.classList.remove("inactive");
		this.bodyOverflow.classList.add("body-hidden");
		this.gameContainer.classList.add("hidden");
		this.isGameEnd = false;
		this.draws = 0;
		this.results.resetResults();
		this.addBoxesEventListeners();
		this.board.flat().forEach((box) => (box.mark = null));
	};

	resetPlayersWins() {
		this.computer.wins = 0;
		this.player.wins = 0;
	}

	resetGameWinnerAndPlayersArr() {
		this.computer.winner = false;
		this.player.winner = false;
		this.computer.arr = [];
		this.player.arr = [];
	}

	checkComputerMove = () => {
		if (this.computer.active) {
			const computerBox = this.findBestMove().element;
			this.setClick(computerBox, this.activePlayer);
		}
	};

	handleClick = (e) => {
		const playerBox = e.target;
		this.setClick(playerBox, this.activePlayer);

		if (this.isGameEnd) {
			this.setGameAfterGameIsEnd();
			return;
		}
		const computerBox = this.findBestMove().element;

		this.setClick(computerBox, this.activePlayer);

		if (this.isGameEnd) {
			this.setGameAfterGameIsEnd();
			return;
		}
	};

	findBestMove() {
		let board = this.board;
		let bestScore = -Infinity;
		let move;
		for (let row = 0; row < this.boardRows; row++) {
			for (let col = 0; col < this.boardCols; col++) {
				if (!board[row][col].mark) {
					board[row][col].mark = this.computer.mark;
					this.computer.arr.push(board[row][col].id);
					let score = this.minimax(board, 0, false);
					board[row][col].mark = null;
					const box = this.computer.arr.findIndex(
						(el) => el === board[row][col].id
					);
					this.computer.arr.splice(box, 1);
					if (score > bestScore) {
						bestScore = score;
						move = { row, col };
					}
				}
			}
		}
		return board[move.row][move.col];
	}

	checkWinner(board) {
		const emptyBoxes = board.flat().filter((box) => !box.mark);

		for (let combination of this.winningCombinations) {
			if (combination.every((el) => this.player.arr.includes(el))) {
				return this.player.mark;
			}
		}
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => this.computer.arr.includes(el))) {
				return this.computer.mark;
			}
		}
		if (
			emptyBoxes.length === 0 &&
			!this.player.winner &&
			!this.computer.winner
		) {
			return "tie";
		}
	}

	minimax(board, depth, isMaximizing) {
		this.setScores();
		let result = this.checkWinner(board) ? this.checkWinner(board) : null;

		if (result !== null) {
			return this.scores[result];
		}

		if (isMaximizing) {
			let bestScore = -Infinity;

			bestScore = this.findComputerScore(board, depth, bestScore);
			return bestScore;
		}

		if (!isMaximizing) {
			let bestScore = Infinity;

			bestScore = this.findPlayerScore(board, depth, bestScore);
			return bestScore;
		}
	}

	setScores() {
		if (this.computer.mark === "X") {
			this.scores.X = 10;
			this.scores.O = -10;
		}
		if (this.computer.mark === "O") {
			this.scores.X = -10;
			this.scores.O = 10;
		}
	}

	findComputerScore(board, depth, bestScore) {
		for (let row = 0; row < this.boardRows; row++) {
			for (let col = 0; col < this.boardCols; col++) {
				if (!board[row][col].mark) {
					board[row][col].mark = this.computer.mark;
					this.computer.arr.push(board[row][col].id);
					let score = this.minimax(board, depth + 1, false);
					board[row][col].mark = null;
					const box = this.computer.arr.findIndex(
						(el) => el === board[row][col].id
					);
					this.computer.arr.splice(box, 1);
					bestScore = Math.max(score, bestScore);
				}
			}
		}
		return bestScore;
	}

	findPlayerScore(board, depth, bestScore) {
		for (let row = 0; row < this.boardRows; row++) {
			for (let col = 0; col < this.boardCols; col++) {
				if (!board[row][col].mark) {
					board[row][col].mark = this.player.mark;
					this.player.arr.push(board[row][col].id);
					let score = this.minimax(board, depth + 1, true);
					board[row][col].mark = null;
					const box = this.player.arr.findIndex(
						(el) => el === board[row][col].id
					);
					this.player.arr.splice(box, 1);
					bestScore = Math.min(score, bestScore);
				}
			}
		}
		return bestScore;
	}

	setClick = (playerBox, activePlayer) => {
		const rowIndex = playerBox.getAttribute("data-row");
		const columnIndex = playerBox.getAttribute("data-column");
		const box = this.board[rowIndex][columnIndex];
		box.mark = this.activePlayer.mark;
		box.setBoxClick();

		this.pushBoxIdIntoActivePlayerArr(playerBox, activePlayer);
		this.findWinningPlayer(activePlayer);
		this.checkForDraw(activePlayer);
		this.removeBoxListeners(playerBox);
		this.setActivePlayer();
	};

	pushBoxIdIntoActivePlayerArr = (box, player) => {
		player.arr.push(Number(box.id));
	};

	findWinningPlayer = (player) => {
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				this.isGameEnd = true;
				this.addPlayerWins(player);
				this.showWinningPlayersMarks(combination);
				this.winningBox.showWinningMessage(player);
				this.results.setLatestResults(player);
			}
		}
		return player;
	};

	checkForDraw = (player) => {
		if (player.arr.length === 5 && player.winner === false) {
			this.isGameEnd = true;
			this.draws++;
			this.winningBox.showWinningMessage("");
			this.results.setDrawsNumber(this.draws);
			this.results.setLatestResults("");
			this.setGameAfterGameIsEnd();
		}
	};

	addPlayerWins = (player) => {
		player.winner = true;
		player.wins++;
		if (player.name == "Computer") {
			this.results.setDefeatsNumber(player.wins);
		}
		if (player.name == "Player") {
			this.results.setWinsNumber(player.wins);
		}
	};

	showWinningPlayersMarks = (combination) => {
		this.board.flat().forEach((box) => {
			if (combination.includes(Number(box.id))) {
				box.setWinningBox();
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
