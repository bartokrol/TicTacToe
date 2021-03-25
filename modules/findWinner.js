import { SetWinner } from "./setWinner.js";
import { ShowWinningMarks } from "./showWinningMarks.js";
import { DrawCheck } from "./drawCheck.js";

class FindWinner {
	constructor(winningCombinations, player, draws, isGameEnd, players) {
		(this.winningCombinations = winningCombinations),
			(this.player = player),
			(this.draws = draws),
			(this.isGameEnd = isGameEnd),
			(this.players = players),
			this.findWinner(this.player);
	}

	findWinner = (player) => {
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				this.isGameEnd = true;
				new SetWinner(player, this.isGameEnd);
				new ShowWinningMarks(combination);
				return;
			}
		}
		new DrawCheck(player, this.draws, this.isGameEnd);
	};
}

export { FindWinner };
