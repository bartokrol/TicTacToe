import { FindWinner } from "./findWinner.js";

class CheckPlayerArrLength {
	constructor(
		player,
		players,
		draws,
		isGameEnd,
		winningCombination,
		latestResults
	) {
		(this.player = player),
			(this.players = players),
			(this.draws = draws),
			(this.isGameEnd = isGameEnd),
			(this.winningCombination = winningCombination),
			(this.latestResults = latestResults),
			this.checkPlayerArrLength();
	}

	checkPlayerArrLength = () => {
		if (this.player.arr.length > 2) {
			const findWinner = new FindWinner(
				this.winningCombination,
				this.player,
				this.draws,
				this.isGameEnd,
				this.players,
				this.latestResults
			);
			this.isGameEnd = findWinner.isGameEnd;
		}
	};
}

export { CheckPlayerArrLength };
