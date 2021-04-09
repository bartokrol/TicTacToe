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
	resultDefeats = null;
	newGameBtn = null;
	resetBtn = null;

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
		this.resultWins = this.getElement(this.domElems.resultWins);
		this.resultDraws = this.getElement(this.domElems.resulDraws);
		this.resultDefeats = this.getElement(this.domElems.resultDefeats);
		this.newGameBtn = this.getElement(this.domElems.newGameBtn);
		this.resetBtn = this.getElement(this.domElems.resetBtn);
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

	newGameListener = () => {
		console.log("tak");
		// const newGameReset = resetPageAfterNewGameBtn(
		// 	player,
		// 	computer,
		// 	players,
		// 	isGameEnd
		// );
		// board = newBoard.resetBoard(board);
		// isGameEnd = newGameReset;
		// emptyBoxes = boxes;
		// activePlayer = game.getActivePlayer();
		// addListenersToBoxes();
		// checkComputerMove();
		// newGameBtn.removeEventListener("click", newGameListener);
	};

	handleClick = (e) => {
		const playerBox = e.target;
		this.click(playerBox, this.activePlayer);

		if (this.isGameEnd) {
			this.setGameAfterGameIsEnd();
			return;
		}

		const emptyBoxes = this.board
			.flat()
			.filter((box) => !box.element.textContent);
		const computerBox =
			emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)].element;
		this.click(computerBox, this.activePlayer);

		if (this.isGameEnd) {
			this.setGameAfterGameIsEnd();
			return;
		}
	};

	// Function that calls new Click depends on which playerBox is set (could be e.target/playerBox or computerBox)
	// After each click the event listener to specific box is removed
	click = (playerBox, activePlayer) => {
		console.log(playerBox);
		playerBox.textContent = activePlayer.mark;
		playerBox.classList.remove("board--box--hover");
		this.pushBoxIdIntoActivePlayerArr(playerBox, activePlayer);
		this.findWinningPlayer(activePlayer);

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

	findWinningPlayer = (player) => {
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				this.isGameEnd = true;
				this.addPlayerWins(player);
				this.showWinningPlayersMarks(combination);
				return;
			}
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
		this.newGameBtn.classList.remove("disabled");
		this.newGameBtn.addEventListener("click", this.newGameListener);
	}
}

document.addEventListener("DOMContentLoaded", () => {
	const game = new Game();

	game.initializeGame();
});
