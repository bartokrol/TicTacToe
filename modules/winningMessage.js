import { endgameMessage, winner } from "./dom-elems.js";
import { WinnerBoxTransition } from "./winnerBoxTransition.js";

class WinningMessage {
	constructor(activePlayer) {
		(this.activePlayer = activePlayer),
			this.showWinningMessage(this.activePlayer);
	}

	showWinningMessage = (player) => {
		endgameMessage.textContent = "Winner!";
		winner.textContent = `${player.name} ( ${player.mark} )`;
		new WinnerBoxTransition();
	};
}

export { WinningMessage };
