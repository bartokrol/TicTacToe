import { endgameMessage, winner } from "./domElems.js";
import { ResultBoxTransition } from "./resultBoxTransition.js";

// DrawMessage is called inside "drawCheck.js" module.
class DrawMessage {
	constructor() {
		this.showDrawMessage();
	}

	// Function show draw message after game is drawn and then call new ResultBoxTransition
	showDrawMessage = () => {
		endgameMessage.textContent = "";
		new ResultBoxTransition();
		winner.textContent = "It's a draw...";
	};
}

export { DrawMessage };
