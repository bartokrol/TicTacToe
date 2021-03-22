import { resultWins, resultDefeats } from "./dom-elems.js";

class AddWins {
	constructor(activePlayer) {
		(this.activePlayer = activePlayer), this.addWins(this.activePlayer);
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
