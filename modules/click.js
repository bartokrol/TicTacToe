import { boxes } from "./domElems.js";
import { ResultMessage } from "./resultMessage.js";
import { resultWins, resultDefeats } from "./domElems.js";
import { LatestResults } from "./latestResults.js";

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
				this.setWinner(player);
				this.showWinningPlayersMarks(combination);
				return;
			}
		}
	};

	setWinner = (player) => {
		new ResultMessage(player);
		this.addWins(player);
	};

	addWins = (player) => {
		player.winner = true;
		player.wins++;
		if (player.name == "Player") {
			resultWins.textContent = player.wins;
		} else if (player.name == "Computer") {
			resultDefeats.textContent = player.wins;
		}

		new LatestResults(player, this.latestResults);
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
