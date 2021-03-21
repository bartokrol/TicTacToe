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
import { LatestResults } from "./latest-results.js";
import { AddBoxToBoard } from "./addBoxToBoard.js";
import { PushBoxIntoPlayerArr } from "./pushBoxIntoPlayerArr.js";

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
		new PushBoxIntoPlayerArr(box, this.activePlayer);

		this.checkPlayerArrLength(e);
		const emptyBoxes = boxes.filter((box) => box.textContent === "");
		// if (emptyBoxes.length % 2 === 0) {
		// 	emptyBoxes[
		// 		Math.floor(Math.random() * (emptyBoxes.length + 1))
		// 	].textContent = "O";
		// }
	};

	checkPlayerArrLength = (e) => {
		if (this.player1.arr.length > 2 || this.player2.arr.length > 2) {
			this.checkForWinner(e);
		}
	};

	checkForWinner = () => {
		const player = this.activePlayer;
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
			this.player1.arr.length === 5 &&
			this.player2.arr.length === 4 &&
			this.player1.winner === false &&
			this.player2.winner === false
		) {
			this.draws++;
			console.log(this.draws);
			resultDraws.textContent = this.draws;
			// const results = new LatestResults("", this.latestResults);
			// resultDraws.textContent = this.showDrawMessage();
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
