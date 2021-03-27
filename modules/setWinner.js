import { ResultMessage } from "./resultMessage.js";
import { AddWins } from "./addWins.js";

class SetWinner {
	constructor(player, latestResults) {
		(this.player = player),
			(this.latestResults = latestResults),
			this.setWinner(this.player);
	}

	setWinner = (player) => {
		new ResultMessage(player);
		new AddWins(player, this.latestResults);
	};
}

export { SetWinner };
