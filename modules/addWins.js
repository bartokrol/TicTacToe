import { resultWins, resultDefeats } from "./domElems.js";
import { LatestResults } from "./latestResults.js";

// AddWins is called inside "setWinner.js" module.
class AddWins {
	constructor(player, latestResults) {
		(this.player = player),
			(this.latestResults = latestResults),
			this.addWins(this.player);
	}

	// Function sets player.winner to true, add wins which show inside "current results" as wins or defeats (depends on which player has won).
	// Then new LatestResults is called.
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
