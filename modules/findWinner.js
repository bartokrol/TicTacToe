import { SetWinner } from "./setWinner.js";
import { ShowWinningMarks } from "./showWinningMarks.js";
import { DrawCheck } from "./drawCheck.js";

// FindWinner is calles in "checkPlayerArrLength.js" module
class FindWinner {
	constructor(
		winningCombinations,
		player,
		draws,
		isGameEnd,
		players,
		latestResults
	) {
		(this.winningCombinations = winningCombinations),
			(this.player = player),
			(this.draws = draws),
			(this.isGameEnd = isGameEnd),
			(this.players = players),
			(this.latestResults = latestResults),
			this.findWinner(this.player);
	}

	// findWinner function checks if activePlayer.arr includes every element of the combination from the winningCombinations.
	// If true then isGameEnd = true, and SetWinner & ShowWinnningMarks classes are called
	// Returns in case more then one combination is true

	// If any of the combination returns false then DrawCheck is called
	findWinner = (player) => {
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				this.isGameEnd = true;
				new SetWinner(player, this.latestResults);
				new ShowWinningMarks(combination);
				return;
			}
		}
		const drawCheck = new DrawCheck(
			player,
			this.draws,
			this.isGameEnd,
			this.latestResults
		);
		this.isGameEnd = drawCheck.isGameEnd;
	};
}

export { FindWinner };
