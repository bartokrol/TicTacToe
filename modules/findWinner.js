import { SetWinner } from "./setWinner.js";
import { ShowWinningMarks } from "./showWinningMarks.js";
import { DrawCheck } from "./drawCheck.js";
import { ActivePlayerChange } from "./activePlayerChange.js";

class FindWinner {
	constructor(winningCombinations, player, draws, players) {
		(this.winningCombinations = winningCombinations),
			(this.player = player),
			(this.draws = draws),
			(this.players = players);
		this.findWinner(this.player);
	}

	findWinner = (player) => {
		console.log(player.arr);
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				new SetWinner(player);
				new ShowWinningMarks(combination);
			}
		}
		// new DrawCheck(this.player1, this.player2, this.draws);
	};
}

export { FindWinner };
