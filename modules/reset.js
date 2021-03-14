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
import { Game } from "./game.js";

class Reset {
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
			(this.latestResults = []),
			this.resetPage();
	}
	resetPage = () => {
		this.resetResults();
		this.resetBoxes();
		markChoice.classList.remove("inactive");
	};

	resetResults = () => {
		resultPlayer1.textContent = this.player1.wins;
		resultPlayer2.textContent = this.player2.wins;
		// this.latestResults = [];
		// const latestResults = new latestResults();
		latest.innerHTML = "";
	};

	resetBoxes = () => {
		boxes.forEach((box) => {
			box.className = "game-container__board-container__box board--box";
			box.textContent = "";
		});
	};
}

export { Reset };
