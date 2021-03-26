import { resultWins, resultDefeats } from "./dom-elems.js";
import { LatestResults } from "./latestResults.js";

class AddWins {
	constructor(player, latestResults) {
		(this.player = player),
			(this.latestResults = latestResults),
			this.addWins(this.player);
	}

	addWins = (player) => {
		player.winner = true;
		player.wins++;
		if (player.name == "Player") {
			resultWins.textContent = player.wins;
		} else if (player.name == "Computer") {
			resultDefeats.textContent = player.wins;
		}

		const results = new LatestResults(player, this.latestResults);
	};
}

export { AddWins };
