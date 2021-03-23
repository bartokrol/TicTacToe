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
		player1,
		player2,
		players,
		draws,
		emptyBoxes,
		winningCombinations,
		latestResults
	) {
		(this.e = e),
			(this.board = board),
			(this.activePlayer = activePlayer),
			(this.player1 = player1),
			(this.player2 = player2),
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
		new PushBoxIntoPlayerArr(box, this.player1);
		new CheckPlayerArrLength(
			this.player1,
			this.player2,
			this.draws,
			this.activePlayer,
			this.winningCombinations
		);
		new ActivePlayerChange(
			this.player1,
			this.player2,
			this.activePlayer,
			this.players
		);
	};
}

export { Click };
