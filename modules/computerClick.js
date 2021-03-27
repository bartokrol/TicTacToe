import { ActivePlayerChange } from "./activePlayerChange.js";
import { boxes } from "./domElems.js";
import { AddBoxToBoard } from "./addBoxToBoard.js";
import { PushBoxIntoPlayerArr } from "./pushBoxIntoPlayerArr.js";
import { CheckPlayerArrLength } from "./checkPlayerArrLength.js";

// ComputerClick class is called inside module - "setEventListeners.js"
class ComputerClick {
	constructor(
		board,
		activePlayer,
		player,
		computer,
		players,
		draws,
		isGameEnd,
		emptyBoxes,
		winningCombinations,
		latestResults
	) {
		(this.computerBox = null),
			(this.board = board),
			(this.activePlayer = activePlayer),
			(this.player = player),
			(this.computer = computer),
			(this.players = players),
			(this.draws = draws),
			(this.isGameEnd = isGameEnd),
			(this.emptyBoxes = emptyBoxes),
			(this.winningCombinations = winningCombinations),
			(this.latestResults = latestResults),
			this.computerClick();
	}

	// Function firstly filters for empty boxes on the board, then set which box is going to be filled with computer.mark
	// After computer "click" the classes that can be seen below are called
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
			this.isGameEnd,
			this.winningCombinations,
			this.latestResults
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
