import { endgameMessage, winner } from "./domElems.js";
import { ResultBoxTransition } from "./resultBoxTransition.js";

// ResultMessage is called inside "setWinner.js" module.
class ResultMessage {
	constructor(activePlayer) {
		(this.activePlayer = activePlayer),
			this.showWinningMessage(this.activePlayer);
	}

	// Function shows specific message to winningContainers after winner is set
	showWinningMessage = (player) => {
		endgameMessage.textContent = "Winner!";
		winner.textContent = `${player.name} ( ${player.mark} )`;
		new ResultBoxTransition();
	};
}

export { ResultMessage };
