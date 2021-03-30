import { boxes, resetBtn, newGameBtn, bodyOverflow } from "./domElems.js";
import { PlayerClick } from "./playerClick.js";
import { Click } from "./click.js";
import { ComputerClick } from "./computerClick.js";
import { ActivePlayerChange } from "./activePlayerChange.js";
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
			this.addEventListeners();
		this.checkComputerMove();
	}

	// Function is called to find if computer is an active player. If true the computerClick class is called. After this the box events are removed.
	checkComputerMove = () => {
		if (this.computer.active) {
			const computerBox = this.emptyBoxes[
				Math.floor(Math.random() * this.emptyBoxes.length)
			];
			this.click(computerBox);
		}
	};

	// Function that add mouseout, mouseover, click events to all of the boxes on the board and click event to newGameBtn, resetBtn after new game is started.
	addEventListeners = () => {
		this.addListenersToBoxes();
		newGameBtn.addEventListener("click", this.newGameListener);
		resetBtn.addEventListener("click", this.resetListener);
	};

	// Function is called after one of the box on board is clicked. The player click is set on the board and after that computer click also lands on the board.
	handleClick = (e) => {
		// Player click
		const playerBox = e.target;
		this.click(playerBox);

		// Check if game is end
		if (this.isGameEnd) {
			this.removeListenersForEachBox();
			newGameBtn.addEventListener("click", this.newGameListener);
		} else {
			// Computer click
			const computerBox = this.emptyBoxes[
				Math.floor(Math.random() * this.emptyBoxes.length)
			];
			this.click(computerBox);
		}

		// Another check if game is end to remove listeners if this condition is true
		if (this.isGameEnd) {
			this.removeListenersForEachBox();
			newGameBtn.addEventListener("click", this.newGameListener);
		}
	};

	// Function that calls new Click depends on which playerBox is set (could be e.target/playerBox or computerBox)
	// After each click the event listener to specific box is removed
	click = (playerBox) => {
		const playerClick = new Click(
			playerBox,
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
		this.activePlayer = playerClick.activePlayer;
		this.removeBoxListeners(playerBox);
		this.emptyBoxes = boxes.filter((box) => box.textContent === "");
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
		const activePlayer = new FindActivePlayer(
			this.activePlayer,
			this.players
		);
		this.activePlayer = activePlayer.activePlayer;
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
			this.removeBoxListeners(box);
		});
	};

	// Function that remove event listeners for specific box
	removeBoxListeners = (box) => {
		box.removeEventListener("click", this.handleClick);
		box.removeEventListener("mouseout", this.hideElementOnMouseOut);
		box.removeEventListener("mouseover", this.showElementOnMouseOver);
	};
}

export { setEventListeners };
