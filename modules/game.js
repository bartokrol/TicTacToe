import { boxes, newGameBtn } from "./dom-elems.js";
import { LatestResults } from "./latest-results.js";
import { Reset } from "./reset.js";
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
		console.log(this.activePlayer);
	};

	addEventListenersToEachBox = () => {
		boxes.forEach((box) => {
			box.addEventListener("mouseout", this.hideElementOnMouseOut);
			box.addEventListener("mouseover", this.showElementOnMouseOver);
			box.addEventListener("click", this.clickBox);
		});
		newGameBtn.addEventListener("click", this.startNewGame);
	};

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
			this.latestResults
		);
		this.changeActivePlayer();
	};

	changeActivePlayer = () => {
		this.player1.active = !this.player1.active;
		this.player2.active = !this.player2.active;
		this.activePlayer = this.players.filter((player) => player.active);
	};

	startNewGame = () => {
		this.resetPlayersWins();
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

	resetPlayersWins = () => {
		this.player1.active = true;
		this.player2.active = false;
		this.player1.winner = false;
		this.player2.winner = false;
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
