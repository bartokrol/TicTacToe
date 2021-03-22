import { SetWinner } from "./setWinner.js";
import { ShowWinningMarks } from "./showWinningMarks.js";
import { DrawCheck } from "./drawCheck.js";
class FindWinner {
	constructor(winningCombinations, activePlayer, player1, player2, draws) {
		(this.winningCombinations = winningCombinations),
			(this.activePlayer = activePlayer),
			(this.player1 = player1),
			(this.player2 = player2),
			(this.draws = draws),
			this.findWinner(this.activePlayer);
	}

	findWinner = (player) => {
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				new SetWinner(player);
				new ShowWinningMarks(combination);
			}
		}
		new DrawCheck(this.player1, this.player2, this.draws);
	};
}

export { FindWinner };
