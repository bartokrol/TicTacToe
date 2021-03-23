import { FindWinner } from "./findWinner.js";

class CheckPlayerArrLength {
	constructor(player, players, draws, winningCombination, isGameEnd) {
		(this.player = player),
			(this.players = players),
			(this.draws = draws),
			(this.winningCombination = winningCombination),
			(this.isGameEnd = isGameEnd),
			this.checkPlayerArrLength();
	}

	checkPlayerArrLength = () => {
		if (this.player.arr.length > 2) {
			new FindWinner(
				this.winningCombination,
				this.player,
				this.draws,
				this.players,
				this.isGameEnd
			);
		}
	};
}

export { CheckPlayerArrLength };
