import { resultWins, resultDefeats } from "./dom-elems.js";

class AddWins {
	constructor(player) {
		(this.player = player), this.addWins(this.player);
	}

	addWins = (player) => {
		player.winner = true;
		player.wins++;
		if (player.name == "Player") {
			resultWins.textContent = player.wins;
		} else if (player.name == "Computer") {
			resultDefeats.textContent = player.wins;
		}

		// const results = new LatestResults(player, this.latestResults);
	};
}

export { AddWins };
