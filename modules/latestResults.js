import { latest, resultWins, resultDraws, resultDefeats } from "./domElems.js";

// LatestResults is called in "drawCheck.js" and "addWins.js" modules
class LatestResults {
	constructor(latestResults) {
		this.latestResults = latestResults;
	}

	// Function gets fullDate from getDate function. If there is a winner then specific string is send to latestResults array, if there is a draw then "it was a draw!" message is sent inside latestResults array.
	// Then map function shows specific li elements in index.html
	setLatestResults = (player) => {
		const date = this.getDate();
		if (player.winner) {
			let winner = `${player.name} has won the round!`;
			this.latestResults.unshift({ winner, date });
		} else {
			let winner = "It was a draw...";
			this.latestResults.unshift({ winner, date });
		}
		latest.innerHTML = this.latestResults
			.map(
				(el) =>
					`<li class="game-container__latest-results__results__latest-result">${el.date} <span class="game-container__latest-results__results__latest-result__winner">${el.winner}<span></li>`
			)
			.join(" ");
		this.removeLatestResult();
	};

	// Function get's actual date and time and return fullDate;
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

	// Function removes last element of the array if length is more then 4 elements
	removeLatestResult = () => {
		if (this.latestResults.length > 4) {
			this.latestResults.pop();
		}
	};

	// Function resets players wins and latest unordered list
	resetResults = (player, computer, draws) => {
		resultWins.textContent = player.wins;
		resultDraws.textContent = draws;
		resultDefeats.textContent = computer.wins;
		latest.innerHTML = "";
	};
}

export { LatestResults };
