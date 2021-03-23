import { FindWinner } from "./findWinner.js";

class CheckPlayerArrLength {
	constructor(player, players, draws, winningCombination) {
		(this.player = player),
			(this.players = players),
			(this.draws = draws),
			(this.winningCombination = winningCombination),
			this.checkPlayerArrLength();
	}

	checkPlayerArrLength = () => {
		if (this.player.arr.length > 2) {
			new FindWinner(
				this.winningCombination,
				this.player,
				this.draws,
				this.players
			);
		}
	};
}

export { CheckPlayerArrLength };
