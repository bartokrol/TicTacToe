import { boxes, resetBtn, newGameBtn, bodyOverflow } from "./dom-elems.js";
import { Click } from "./click.js";
import { ComputerClick } from "./computerClick.js";
import { resetPageAfterResetBtn, resetPageAfterNewGameBtn } from "./reset.js";
import { FindActivePlayer } from "./findActivePlayer.js";

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
		this.addEventListenersToEachBox();
		this.checkComputerMove();
	}

	checkComputerMove = () => {
		if (this.player2.active) {
			const computerMove = new ComputerClick(
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
			this.removeEventListeners(computerMove.computerBox);
		}
	};

	addEventListenersToEachBox = () => {
		boxes.forEach((box) => {
			box.addEventListener("mouseout", this.hideElementOnMouseOut);
			box.addEventListener("mouseover", this.showElementOnMouseOver);
			box.addEventListener("click", this.handleClick);
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
			new FindActivePlayer(this.activePlayer, this.players);
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

	handleClick = (e) => {
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

		if (this.player1.winner || this.player2.winner) {
			this.removeListenersForEachBox();
		} else {
			const computerMove = new ComputerClick(
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
			this.removeEventListeners(computerMove.computerBox);
		}
	};

	showElementOnMouseOver = (e) => {
		e.target.textContent = `${this.player1.mark}`;
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
		el.removeEventListener("click", this.handleClick);
		el.removeEventListener("mouseout", this.hideElementOnMouseOut);
		el.removeEventListener("mouseover", this.showElementOnMouseOver);
	};
}

export { EventListeners };
