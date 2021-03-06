export class DomElems {
	domElems = {
		startingPageContainer: ".starting-page",
		startingBtns: ".starting-page--btn",
		rulesBtn: ".starting-page__rules--button",
		rules: ".starting-page__rules",
		bodyOverflow: ".body",
		gameContainer: ".game-container",
		boardContainer: ".game-container__board-container__board",
		resultWins: ".game-container__current-result__wins__number",
		resultDraws: ".game-container__current-result__draws__number",
		resultDefeats: ".game-container__current-result__defeats__number",
		newGameBtn: ".game-container__buttons-container--new-game-btn",
		resetBtn: ".game-container__buttons-container--reset-btn",
		latestResults: ".game-container__latest-results__results",
		resultMessage: ".winner-annoucement-container__heading",
		resultWinner: ".winner-annoucement-container__winner",
		winnerAnnouncement: ".winner-annoucement-container",
	};

	getElement(selector) {
		return document.querySelector(selector);
	}

	getElements(selector) {
		return document.querySelectorAll(selector);
	}
}
