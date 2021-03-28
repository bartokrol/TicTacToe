import { boxes } from "./domElems.js";

// ShowWinningMarks is called inside "findWinner.js" module.
class ShowWinningMarks {
	constructor(combination) {
		(this.combination = combination),
			this.showWinningMarks(this.combination);
	}

	// Function that adds "won" classList to each of the winningArr (winningCombination) elems
	showWinningMarks = (combination) => {
		const winningArr = combination;

		boxes.forEach((box) => {
			if (winningArr.includes(Number(box.id))) {
				box.classList.add("won");
			}
		});
	};
}

export { ShowWinningMarks };
