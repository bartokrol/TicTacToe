import { FindWinner } from "./findWinner.js";

class CheckPlayerArrLength {
	constructor(player, players, draws, isGameEnd, winningCombination) {
		(this.player = player),
			(this.players = players),
			(this.draws = draws),
			(this.isGameEnd = isGameEnd),
			(this.winningCombination = winningCombination),
			this.checkPlayerArrLength();
	}

	checkPlayerArrLength = () => {
		if (this.player.arr.length > 2) {
			const findWinner = new FindWinner(
				this.winningCombination,
				this.player,
				this.draws,
				this.isGameEnd,
				this.players
			);
			this.isGameEnd = findWinner.isGameEnd;
		}
	};
}

export { CheckPlayerArrLength };
