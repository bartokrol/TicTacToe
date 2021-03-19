import {
	boxes,
	resetBtn,
	newGameBtn,
	endgameMessage,
	bodyOverflow,
} from "./dom-elems.js";
import { resetPageAfterResetBtn, resetPageAfterNewGameBtn } from "./reset.js";
import { Click } from "./click.js";

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
			newGameBtn.classList.add("disabled");
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
		resetBtn.addEventListener("click", () => {
			newGameBtn.classList.add("disabled");
			bodyOverflow.classList.add("body-hidden");
			resetPageAfterResetBtn(
				this.player1,
				this.player2,
				this.players,
				this.board
			);
		});
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
		this.removeEventListeners(e.target);
		this.changeActivePlayer();
		if (this.player1.winner || this.player2.winner) {
			this.removeListenersForEachBox();
		}
	};

	removeListenersForEachBox = () => {
		boxes.forEach((box) => {
			this.removeEventListeners(box);
		});
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
}

export { Game };
