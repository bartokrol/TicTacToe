import {
	boxes,
	resetBtn,
	newGameBtn,
	winnerAnnoucement,
	winner,
	bodyOverflow,
	endgameMessage,
	resultWins,
	resultDraws,
	resultDefeats,
} from "./dom-elems.js";
import { LatestResults } from "./latestResults.js";
import { AddBoxToBoard } from "./addBoxToBoard.js";
import { PushBoxIntoPlayerArr } from "./pushBoxIntoPlayerArr.js";
import { CheckPlayerArrLength } from "./checkPlayerArrLength.js";
import { ActivePlayerChange } from "./activePlayerChange.js";
import { ComputerClick } from "./computerClick.js";

class Click {
	constructor(
		e,
		board,
		activePlayer,
		player,
		computer,
		players,
		draws,
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
			(this.emptyBoxes = emptyBoxes),
			(this.winningCombinations = winningCombinations),
			(this.latestResults = latestResults),
			this.click(this.e);
	}
	click = (e) => {
		const box = e.target;
		box.classList.remove("board--box--hover");
		new AddBoxToBoard(box, this.board);
		new PushBoxIntoPlayerArr(box, this.player);
		new CheckPlayerArrLength(
			this.player,
			this.players,
			this.draws,
			this.winningCombinations
		);
		new ActivePlayerChange(
			this.player,
			this.computer,
			this.activePlayer,
			this.players
		);
	};
}

export { Click };
