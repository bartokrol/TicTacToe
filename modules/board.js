class Board {
	constructor() {}

	addBoxToBoard = (box, board) => {
		box.classList.remove("board--box--hover");
		const boxRow = box.dataset.row;
		const boxColumn = box.dataset.column;
		board[boxRow][boxColumn] = box.id;
		return board;
	};

	resetBoard = (board) => {
		board = [
			[null, null, null],
			[null, null, null],
			[null, null, null],
		];
		return board;
	};
}

export { Board };
