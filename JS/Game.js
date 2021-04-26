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
		this.checkComputerMove();
		this.newGameBtn.classList.add("disabled");
		this.newGameBtn.removeEventListener(
			"click",
			this.resetGameAfterNewGameBtnClick
		);
		this.board.flat().forEach((box) => (box.mark = null));
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
					const box = this.computer.arr.findIndex(
						(el) => el === board[row][col].id
					);
					this.computer.arr.splice(box, 1);
					board[row][col].mark = null;
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

		// this.players.forEach((player) => {});
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
		let result = this.checkWinner(board) ? this.checkWinner(board) : null;

		if (this.computer.mark === "X") {
			this.scores.X = 10;
			this.scores.O = -10;
		}
		if (this.computer.mark === "O") {
			this.scores.X = -10;
			this.scores.O = 10;
		}
		if (result !== null) {
			return this.scores[result];
		}

		if (isMaximizing) {
			let bestScore = -Infinity;
			const maximizingPlayer =
				this.computer.mark === "X" ? this.player : this.computer;

			for (let row = 0; row < this.boardRows; row++) {
				for (let col = 0; col < this.boardCols; col++) {
					if (!board[row][col].mark) {
						board[row][col].mark = maximizingPlayer.mark;
						maximizingPlayer.arr.push(board[row][col].id);
						let score = this.minimax(board, depth + 1, false);
						const box = maximizingPlayer.arr.findIndex(
							(el) => el === board[row][col].id
						);
						maximizingPlayer.arr.splice(box, 1);
						board[row][col].mark = null;
						bestScore = Math.max(score, bestScore);
					}
				}
			}
			return bestScore;
		} else {
			let bestScore = Infinity;
			const minimizingPlayer =
				this.computer.mark === "X" ? this.computer : this.player;

			for (let row = 0; row < this.boardRows; row++) {
				for (let col = 0; col < this.boardCols; col++) {
					if (!board[row][col].mark) {
						board[row][col].mark = minimizingPlayer.mark;
						minimizingPlayer.arr.push(board[row][col].id);
						let score = this.minimax(board, depth + 1, true);
						const box = minimizingPlayer.arr.findIndex(
							(el) => el === board[row][col].id
						);
						minimizingPlayer.arr.splice(box, 1);
						board[row][col].mark = null;
						bestScore = Math.min(score, bestScore);
					}
				}
			}
			return bestScore;
		}
	}

	// findComputerMove() {
	// 	if (this.player.arr.length === 1) {
	// 		if (this.board[1][1].mark === this.player.mark) {
	// 			const emptyBox = this.board[0][0];
	// 			return emptyBox;
	// 		}
	// 		if (this.board[0][0].mark !== this.player.mark) {
	// 			const emptyBox = this.board[1][1];
	// 			return emptyBox;
	// 		}
	// 	}
	// 	const fullPlayerBoxesInRow = [];
	// 	const emptyBoxesInRowToUse = [];
	// 	for (let row = 0; row < this.boardRows; row++) {
	// 		const fullBoxesInRow = this.board[row].filter((box) => box.mark);
	// 		const emptyBoxesInRow = this.board[row].filter((box) => !box.mark);
	// 		if (fullBoxesInRow.length > 1) {
	// 			for (let col = 0; col < this.boardCols; col++) {
	// 				if (this.board[row][col].mark == this.player.mark) {
	// 					fullPlayerBoxesInRow.push(this.board[row][col]);
	// 				}
	// 				if (this.board[row][col].mark == null) {
	// 					emptyBoxesInRowToUse.push(this.board[row][col]);
	// 				}
	// 			}
	// 		}
	// 	}

	// 	const turnedBoard = [
	// 		[this.board[0][0], this.board[1][0], this.board[2][0]],
	// 		[this.board[0][1], this.board[1][1], this.board[2][1]],
	// 		[this.board[0][2], this.board[1][2], this.board[2][2]],
	// 	];
	// 	// if (this.board[row][col].dataColumn == 0) {
	// 	// 	turnedBoard[0].push(this.board[row][col]);
	// 	// }
	// 	// if (this.board[row][col].dataColumn == 1) {
	// 	// 	turnedBoard[1].push(this.board[row][col]);
	// 	// }
	// 	// if (this.board[row][col].dataColumn == 2) {
	// 	// 	turnedBoard[2].push(this.board[row][col]);
	// 	// }
	// 	const fullPlayerBoxesInCol = [];
	// 	const emptyBoxesInColToUse = [];
	// 	for (let row = 0; row < this.boardRows; row++) {
	// 		for (let col = 0; col < this.boardCols; col++) {
	// 			const fullBoxesInCol = turnedBoard[row].filter(
	// 				(box) => box.mark
	// 			);
	// 			const emptyBoxesInCol = turnedBoard[row].filter(
	// 				(box) => !box.mark
	// 			);

	// 			if (fullBoxesInCol.length > 1) {
	// 				if (turnedBoard[row][col].mark == this.player.mark) {
	// 					fullPlayerBoxesInCol.push(turnedBoard[row][col]);
	// 				}
	// 				if (turnedBoard[row][col].mark == null) {
	// 					emptyBoxesInColToUse.push(turnedBoard[row][col]);
	// 				}
	// 			}
	// 		}
	// 	}

	// 	if (fullPlayerBoxesInRow.length == 2) {
	// 		console.log("boxesrow");
	// 		const emptyRowBox = emptyBoxesInRowToUse.pop();
	// 		return emptyRowBox;
	// 	} else if (fullPlayerBoxesInCol.length == 2) {
	// 		console.log("boxescol");
	// 		const emptyColBox = emptyBoxesInColToUse.pop();
	// 		return emptyColBox;
	// 	} else {
	// 		console.log(this.board);
	// 		const emptyBox = this.board
	// 			.flat()
	// 			.filter((box) => !box.element.textContent);
	// 		return emptyBox;
	// 	}
	// }

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
