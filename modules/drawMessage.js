import { endgameMessage, winner } from "./dom-elems.js";
import { WinnerBoxTransition } from "./winnerBoxTransition.js";

class DrawMessage {
	constructor() {
		this.showDrawMessage();
	}
	showDrawMessage = () => {
		endgameMessage.textContent = "";
		new WinnerBoxTransition();
		winner.textContent = "It's a draw...";
	};
}

export { DrawMessage };
