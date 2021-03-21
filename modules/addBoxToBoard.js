class AddBoxToBoard {
	constructor(box, board) {
		(this.box = box), (this.board = board);
		this.addBoxToBoard(box);
	}
	addBoxToBoard = (box) => {
		const boxRow = box.dataset.row;
		const boxColumn = box.dataset.column;
		this.board[boxRow][boxColumn] = box.id;
	};
}

export { AddBoxToBoard };
