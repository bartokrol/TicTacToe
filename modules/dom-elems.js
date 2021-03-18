// DOM Elements

const boxes = Array.from(
	document.querySelectorAll(".game-container__board-container__box")
);
const markChoice = document.querySelector(".starting-page");
const buttons = [...document.querySelectorAll(".starting-page--btn")];
const resultPlayer1 = document.querySelector(
	".game-container__current-result__Player1__wins"
);
const resultPlayer2 = document.querySelector(
	".game-container__current-result__Player2__wins"
);
const latest = document.querySelector(
	".game-container__latest-results__results"
);
const resetBtn = document.querySelector(
	".game-container__buttons-container--reset-btn"
);
const newGameBtn = document.querySelector(
	".game-container__buttons-container--new-game-btn"
);

const winnerAnnoucement = document.querySelector(
	".winner-annoucement-container"
);
const winner = document.querySelector(".winner-annoucement-container__winner");
const endgameMessage = document.querySelector(
	".winner-annoucement-container__heading"
);

export {
	boxes,
	markChoice,
	buttons,
	resultPlayer1,
	resultPlayer2,
	latest,
	resetBtn,
	newGameBtn,
	winnerAnnoucement,
	winner,
	endgameMessage,
};
