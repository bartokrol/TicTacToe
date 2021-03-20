// import {
// 	boxes,
// 	resetBtn,
// 	newGameBtn,
// 	winnerAnnoucement,
// 	winner,
// 	bodyOverflow,
// 	endgameMessage,
// 	resultWins,
// 	resultDraws,
// 	resultDefeats,
// } from "./dom-elems.js";
// import { resetPageAfterResetBtn, resetPageAfterNewGameBtn } from "./reset.js";
// import { Events } from "./event-listeners.js";
import { BoxClick } from "./box-click.js";
// import { ComputerClick } from "./computer-click.js";

class Click extends BoxClick {
	constructor(
		e,
		board,
		activePlayer,
		player,
		computer,
		players,
		winningCombinations,
		latestResults
	) {
		super();
		(this.e = e),
			(this.board = board),
			(this.activePlayer = activePlayer),
			(this.player = player),
			(this.computer = computer),
			(this.players = players),
			(this.winningCombinations = winningCombinations),
			(this.latestResults = latestResults),
			this.click(this.e);
	}

	click = (e) => {
		const box = e.target;
		box.classList.remove("board--box--hover");
		this.addBoxToBoard(box);
		this.pushBoxIntoActivePlayerArr(box, this.activePlayer[0]);
		this.checkPlayerArrLength();
	};
}

export { Click };
