import {
	boxes,
	resetBtn,
	newGameBtn,
	winnerAnnoucement,
	winner,
	endgameMessage,
} from "./dom-elems.js";
import { Game } from "./game.js";
import { LatestResults } from "./latest-results.js";

class Click extends Game {
	constructor(
		e,
		board,
		activePlayer,
		player,
		computer,
		players,
		winningCombinations,
		latestResults
	) {
		super();
		(this.e = e),
			(this.board = board),
			(this.activePlayer = activePlayer),
			(this.player = player),
			(this.computer = computer),
			(this.players = players),
			(this.winningCombinations = winningCombinations),
			(this.latestResults = latestResults),
			this.click(this.e);
	}
	click = (e) => {
		const box = e.target;
		box.classList.remove("board--box--hover");
		this.addBoxToBoard(box);
		this.pushBoxIntoPlayerArr(box, this.activePlayer[0]);
		this.checkPlayerArrLength(box);
	};

	checkPlayerArrLength = (e) => {
		if (this.player.arr.length > 2 || this.computer.arr.length > 2) {
			this.checkForWinner(e);
		}
	};

	checkForWinner = (e) => {
		const player = this.activePlayer[0];
		this.findWinningCombination(player, e);
	};

	findWinningCombination = (player, e) => {
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				this.setWinner(player, e);
				this.showWinningBoxes(combination);
			}
		}
		this.checkDraw();
	};

	setWinner = (player) => {
		this.showWinningMessage(player);
		this.addWins(player);
	};

	showWinningBoxes = (combination) => {
		const winningArr = combination;

		boxes.forEach(function (box) {
			if (winningArr.includes(Number(box.id))) {
				box.classList.add("won");
			}
		});
	};

	unlockNewGameBtn = () => {
		this.isGameEnd = true;

		if (this.isGameEnd) {
			newGameBtn.disabled = false;
		}
	};

	checkDraw = () => {
		if (
			this.player.arr.length === 5 &&
			this.computer.arr.length === 4 &&
			this.player.winner === false &&
			this.computer.winner === false
		) {
			const results = new LatestResults("", this.latestResults);
			this.showDrawMessage();
		}
	};

	addWins = (player) => {
		player.winner = true;
		player.wins++;
		const results = new LatestResults(player, this.latestResults);
	};

	showDrawMessage = () => {
		endgameMessage.textContent = "";
		this.showAndHideWinnerBox();
		winner.textContent = "It's a draw...";
	};

	showWinningMessage = (player) => {
		endgameMessage.textContent = "Winner!";
		this.showAndHideWinnerBox();
		winner.textContent = `${player.name} ( ${player.mark} )`;
	};

	showAndHideWinnerBox = () => {
		resetBtn.disabled = true;
		winnerAnnoucement.classList.remove("hidden");
		setTimeout(() => {
			this.unlockNewGameBtn();
			resetBtn.disabled = false;
			winnerAnnoucement.classList.add("hidden");
			newGameBtn.classList.remove("disabled");
		}, 3000);
	};
}

export { Click };
