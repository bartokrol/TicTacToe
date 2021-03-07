const boxes = Array.from(document.querySelectorAll(".board--box"));

const board = [
	[, ,],
	[, ,],
	[, ,],
];

const player1 = [];
const player2 = [];

const checkPlayerLength = (e) => {
	if (player1.length === player2.length) {
		player1.push(e);
		e.target.classList.add("cross");
	} else {
		player2.push(e);
		e.target.classList.add("circle");
	}
	board[e.target.dataset.row][e.target.dataset.column] = e.target.className;
	e.target.removeEventListener("click", checkPlayerLength);
};

boxes.forEach((box) => {
	box.addEventListener("click", checkPlayerLength);
});
