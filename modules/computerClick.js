import { ActivePlayerChange } from "./activePlayerChange.js";
import { boxes } from "./dom-elems.js";
import { AddBoxToBoard } from "./addBoxToBoard.js";
import { PushBoxIntoPlayerArr } from "./pushBoxIntoPlayerArr.js";
import { CheckPlayerArrLength } from "./checkPlayerArrLength.js";

class ComputerClick {
	constructor(
		board,
		activePlayer,
		player1,
		player2,
		players,
		draws,
		emptyBoxes,
		winningCombinations,
		latestResults
	) {
		(this.computerBox = null),
			(this.board = board),
			(this.activePlayer = activePlayer),
			(this.player1 = player1),
			(this.player2 = player2),
			(this.players = players),
			(this.draws = draws),
			(this.emptyBoxes = emptyBoxes),
			(this.winningCombinations = winningCombinations),
			(this.latestResults = latestResults),
			this.computerClick();
	}

	computerClick = () => {
		const emptyBoxes = boxes.filter((box) => box.textContent === "");
		const computerBox =
			emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
		this.computerBox = computerBox;
		new AddBoxToBoard(computerBox, this.board);
		new PushBoxIntoPlayerArr(computerBox, this.player2);
		new CheckPlayerArrLength(
			this.player1,
			this.player2,
			this.draws,
			this.activePlayer,
			this.winningCombinations
		);
		new ActivePlayerChange(
			this.player1,
			this.player2,
			this.activePlayer,
			this.players
		);
	};
}

export { ComputerClick };
