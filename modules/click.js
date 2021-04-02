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
		this.box.classList.remove("board--box--hover");
		// this.addBoxToBoard(this.box, this.board);
		// new AddBoxToBoard(this.box, this.board);
		// new PushBoxIntoPlayerArr(this.box, this.activePlayer);
		this.pushBoxIntoPlayerArr(this.box, this.activePlayer);
		const checkPlayerArr = new CheckPlayerArrLength(
			this.activePlayer,
			this.players,
			this.draws,
			this.isGameEnd,
			this.winningCombinations,
			this.latestResults
		);
		this.isGameEnd = checkPlayerArr.isGameEnd;
	};

	addBoxToBoard = (box) => {
		box.classList.remove("board--box--hover");
		const boxRow = box.dataset.row;
		const boxColumn = box.dataset.column;
		this.board[boxRow][boxColumn] = box.id;
	};

	// Clicked element is send into the player array.
	pushBoxIntoPlayerArr = (box, player) => {
		player.arr.push(Number(box.id));
		box.textContent = `${player.mark}`;
	};
}

export { Click };
