// DOM Elements

const boxes = Array.from(document.querySelectorAll(".board--box"));
const markChoice = document.querySelector(".startingPage");
const buttons = [...document.querySelectorAll(".startingPage--btn")];
const resultPlayer1 = document.querySelector(".result--current__player1");
const resultPlayer2 = document.querySelector(".result--current__player2");
const latest = document.querySelector(".result--latest__results");
const resetBtn = document.querySelector(".buttons--button__reset");
const newGameBtn = document.querySelector(".buttons--button__newGame");

// Players

const player1 = {
	name: "player1",
	mark: null,
	arr: [],
	wins: null,
	winner: null,
};

const player2 = {
	name: "player2",
	mark: null,
	arr: [],
	wins: null,
	winner: null,
};

// Board 3x3

let board = [
	[null, null, null],
	[null, null, null],
	[null, null, null],
];

// WinningCombinations

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

// Array contains latest games results

let latestResults = [];

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

const addWins = (player) => {
	player.wins++;
};

const checkWinner = () => {
	for (let combination of winningCombinations) {
		if (combination.every((el) => player1.arr.includes(el))) {
			console.log("gracz pierwszy wygrał!");
			removeListenersForEachBox();
			addWins(player1);
			player1.winner = true;
			resultPlayer1.textContent = `Player1: ${player1.wins}`;
		} else if (combination.every((el) => player2.arr.includes(el))) {
			console.log("gracz drugi wygrał!");
			removeListenersForEachBox();
			addWins(player2);
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

const choosePlayer = (e) => {
	player1.mark = e.target.value;
	markChoice.classList.add("inactive");
	if (player1.mark === "circle") {
		player2.mark = "cross";
	} else {
		player2.mark = "circle";
	}
};

const resetPage = () => {
	board = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];
	boxes.forEach((box) => {
		box.className = "board--box";
		box.addEventListener("click", checkPlayerLength);
		box.addEventListener("mouseover", showElementOnMouseOver);
		box.addEventListener("mouseout", hideElementOnMouseOut);
	});

	player1.arr = [];
	player1.mark = null;
	player1.wins = 0;
	player1.winner = false;
	resultPlayer1.textContent = `Player1: ${player1.wins}`;
	player2.arr = [];
	player2.mark = null;
	player2.wins = 0;
	player2.winner = false;
	resultPlayer2.textContent = `${player1.wins} :Player2 `;
	latestResults = [];
	latest.innerHTML = "";
	markChoice.classList.remove("inactive");
};

const addListeners = () => {
	resetBtn.addEventListener("click", resetPage);

	buttons.forEach((button) => {
		button.addEventListener("click", choosePlayer);
	});

	boxes.forEach((box) => {
		box.addEventListener("click", checkPlayerLength);
		box.addEventListener("mouseover", showElementOnMouseOver);
		box.addEventListener("mouseout", hideElementOnMouseOut);
	});
};

document.addEventListener("DOMContentLoaded", addListeners);
