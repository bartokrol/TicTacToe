import { WinningMessage } from "./winningMessage.js";
import { AddWins } from "./addWins.js";

class SetWinner {
	constructor(player, isGameEnd) {
		(this.player = player),
			(this.isGameEnd = isGameEnd),
			this.setWinner(this.player);
	}

	setWinner = (player) => {
		new WinningMessage(player);
		new AddWins(player, this.isGameEnd);
	};
}

export { SetWinner };
