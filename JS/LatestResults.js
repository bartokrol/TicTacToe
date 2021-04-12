import { DomElems } from "./DomElems.js";

export class LatestResults extends DomElems {
	resultWins = this.getElement(this.domElems.resultWins);
	resultDraws = this.getElement(this.domElems.resultDraws);
	resultDefeats = this.getElement(this.domElems.resultDefeats);

	latestResultsElement = this.getElement(this.domElems.latestResults);
	latestResults = [];

	setWinsNumber(wins) {
		this.resultWins.textContent = wins;
	}

	setDefeatsNumber(defeats) {
		this.resultDefeats.textContent = defeats;
	}

	setDrawsNumber(draws) {
		this.resultDraws.textContent = draws;
	}

	setLatestResults = (player) => {
		const date = this.getDate();
		if (player.winner) {
			let winner = `${player.name} has won the round!`;
			this.latestResults.unshift({ winner, date });
		} else {
			let winner = "It was a draw...";
			this.latestResults.unshift({ winner, date });
		}
		this.latestResultsElement.innerHTML = this.latestResults
			.map(
				(el) =>
					`<li class="game-container__latest-results__results__latest-result">${el.date} <span class="game-container__latest-results__results__latest-result__winner">${el.winner}<span></li>`
			)
			.join(" ");
		this.removeLatestResult();
	};

	getDate = () => {
		const date = new Date();
		const year = date.getFullYear();
		const month = date.getMonth() + 1;
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

	removeLatestResult = () => {
		if (this.latestResults.length > 4) {
			this.latestResults.pop();
		}
	};

	resetResults = () => {
		this.resultWins.textContent = "0";
		this.resultDraws.textContent = "0";
		this.resultDefeats.textContent = "0";
		this.latestResultsElement.innerHTML = "";
		this.latestResults = [];
	};
}
