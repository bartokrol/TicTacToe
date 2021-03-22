import { WinningMessage } from "./winningMessage.js";
import { AddWins } from "./addWins.js";

class SetWinner {
	constructor(activePlayer) {
		(this.activePlayer = activePlayer), this.setWinner(this.activePlayer);
	}

	setWinner = (player) => {
		new WinningMessage(player);
		new AddWins(player);
	};
}

export { SetWinner };
