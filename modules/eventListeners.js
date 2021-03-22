import {
	boxes,
	markChoice,
	buttons,
	resultWins,
	resultDraws,
	resultDefeats,
	latest,
	resetBtn,
	newGameBtn,
	winnerAnnoucement,
	winner,
	endgameMessage,
	bodyOverflow,
} from "./dom-elems.js";
import { Click } from "./click.js";
import { ComputerClick } from "./computerClick.js";

class EventListeners {
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
			(this.latestResults = latestResults);
		this.checkComputerMove();
	}

	checkComputerMove = () => {
		if (this.activePlayer == this.player2) {
			new ComputerClick(
				this.board,
				this.activePlayer,
				this.player1,
				this.player2,
				this.players,
				this.draws,
				this.emptyBoxes,
				this.winningCombinations,
				this.latestResults
			);
		}
	};
	addEventListenersToEachBox = () => {
		boxes.forEach((box) => {
			box.addEventListener("mouseout", this.hideElementOnMouseOut);
			box.addEventListener("mouseover", this.showElementOnMouseOver);
			box.addEventListener("click", this.clickBox);
		});
		newGameBtn.addEventListener("click", () => {
			newGameBtn.classList.add("disabled");
			resetPageAfterNewGameBtn(
				this.player1,
				this.player2,
				this.players,
				this.board,
				this.activePlayer
			);
			this.emptyBoxes = boxes;
			this.findActivePlayer();
			this.addEventListenersToEachBox();
		});
		resetBtn.addEventListener("click", () => {
			newGameBtn.classList.add("disabled");
			bodyOverflow.classList.add("body-hidden");
			resetPageAfterResetBtn(
				this.player1,
				this.player2,
				this.players,
				this.board
			);
		});
	};

	clickBox = (e) => {
		e.target.classList.remove("board--box--hover");
		new Click(
			e,
			this.board,
			this.activePlayer,
			this.player1,
			this.player2,
			this.players,
			this.draws,
			this.emptyBoxes,
			this.winningCombinations,
			this.latestResults
		);
		this.removeEventListeners(e.target);

		new ComputerClick(
			this.board,
			this.activePlayer,
			this.player1,
			this.player2,
			this.players,
			this.draws,
			this.emptyBoxes,
			this.winningCombinations,
			this.latestResults
		);
	};

	showElementOnMouseOver = (e) => {
		e.target.textContent = `${this.activePlayer.mark}`;
		e.target.classList.add("board--box--hover");
	};

	hideElementOnMouseOut = (e) => {
		e.target.textContent = "";
		e.target.classList.remove("board--box--hover");
	};

	removeListenersForEachBox = () => {
		boxes.forEach((box) => {
			this.removeEventListeners(box);
		});
	};

	removeEventListeners = (el) => {
		el.removeEventListener("click", this.clickBox);
		el.removeEventListener("mouseout", this.hideElementOnMouseOut);
		el.removeEventListener("mouseover", this.showElementOnMouseOver);
	};
}

export { EventListeners };
