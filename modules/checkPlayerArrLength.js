import { FindWinner } from "./findWinner.js";

class CheckPlayerArrLength {
	constructor(player1, player2, draws, activePlayer, winningCombination) {
		(this.player1 = player1),
			(this.player2 = player2),
			(this.draws = draws),
			(this.activePlayer = activePlayer),
			(this.winningCombination = winningCombination),
			this.checkPlayerArrLength();
	}

	checkPlayerArrLength = () => {
		if (this.player1.arr.length > 2 || this.player2.arr.length > 2) {
			new FindWinner(
				this.winningCombination,
				this.activePlayer,
				this.player1,
				this.player2,
				this.draws
			);
		}
	};
}

export { CheckPlayerArrLength };
