import { boxes } from "./domElems.js";
import { AddBoxToBoard } from "./addBoxToBoard.js";
import { PushBoxIntoPlayerArr } from "./pushBoxIntoPlayerArr.js";
import { CheckPlayerArrLength } from "./checkPlayerArrLength.js";
import { ActivePlayerChange } from "./activePlayerChange.js";

class Click {
	constructor(
		e,
		board,
		activePlayer,
		player,
		computer,
		players,
		draws,
		isGameEnd,
		emptyBoxes,
		winningCombinations,
		latestResults
	) {
		(this.e = e),
			(this.board = board),
			(this.activePlayer = activePlayer),
			(this.player = player),
			(this.computer = computer),
			(this.players = players),
			(this.draws = draws),
			(this.isGameEnd = isGameEnd),
			(this.emptyBoxes = emptyBoxes),
			(this.winningCombinations = winningCombinations),
			(this.latestResults = latestResults),
			this.click(this.e);
	}
	click = (e) => {
		const box = e.target;
		this.emptyBoxes = boxes.filter((box) => box.textContent === "");
		box.classList.remove("board--box--hover");
		new AddBoxToBoard(box, this.board);
		new PushBoxIntoPlayerArr(box, this.player);
		const checkPlayerArr = new CheckPlayerArrLength(
			this.player,
			this.players,
			this.draws,
			this.isGameEnd,
			this.winningCombinations,
			this.latestResults
		);
		this.isGameEnd = checkPlayerArr.isGameEnd;
		new ActivePlayerChange(
			this.player,
			this.computer,
			this.activePlayer,
			this.players
		);
	};
}

export { Click };
