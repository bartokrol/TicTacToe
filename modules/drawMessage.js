import { endgameMessage, winner } from "./domElems.js";
import { WinnerBoxTransition } from "./winnerBoxTransition.js";

// DrawMessage is called inside "drawCheck.js" module.
class DrawMessage {
	constructor() {
		this.showDrawMessage();
	}

	// Function show draw message after game is drawn and then call new WinnerBoxTransition
	showDrawMessage = () => {
		endgameMessage.textContent = "";
		new WinnerBoxTransition();
		winner.textContent = "It's a draw...";
	};
}

export { DrawMessage };
