import { boxes, resetBtn, newGameBtn, bodyOverflow } from "./dom-elems.js";
import { resetPageAfterResetBtn, resetPageAfterNewGameBtn } from "./reset.js";
import { EventListeners } from "./eventListeners.js";
import { FindActivePlayer } from "./findActivePlayer.js";
import { ComputerClick } from "./computerClick.js";

class Game {
	constructor(player1, player2) {
		(this.player1 = player1),
			(this.player2 = player2),
			(this.players = [this.player1, this.player2]),
			(this.activePlayer = null),
			(this.draws = 0),
			(this.isGameEnd = false),
			(this.board = [
				[null, null, null],
				[null, null, null],
				[null, null, null],
			]),
			(this.emptyBoxes = boxes.filter((box) => box.textContent == "")),
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
		this.activePlayer = new FindActivePlayer(
			this.activePlayer,
			this.players
		).activePlayer;
		new EventListeners(
			this.board,
			...this.activePlayer,
			this.player1,
			this.player2,
			this.players,
			this.draws,
			this.emptyBoxes,
			this.winningCombinations,
			this.latestResults
		);
	};
}

export { Game };
