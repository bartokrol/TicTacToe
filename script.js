const boxes = Array.from(document.querySelectorAll(".board--box"));
const markChoice = document.querySelector(".mark--choice");
const buttons = [...document.querySelectorAll("button")];

const player1 = {
	mark: null,
	arr: [],
	active: true,
	wins: null,
};

const player2 = {
	mark: null,
	arr: [],
	active: false,
	wins: null,
};

const board = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
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

const pushBoxIntoPlayerArr = (e, player) => {
	player.arr.push(Number(e.target.id));
	e.target.classList.add(player.mark);
};

const checkPlayerLength = (e) => {
	if (player1.arr.length === player2.arr.length) {
		pushBoxIntoPlayerArr(e, player1);
	} else {
		pushBoxIntoPlayerArr(e, player2);
	}
	board[e.target.dataset.row][e.target.dataset.column] = e.target.id;
	if (player1.arr.length > 2 || player2.arr.length > 2) {
		checkWinner();
	}

	e.target.classList.remove(`${player1.mark}--hover`);
	e.target.classList.remove(`${player2.mark}--hover`);
	removeEventListeners(e.target);
};

const removeEventListeners = (el) => {
	el.removeEventListener("click", checkPlayerLength);
	el.removeEventListener("mouseout", hideElementOnMouseOut);
	el.removeEventListener("mouseover", showElementOnMouseOver);
};

const removeListenersForEachBox = () => {
	boxes.forEach((box) => {
		removeEventListeners(box);
	});
};

const checkWinner = () => {
	for (let combination of winningCombinations) {
		if (combination.every((el) => player1.arr.includes(el))) {
			console.log("gracz pierwszy wygrał!");
			removeListenersForEachBox();
			player1.wins++;
		} else if (combination.every((el) => player2.arr.includes(el))) {
			console.log("gracz drugi wygrał!");
			removeListenersForEachBox();
			player2.wins++;
		} else if (
			boxes.every(
				(box) =>
					box.classList.contains("circle") ||
					box.classList.contains("cross")
			)
		) {
			console.log("it's a draw!");
		}
	}
};

// const checkDraw = () => {
// 	if(board.length === 9 && board)
// }

const showElementOnMouseOver = (e) => {
	if (player1.arr.length === player2.arr.length) {
		e.target.classList.add(`${player1.mark}--hover`);
	} else {
		e.target.classList.add(`${player2.mark}--hover`);
	}
};

const hideElementOnMouseOut = (e) => {
	e.target.classList.remove(`${player1.mark}--hover`);
	e.target.classList.remove(`${player2.mark}--hover`);
};

boxes.forEach((box) => {
	box.addEventListener("click", checkPlayerLength);
	box.addEventListener("mouseover", showElementOnMouseOver);
	box.addEventListener("mouseout", hideElementOnMouseOut);
});

buttons.forEach((button) => {
	button.addEventListener("click", (e) => {
		player1.mark = e.target.value;
		markChoice.classList.add("inactive");
		if (player1.mark === "circle") {
			player2.mark = "cross";
		} else {
			player2.mark = "circle";
		}
	});
});
