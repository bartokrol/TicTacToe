// DOM Elements

const boxes = Array.from(
	document.querySelectorAll(".game-container__board-container__box")
);
const markChoice = document.querySelector(".starting-page");
const buttons = [...document.querySelectorAll(".starting-page--btn")];
const resultPlayer1 = document.querySelector(
	".game-container__current-result__player1__wins"
);
const resultPlayer2 = document.querySelector(
	".game-container__current-result__player2__wins"
);
const latest = document.querySelector(
	".game-container__latest-results__results"
);
const resetBtn = document.querySelector(".game-container__buttons--reset-btn");
const newGameBtn = document.querySelector(
	".game-container__buttons--new-game-btn"
);

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

// Starting variables

const players = [player1, player2];
let activePlayer = null;
let isGameEnd = false;
newGameBtn.disabled = true;

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

const resetResults = () => {
	resultPlayer1.textContent = player1.wins;
	resultPlayer2.textContent = player2.wins;
	latestResults = [];
	latest.innerHTML = "";
};

const resetPlayer = () => {
	for (let player of players) {
		player.arr = [];
		player.mark = null;
		player.wins = 0;
	}
	resetWinner();
};

const resetPage = () => {
	resetPlayer();
	resetResults();
	addListenersAfterReset();
	disableNewGameBtn();
	markChoice.classList.remove("inactive");
};

const resetWinner = () => {
	for (let player of players) {
		player.winner = false;
	}
};

const resetBoard = () => {
	board = [
		[null, null, null],
		[null, null, null],
		[null, null, null],
	];
};

const addListenersAfterReset = () => {
	boxes.forEach((box) => {
		box.className = "game-container__board-container__box board--box";
		box.textContent = "";
		box.addEventListener("click", checkPlayerLength);
		box.addEventListener("mouseover", showElementOnMouseOver);
		box.addEventListener("mouseout", hideElementOnMouseOut);
	});
};

const resetPlayersArr = () => {
	for (let player of players) {
		player.arr = [];
	}
};

const disableNewGameBtn = () => {
	isGameEnd = false;
	newGameBtn.disabled = true;
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

const unlockNewGameBtn = () => {
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
		setLatestResults("");
		unlockNewGameBtn();
	}
};

const getDate = () => {
	const date = new Date();
	const year = date.getFullYear();
	const month = date.getMonth();
	const day = date.getDate();
	const hour = date.getHours();
	const minutes = date.getMinutes();
	const seconds = date.getSeconds();

	const fullDate = `${hour < 10 ? "0" + hour : hour}:${
		minutes < 10 ? "0" + minutes : minutes
	}:${seconds < 10 ? "0" + seconds : seconds}
	${day < 10 ? "0" + day : day}-${month < 10 ? "0" + month : month}-${year}`;
	return fullDate;
};

const setLatestResults = (player) => {
	const date = getDate();
	if (player.winner) {
		let winner = `${player.name} wygrał rundę!`;
		latestResults.push({ winner, date });
	} else {
		winner = "It was a draw!";
		latestResults.push({ winner, date });
	}

	latest.innerHTML = latestResults
		.map(
			(el) =>
				`<li class="game-container__latest-results__results__latest-result">${el.date} <span class="game-container__latest-results__results__latest-result__winner">${el.winner}<span></li>`
		)
		.join(" ");
};

const addWins = (player) => {
	player.winner = true;
	player.wins++;
};

const removeListenersForEachBox = () => {
	console.log("usunięte");
	boxes.forEach((box) => {
		removeEventListeners(box);
	});
};

const showWinningBoxes = (combination) => {
	const winningArr = combination;

	boxes.forEach(function (box) {
		if (winningArr.includes(Number(box.id))) {
			box.classList.add("won");
		}
	});
};

const setWinner = (player) => {
	console.log(`${player.name} wygrał!`);
	removeListenersForEachBox();
	addWins(player);
	setLatestResults(player);
};

const findActivePlayer = () => {
	console.log(activePlayer);
	if (activePlayer[0] === player1) {
		console.log(activePlayer);
		return player1;
	} else {
		return player2;
	}
};

const findWinningCombination = (resultPlayer, player) => {
	for (let combination of winningCombinations) {
		if (combination.every((el) => player.arr.includes(el))) {
			setWinner(player);
			showWinningBoxes(combination);
			resultPlayer.textContent = `${player.wins}`;
			unlockNewGameBtn();
		}
	}
};

const checkWinner = () => {
	const player = activePlayer[0];
	const resultPlayer = document.querySelector(
		`.game-container__current-result__${player.name}__wins`
	);
	findWinningCombination(resultPlayer, player);
	checkDraw();
};

const removeEventListeners = (el) => {
	el.removeEventListener("click", checkPlayerLength);
	el.removeEventListener("mouseout", hideElementOnMouseOut);
	el.removeEventListener("mouseover", showElementOnMouseOver);
};

const removeHoverEvents = (e) => {
	e.target.textContent = "";
};

const checkPlayerArrLength = () => {
	if (player1.arr.length > 2 || player2.arr.length > 2) {
		checkWinner();
	}
};

//  function changes activePlayer after box is clicked

const changeActivePlayer = () => {
	player1.active = !player1.active;
	player2.active = !player2.active;
	activePlayer = players.filter((player) => player.active);
};

const pushBoxIntoPlayerArr = (e, player) => {
	player.arr.push(Number(e.target.id));
	e.target.textContent = `${player.mark}`;
};

// clicked box is pushed into specific player array

const addBoxToBoard = (e) => {
	const boxRow = e.target.dataset.row;
	const boxColumn = e.target.dataset.column;

	board[boxRow][boxColumn] = e.target.id;
};

const checkPlayerLength = (e) => {
	e.target.classList.remove("board--box--hover");
	addBoxToBoard(e);
	removeHoverEvents(e);
	removeEventListeners(e.target);
	pushBoxIntoPlayerArr(e, activePlayer[0]);
	checkPlayerArrLength();
	changeActivePlayer();
};

// function that sets first activePlayer

const setActivePlayer = () => {
	activePlayer = players.filter((player) => player.active);
};

const setStartingPlayerActive = () => {
	player1.active = true;
	player2.active = false;
};

const checkMark = () => {
	if (player1.mark === "O") {
		player2.mark = "X";
	} else if (player1.mark === "X") {
		player2.mark = "O";
	}
};

const choosePlayer = (e) => {
	player1.mark = e.target.value;
	checkMark();
	setStartingPlayerActive();
	markChoice.classList.add("inactive");
	setActivePlayer();
};

const showElementOnMouseOver = (e) => {
	e.target.textContent = `${activePlayer[0].mark}`;
	e.target.classList.add("board--box--hover");
};

const hideElementOnMouseOut = (e) => {
	e.target.textContent = "";
	e.target.classList.remove("board--box--hover");
};

const addListeners = () => {
	buttons.forEach((button) => {
		button.addEventListener("click", choosePlayer);
	});

	boxes.forEach((box) => {
		box.addEventListener("mouseout", hideElementOnMouseOut);
		box.addEventListener("mouseover", showElementOnMouseOver);
		box.addEventListener("click", checkPlayerLength);
	});

	resetBtn.addEventListener("click", resetPage);
	newGameBtn.addEventListener("click", startNewGame);
};

document.addEventListener("DOMContentLoaded", () => {
	addListeners();
	resetBoard();
});
