import { resultDraws } from "./dom-elems.js";
import { DrawMessage } from "./drawMessage.js";

class DrawCheck {
	constructor(player1, player2, draws) {
		(this.player1 = player1),
			(this.player2 = player2),
			(this.draws = draws),
			this.drawCheck(this.player1, this.player2, this.draws);
	}

	drawCheck = () => {
		if (
			this.player1.arr.length === 5 &&
			this.player2.arr.length === 4 &&
			this.player1.winner === false &&
			this.player2.winner === false
		) {
			this.draws++;
			console.log(this.draws);
			resultDraws.textContent = this.draws;
			// const results = new LatestResults("", this.latestResults);
			new DrawMessage();
		}
	};
}

export { DrawCheck };
