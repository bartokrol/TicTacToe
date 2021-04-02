import { SetWinner } from "./setWinner.js";
import { boxes } from "./domElems.js";

// Click class is called inside module - "setEventListeners.js"
class Click {
	constructor(
		box,
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
		(this.box = box),
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
			this.click();
	}

	// Function firstly filters for empty boxes on the board, then set which box is going to be filled with computer.mark
	// After computer "click" the classes that can be seen below are called
	click = () => {
		this.setBoxIntoPlayerArr(this.box, this.activePlayer);
		this.findWinningPlayer(this.activePlayer);
	};

	// Clicked element is send into the player array.
	setBoxIntoPlayerArr = (box, player) => {
		player.arr.push(Number(box.id));
		box.textContent = `${player.mark}`;
	};

	findWinningPlayer = (player) => {
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				this.isGameEnd = true;
				new SetWinner(player, this.latestResults);
				this.showWinningPlayersMarks(combination);
				return;
			}
		}
	};

	showWinningPlayersMarks = (combination) => {
		const winningArr = combination;

		boxes.forEach((box) => {
			if (winningArr.includes(Number(box.id))) {
				box.classList.add("won");
			}
		});
	};
}

export { Click };
