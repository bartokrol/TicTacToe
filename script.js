const boxes = Array.from(document.querySelectorAll(".board--box"));
const markChoice = document.querySelector(".mark--choice");
const buttons = [...document.querySelectorAll("button")];
const resultPlayer1 = document.querySelector(".result--current__player1");
const resultPlayer2 = document.querySelector(".result--current__player2");
const latest = document.querySelector(".result--latest__results");

const player1 = {
	name: "player1",
	mark: null,
	arr: [],
	active: true,
	wins: null,
	winner: null,
};

const player2 = {
	name: "player2",
	mark: null,
	arr: [],
	active: false,
	wins: null,
	winner: null,
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

const latestResults = [];

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
			player1.winner = true;
			resultPlayer1.textContent = `Player1: ${player1.wins}`;
		} else if (combination.every((el) => player2.arr.includes(el))) {
			console.log("gracz drugi wygrał!");
			removeListenersForEachBox();
			player2.wins++;
			player2.winner = true;
			resultPlayer2.textContent = `${player2.wins} :Player2`;
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
	if (player1.winner) {
		console.log("player1 has won this round");
		latestResults.push(player1);
		console.log(latestResults);
	} else if (player2.winner) {
		console.log("player2 has won this round");
		latestResults.push(player2);
		console.log(latestResults);
	}

	latest.innerHTML = latestResults.map((el) => `<li>${el.name}</li>`);
};

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
