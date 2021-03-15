import { boxes, newGameBtn } from "./dom-elems.js";
import { LatestResults } from "./latest-results.js";
import { NewGame } from "./new-game.js";
import { Reset } from "./reset.js";
class Game {
	constructor(player1, player2) {
		// super();
		(this.player1 = player1),
			(this.player2 = player2),
			(this.players = [this.player1, this.player2]),
			(this.activePlayer = null),
			(this.isGameEnd = false),
			(this.board = [
				[null, null, null],
				[null, null, null],
				[null, null, null],
			]),
			(this.winningCombinations = [
				[1, 2, 3],
				[4, 5, 6],
				[7, 8, 9],
				[1, 4, 7],
				[2, 5, 8],
				[3, 6, 9],
				[1, 5, 9],
				[3, 5, 7],
			]),
			(this.latestResults = []);
	}

	startNewGame = () => {
		this.findActivePlayer();
	};

	findActivePlayer = () => {
		this.activePlayer = this.players.filter((player) => player.active);
	};

	addEventListenersToEachBox = () => {
		boxes.forEach((box) => {
			box.addEventListener("mouseout", this.hideElementOnMouseOut);
			box.addEventListener("mouseover", this.showElementOnMouseOver);
			box.addEventListener("click", this.clickBox);
		});
		newGameBtn.addEventListener("click", this.startNewGame);
	};

	showElementOnMouseOver = (e) => {
		e.target.textContent = `${this.activePlayer[0].mark}`;
		e.target.classList.add("board--box--hover");
	};

	hideElementOnMouseOut = (e) => {
		e.target.textContent = "";
		e.target.classList.remove("board--box--hover");
	};

	clickBox = (e) => {
		e.target.classList.remove("board--box--hover");
		this.addBoxToBoard(e);
		this.removeHoverEvents(e);
		this.removeEventListeners(e.target);
		this.pushBoxIntoPlayerArr(e, this.activePlayer[0]);
		this.checkPlayerArrLength();
		this.changeActivePlayer();
		return;
	};

	addBoxToBoard = (e) => {
		const boxRow = e.target.dataset.row;
		const boxColumn = e.target.dataset.column;
		this.board[boxRow][boxColumn] = e.target.id;
	};

	removeHoverEvents = (e) => {
		e.target.textContent = "";
	};

	removeEventListeners = (el) => {
		el.removeEventListener("click", this.clickBox);
		el.removeEventListener("mouseout", this.hideElementOnMouseOut);
		el.removeEventListener("mouseover", this.showElementOnMouseOver);
	};

	pushBoxIntoPlayerArr = (e, player) => {
		player.arr.push(Number(e.target.id));
		e.target.textContent = `${player.mark}`;
	};

	checkPlayerArrLength = () => {
		if (this.player1.arr.length > 2 || this.player2.arr.length > 2) {
			this.checkWinner();
		}
	};

	changeActivePlayer = () => {
		this.player1.active = !this.player1.active;
		this.player2.active = !this.player2.active;
		this.activePlayer = this.players.filter((player) => player.active);
	};

	checkWinner = () => {
		const player = this.activePlayer[0];
		this.findWinningCombination(player);
		this.checkDraw();
	};

	findWinningCombination = (player) => {
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				this.setWinner(player);
				this.showWinningBoxes(combination);
				this.unlockNewGameBtn();
			}
		}
	};

	checkDraw = () => {
		if (
			this.player1.arr.length === 5 &&
			this.player2.arr.length === 4 &&
			this.player1.winner === false &&
			this.player2.winner === false
		) {
			console.log("it's a draw");
			const results = new LatestResults("", this.latestResults);
			this.unlockNewGameBtn();
		}
	};

	setWinner = (player) => {
		console.log(`${player.name} wygrał!`);
		this.removeListenersForEachBox();
		this.addWins(player);
	};

	showWinningBoxes = (combination) => {
		const winningArr = combination;

		boxes.forEach(function (box) {
			if (winningArr.includes(Number(box.id))) {
				box.classList.add("won");
			}
		});
	};

	unlockNewGameBtn = () => {
		this.isGameEnd = true;

		if (this.isGameEnd) {
			console.log(newGameBtn);
			newGameBtn.disabled = false;
		}
	};

	removeListenersForEachBox = () => {
		boxes.forEach((box) => {
			this.removeEventListeners(box);
		});
	};

	addWins = (player) => {
		player.winner = true;
		player.wins++;
		const results = new LatestResults(player, this.latestResults);
		// const newGame = new NewGame(this.player1, this.player2);
	};

	startNewGame = () => {
		this.player1.active = true;
		this.player2.active = false;
		this.resetBoxes();
		this.findActivePlayer();
		newGameBtn.disabled = true;
		this.addEventListenersToEachBox();
		this.resetBoard();
		this.resetPlayersArr();
	};

	resetBoxes = () => {
		boxes.forEach((box) => {
			box.className = "game-container__board-container__box board--box";
			box.textContent = "";
		});
	};

	resetBoard = () => {
		this.board = [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		];
	};

	resetPlayersArr = () => {
		for (let player of this.players) {
			player.arr = [];
		}
	};
}

export { Game };
