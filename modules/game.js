import {
	boxes,
	markChoice,
	buttons,
	resultPlayer1,
	resultPlayer2,
	latest,
	resetBtn,
	newGameBtn,
} from "./dom-elems.js";
import { NewGame } from "./new-game.js";

class Game {
	constructor(player1, player2) {
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
			(this.latestResults = []),
			((this.newGameBtn = {
				disabled: true,
			}),
			(this.startNewGame = () => {
				this.findActivePlayer();
			}));
	}
	findActivePlayer = () => {
		this.activePlayer = this.players.filter((player) => player.active);
	};

	addEventListenersToEachBox = () => {
		boxes.forEach((box) => {
			box.addEventListener("mouseout", this.hideElementOnMouseOut);
			box.addEventListener("mouseover", this.showElementOnMouseOver);
			box.addEventListener("click", this.clickBox);
		});
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
		const resultPlayer = document.querySelector(
			`.game-container__current-result__${player.name}__wins`
		);
		this.findWinningCombination(resultPlayer, player);
		this.checkDraw();
	};

	findWinningCombination = (resultPlayer, player) => {
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				this.setWinner(player);
				this.showWinningBoxes(combination);
				resultPlayer.textContent = `${player.wins}`;
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
			this.setLatestResults("");
			this.unlockNewGameBtn();
		}
	};

	setWinner = (player) => {
		console.log(`${player.name} wygrał!`);
		this.removeListenersForEachBox();
		this.addWins(player);
		this.setLatestResults(player);
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
			this.newGameBtn.disabled = !this.newGameBtn.disabled;
			newGameBtn.disabled = this.newGameBtn.disabled;
			newGameBtn.addEventListener("click", () => {
				const newGame = new NewGame(
					{
						name: "player1",
						mark: this.player1.mark,
						active: true,
						arr: [],
						wins: this.player1.wins,
						winner: false,
					},
					{
						name: "player2",
						mark: this.player2.mark,
						active: false,
						arr: [],
						wins: this.player2.wins,
						winner: false,
					}
				);
			});
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
	};

	getDate = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth();
		const day = date.getDate();
		const hour = date.getHours();
		const minutes = date.getMinutes();
		const seconds = date.getSeconds();

		const fullDate = `${hour < 10 ? "0" + hour : hour}:${
			minutes < 10 ? "0" + minutes : minutes
		}:${seconds < 10 ? "0" + seconds : seconds}
	${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year}`;
		return fullDate;
	};

	setLatestResults = (player) => {
		const date = this.getDate();
		if (player.winner) {
			let winner = `${player.name} wygrał rundę!`;
			this.latestResults.push({ winner, date });
		} else {
			let winner = "It was a draw!";
			this.latestResults.push({ winner, date });
		}
		latest.innerHTML = this.latestResults
			.map(
				(el) =>
					`<li class="game-container__latest-results__results__latest-result">${el.date} <span class="game-container__latest-results__results__latest-result__winner">${el.winner}<span></li>`
			)
			.join(" ");
	};
}

export { Game };
