const boxes = Array.from(document.querySelectorAll(".board--box"));

const board = [
	[, ,],
	[, ,],
	[, ,],
];

const player1 = [];
const player2 = [];

const checkPlayerLength = (e) => {
	board[e.target.dataset.row][e.target.dataset.column] = e.target;
	e.target.removeEventListener("click", checkPlayerLength);

	if (player1.length === player2.length) {
		player1.push(e);
		e.target.textContent = "X";
	} else {
		player2.push(e);
		e.target.textContent = "O";
	}
};

boxes.forEach((box) => {
	box.addEventListener("click", checkPlayerLength);
	// box.forEach((box) => {
	// 	if (box.textContent !== "") {
	// 		box.removeEventListener("click", checkPlayerLength);
	// 	}
	// });
});
