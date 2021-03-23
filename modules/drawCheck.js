import { resultDraws } from "./dom-elems.js";
import { DrawMessage } from "./drawMessage.js";

class DrawCheck {
	constructor(player, draws, isGameEnd) {
		(this.player = player),
			(this.draws = draws),
			(this.isGameEnd = isGameEnd),
			this.drawCheck(this.player, this.draws);
	}

	drawCheck = (player, draws) => {
		if (player.arr.length === 5 && player.winner === false) {
			draws++;
			resultDraws.textContent = this.draws;
			this.isGameEnd = !this.isGameEnd;
			// const results = new LatestResults("", this.latestResults);
			new DrawMessage();
		}
	};
}

export { DrawCheck };
