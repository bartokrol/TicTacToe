// AddBoxToBoard is called inside modules - "computerClick.js" and "playerClick.js".
class AddBoxToBoard {
	constructor(box, board) {
		(this.box = box), (this.board = board);
		this.addBoxToBoard(box);
	}

	// Function that adds box to specific row and column board which represents playing board
	addBoxToBoard = (box) => {
		const boxRow = box.dataset.row;
		const boxColumn = box.dataset.column;
		this.board[boxRow][boxColumn] = box.id;
	};
}

export { AddBoxToBoard };
