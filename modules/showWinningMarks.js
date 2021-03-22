import { boxes } from "./dom-elems.js";

class ShowWinningMarks {
	constructor(combination) {
		(this.combination = combination),
			this.showWinningMarks(this.combination);
	}

	showWinningMarks = (combination) => {
		const winningArr = combination;

		boxes.forEach(function (box) {
			if (winningArr.includes(Number(box.id))) {
				box.classList.add("won");
			}
		});
	};
}

export { ShowWinningMarks };
