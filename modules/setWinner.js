import { WinningMessage } from "./winningMessage.js";
import { AddWins } from "./addWins.js";

class SetWinner {
	constructor(player) {
		(this.player = player), this.setWinner(this.player);
	}

	setWinner = (player) => {
		new WinningMessage(player);
		new AddWins(player);
	};
}

export { SetWinner };
