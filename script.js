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
	active: true,
	arr: [],
	wins: null,
	winner: false,
};

const player2 = {
	name: "player2",
	mark: null,
	active: false,
	arr: [],
	wins: null,
	winner: false,
};

const players = [player1, player2];
let activePlayer = null;
let isGameEnd = false;
newGameBtn.disabled = true;
let fullBoard = 0;

// function changes activePlayer after box is clicked

const changeActivePlayer = () => {
	player1.active = !player1.active;
	player2.active = !player2.active;
	activePlayer = players.filter((player) => player.active);
};

// function that sets first activePlayer

const setActivePlayer = () => {
	activePlayer = players.filter((player) => player.active);
};

// Board 3x3

let board = [];

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

const removeHoverEvents = (e) => {
	e.target.classList.remove(`${player1.mark}--hover`);
	e.target.classList.remove(`${player2.mark}--hover`);
};

const checkPlayerArrLength = () => {
	if (player1.arr.length > 2 || player2.arr.length > 2) {
		checkWinner();
	}
};

const pushBoxIntoPlayerArr = (e, player) => {
	player.arr.push(Number(e.target.id));
	e.target.classList.add(player.mark);
	changeActivePlayer();
};

// clicked box is pushed into specific player array

const addBoxToBoard = (e) => {
	const boxRow = e.target.dataset.row;
	const boxColumn = e.target.dataset.column;

	board[boxRow][boxColumn] = e.target.id;
};

const checkPlayerLength = (e) => {
	addBoxToBoard(e);
	pushBoxIntoPlayerArr(e, activePlayer[0]);
	checkPlayerArrLength();
	removeHoverEvents(e);
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
	player.winner = true;
	player.wins++;
};

const setLatestResults = (player) => {
	if (player.winner) {
		console.log(`${player.name} wygrał rundę!`);
		latestResults.push(player);
	}

	latest.innerHTML = latestResults.map((el) => `<li>${el.name}</li>`);
};

const setWinner = (player) => {
	console.log(`${player.name} wygrał!`);
	removeListenersForEachBox();
	addWins(player);
	setLatestResults(player);
};

const unlockNewGame = () => {
	isGameEnd = true;
	if (isGameEnd) {
		newGameBtn.disabled = !newGameBtn.disabled;
	}
};

const checkDraw = () => {
	if (
		player1.arr.length === 5 &&
		player2.arr.length === 4 &&
		player1.winner === false &&
		player2.winner === false
	) {
		console.log("it's a draw");
		unlockNewGame();
	}
};

const checkWinner = () => {
	for (let combination of winningCombinations) {
		if (combination.every((el) => player1.arr.includes(el))) {
			setWinner(player1);
			resultPlayer1.textContent = `Player1: ${player1.wins}`;
			unlockNewGame();
		} else if (combination.every((el) => player2.arr.includes(el))) {
			setWinner(player2);
			resultPlayer2.textContent = `${player2.wins} :Player2`;
			unlockNewGame();
		}
	}
	checkDraw();
};

const showElementOnMouseOver = (e) => {
	e.target.classList.add(`${activePlayer[0].mark}--hover`);
};

const hideElementOnMouseOut = (e) => {
	e.target.classList.remove(`${activePlayer[0].mark}--hover`);
};

const setStartingPlayerActive = () => {
	player1.active = true;
	player2.active = false;
};

const choosePlayer = (e) => {
	player1.mark = e.target.value;
	if (player1.mark === "circle") {
		player2.mark = "cross";
	} else if (player1.mark === "cross") {
		player2.mark = "circle";
	}
	setStartingPlayerActive();
	markChoice.classList.add("inactive");
	setActivePlayer();
};

const resetWinner = () => {
	for (let player of players) {
		player.winner = false;
	}
};

const resetPlayer = () => {
	for (let player of players) {
		player.arr = [];
		player.mark = null;
		player.wins = 0;
	}
	resetWinner();
};

const resetResults = () => {
	resultPlayer1.textContent = `Player1: ${player1.wins}`;
	resultPlayer2.textContent = `${player2.wins} :Player2 `;
	latestResults = [];
	latest.innerHTML = "";
};

const resetBoard = () => {
	board = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];
	fullBoard = 0;
};

const addListenersAfterReset = () => {
	boxes.forEach((box) => {
		box.className = "board--box";
		box.addEventListener("click", checkPlayerLength);
		box.addEventListener("mouseover", showElementOnMouseOver);
		box.addEventListener("mouseout", hideElementOnMouseOut);
	});
};

const disableNewGameBtn = () => {
	isGameEnd = false;
	newGameBtn.disabled = true;
};

const resetPage = () => {
	resetPlayer();
	resetResults();
	addListenersAfterReset();
	disableNewGameBtn();
	markChoice.classList.remove("inactive");
};

const resetPlayersArr = () => {
	for (let player of players) {
		player.arr = [];
	}
};

const startNewGame = () => {
	setStartingPlayerActive();
	disableNewGameBtn();
	setActivePlayer();
	resetPlayersArr();
	addListenersAfterReset();
	resetBoard();
	resetWinner();
};

const addListeners = () => {
	resetBtn.addEventListener("click", resetPage);
	newGameBtn.addEventListener("click", startNewGame);

	buttons.forEach((button) => {
		button.addEventListener("click", choosePlayer);
	});

	boxes.forEach((box) => {
		box.addEventListener("click", checkPlayerLength);
		box.addEventListener("mouseover", showElementOnMouseOver);
		box.addEventListener("mouseout", hideElementOnMouseOut);
	});
};

document.addEventListener("DOMContentLoaded", () => {
	addListeners();
	resetBoard();
});
