import { boxes, resetBtn, newGameBtn, bodyOverflow } from "./domElems.js";
import { Click } from "./click.js";
import { ComputerClick } from "./computerClick.js";
import { resetPageAfterResetBtn, resetPageAfterNewGameBtn } from "./reset.js";
import { FindActivePlayer } from "./findActivePlayer.js";

class EventListeners {
	constructor(
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
			this.addEventListenersToEachBox(),
			this.checkComputerMove();
	}

	checkComputerMove = () => {
		if (this.computer.active) {
			const computerMove = new ComputerClick(
				this.board,
				this.activePlayer,
				this.player,
				this.computer,
				this.players,
				this.draws,
				this.isGameEnd,
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
			const newGameReset = resetPageAfterNewGameBtn(
				this.player,
				this.computer,
				this.players,
				this.board,
				this.isGameEnd
			);
			this.isGameEnd = newGameReset;
			this.emptyBoxes = boxes;
			new FindActivePlayer(this.activePlayer, this.players);
			this.addEventListenersToEachBox();
		});
		resetBtn.addEventListener("click", () => {
			newGameBtn.classList.add("disabled");
			bodyOverflow.classList.add("body-hidden");
			resetPageAfterResetBtn(
				this.player,
				this.computer,
				this.players,
				this.board,
				this.isGameEnd
			);
		});
	};

	handleClick = (e) => {
		const playerClick = new Click(
			e,
			this.board,
			this.activePlayer,
			this.player,
			this.computer,
			this.players,
			this.draws,
			this.isGameEnd,
			this.emptyBoxes,
			this.winningCombinations,
			this.latestResults
		);
		this.isGameEnd = playerClick.isGameEnd;
		this.removeEventListeners(e.target);
		if (this.player.winner || this.computer.winner || this.isGameEnd) {
			this.removeListenersForEachBox();
		} else {
			const computerMove = new ComputerClick(
				this.board,
				this.activePlayer,
				this.player,
				this.computer,
				this.players,
				this.draws,
				this.isGameEnd,
				this.emptyBoxes,
				this.winningCombinations,
				this.latestResults
			);
			this.isGameEnd = computerMove.isGameEnd;
			if (this.player.winner || this.computer.winner || this.isGameEnd) {
				this.removeListenersForEachBox();
			}
			this.removeEventListeners(computerMove.computerBox);
		}
	};

	showElementOnMouseOver = (e) => {
		e.target.textContent = `${this.player.mark}`;
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
