const boxes = Array.from(document.querySelectorAll(".board--box"));

const board = [
	[, ,],
	[, ,],
	[, ,],
];

const player1 = [];
const player2 = [];

boxes.forEach((box) =>
	box.addEventListener("click", (e) => {
		if (player1.length === player2.length) {
			player1.push(e);
			e.target.textContent = "X";
			board[e.target.dataset.row][e.target.dataset.column] = e.target;
		} else {
			player2.push(e);
			e.target.textContent = "O";
			board[e.target.dataset.row][e.target.dataset.column] = e.target;
		}
	})
);
