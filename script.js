const boxes = Array.from(document.querySelectorAll(".board--box"));

const board = [
	[, ,],
	[, ,],
	[, ,],
];

const winningCombinations = [
	[1, 2, 3],
	[4, 5, 6],
	[7, 8, 9],
	[1, 4, 7],
	[2, 5, 8],
	[3, 6, 9],
	[1, 5, 9],
	[3, 5, 7],
];

const player1 = [];
const player2 = [];

const checkPlayerLength = (e) => {
	if (player1.length === player2.length) {
		player1.push(Number(e.target.id));
		e.target.classList.add("cross");
	} else {
		player2.push(Number(e.target.id));
		e.target.classList.add("circle");
	}
	board[e.target.dataset.row][e.target.dataset.column] = e.target.className;
	e.target.removeEventListener("click", checkPlayerLength);
	if (player1.length > 2 || player2.length > 2) {
		checkWinner();
	}
};

const checkWinner = () => {
	for (let combination of winningCombinations) {
		if (combination.every((el) => player1.includes(el))) {
			console.log("gracz pierwszy wygrał!");
			boxes.forEach((box) => {
				box.removeEventListener("click", checkPlayerLength);
			});
		} else if (combination.every((el) => player2.includes(el))) {
			console.log("gracz drugi wygrał!");
			boxes.forEach((box) => {
				box.removeEventListener("click", checkPlayerLength);
			});
		}
	}
};

// const checkDraw = () => {
// 	if()
// }

boxes.forEach((box) => {
	box.addEventListener("click", checkPlayerLength);
});
