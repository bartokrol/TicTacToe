const boxes = Array.from(document.querySelectorAll(".board--box"));

const markChoice = document.querySelector(".mark--choice");

const buttons = [...document.querySelectorAll("button")];
buttons.forEach((el) => {
	el.addEventListener("click", (e) => {
		player1.mark = e.target.value;
		markChoice.classList.add("inactive");
		if (player1.mark === "circle") {
			player2.mark = "cross";
		} else {
			player2.mark = "circle";
		}
		console.log(player1);
		console.log(player2);
	});
});

const player1 = {
	mark: null,
	arr: [],
};

const player2 = {
	mark: null,
	arr: [],
};

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

const checkPlayerLength = (e) => {
	if (player1.arr.length === player2.arr.length) {
		player1.arr.push(Number(e.target.id));
		e.target.classList.add(player1.mark);
	} else {
		player2.arr.push(Number(e.target.id));
		e.target.classList.add(player2.mark);
	}
	board[e.target.dataset.row][e.target.dataset.column] = e.target.className;
	e.target.removeEventListener("click", checkPlayerLength);
	if (player1.arr.length > 2 || player2.arr.length > 2) {
		checkWinner();
	}
	e.target.classList.remove("cross--hover");
	e.target.classList.remove("circle--hover");
	e.target.removeEventListener("mouseout", mouseOutElement);
	e.target.removeEventListener("mouseover", mouseOverElement);
};

const checkWinner = () => {
	for (let combination of winningCombinations) {
		if (combination.every((el) => player1.arr.includes(el))) {
			console.log("gracz pierwszy wygrał!");
			boxes.forEach((box) => {
				box.removeEventListener("click", checkPlayerLength);
				box.removeEventListener("mouseout", mouseOutElement);
				box.removeEventListener("mouseover", mouseOverElement);
			});
		} else if (combination.every((el) => player2.arr.includes(el))) {
			console.log("gracz drugi wygrał!");
			boxes.forEach((box) => {
				box.removeEventListener("click", checkPlayerLength);
				box.removeEventListener("mouseout", mouseOutElement);
				box.removeEventListener("mouseover", mouseOverElement);
			});
		}
	}
};

// // const checkDraw = () => {
// // 	if()
// // }

const mouseOverElement = (e) => {
	if (player1.arr.length === player2.arr.length) {
		e.target.classList.add("cross--hover");
	} else {
		e.target.classList.add("circle--hover");
	}
};

const mouseOutElement = (e) => {
	e.target.classList.remove("cross--hover");
	e.target.classList.remove("circle--hover");
};

boxes.forEach((box) => {
	box.addEventListener("click", checkPlayerLength);
	box.addEventListener("mouseover", mouseOverElement);
	box.addEventListener("mouseout", mouseOutElement);
});
