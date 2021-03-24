import { SetWinner } from "./setWinner.js";
import { ShowWinningMarks } from "./showWinningMarks.js";
import { DrawCheck } from "./drawCheck.js";
import { ActivePlayerChange } from "./activePlayerChange.js";

class FindWinner {
	constructor(winningCombinations, player, draws, players, isGameEnd) {
		(this.winningCombinations = winningCombinations),
			(this.player = player),
			(this.draws = draws),
			(this.players = players),
			(this.isGameEnd = isGameEnd),
			this.findWinner(this.player);
	}

	findWinner = (player) => {
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				const winner = new SetWinner(player, this.isGameEnd);
				new ShowWinningMarks(combination);
			}
		}
		new DrawCheck(player, this.draws, this.isGameEnd);
	};
}

export { FindWinner };
