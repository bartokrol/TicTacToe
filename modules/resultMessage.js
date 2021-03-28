import { endgameMessage, winner } from "./domElems.js";
import { ResultBoxTransition } from "./resultBoxTransition.js";

class ResultMessage {
	constructor(activePlayer) {
		(this.activePlayer = activePlayer),
			this.showWinningMessage(this.activePlayer);
	}

	showWinningMessage = (player) => {
		endgameMessage.textContent = "Winner!";
		winner.textContent = `${player.name} ( ${player.mark} )`;
		new ResultBoxTransition();
	};
}

export { ResultMessage };
