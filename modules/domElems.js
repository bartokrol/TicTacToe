// DOM Elements of index.html

const boxes = Array.from(
	document.querySelectorAll(".game-container__board-container__box")
);
const markChoice = document.querySelector(".starting-page");
const startingBtns = [...document.querySelectorAll(".starting-page--btn")];
const resultWins = document.querySelector(
	".game-container__current-result__wins__number"
);
const resultDraws = document.querySelector(
	".game-container__current-result__draws__number"
);
const resultDefeats = document.querySelector(
	".game-container__current-result__defeats__number"
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
const bodyOverflow = document.querySelector(".body");

export {
	boxes,
	markChoice,
	startingBtns,
	resultWins,
	resultDraws,
	resultDefeats,
	latest,
	resetBtn,
	newGameBtn,
	winnerAnnoucement,
	winner,
	endgameMessage,
	bodyOverflow,
};
