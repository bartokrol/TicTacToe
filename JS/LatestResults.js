import { DomElems } from "./DomElems.js";

export class LatestResults extends DomElems {
	latestResultsElement = this.getElement(this.domElems.latestResults);
	latestResults = [];

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
		this.latestResultsElement.innerHTML = "";
	};
}
