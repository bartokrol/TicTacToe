import { boxes, resetBtn, newGameBtn, bodyOverflow } from "./domElems.js";
import { PlayerClick } from "./playerClick.js";
import { ComputerClick } from "./computerClick.js";
import { resetPageAfterResetBtn, resetPageAfterNewGameBtn } from "./reset.js";
import { FindActivePlayer } from "./findActivePlayer.js";

// EventsListeners class is called inside module - "startGame.js"
class setEventListeners {
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
			this.addEventListeners(),
			this.checkComputerMove();
	}

	// Function is called to find if computer is an active player. If true the computerClick class is called. After this the box events are removed.
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

	// Function that add mouseout, mouseover, click events to all of the boxes on the board and click event to newGameBtn, resetBtn after new game is started.
	addEventListeners = () => {
		this.addListenersToBoxes();
		newGameBtn.addEventListener("click", this.newGameListener);
		resetBtn.addEventListener("click", this.resetListener);
	};

	// Function is called after one of the box on board is clicked. The player click is set on the board and after that computerClick also lands on the board.
	// After each click the event listener to specific box is removed
	handleClick = (e) => {
		// Player click
		const click = new PlayerClick(
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
		this.isGameEnd = click.isGameEnd;
		this.removeEventListeners(e.target);

		// Validation that remove listeners for each box if game is finished (is called after player click)
		if (this.isGameEnd) {
			this.removeListenersForEachBox();
			newGameBtn.addEventListener("click", this.newGameListener);
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
			this.removeEventListeners(computerMove.computerBox);
			if (this.isGameEnd) {
				this.removeListenersForEachBox();
				newGameBtn.addEventListener("click", this.newGameListener);
			}
			// The same validation that remove listeners for each box if game is finished (but is called after computer click)
		}
		if (this.isGameEnd) {
			this.removeListenersForEachBox();
			newGameBtn.addEventListener("click", this.newGameListener);
		}
	};

	// Function that resets the game after newGameBtn is clicked
	newGameListener = () => {
		// resetPageAfterNewGameBtn is set inside "reset.js".
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
		this.addListenersToBoxes();
		this.checkComputerMove();
		newGameBtn.removeEventListener("click", this.newGameListener);
	};

	resetListener = () => {
		newGameBtn.classList.add("disabled");
		bodyOverflow.classList.add("body-hidden");
		// resetPageAfterResetBtn is set inside "reset.js".
		resetPageAfterResetBtn(
			this.player,
			this.computer,
			this.draws,
			this.players,
			this.board,
			this.isGameEnd
		);
		this.removeListenersForEachBox();
		newGameBtn.removeEventListener("click", this.newGameListener);
	};

	// Function that adds event listeners to every box
	addListenersToBoxes = () => {
		boxes.forEach((box) => {
			box.addEventListener("mouseout", this.hideElementOnMouseOut);
			box.addEventListener("mouseover", this.showElementOnMouseOver);
			box.addEventListener("click", this.handleClick);
		});
	};

	// Function that shows player.mark after specific box is hovered
	showElementOnMouseOver = (e) => {
		e.target.textContent = `${this.player.mark}`;
		e.target.classList.add("board--box--hover");
	};

	// Function that hides player.mark after mouse is out of the box area
	hideElementOnMouseOut = (e) => {
		e.target.textContent = "";
		e.target.classList.remove("board--box--hover");
	};

	// Function that remove boxes event listeners
	removeListenersForEachBox = () => {
		boxes.forEach((box) => {
			this.removeEventListeners(box);
		});
	};

	// Function that remove event listeners for specific box
	removeEventListeners = (box) => {
		console.log("usunięto");
		box.removeEventListener("click", this.handleClick);
		box.removeEventListener("mouseout", this.hideElementOnMouseOut);
		box.removeEventListener("mouseover", this.showElementOnMouseOver);
	};
}

export { setEventListeners };
