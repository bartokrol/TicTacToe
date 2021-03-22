import { boxes } from "./dom-elems.js";

class ComputerClick {
	constructor(
		board,
		activePlayer,
		player1,
		player2,
		players,
		draws,
		emptyBoxes,
		winningCombinations,
		latestResults
	) {
		(this.board = board),
			(this.activePlayer = activePlayer),
			(this.player1 = player1),
			(this.player2 = player2),
			(this.players = players),
			(this.draws = draws),
			(this.emptyBoxes = emptyBoxes),
			(this.winningCombinations = winningCombinations),
			(this.latestResults = latestResults),
			this.computerClick();
	}

	computerClick = () => {
		const emptyBoxes = boxes.filter((box) => box.textContent === "");
		const computerBox =
			emptyBoxes[Math.floor(Math.random() * (emptyBoxes.length + 1))];
		if (emptyBoxes.length % 2 === 0) {
			computerBox.textContent = this.player2.mark;
		}
	};
}

export { ComputerClick };
