// import { ActivePlayerChange } from "./activePlayerChange.js";
import { AddBoxToBoard } from "./addBoxToBoard.js";
import { PushBoxIntoPlayerArr } from "./pushBoxIntoPlayerArr.js";
import { CheckPlayerArrLength } from "./checkPlayerArrLength.js";

// Click class is called inside module - "setEventListeners.js"
class Click {
	constructor(
		box,
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
		(this.box = box),
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
			this.click();
	}

	// Function firstly filters for empty boxes on the board, then set which box is going to be filled with computer.mark
	// After computer "click" the classes that can be seen below are called
	click = () => {
		// console.log(this.activePlayer);
		// const emptyBoxes = boxes.filter((box) => box.textContent === "");
		// const computerBox =
		// 	emptyBoxes[Math.floor(Math.random() * emptyBoxes.length)];
		// this.computerBox = computerBox;
		// console.log(this.activePlayer);
		this.box.classList.remove("board--box--hover");
		new AddBoxToBoard(this.box, this.board);
		new PushBoxIntoPlayerArr(this.box, this.activePlayer);
		const checkPlayerArr = new CheckPlayerArrLength(
			this.activePlayer,
			this.players,
			this.draws,
			this.isGameEnd,
			this.winningCombinations,
			this.latestResults
		);
		this.isGameEnd = checkPlayerArr.isGameEnd;
		// const activePlayer = new ActivePlayerChange(
		// 	this.player,
		// 	this.computer,
		// 	this.activePlayer,
		// 	this.players
		// );
	};
}

export { Click };
