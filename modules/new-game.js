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

class NewGame extends Game {
	constructor(
		player1,
		player2,
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
			this.startNewGame();
	}

	startNewGame = () => {
		this.findActivePlayer();
		this.addEventListenersToEachBox();
		this.resetBoxes();
		newGameBtn.disabled = true;
	};

	resetBoxes = () => {
		boxes.forEach((box) => {
			box.className = "game-container__board-container__box board--box";
			box.textContent = "";
		});
	};

	addEventListenersToEachBox = () => {
		boxes.forEach((box) => {
			box.addEventListener("mouseout", this.hideElementOnMouseOut);
			box.addEventListener("mouseover", this.showElementOnMouseOver);
			box.addEventListener("click", this.clickBox);
		});
	};
}

export { NewGame };
