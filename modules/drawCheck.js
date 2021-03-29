import { resultDraws } from "./domElems.js";
import { DrawMessage } from "./drawMessage.js";
import { LatestResults } from "./latestResults.js";

// DrawCheck is called inside "findWinner.js" module.
class DrawCheck {
	constructor(player, draws, isGameEnd, latestResults) {
		(this.player = player),
			(this.draws = draws),
			(this.isGameEnd = isGameEnd),
			(this.latestResults = latestResults),
			this.drawCheck(this.player, this.draws);
	}

	// Functions checks if active player array length is equal to 5 (other players array is equal to 4) and if this player already wins the game
	// If this is true the game is drawn, and "isGameEnd" is set true.
	// After this new LatestResults is called and DrawMessage appears on the screen.
	drawCheck = (player, draws) => {
		console.log(player.arr.length);
		console.log(player);
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
