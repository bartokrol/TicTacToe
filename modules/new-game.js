import { boxes, newGameBtn } from "./dom-elems.js";
import { Game } from "./game.js";

class NewGame extends Game {
	constructor(
		player1,
		player2,
		latestResults,
		addEventListenersToEachBox,
		findActivePlayer
	) {
		super(addEventListenersToEachBox, findActivePlayer);
		(this.player1 = player1),
			(this.player2 = player2),
			(this.players = [this.player1, this.player2]),
			(this.board = [
				[null, null, null],
				[null, null, null],
				[null, null, null],
			]),
			(this.activePlayer = null),
			(this.latestResults = latestResults),
			this.startNewGame();
	}

	startNewGame = () => {
		this.resetBoxes();
		this.findActivePlayer();
		newGameBtn.disabled = true;
		this.addEventListenersToEachBox();
	};

	resetBoxes = () => {
		boxes.forEach((box) => {
			box.className = "game-container__board-container__box board--box";
			box.textContent = "";
		});
	};
}

export { NewGame };
