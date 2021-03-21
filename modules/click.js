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
import { ComputerClick } from "./computer-click.js";
import { PlayerClick } from "./player-click.js";
import { Game } from "./game.js";

class Click extends Game {
	constructor() {
		super();
		this.showMessage();
	}

	showMessage = () => {
		console.log("działa");
		const computerClick = new ComputerClick();
		const playerClick = new PlayerClick();
	};
	filterEmptyBoxes = () => {
		this.emptyBoxes = this.emptyBoxes.filter(
			(box) => box.textContent == ""
		);
	};

	addBoxToBoard = (box) => {
		const boxRow = box.dataset.row;
		const boxColumn = box.dataset.column;
		this.board[boxRow][boxColumn] = box.id;
	};

	pushBoxIntoActivePlayerArr = (box, player) => {
		player.arr.push(Number(box.id));
		box.textContent = `${player.mark}`;
	};

	checkPlayerArrLength = (player, computer) => {
		if (player.arr.length > 2 || computer.arr.length > 2) {
			this.checkForWinner();
		}
	};

	checkForWinner = () => {
		const player = this.activePlayer[0];
		this.findWinningCombination(player);
	};

	findWinningCombination = (player) => {
		for (let combination of this.winningCombinations) {
			if (combination.every((el) => player.arr.includes(el))) {
				this.setWinner(player);
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
			this.draws++;
			console.log(this.draws);
			resultDraws.textContent = this.draws;
			// const results = new LatestResults("", this.latestResults);
			resultDraws.textContent = this.showDrawMessage();
		}
	};

	addWins = (player) => {
		player.winner = true;
		player.wins++;
		if (player.name == "Player") {
			resultWins.textContent = player.wins;
		} else if (player.name == "Computer") {
			resultDefeats.textContent = player.wins;
		}

		// const results = new LatestResults(player, this.latestResults);
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

	changeActivePlayer = (player, computer, activePlayer, players) => {
		player.active = player.active;
		computer.active = computer.active;
		activePlayer = players.filter((player) => player.active);
		console.log(activePlayer);
	};
}

export { Click };
