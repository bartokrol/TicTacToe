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
// import { Click } from "./player-click.js";

class ComputerClick extends BoxClick {
	constructor(emptyBoxes, player, computer, players, board, activePlayer) {
		super();
		(this.emptyBoxes = emptyBoxes),
			(this.player = player),
			(this.computer = computer),
			(this.players = players),
			(this.board = board),
			(this.activePlayer = activePlayer),
			this.setComputerMove();
	}

	setComputerMove = () => {
		if (this.emptyBoxes.length > 0) {
			const randomBox = Math.floor(
				Math.random() * this.emptyBoxes.length
			);
			const box = this.emptyBoxes[randomBox];
			this.removeEventListeners(box);
			box.textContent = this.computer.mark;
			this.addBoxToBoard(box);
			this.pushBoxIntoActivePlayerArr(box, this.activePlayer[0]);
			this.filterEmptyBoxes();
			this.checkPlayerArrLength(this.player, this.computer);
			this.changeActivePlayer(
				this.player,
				this.computer,
				this.activePlayer,
				this.players
			);
		}
	};
}

export { ComputerClick };
