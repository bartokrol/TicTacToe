import { ResultMessage } from "./resultMessage.js";
import { AddWins } from "./addWins.js";

// SetWinner is called inside "findWinner.js" module.
class SetWinner {
	constructor(player, latestResults) {
		(this.player = player),
			(this.latestResults = latestResults),
			this.setWinner(this.player);
	}

	// Function that calls "ResultMessage" and "AddWins" classes 
	setWinner = (player) => {
		new ResultMessage(player);
		new AddWins(player, this.latestResults);
	};
}

export { SetWinner };
