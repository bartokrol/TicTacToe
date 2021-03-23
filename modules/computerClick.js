import { ActivePlayerChange } from "./activePlayerChange.js";
import { boxes } from "./dom-elems.js";
import { AddBoxToBoard } from "./addBoxToBoard.js";
import { PushBoxIntoPlayerArr } from "./pushBoxIntoPlayerArr.js";
import { CheckPlayerArrLength } from "./checkPlayerArrLength.js";

class ComputerClick {
	constructor(
		board,
		activePlayer,
		player,
		computer,
		players,
		draws,
		emptyBoxes,
		winningCombinations,
		latestResults,
		isGameEnd
	) {
		(this.computerBox = null),
			(this.board = board),
			(this.activePlayer = activePlayer),
			(this.player = player),
			(this.computer = computer),
			(this.players = players),
			(this.draws = draws),
			(this.emptyBoxes = emptyBoxes),
			(this.winningCombinations = winningCombinations),
			(this.latestResults = latestResults),
			(this.isGameEnd = isGameEnd),
			this.computerClick();
	}

	computerClick = () => {
		const emptyBoxes = boxes.filter((box) => box.textContent === "");
		const computerBox =
			emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
		this.computerBox = computerBox;
		new AddBoxToBoard(computerBox, this.board);
		new PushBoxIntoPlayerArr(computerBox, this.computer);
		new CheckPlayerArrLength(
			this.computer,
			this.players,
			this.draws,
			this.winningCombinations,
			this.isGameEnd
		);
		new ActivePlayerChange(
			this.player,
			this.computer,
			this.activePlayer,
			this.players
		);
	};
}

export { ComputerClick };
