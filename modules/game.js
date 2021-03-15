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
import { LatestResults } from "./latest-results.js";
import { resetPageAfterResetBtn, resetPageAfterNewGameBtn } from "./reset.js";
import { Click } from "./new-click.js";

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
		newGameBtn.addEventListener("click", () => {
			resetPageAfterNewGameBtn(
				this.player1,
				this.player2,
				this.players,
				this.board,
				this.activePlayer
			);
			this.findActivePlayer();
			this.addEventListenersToEachBox();
		});
		resetBtn.addEventListener("click", () =>
			resetPageAfterResetBtn(
				this.player1,
				this.player2,
				this.players,
				this.board
			)
		);
	};

	// resetPageAfterResetBtn = () => {
	// 	this.resetBoxes();
	// 	this.resetPlayersWins();
	// 	this.resetPlayersArr();
	// 	this.resetResults();
	// 	this.resetBoard();
	// 	markChoice.classList.remove("inactive");
	// };

	// resetResults = () => {
	// 	console.log(this.player1);
	// 	console.log(this.player2);
	// 	resultPlayer1.textContent = this.player1.wins;
	// 	resultPlayer2.textContent = this.player2.wins;
	// 	latest.innerHTML = "";
	// };

	// resetBoxes = () => {
	// 	boxes.forEach((box) => {
	// 		box.className = "game-container__board-container__box board--box";
	// 		box.textContent = "";
	// 	});
	// };

	clickBox = (e) => {
		e.target.classList.remove("board--box--hover");
		const click = new Click(
			e,
			this.board,
			this.activePlayer,
			this.player1,
			this.player2,
			this.players,
			this.winningCombinations,
			this.latestResults,
			this.removeEventListeners(e.target)
		);
		this.changeActivePlayer();
	};

	removeEventListeners = (el) => {
		el.removeEventListener("click", this.clickBox);
		el.removeEventListener("mouseout", this.hideElementOnMouseOut);
		el.removeEventListener("mouseover", this.showElementOnMouseOver);
	};

	showElementOnMouseOver = (e) => {
		e.target.textContent = `${this.activePlayer[0].mark}`;
		e.target.classList.add("board--box--hover");
	};

	hideElementOnMouseOut = (e) => {
		e.target.textContent = "";
		e.target.classList.remove("board--box--hover");
	};

	changeActivePlayer = () => {
		this.player1.active = !this.player1.active;
		this.player2.active = !this.player2.active;
		this.activePlayer = this.players.filter((player) => player.active);
	};

	// startNewGame = () => {
	// 	// this.resetPageAfterNewGame()
	// 	this.resetPlayersWins();
	// 	this.resetBoxes();
	// 	this.findActivePlayer();
	// 	newGameBtn.disabled = true;
	// 	this.addEventListenersToEachBox();
	// 	this.resetBoard();
	// 	this.resetPlayersArr();
	// };

	// resetPlayersWins = () => {
	// 	this.player1.active = true;
	// 	this.player2.active = false;
	// 	this.player1.winner = false;
	// 	this.player2.winner = false;
	// 	this.player1.wins = 0;
	// 	this.player2.wins = 0;
	// };

	// resetBoard = () => {
	// 	this.board = [
	// 		[null, null, null],
	// 		[null, null, null],
	// 		[null, null, null],
	// 	];
	// };

	// resetPlayersArr = () => {
	// 	for (let player of this.players) {
	// 		player.arr = [];
	// 	}
	// };
}

export { Game };
