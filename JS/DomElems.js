export class DomElems {
	domElems = {
		startingPageContainer: ".starting-page",
		startingBtns: ".starting-page--btn",
		rulesBtn: ".starting-page__rules--button",
		rules: ".starting-page__rules",
		bodyOverflow: ".body",
		gameContainer: ".game-container",
		boardContainer: ".game-container__board-container__board",
	};

	getElement(selector) {
		return document.querySelector(selector);
	}

	getElements(selector) {
		return document.querySelectorAll(selector);
	}
}
