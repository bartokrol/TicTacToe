import { resultDraws } from "./domElems.js";
import { DrawMessage } from "./drawMessage.js";
import { LatestResults } from "./latestResults.js";

class DrawCheck {
	constructor(player, draws, isGameEnd, latestResults) {
		(this.player = player),
			(this.draws = draws),
			(this.isGameEnd = isGameEnd),
			(this.latestResults = latestResults),
			this.drawCheck(this.player, this.draws);
	}

	drawCheck = (player, draws) => {
		if (player.arr.length === 5 && player.winner === false) {
			this.isGameEnd = true;
			draws++;
			resultDraws.textContent = draws;
			const results = new LatestResults("", this.latestResults);
			new DrawMessage();
		}
	};
}

export { DrawCheck };
